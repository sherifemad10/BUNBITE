# BUNBITE Restaurant

This repository contains a React/Vite frontend and a Node.js/Express backend.

## Local development

Start the backend:

```bash
cd backend
npm install
npm start
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` with the backend URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## Vercel deployment

Deploy the frontend and backend as two separate Vercel projects. Vercel projects
cannot use `frontend` and `backend` as service roots when the project itself is
already rooted inside one of those folders.

### Backend project

1. Import the repository into Vercel.
2. Set **Root Directory** to `backend`.
3. The included `backend/vercel.json` configures `api/index.js` as the Node
   entrypoint for Express.
4. Add these environment variables:

```env
JWT_SECRET=replace-with-a-long-random-secret
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=replace-with-a-strong-password
CORS_ORIGIN=https://your-frontend.vercel.app
```

The backend health check is available at `/api/health`.

### Frontend project

1. Create a second Vercel project from the same repository.
2. Set **Root Directory** to `frontend`.
3. Use the Vite framework preset, with build command `npm run build` and output
   directory `dist`.
4. Add this environment variable, using the deployed backend URL:

```env
VITE_API_URL=https://your-backend.vercel.app/api
```

The included `frontend/vercel.json` rewrites all client-side routes to
`index.html`, so routes such as `/login` and `/dashboard` work after refresh.

After changing environment variables, redeploy the affected Vercel project.

## Project structure

```text
backend/     Express API and JSON data stores
frontend/    React/Vite web application
```