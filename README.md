# Sohoza System - Backend

Welcome to the backend API for the Sohoza System. This project is built using a modern technology stack to provide a robust, scalable, and efficient server-side application.

## 🚀 Technical Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **API Testing**: [Axios](https://axios-http.com/)

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v22 or higher)
- PostgreSQL
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd sohoza-system/backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and copy the contents from `.env.example`. Replace the placeholders with your actual configuration.
    ```bash
    cp .env.example .env
    ```

4.  **Database Migration**:
    Generate the Prisma client and run migrations (if applicable) or push the schema to your database.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

### Running the App

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

---

## 📖 API Documentation

**Base URL**: `http://localhost:5000/api`

### 🏥 System
- **Health Check**: `GET /health` (Relative to server root)
  - *Description*: Verifies if the server is running.
  - *Auth*: None

### 🔐 Authentication
- **Login**: `POST /auth/login`
  - *Body*: `{ "email": "string", "password": "string" }`
  - *Description*: Authenticates a user and returns a JWT token.

### 👥 User Management (`/users`)
- **Register / Create User**: `POST /`
  - *Body*: `email`, `name`, `password`, `role`
- **Get All Users**: `GET /`
  - *Auth*: `ADMIN`, `SUPERADMIN`
- **Get User by Email**: `GET /email/:email`
- **Get Users by Role**: `GET /role/list?role=ROLE_NAME`
- **Get User by ID**: `GET /:id`
- **Update User**: `PUT /:id`
  - *Multipart*: `profileImage` (File)
- **Soft Delete User**: `DELETE /:id/soft`
- **Hard Delete User**: `DELETE /:id/hard`

### 🤝 Team Members (`/team-members`)
- **Create**: `POST /`
- **List All**: `GET /`
- **Get by ID**: `GET /:id`
- **Update**: `PUT /:id`
- **Delete**: `DELETE /:id`

### 🛠️ Services (`/services`)
- **Create**: `POST /`
- **List All**: `GET /`
- **Get by ID**: `GET /:id`
- **Update**: `PUT /:id`
- **Delete**: `DELETE /:id`

### 📊 Analytics (`/analytics`)
- **Dashboard Analytics**: `GET /dashboard`
- **General Analytics**: `GET /general`
- **Debug Tables**: `GET /debug-tables`

---

## 📂 Project Structure

- `src/controllers`: Request handlers.
- `src/routes`: API route definitions.
- `src/services`: Business logic layer.
- `src/lib`: Library configurations (Prisma, etc.).
- `src/middleware`: Custom Express middlewares (Auth, error handling).
- `prisma`: Database schema and migrations.

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server with `ts-node-dev`.
- `npm start`: Starts the application in production mode.
- `npx prisma studio`: Opens the Prisma Studio GUI to view your data.
