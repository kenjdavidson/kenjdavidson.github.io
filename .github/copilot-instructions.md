# GitHub Copilot Instructions

## Pull Requests

### UI Changes

Any pull request that includes UI-related changes **must** include screenshots demonstrating the before and after states of the affected components or pages.

**This is mandatory, not optional.** Screenshots must be:
- Embedded directly in the PR description (not linked externally)
- Showing both the **before** state (from the base branch) and the **after** state (from the PR branch)
- Captured by building the site (`npm run build`) and rendering the relevant page(s)
- Labelled clearly, e.g. "**Before**" / "**After**"

To generate screenshots in this environment, build the project with `npm run build`, then use Python playwright (`python3 -m playwright`) to render the built HTML files via `file://` paths and save `.png` files, then embed them in the PR description.

### Commit Messages

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and be concise:

- Use the format: `<type>(<optional scope>): <short description>`
- Common types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`
- Keep the subject line short and descriptive (72 characters or fewer)
- Use the imperative mood ("add feature" not "added feature")

Examples:
```
feat(blog): add tag filtering to post list
fix(nav): correct mobile menu toggle behavior
chore: update dependencies
docs: add copilot instructions
```
