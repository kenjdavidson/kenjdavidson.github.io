/** Golf Canada API client — authenticates and fetches member snapshot data at build time. */

const TOKEN_URL = 'https://scg.golfcanada.ca/connect/token';
const API_BASE = 'https://scg.golfcanada.ca/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GolfCanadaUser {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  handicap: string;
  membershipLevel: string;
  expirationDate: string;
}

export interface GolfCanadaLoginResponse {
  access_token: string;
  user: GolfCanadaUser;
}

export interface GolfCanadaScore {
  course: string;
  datePlayed: string;
  holesPlayed: number;
  score: number;
  isUsedInCalc: boolean;
}

export interface GolfCanadaSnapshot {
  club: string;
  membershipType: string;
  expirationDate: string;
  courseHandicap: string;
  lowHandicap: string;
  displayLowHandicap: string;
  lowHandicapOn: string | null;
  scores: GolfCanadaScore[];
  ytdScoreCount: number;
  ytdScoreAverage: number;
  ytdYear: number;
}

export interface GolfCanadaProfile {
  user: GolfCanadaUser;
  snapshot: GolfCanadaSnapshot;
  /** ISO timestamp captured immediately after the API data was fetched. */
  fetchedAt: string;
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/**
 * Authenticates with Golf Canada using username/password credentials from
 * environment variables (GOLFCANADA_USERNAME and GOLFCANADA_PASSWORD).
 *
 * Returns `null` if credentials are not configured (e.g. local dev).
 */
async function login(username: string, password: string): Promise<GolfCanadaLoginResponse> {
  const body = new URLSearchParams({
    grant_type: 'password',
    username,
    password,
    scope: 'address email offline_access openid phone profile roles',
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Golf Canada login failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  if (!data.access_token || !data.user) {
    throw new Error('Golf Canada login response is missing required fields (access_token, user)');
  }

  return data as unknown as GolfCanadaLoginResponse;
}

/**
 * Fetches the member snapshot for the given member ID using the provided
 * Bearer token.
 */
async function getSnapshot(memberId: number, accessToken: string): Promise<GolfCanadaSnapshot> {
  const response = await fetch(`${API_BASE}/members/${memberId}/getSnapshot`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Golf Canada snapshot failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  if (!data.club || !Array.isArray(data.scores)) {
    throw new Error('Golf Canada snapshot response is missing required fields (club, scores)');
  }

  return data as unknown as GolfCanadaSnapshot;
}

/**
 * Fetches the full Golf Canada profile (user + snapshot) using credentials
 * from `GOLFCANADA_USERNAME` and `GOLFCANADA_PASSWORD` environment variables.
 *
 * Returns `null` when credentials are absent so the page can render a
 * graceful fallback during local development.
 */
export async function getGolfCanadaProfile(): Promise<GolfCanadaProfile | null> {
  const username = import.meta.env.GOLFCANADA_USERNAME as string | undefined;
  const password = import.meta.env.GOLFCANADA_PASSWORD as string | undefined;

  if (!username || !password) {
    return null;
  }

  const loginData = await login(username, password);
  const snapshot = await getSnapshot(loginData.user.id, loginData.access_token);
  const fetchedAt = new Date().toISOString();

  return { user: loginData.user, snapshot, fetchedAt };
}
