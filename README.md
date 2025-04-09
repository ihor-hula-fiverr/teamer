# Teamer - Football Team Management App

Teamer is a web application that helps people find and join football teams, book fields, and organize games. Whether you're new to a city or just looking to play football, Teamer connects you with local teams and fields.

## Features

- Find and join local football teams
- Book football fields
- Create and manage games
- View field schedules
- Team management

## Tech Stack

- **Backend**: Node.js with TypeScript
- **Frontend**: React with TypeScript
- **Bundler**: Webpack
- **Package Manager**: pnpm
- **Database**: (To be determined)

## Project Structure

```
teamer/
├── packages/
│   ├── backend/         # Node.js backend
│   ├── frontend/        # React frontend
│   └── shared/          # Shared types and utilities
├── package.json         # Root package.json
└── pnpm-workspace.yaml  # Workspace configuration
```

## Getting Started

1. Install pnpm globally:
   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development servers:
   ```bash
   pnpm dev
   ```

## Development

- Backend runs on: http://localhost:3000
- Frontend runs on: http://localhost:8080