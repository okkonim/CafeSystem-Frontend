# Cafe Management System Frontend

A web client for cafe management: products, orders, users. Built with React + Redux Toolkit + TypeScript.
![image](https://github.com/okkonim/CafeSystem-Frontend/assets/113597041/2376f582-0aa0-4150-94ea-c93155b86e55)

---

##  Features
- User authentication and registration
- View, create, edit, and delete products
- View, create, edit, and delete orders
- User profile and password change
- Role-based access (admin/user)
- Modern UI, responsive design

---

##  Tech Stack
- **React 18**
- **Redux Toolkit** (auth, status)
- **TypeScript**
- **React Router v6**
- **Axios** (REST API)
- **Sass/SCSS** (custom styles)
- **Vite** (build tool)

---

##  Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/okkonim/CafeSystem-Frontend.git
   cd CafeSystem-Frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the project:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   [http://localhost:5173](http://localhost:5173)

> ⚠️ The backend is required: [CafeSystem (backend)](https://github.com/okkonim/CafeSystem)

---

##  Security
- The auth token is stored only in localStorage and is automatically removed on auth errors.
- No passwords or other sensitive data are stored on the client.
- All forms are validated on the client side.
- No personal data leaks in the code (all console.log with sensitive data have been removed).

---

##  Project Structure
```
CafeSystem-Frontend/
  ├── src/
  │   ├── api/         # Backend API requests
  │   ├── assets/      # Styles, images, fonts
  │   ├── components/  # UI components
  │   ├── pages/       # Application pages
  │   ├── store/       # Redux slices
  │   ├── utils/       # Validation and utilities
  │   └── types.ts     # Data types
  ├── public/
  ├── package.json
  └── ...
```

## 📄 License
MIT
