# SOHOZA System API Reference

This document provides a list of all available API endpoints and instructions on how to test them using Postman.

## Base URL
`http://localhost:5000/api`

---

## 👥 Users
Endpoints for managing user accounts.

### Create User (Register)
- **POST** `/users`
- **Body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

### Login
- **POST** `/auth/login`
- **Body (JSON):**
```json
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

---

## 🏗️ Services
Endpoints for managing company services.

### Create Service
- **POST** `/services`
- **Body (JSON):**
```json
{
  "name": "Web Development",
  "description": "Full-stack development using modern technologies.",
  "features": ["React", "Node.js", "PostgreSQL"],
  "status": "active"
}
```

### Get All Services
- **GET** `/services`

---

## 🤝 Team Members
Endpoints for managing team members.

### Create Team Member
- **POST** `/team-members`
- **Body (JSON):**
```json
{
  "name": "John Doe",
  "role": "Senior Developer",
  "email": "john.doe@example.com",
  "bio": "Expert in TypeScript and Node.js",
  "status": "active"
}
```

---

## 📝 Posts
Endpoints for blog posts (Merged Feature).

### Create Post
- **POST** `/posts`
- **Body (JSON):**
```json
{
  "title": "Welcome to Sohoza",
  "content": "This is our first blog post after the system recovery!",
  "authorId": 1
}
```
*Note: Ensure an author with the given ID exists in the `user` table.*

### Get All Posts
- **GET** `/posts`

---

## 📧 Contact
Endpoints for contact messages (Merged Feature).

### Send Message
- **POST** `/contact`
- **Body (JSON):**
```json
{
  "name": "Inquirer",
  "email": "inquiry@example.com",
  "subject": "Service Inquiry",
  "message": "I would like to know more about your Cloud Services."
}
```

### Get All Messages
- **GET** `/contact`

---

## 🚀 Testing with Postman
1. **Method:** Select the HTTP method (GET, POST, etc.) corresponding to the endpoint.
2. **URL:** Enter the full URL (e.g., `http://localhost:5000/api/users`).
3. **Headers:** Set `Content-Type` to `application/json`.
4. **Body:** Select **raw** and **JSON** format, then paste the example JSON from above.
5. **Send:** Click the Send button and check the response.
