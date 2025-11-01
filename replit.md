# HunarHub Admin Frontend

## Overview
This is a React-based admin panel for HunarHub platform. It provides administrative capabilities for managing trainers, students, and approving trainer applications.

**Project Type:** Frontend Web Application (React + Vite + Material-UI)
**Current State:** Configured for Replit environment
**Last Updated:** November 1, 2025

## Tech Stack
- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **UI Library:** Material-UI (MUI) 7.3.4
- **Routing:** React Router DOM 7.9.5
- **Form Handling:** React Hook Form 7.65.0 with Yup validation
- **Charts:** Recharts 3.3.0
- **HTTP Client:** Axios 1.13.1

## Project Structure
```
src/
├── api/          # API client and HTTP request handlers
├── components/   # Reusable React components
├── context/      # React context providers (Auth)
├── pages/        # Page components organized by feature
│   ├── auth/     # Login, Register, OTP verification
│   ├── dashboard/
│   ├── students/
│   └── trainers/
├── theme/        # Material-UI theme configuration
└── main.jsx      # Application entry point
```

## Backend Connection
The frontend expects a backend API at:
- Default: `http://localhost:3000/api`
- Configurable via `VITE_API_BASE_URL` environment variable

**Note:** This repository contains only the frontend. The backend API must be running separately for full functionality.

## Features
- Admin authentication (login, register, OTP verification)
- Dashboard with analytics
- Trainer approval workflow
- Student management
- Trainer management
- Protected routes with authentication

## Development Setup
The project is configured to run on port 5000 with host `0.0.0.0` for Replit compatibility.

### Running the Project
- **Development:** The `dev` workflow runs `npm run dev` automatically
- **Build:** Run `npm run build` to create production build
- **Preview:** Production build preview is configured for deployment

### Vite Configuration
- Server host: `0.0.0.0` (required for Replit)
- Server port: `5000` (required for Replit webview)
- HMR configured for Replit proxy environment

## Environment Variables
- `VITE_API_BASE_URL` - Backend API URL (optional, defaults to http://localhost:3000/api)

## Deployment
The project is configured for Replit Autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview --host 0.0.0.0 --port 5000`

## Recent Changes
- **2025-11-01:** Initial Replit setup completed
  - Installed all npm dependencies
  - Configured Vite to run on port 5000 with 0.0.0.0 host
  - Set up HMR for Replit proxy environment
  - Configured deployment settings for Autoscale
  - Created project documentation
  - Verified frontend is running successfully
