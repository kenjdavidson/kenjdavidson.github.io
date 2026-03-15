import { useState, useEffect, useCallback, useRef } from 'react';
import {
  FiArrowUp,
  FiHome,
  FiUser,
  FiInfo,
  FiBookOpen,
  FiMail,
  FiFileText,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

/** Clock positions for sub-action buttons (odd hours 1–11). */
export type ClockPosition = 1 | 3 | 5 | 7 | 9 | 11;

/** Supported icon names (mapped to Feather icons from react-icons/fi). */
export type FabIconName =
  | 'FiHome'
  | 'FiUser'
  | 'FiInfo'
  | 'FiBookOpen'
  | 'FiMail'
  | 'FiFileText';

/** A secondary action displayed around the main FAB on hover. */
export interface FabAction {
  /** Accessible label and tooltip text. */
  label: string;
  /** Feather icon name to display. */
  iconName: FabIconName;
  /** Navigation target URL. */
  href: string;
  /**
   * Clock-face position for this sub-button (1, 3, 5, 7, 9, or 11).
   * Positions correspond to odd hours on a clock face:
   *   11 = upper-left, 9 = left, 7 = lower-left,
   *   5 = lower-right, 3 = right, 1 = upper-right
   * Up to 6 sub-actions can be placed, one per position.
   */
  position: ClockPosition;
}

interface Props {
  /** Secondary actions to reveal on hover. */
  actions?: FabAction[];
  /** Scroll distance (px) before the FAB appears (default: 300). */
  scrollThreshold?: number;
}

// ---------------------------------------------------------------------------
// Statics
// ---------------------------------------------------------------------------

const ICON_MAP: Record<FabIconName, IconType> = {
  FiHome,
  FiUser,
  FiInfo,
  FiBookOpen,
  FiMail,
  FiFileText,
};

/** Degrees clockwise from 12 o'clock for each supported clock position. */
const CLOCK_ANGLES: Record<ClockPosition, number> = {
  1: 30,
  3: 90,
  5: 150,
  7: 210,
  9: 270,
  11: 330,
};

const FAB_SIZE = 56; // w-14 = 56 px — main button diameter
const SUB_SIZE = 36; // w-9  = 36 px — sub-button diameter
const ORBIT_RADIUS = 58; // px — distance between button centres

// ---------------------------------------------------------------------------
// Helper: compute absolute positioning for a sub-button
// ---------------------------------------------------------------------------

/**
 * Returns CSS `right` / `bottom` values (in px) that place the sub-button at
 * the given clock position relative to the main button, plus opacity /
 * transform for the expand/collapse animation.
 *
 * The outer `fixed` wrapper is sized to the main button (FAB_SIZE × FAB_SIZE).
 * Sub-buttons are `absolute` children and may visually overflow that box —
 * overflow is allowed because the wrapper has no `overflow: hidden`.
 *
 * Derivation (positive x = right, positive y = up):
 *   offsetX = ORBIT_RADIUS · sin(angle)
 *   offsetY = ORBIT_RADIUS · cos(angle)
 *
 *   cssRight  = FAB_SIZE/2 − offsetX − SUB_SIZE/2
 *   cssBottom = FAB_SIZE/2 + offsetY − SUB_SIZE/2
 */
function subButtonStyle(
  position: ClockPosition,
  isExpanded: boolean,
): React.CSSProperties {
  const rad = (CLOCK_ANGLES[position] * Math.PI) / 180;
  const offsetX = Math.round(ORBIT_RADIUS * Math.sin(rad));
  const offsetY = Math.round(ORBIT_RADIUS * Math.cos(rad));

  const cssRight = FAB_SIZE / 2 - offsetX - SUB_SIZE / 2;
  const cssBottom = FAB_SIZE / 2 + offsetY - SUB_SIZE / 2;

  return {
    right: `${cssRight}px`,
    bottom: `${cssBottom}px`,
    opacity: isExpanded ? 1 : 0,
    transform: isExpanded ? 'scale(1)' : 'scale(0.5)',
    pointerEvents: isExpanded ? 'auto' : 'none',
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FloatingActionButton({ actions = [], scrollThreshold = 300 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show the FAB once the user has scrolled past the threshold.
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > scrollThreshold);
    onScroll(); // evaluate on mount in case page is already scrolled
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  // Clear any pending leave-timer on unmount to avoid state updates on an
  // unmounted component.
  useEffect(() => {
    return () => {
      if (leaveTimer.current !== null) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, []);

  // Hover handlers include a short leave-delay so the cursor can travel from
  // the main button to a sub-button without collapsing the menu.
  const onEnter = useCallback(() => {
    if (leaveTimer.current !== null) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (actions.length > 0) setIsExpanded(true);
  }, [actions.length]);

  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setIsExpanded(false), 100);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const subClasses =
    'absolute flex items-center justify-center w-9 h-9 rounded-full ' +
    'bg-brand-600 text-white shadow-md transition-all duration-200 ' +
    'hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400';

  return (
    <div
      aria-hidden={!isVisible}
      className={[
        'fixed bottom-6 right-6 z-50 transition-all duration-300',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
    >
      {/* Sub-action buttons — absolutely positioned around the main button */}
      {actions.map((action) => {
        const Icon = ICON_MAP[action.iconName];
        return (
          <a
            key={action.position}
            href={action.href}
            aria-label={action.label}
            title={action.label}
            className={subClasses}
            style={subButtonStyle(action.position, isExpanded)}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <Icon size={16} aria-hidden="true" />
          </a>
        );
      })}

      {/* Main FAB — always scrolls the page to the top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Return to top"
        title="Return to top"
        className={[
          'flex items-center justify-center w-14 h-14 rounded-full',
          'bg-brand-600 text-white shadow-lg transition-colors duration-200',
          'hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
        ].join(' ')}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <FiArrowUp size={24} aria-hidden="true" />
      </button>
    </div>
  );
}
