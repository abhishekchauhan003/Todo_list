# 📝 Smart Todo Manager

A Full Stack Productivity Application built using React.js, Node.js, Express.js, and MongoDB. This application helps users manage daily tasks efficiently with additional productivity tools like Stopwatch, Alarm, and Notes.

---

## 🚀 Features

### ✅ Todo Management
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- View all tasks

### ⏰ Alarm Feature
- Create custom alarms
- Delete alarms
- Real-time alarm notifications

### 📝 Notes Feature
- Create personal notes
- Update notes anytime
- Data stored permanently in MongoDB

### ⏱️ Stopwatch
- Start stopwatch
- Pause stopwatch
- Reset stopwatch
- Accurate time tracking

### 🎨 User Interface
- Responsive Design
- Clean and Modern UI
- Fast User Experience
- Mobile Friendly

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
Todo_list/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/abhishekchauhan003/Todo_list.git
cd Todo_list
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run Backend Server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 Local URLs

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:5000
```

---

## 📡 API Endpoints

### Todo APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

### Alarm APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/alarms | Get alarms |
| POST | /api/alarms | Create alarm |
| DELETE | /api/alarms/:id | Delete alarm |

### Notes APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/note | Get note |
| PUT | /api/note | Update note |

---

## 🌟 Highlights

- Full Stack MERN Application
- REST API Integration
- MongoDB Database Storage
- Responsive UI
- Alarm Functionality
- Stopwatch Functionality
- Notes Management
- CRUD Operations

---

## 🚀 Future Enhancements

- JWT Authentication
- User Login & Signup
- Task Categories
- Search Functionality
- Task Filtering
- Dark Mode
- Due Dates & Reminders
- Drag & Drop Tasks

---

## 👨‍💻 Author

### Abhishek Chauhan

📧 Email: abhishekchauhan636173@gmail.com

💻 GitHub: https://github.com/abhishekchauhan003

🔗 LinkedIn: Add Your LinkedIn Profile

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
