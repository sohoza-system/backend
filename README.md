## Database
Database name: `sohoza_db`


# SOHOZA Backend API

A backend API for managing **blog posts**, **contact messages**, **users**, **comments**, and **categories**. Built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**.

---

## Features

- Create, read, update, and delete blog posts  
- Submit and retrieve contact messages  
- Manage users and roles (`USER`, `ADMIN`)  
- Handle comments and categories  
- Connects to a PostgreSQL database using Prisma  

---

## Tech Stack

- **Node.js** – JavaScript runtime  
- **Express** – API framework  
- **Prisma ORM** – Database toolkit  
- **PostgreSQL** – Relational database  
- **TypeScript** – Strong typing  
- **dotenv** – Environment variable management  

---

## Installation & Setup

1. **Clone the repository**
```bash
git clone <your_repo_url>
cd backend

2. **Install dependencies**
npm install
Create a .env file in the root directory:

DATABASE_URL="postgresql://postgres:<your_password>@localhost:5433/sohoza_db?schema=public"
PORT=5000
Generate Prisma client

npx prisma generate
Run migrations

npx prisma migrate dev --name init
Start the development server

npm run dev
Server will run at: http://localhost:5000

API Endpoints

Posts
Method	Endpoint	Description
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post by id
POST	/api/posts	Create a new post
PUT	/api/posts/:id	Update an existing post
DELETE	/api/posts/:id	Delete a post

Contact Messages
Method	Endpoint	Description
POST	/api/contact	Submit a contact message
GET	/api/contact	Get all messages (admin only)
Environment Variables
Create a .env file with the following variables:

DATABASE_URL="postgresql://<username>:<password>@localhost:5433/sohoza_db?schema=public"
PORT=5000
Replace <username> and <password> with your PostgreSQL credentials.

Folder Structure
backend/
├─ src/
│  ├─ lib/           # Prisma client setup
│  ├─ routes/        # API routes (posts, contact)
│  └─ server.ts      # Express server entry point
├─ prisma/
│  └─ schema.prisma  # Prisma schema
├─ generated/        # Prisma client output
├─ .env              # Environment variables
├─ package.json      # Node project config
Testing
Use Postman, Insomnia, or curl to test endpoints.

Example: Create a post via POST /api/posts with JSON body:

{
  "title": "My first blog",
  "description": "Short preview",
  "content": "This is the full content of the post.",
  "authorId": 1
}
Example: Submit a contact message via POST /api/contact:

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I love your blog."
}
Future Improvements
Add authentication (JWT) for user/admin roles

Add pagination for posts and messages

Add upload places for post images

Add comments CRUD endpoints

Add category management endpoints

