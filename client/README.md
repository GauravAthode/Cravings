# Cravings - Client

A modern React + Vite web application for a food delivery platform. This client provides user interfaces for customers, restaurant owners, riders, and administrators.

## Overview

The Cravings client is a full-featured food delivery application built with React and Vite. It includes dashboards for different user roles (customer, restaurant, rider, admin), authentication, and a responsive UI powered by Tailwind CSS.

## Tech Stack

- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **React Router** 7.12.0 - Client-side routing
- **Axios** 1.13.2 - HTTP client
- **React Hot Toast** 2.6.0 - Toast notifications
- **React Icons** 5.5.0 - Icon library
- **ESLint** 9.39.1 - Code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Loading.jsx
│   ├── publicModals/    # Public user modals
│   ├── restaurantDashboard/  # Restaurant-specific components
│   ├── userDashboard/   # Customer-specific components
│   └── modals/          # Modal components
├── pages/               # Page components (routes)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── OrderNow.jsx
│   ├── Contact.jsx
│   ├── About.jsx
│   ├── RestaurantDisplayMenu.jsx
│   ├── dashboards/      # Dashboard pages for different roles
│   │   ├── AdminDashboard.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── ResturantDashboard.jsx
│   │   └── RiderDashboard.jsx
│   └── NotFound.jsx
├── context/             # React Context (Auth state management)
│   └── AuthContext.jsx
├── config/              # Configuration
│   └── Api.jsx          # API client setup
├── assets/              # Static assets
└── main.jsx             # Application entry point
```

## Features

### User Roles
- **Customers** - Browse restaurants, place orders, track delivery
- **Restaurants** - Manage menu, view orders, track earnings
- **Riders** - Accept orders, track deliveries
- **Admins** - System management and oversight

### Core Functionality
- User authentication and authorization
- Restaurant browsing and menu display
- Order placement and tracking
- Payment processing integration
- Real-time order status updates
- User profile management
- Help/support system

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client root with API configuration:
```
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```
VITE_API_URL=<backend_api_url>
VITE_APP_NAME=Cravings
```

## API Integration

The application communicates with the backend API through [src/config/Api.jsx](src/config/Api.jsx). Axios is configured with base URL from environment variables.

## Authentication

Authentication state is managed through [src/context/AuthContext.jsx](src/context/AuthContext.jsx) using React Context API. The context provides:
- User login/logout
- Token management
- User role-based access control

## Styling

The project uses **Tailwind CSS** for styling. Configuration can be found in `tailwind.config.js`.

## Key Components

- **Header** - Navigation and user menu
- **Footer** - Footer content
- **Loading** - Loading indicator
- **Modals** - Modal dialogs for forms and confirmations
- **Dashboards** - Role-specific dashboard layouts

## Common Tasks

### Adding a New Page
1. Create a new file in `src/pages/`
2. Define the page component
3. Add the route in your main routing configuration

### Adding a New Component
1. Create the component in `src/components/`
2. Export it for use in pages

### Modifying Styles
Edit Tailwind classes directly in components or create custom CSS in `src/index.css`.

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port.

### Module Not Found Errors
Clear `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

### API Connection Issues
Verify `VITE_API_URL` in your `.env` file matches your backend server URL.

## Contributing

Follow the ESLint rules configured in `eslint.config.js` when adding new code.

## License

Part of the Cravings Food Delivery Platform