# 🔐 Next.js Full-Stack Authentication

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A robust, full-stack authentication system built to master the fundamentals of user security in modern web applications. This project demonstrates a complete flow from user registration and email verification to secure, token-based session management using Next.js App Router, MongoDB, and JSON Web Tokens (JWT).

## ✨ Key Features

* **User Registration & Login:** Secure password hashing using `bcryptjs`.
* **Email Verification:** Automated email dispatch with `nodemailer` and unique verification tokens via `uuid`.
* **JWT Authentication:** Stateless, secure user sessions managed via `jsonwebtoken` stored in HTTP-only cookies.
* **Protected Routes:** Server-side route protection ensuring only authenticated users can access specific pages (e.g., Profile).
* **Interactive UI:** Real-time, elegant user feedback using `react-hot-toast`.
* **Database Integration:** Seamless MongoDB connection and schema validation using `mongoose`.
* **Modern Styling:** Fully responsive and minimalistic design using Tailwind CSS v4.

---

## 🛠️ Tech Stack & Dependencies

**Frontend:**
* Next.js (App Router)
* React & React DOM
* Tailwind CSS (PostCSS)
* Axios (Client-side fetching)
* React Hot Toast (Notifications)

**Backend:**
* Next.js API Routes (`/api/users/*`)
* MongoDB & Mongoose (Database & ORM)
* JSON Web Token (JWT) (Auth Tokens)
* Bcrypt.js (Password Cryptography)
* Nodemailer (SMTP Email Services)

---

## 📂 Project Structure Overview

```text
src/
├── app/
│   ├── api/users/          # Backend API Endpoints
│   │   ├── login/          # User authentication
│   │   ├── logout/         # Session termination
│   │   ├── me/             # Fetch current user data
│   │   ├── signup/         # Account creation
│   │   └── verifyemail/    # Email token verification
│   ├── login/              # Login Page UI
│   ├── profile/            # Protected Profile Page UI
│   ├── signup/             # Registration Page UI
│   └── verifyemail/        # Email Verification UI
├── dbConfig/               # MongoDB Connection logic
├── helpers/                # Utility functions
│   ├── getDataFromToken.ts # JWT extraction helper
│   └── mailer.ts           # Nodemailer configuration
└── models/                 # Mongoose Database Schemas
```
---

# 🚀 Getting Started
Follow these steps to set up the project locally on your machine.

## 1. Prerequisites
Ensure you have the following installed:

`Node.js` (v18 or higher recommended)

A `MongoDB` database (Local or Atlas)

An SMTP service (like `Mailtrap` for testing emails)

---
## 2. Clone the Repository
```bash
git clone [https://github.com/rishipatel83/nextJS-fullstack-auth.git](https://github.com/rishipatel83/nextJS-fullstack-auth.git)
cd nextJS-fullstack-auth
```
---
## 3. Install Dependencies
```bash
npm install
# or
yarn install
```
---
## 4. Set Up Environment Variables
Create a .env file in the root directory and add the following keys. Do not skip this step, or the database and email services will fail to connect.
```
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_super_secret_jwt_string
DOMAIN=http://localhost:3000

# Mailtrap / SMTP Credentials for Nodemailer
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```
---
## 5. Run the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the result!
