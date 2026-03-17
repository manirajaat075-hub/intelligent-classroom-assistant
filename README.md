# Intelligent Classroom Assistant

A modern, rule-based AI edtech platform with a photorealistic, premium UI and dual-role dashboards.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide React, Framer Motion
- **Backend**: Node.js, Express, Socket.io (Real-time)
- **Database**: MongoDB (Schema ready)
- **Auth**: Firebase Authentication (Configured)
- **Deployment**: Optimized for Vercel

## Key Features
- **Split-Screen Landing Page**: Distinct portals for Staff and Students with glassmorphism cards.
- **Staff Dashboard**: Student management, real-time attendance tracking (92% class average visualization), and classroom ID generation.
- **Student Dashboard**: Personal stats, gamified badges, assignment tracking, and real-time timetable.
- **Micro-interactions**: Subtle hover animations, backdrop blurs, and responsive layout.

## Getting Started

### Prerequisites
- Node.js installed on your system.
- Firebase project for Authentication.
- MongoDB instance (local or Atlas).

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Firebase keys in `src/lib/firebase.js`.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Start the backend:
   ```bash
   cd server
   node server.js
   ```

## Design Philosophy
The UI follows 2026 edtech design trends, using a deep purple-blue gradient palette (#8B5CF6 to #06B6D4), glassmorphism (backdrop-filter: blur), and neumorphic shadows to create a premium, "Khan Academy x Figma" aesthetic.
