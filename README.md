# ✍️ MERN Blog App

A full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, create blog posts, edit their own blogs, delete blogs, and explore posts through a clean responsive interface.

## 🚀 Features

- User registration and login authentication
- JWT-based secure authentication
- Password hashing using bcrypt
- Create new blog posts
- View all blog posts
- Edit existing blogs
- Delete blogs
- Protected routes for authenticated users
- Responsive modern UI
- REST API integration
- State management
- Blog detail page
- Search and filtering (if implemented)

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Redux Toolkit (if used)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Tokens)
- bcryptjs

### Tools
- Git
- GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```bash
MERN-BLOG-APP/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreateBlog.jsx
│   │   │   ├── EditBlog.jsx
│   │   │   └── BlogDetails.jsx
│   │   │
│   │   ├── redux/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   │
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/mern-blog-app.git
```

### Move into Project

```bash
cd mern-blog-app
```

---

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the server folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogdb
JWT_SECRET=mysecretkey
PORT=5000
```

---

## ▶️ Run Project

### Start Backend

```bash
cd server
npm start
```

Backend runs at:

```bash
http://localhost:5000
```

---

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

---

### Blogs

```http
GET /api/blogs
GET /api/blogs/:id
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id
```

---

## Authentication Flow

- User registers with email and password
- Password is hashed using bcrypt before saving
- User logs in with credentials
- JWT token is generated
- Token stored in frontend
- Protected routes verify token
- Only authenticated users can create/edit/delete blogs

---

## Future Improvements

- Blog comments
- Like/unlike blogs
- Profile page
- Rich text editor
- Blog categories
- Search blogs
- Dark mode
- Image upload for blogs
- Pagination
- AI blog suggestions

---

---

## 👨‍💻 Author

**Akhilesh**

GitHub: https://github.com/Akhileh123x

---

## ⭐ Support

If you like this project, give it a star ⭐
