# ⚙️ Football Edge – Local Setup Guide

Welcome to the Football Edge development environment! This guide will help you get the mobile app (built with Expo) and the web-based Admin Portal (built with Next.js) running on your machine.

---

## 📦 Prerequisites

Before you begin, make sure you have the following installed:

### General Tools
- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Mobile (Expo)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
  ```bash
  npm install -g expo-cli
Expo Go app on your phone (iOS/Android)

Web (Admin Portal)
Vercel CLI (optional for deploys)

Any modern browser (Chrome recommended)

📁 Project Structure
bash
Copy
Edit
football-edge/
├── mobile/         # Expo React Native app
├── admin/          # Next.js admin portal
└── shared/         # Shared models, types, utils
📱 Running the Mobile App (Expo)
bash
Copy
Edit
cd football-edge/mobile

# Install dependencies
npm install

# Start development server
npx expo start
Access the App:
Scan the QR code with your Expo Go app (iOS/Android)

Or use iOS/Android simulator (if configured)

✅ You'll be able to see live reloads of your mobile app as you develop.

🖥️ Running the Admin Portal (Web)
bash
Copy
Edit
cd football-edge/admin

# Install dependencies
npm install

# Start Next.js dev server
npm run dev
Visit http://localhost:3000

Log in with a Supabase Admin account to access protected routes

🔐 Environment Variables
Create a .env.local file in both mobile/ and admin/ directories:

Mobile .env.local
makefile
Copy
Edit
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
Admin .env.local
makefile
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         # (optional for admin access)
🧠 Common Commands
Audit & Fix Vulnerabilities
bash
Copy
Edit
npm audit fix
Install Expo if permissions error:
bash
Copy
Edit
sudo npm install -g expo-cli
📞 Need Help?
Reach out in the project Slack or email: dev@footballedge.app

## 🗄️ Running the Local Supabase Environment

To run the local Supabase environment, follow these steps:

### Prerequisites
- Ensure Docker is installed and running on your machine.
- Supabase CLI should be installed. If not, install it using Homebrew:
  ```bash
  brew install supabase/tap/supabase
  ```

### Initialize Supabase
If you haven't already initialized Supabase in your project, run:
```bash
supabase init
```

### Start Supabase
To start the local Supabase stack, run:
```bash
supabase start
```
This will start the local development environment, including the database, authentication, and storage services.

### Access Supabase Studio
You can access the Supabase Studio (GUI) to manage your database at:
- **http://127.0.0.1:54323**

### Apply Migrations
To apply the database schema and migrations, use:
```bash
supabase db reset
```
This will reset and apply all migrations, setting up your database schema as defined in your migration files.