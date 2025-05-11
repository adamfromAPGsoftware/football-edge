# Football Edge Application Index

## Project Overview
This is a React Native/Expo application built with TypeScript, using a modern file-based routing system.

## Directory Structure

### Root Configuration Files
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `app.json` - Expo configuration
- `.prettierrc` - Code formatting rules
- `.npmrc` - NPM configuration
- `.gitignore` - Git ignore rules

### Main Application Directories

#### `/app` - Main Application Routes
- `(onboarding)/` - Onboarding flow screens
- `(auth)/` - Authentication related screens
- `(app)/` - Main application screens
- `_layout.tsx` - Root layout component
- `+not-found.tsx` - 404 error page

#### `/components` - Reusable Components
- `onboarding/` - Onboarding-specific components

#### `/types` - TypeScript Type Definitions
- `db.ts` - Database-related type definitions

#### `/context` - React Context Providers
- Contains application-wide state management

#### `/hooks` - Custom React Hooks
- Reusable hook functions

#### `/lib` - Utility Functions and Libraries
- Helper functions and third-party integrations

#### `/assets` - Static Assets
- Images, fonts, and other static files

### Development Environment
- `.expo/` - Expo development environment files
- `expo-env.d.ts` - Expo TypeScript declarations

## Technology Stack
- React Native
- Expo
- TypeScript
- File-based routing (likely using Expo Router)

## Getting Started
1. Install dependencies: `npm install`
2. Start the development server: `npm start`

## Notes
- The application uses a modern file-based routing system
- TypeScript is used for type safety
- The project follows a modular structure with clear separation of concerns
