# Recipe Explorer (React SPA)

A modern single-page Recipe Explorer app with search, responsive recipe grid, and accessible recipe details modal.  
Styled with the **Ocean Professional** theme (blue + amber accents, clean surfaces, subtle gradients).

## Features

- Header with prominent search (query synced to `?q=` in the URL)
- Responsive recipe grid with cards (image placeholder if missing)
- Recipe details modal (focus trap, Escape to close, click backdrop to close)
- Loading skeleton + empty state + error message
- Data layer that prefers an API if configured, otherwise uses local mock data

## Configuration (Environment Variables)

This app reads these variables (Create React App style) at build time:

- **`REACT_APP_API_BASE`** (highest priority): Base URL for the recipes API (e.g. `http://localhost:8000`)
- **`REACT_APP_BACKEND_URL`** (fallback): Alternative base URL for the API
- **`REACT_APP_FEATURE_FLAGS`** (optional): JSON string, e.g. `{ "someFlag": true }`
- **`REACT_APP_NODE_ENV`** (optional): Only used for informational/logging behavior; not required

### API behavior

If `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` is set, the app will call:

- `GET <API_BASE>/recipes?q=<query>`

Expected response format (recommended):

```json
{ "recipes": [ { "id": "1", "title": "...", "ingredients": ["..."], "instructions": ["..."] } ] }
```

Also supported:

- An array directly: `[ { ... }, { ... } ]`

If the API call fails for any reason, the UI shows a friendly error message and continues to function with mock data **only when no API base is configured**.

## Local Development

From `frontend_react/`:

```bash
npm start
```

App runs on port **3000**.

## Notes

- No backend is required for development: mock data is used automatically when API env vars are empty.
- The search query is shareable via URL `/?q=pasta`.
- Modal is keyboard accessible and uses focus trapping for good UX.
