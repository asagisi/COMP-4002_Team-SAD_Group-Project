# Project README

Project Team

- Team Name: Team SAD
- team members: Angelito, Dennis, Seth

# Project General Description: 

- "As a user, I want to be able to keep a watchlist of my favourite shows, so that I can remember what I want to watch later on."
- "As a user, I want to create an account so that all of my information and lists of show is saved."
- "As a user, I want track my progress on what I am watching, so that I know where I am if I forget."

# Kanban items Sprint 1

- G.2: Organize your group (all members)
- G.2: Pick a theme (all members)
- T.2: project intialization (Angelito)
- T.1: set up project git repo (Angelito)
- I.1: High level component (Angelito, Seth, Dennis)
- T.3: Project Readme (Angelito, Seth, Dennis)
- T.5: app stylesheet and style guide (Seth)
- I.2 styling (seth)
- T.4: app integration (Dennis, seth, Angelito)
- T.6: Team Vercel account/management (Angelito)

# Kanban items Sprint 2

- T.1: Multi-page Navigation (Dennis)
- T.2: Navigation Interface (Seth, Dennis)
- T.3: Shared state across pages
- I.1 Feature Page (All members)
- I.2: Form Component (All members)
- I.3: Element Addition/Removal (All members)

# Local Setup

Here are the steps to run the application locally, including both front-end and back-end, along with authentication using Clerk.

### 1. Clone the Repository

```
git clone https://github.com/asagisi/COMP-4002_Team-SAD_Group-Project
cd ./COMP-4002_Team-SAD_Group-Project
```

### 2. Install Dependencies

#### Front-End
```
cd ./apps/frontend
npm install
```

#### Back-End
```
cd ./apps/backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in both front-end and back-end directories.

Front-End `.env`

```env
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Back-End `.env`

```env
CLERK_API_KEY=<your-clerk-api-key>
DATABASE_URL=postgres://username:password@localhost:5432/<dbname>
PORT=5000
```

Replace placeholders with your actual values. Do not commit secrets to GitHub.

### 4. Set Up the Database

If using PostgreSQL:

```env
psql -U <username> -c "CREATE DATABASE <dbname>;"
```

Run migrations to set up your schema:

```Bash
cd backend
npx prisma migrate dev
# or your migration tool
```

### 5. Start the Applications

#### Back-End
```Bash
cd backend
npm run dev
```

API will run at http://localhost:5000

#### Front-End

```Bash
cd frontend
npm run dev
```

Front-end will run at http://localhost:3000

### 6. Test Authentication

  1. Go to the front-end login page.
  2. Register a new account using email login.
  3. Verify that user-specific data is available through the API.

### 7. Additional Notes

  - Ensure that the front-end `.env` points to your local back-end URL.
  - Clerk authentication requires correct API keys and project environment configuration.
  - To reset the database (development only):

  ```Bash
  npx prisma migrate reset
  ```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
