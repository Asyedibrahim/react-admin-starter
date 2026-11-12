# React Admin Dashboard Starter

A modern, responsive, and customizable admin dashboard starter built with **React, TypeScript, Tailwind CSS, Framer Motion, and Redux Toolkit**.

This project provides a reusable frontend foundation for building admin panels, management systems, and web applications. It includes authentication UI, protected route handling, reusable navigation components, responsive sidebars, and a clean light-themed interface.

## Features

- **Modern UI:** Clean, responsive, and light-themed design.
- **Authentication:** Login functionality with Redux state management.
- **Registration Navigation:** Configurable navigation to the registration page.
- **Protected Routes:** Private route handling for authenticated pages.
- **Responsive Sidebar:** Separate desktop and mobile navigation layouts.
- **Dynamic Header:** Automatically displays the current page title.
- **Custom Branding:** Configurable application name, logo, and navigation.
- **State Management:** Redux Toolkit with Redux Persist support.
- **API Integration:** Centralized Axios configuration.
- **Alert Dialogs:** Reusable confirmation dialogs.
- **Notifications:** Toast notifications using React Hot Toast.
- **Animations:** Smooth transitions using Framer Motion.
- **Icons:** React Icons integration.
- **TypeScript:** Type-safe components and application logic.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Router DOM | Routing |
| Redux Toolkit | State management |
| Redux Persist | Persistent Redux state |
| Axios | API requests |
| Framer Motion | Animations |
| React Hot Toast | Notifications |
| React Icons | Icons |

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Asyedibrahim/react-admin-starter.git
```

### 2. Navigate to the Project

```bash
cd react-admin-starter
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── AlertDialog.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   └── MobileSidebar.tsx
│
├── config/
│   └── axios.ts
│
├── context/
│   └── AlertProvider.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
│
├── redux/
│   ├── store.ts
│   └── user/
│       └── userSlice.ts
│
├── routing/
│   └── PrivateRoutes.tsx
│
├── App.tsx
├── index.css
└── main.tsx
```

## Customization

### 1. Application Name and Logo

The login component supports custom branding through props.

```tsx
<Login
    appName="My Admin"
    logo="/logo.png"
    redirectPath="/dashboard"
    registerPath="/register"
/>
```

| Prop | Description |
|---|---|
| `appName` | Application name |
| `logo` | Application logo path |
| `redirectPath` | Route after successful login |
| `registerPath` | Registration page route |

You can also customize the application name, logo, and navigation in the sidebar components.

### 2. Sidebar Navigation

Customize the sidebar by passing your own navigation configuration.

```tsx
import {
    FiGrid,
    FiUsers,
    FiSettings,
} from "react-icons/fi";

const navigation = [
    {
        title: "Main Menu",
        items: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: FiGrid,
            },
            {
                name: "Users",
                path: "/users",
                icon: FiUsers,
            },
            {
                name: "Settings",
                path: "/settings",
                icon: FiSettings,
            },
        ],
    },
];
```

Pass the configuration to the sidebar:

```tsx
<Sidebar
    appName="My Admin"
    logo="/logo.png"
    navigation={navigation}
/>
```

Use the same navigation configuration for the mobile sidebar to keep both menus synchronized.

### 3. API Configuration

This is a frontend-only starter template. It does not include a backend server or environment configuration.

To connect your own backend, update:

`src/config/axios.ts`

Example:

```typescript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

export default api;
```

Replace the `baseURL` with your own backend API URL.

#### Authentication API

The login component currently uses:

```http
POST /auth/login
```

Example request:

```json
{
    "email": "user@example.com",
    "password": "your-password"
}
```

The login component expects a response compatible with the Redux `signInSuccess` action.

You can modify the API endpoints, request data, and response handling according to your backend implementation.

**Note:** The frontend provides the authentication interface and Redux integration. Actual authentication requires your own backend API.

### 4. Routing

The project uses React Router DOM for navigation.

Example route configuration:

```tsx
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default AppRoutes;
```

Use the provided private route component to protect dashboard pages.

You can add, remove, or modify routes based on your application requirements.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint, if configured |

Check `package.json` for the scripts available in your project.

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files will be available in the `dist/` directory when using Vite.

You can deploy the production build to:

- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting provider

## Backend Integration

This repository includes both frontend and backend implementations.

The backend is built with Node.js, Express.js, and MongoDB. It provides API endpoints for authentication and other application features.

### Backend Environment Variables

Create a `.env` file in the backend root directory (the same level as `package.json`).

```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

| Variable | Description |
|---|---|
| `MONGO` | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |

### Backend Setup

1. Navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create the `.env` file and configure the required variables.
4. Start the backend server using the available npm script.

### Security

- Never commit your actual `.env` file.
- Add `.env` to `.gitignore`.
- Use `.env.example` with placeholder values to document required variables.
- Never expose database credentials or JWT secrets in frontend code.

## Contributing

Contributions are welcome!

If you would like to improve this project:

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Open a Pull Request.

---

**Built with React, TypeScript, Tailwind CSS, Framer Motion, and Redux Toolkit.**