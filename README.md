# React Admin Dashboard Starter

A modern, responsive, and customizable admin dashboard starter built with **React, TypeScript, Tailwind CSS, Framer motion and Redux Toolkit**.

This project provides a reusable foundation for building admin panels and management systems. It includes authentication, protected layouts, reusable navigation components, responsive sidebars, and a clean light-themed interface.

## Features

- **Modern UI:** Clean and responsive light-themed design.
- **Authentication:** Login functionality with Redux state management.
- **Registration Navigation:** Configurable registration page navigation.
- **Protected Routes:** Support for authenticated dashboard pages.
- **Responsive Sidebar:** Separate desktop and mobile navigation layouts.
- **Dynamic Header:** Page title based on the current route.
- **Custom Branding:** Configure application name, logo, and navigation.
- **State Management:** Redux Toolkit with Redux Persist support.
- **API Integration:** Centralized Axios configuration.
- **Notifications:** Toast notifications using React Hot Toast.
- **Animations:** Smooth transitions using Framer Motion.
- **Icons:** React Icons integration.
- **TypeScript:** Type-safe components and application logic.

## Tech Stack

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| React            | Frontend library       |
| TypeScript       | Type safety            |
| Tailwind CSS     | Styling                |
| React Router DOM | Routing                |
| Redux Toolkit    | State management       |
| Redux Persist    | Persistent Redux state |
| Axios            | API requests           |
| Framer Motion    | Animations             |
| React Hot Toast  | Notifications          |
| React Icons      | Icons                  |

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Navigate to the Project

```bash
cd YOUR_REPOSITORY
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000/api
```

Replace the URL with your backend API URL.

Make sure your Axios configuration uses the environment variable:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Project Structure

The following is a suggested structure for organizing the project:

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

Your actual project structure may differ depending on your implementation.

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

| Prop           | Description                  |
| -------------- | ---------------------------- |
| `appName`      | Application name             |
| `logo`         | Application logo path        |
| `redirectPath` | Route after successful login |
| `registerPath` | Registration page route      |

### 2. Sidebar Navigation

You can customize the sidebar navigation by passing your own navigation configuration.

Example:

```tsx
const navigation = [
  {
    title: "Main Menu",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: DashboardIcon,
      },
      {
        name: "Users",
        path: "/users",
        icon: UsersIcon,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: SettingsIcon,
      },
    ],
  },
];
```

Pass the configuration to the sidebar:

```tsx
<Sidebar appName="My Admin" logo="/logo.png" navigation={navigation} />
```

Use the same navigation configuration for the mobile sidebar to keep both menus synchronized.

### 3. API Configuration

Configure your backend URL through the `.env` file.

Authentication requests use the following endpoint:

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

The login component expects a response compatible with your Redux `signInSuccess` action.

Adapt the API endpoint and response handling to match your backend implementation.

### 4. Routing

Configure your application routes using React Router.

Example:

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

Add your protected route logic to prevent unauthorized access to dashboard pages.

## Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build the production application |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint, if configured        |

Check your `package.json` for the scripts available in your project.

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files will be available in the `dist/` directory when using Vite.

You can deploy the `dist/` folder to services such as:

- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting provider

## Backend Requirements

This is a frontend starter template. It does not include a backend implementation.

To enable authentication and dynamic data, connect your own backend API.

You will need to implement:

- User registration
- User login
- User logout
- Authentication and authorization
- Protected API endpoints
- User profile management

## Contributing

Contributions are welcome!

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Open a Pull Request.

---

**Built with React, TypeScript, Tailwind CSS and Framer motion.**