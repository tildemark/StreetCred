# StreetCred 🎯♟️

**StreetCred** is a "Game Agnostic" neighborhood ranking system. It digitizes casual competition (Darts & Chess) by tracking Elo ratings, match history, and achievements, turning a friendly hangout into a battle for the top spot on the "Street Leaderboard."

Built for the "Always Free" Oracle Cloud Infrastructure (OCI) tier using Docker & Portainer.

![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/stack-Next.js_|_Postgres_|_Redis_|_Tailwind-000000)

## ✨ Features

* **Multi-Game Support:** Currently supports **Darts** and **Chess**. Easy to extend to Billiards, Badminton, etc.
* **Elo Rating System:** Uses a standard Elo algorithm ($K=32$) to calculate fair rank adjustments.
* **"Digital Handshake" Verification:**
    * **QR Code:** Winner scans Loser's code to confirm the match.
    * **PIN Code:** (Fallback) Loser enters a 4-digit PIN if they don't have their phone.
* **Live Leaderboard:** Real-time ranking updates.
* **Achievements:** Unlock badges like "Streak of 3" or "Veteran."
* **Stat Tracking:** Wins, Losses, Streaks, and Head-to-Head history.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS
* **Database:** PostgreSQL (via Prisma ORM)
* **Real-time/Cache:** Redis
* **Auth:** Auth.js (NextAuth v5) with Google Provider
* **Deployment:** Docker (Standalone Output)

## 🚀 Deployment (OCI + Portainer)

This project is designed to run in a Docker container behind Nginx Proxy Manager.

### 1. Prerequisites
* An OCI (Oracle Cloud) instance.
* Portainer installed.
* A Google Cloud Console project (for OAuth Credentials).

### 2. Environment Variables
You must set these in your Portainer Stack configuration:

```env
# Database (Internal Docker Network)
DB_USER=streetcred
DB_PASSWORD=secure_password_here
DB_NAME=streetcred_main
DATABASE_URL=postgresql://streetcred:secure_password_here@streetcred_db:5432/streetcred_main

# Auth (Google OAuth)
# URL must match your domain (e.g., [https://streetcred.sanchez.ph](https://streetcred.sanchez.ph))
AUTH_SECRET=generate_with_openssl_rand_base64_32
AUTH_URL=[https://your-domain.com](https://your-domain.com)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Redis
REDIS_URL=redis://streetcred_redis:6379

# Optional: Cloudinary (For Profile Pics)
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

```

### 3. Docker Compose (Stack)

Use the provided `docker-compose.yml` in Portainer. It creates an internal network for the Database and Redis, and exposes the App to your external proxy network.

### 4. GitHub Actions (CI/CD)

This repo includes a workflow `.github/workflows/deploy.yml` that:

1. Builds the Docker image on push to `main`.
2. Pushes the image to `ghcr.io/yourusername/streetcred`.
3. **To Update:** simply "Pull latest image" and "Redeploy" in Portainer.

## 📂 Project Structure

```bash
├── app/
│   ├── actions/       # Server Actions (Match Logic)
│   ├── api/auth/      # NextAuth Endpoints
│   ├── match/         # Match Logging Page
│   └── profile/       # User Profile & QR/PIN Settings
├── components/        # Reusable UI (MatchLogger, etc.)
├── lib/               # Utilities (Elo math, DB connection)
├── prisma/            # Database Schema
└── public/            # Static assets

```

## 🛡️ Security

* **PIN Hashing:** User PINs are hashed using `bcryptjs` before storage.
* **Middleware:** Protected routes redirect unauthenticated users.
* **RBAC:** (Future) Role-based access for Admin features.

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

*Built with ❤️ for the neighborhood.*
