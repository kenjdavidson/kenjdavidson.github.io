# GitHub Copilot Instructions

## Pull Requests

### UI Changes

Any pull request that includes UI-related changes must include screenshots demonstrating the before and after states of the affected components or pages.

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
