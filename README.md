# Cravings - Food Delivery Platform

A full-stack food delivery application built with React, Express, and MongoDB. The platform connects customers, restaurants, riders, and admins in a seamless food ordering ecosystem.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Available Features](#available-features)
3. [Tech Stack](#tech-stack)
4. [Missing/Required Features](#missingrequired-features)
5. [Installation & Setup](#installation--setup)
6. [API Endpoints](#api-endpoints)

---

## 🎯 Project Overview

**Cravings** is a comprehensive food delivery platform with role-based access and multi-user functionality:

- **Customer**: Browse restaurants, view menus, place orders, track delivery, manage profile
- **Restaurant Manager**: Manage menu items, view orders, track earnings, manage restaurant profile
- **Rider**: Accept delivery orders, track deliveries (structure in place)
- **Admin**: Manage the platform, view analytics, manage users (structure in place)

**Base URL**: `http://localhost:5000` (Backend) | `http://localhost:5173` (Frontend)

---

## ✨ Available Features

### 🔐 **Authentication & Authorization**

| Feature | Details | Status |
|---------|---------|--------|
| **User Registration** | Register as Customer, Restaurant Manager, Rider, or Admin with email/password | ✅ Working |
| **User Login** | Secure login with JWT token generation, cookies stored | ✅ Working |
| **User Logout** | Clear authentication token and session data | ✅ Working |
| **Forgot Password** | OTP-based password reset via email | ✅ Working |
| **OTP Generation** | Generate OTP and send via email for verification | ✅ Working |
| **OTP Verification** | Verify OTP before password reset | ✅ Working |
| **JWT Token Management** | Secure token generation and validation | ✅ Working |
| **Role-Based Access Control** | Middleware-based access control for user roles | ✅ Working |

**Endpoints**:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/logout` - Logout
- `POST /auth/genOtp` - Generate OTP
- `POST /auth/verifyOtp` - Verify OTP
- `POST /auth/forgetPasword` - Reset password

---

### 👤 **User/Customer Features**

| Feature | Details | Status |
|---------|---------|--------|
| **Profile Management** | Update personal information (name, email, phone, DOB, gender, address, city, PIN) | ✅ Working |
| **Profile Photo Upload** | Upload and change profile picture with Cloudinary integration | ✅ Working |
| **Password Reset** | Change password after login | ✅ Working |
| **Geolocation** | Store latitude/longitude for delivery tracking | ✅ Working |
| **Payment Details** | Store UPI, bank account, IFSC code | ✅ Working |
| **Document Management** | Support for PAN, GST, FSSAI, RC, DL, UIDAI documents | ✅ Working |
| **User Dashboard** | View profile, orders, transactions | ✅ UI Ready |
| **User Overview** | Quick stats and summary | ✅ UI Ready |
| **Order History** | View all past orders | ✅ UI Ready |
| **Transaction History** | View payment transactions | ✅ UI Ready |
| **Help/Support Desk** | Contact support via help desk interface | ✅ UI Ready |

**Endpoints**:
- `PUT /user/update` - Update user profile
- `PATCH /user/changePhoto` - Upload profile photo
- `PATCH /user/resetPassword` - Change password

---

### 🍽️ **Restaurant Manager Features**

| Feature | Details | Status |
|---------|---------|--------|
| **Menu Management** | Add, edit, view, and manage menu items | ✅ Working |
| **Menu Item Creation** | Add new menu items with images, price, type (veg/non-veg), details | ✅ Working |
| **Menu Item Editing** | Update existing menu items with new images and details | ✅ Working |
| **Menu Item View** | Browse all menu items for the restaurant | ✅ Working |
| **Item Availability** | Mark items as available/unavailable/removed | ✅ Working |
| **Multiple Food Types** | Support: Veg, Non-Veg, Vegan, Egg, Jain, Gluten-Free, Contains-Nuts, Dairy | ✅ Working |
| **Image Upload** | Upload up to 5 images per menu item via Cloudinary | ✅ Working |
| **Restaurant Profile** | Manage restaurant details (name, cuisine, opening hours, location) | ✅ Working |
| **Password Reset** | Change restaurant manager password | ✅ Working |
| **Profile Photo** | Upload restaurant profile picture | ✅ Working |
| **Restaurant Dashboard** | View all dashboard components | ✅ UI Ready |
| **Orders Management** | View and manage incoming orders | ✅ UI Ready |
| **Earnings Tracking** | Track daily/weekly/monthly earnings | ✅ UI Ready |
| **Help Desk** | Customer support interface | ✅ UI Ready |

**Endpoints**:
- `POST /restaurant/addMenuItem` - Add new menu item
- `GET /restaurant/menuItems` - Get all menu items
- `PUT /restaurant/updateMenuItem/:id` - Update menu item
- `PUT /restaurant/update` - Update restaurant profile
- `PATCH /restaurant/changePhoto` - Upload restaurant photo
- `PATCH /restaurant/resetPassword` - Change password

---

### 🌐 **Public/Guest Features**

| Feature | Details | Status |
|---------|---------|--------|
| **Browse Restaurants** | View all available restaurants without login | ✅ Working |
| **View Restaurant Menu** | Browse menu items with pagination (2 items per page) | ✅ Working |
| **Contact Support** | Submit contact form with name, email, phone, message | ✅ Working |
| **Restaurant Display** | View restaurant details and menu items | ✅ UI Ready |
| **Search Restaurants** | Filter by cuisine or restaurant name | ✅ UI Ready |

**Endpoints**:
- `GET /public/allRestaurants` - Get all restaurants
- `GET /public/restaurant-menu/:id/:page` - Get restaurant menu with pagination
- `POST /public/new-contact` - Submit contact form

---

### 🛣️ **Rider Features (Structure in Place)**

| Feature | Details | Status |
|---------|---------|--------|
| **Rider Dashboard** | View assigned deliveries | ✅ UI Ready |
| **Delivery Tracking** | Track delivery orders in real-time | ⏳ Backend Incomplete |
| **Order Acceptance** | Accept/reject delivery orders | ⏳ Backend Incomplete |

---

### 👨‍💼 **Admin Features (Structure in Place)**

| Feature | Details | Status |
|---------|---------|--------|
| **Admin Dashboard** | Overview of platform statistics | ✅ UI Ready |
| **User Management** | View and manage all users | ⏳ Backend Incomplete |
| **Order Management** | View all orders on platform | ⏳ Backend Incomplete |
| **Analytics** | View platform analytics and reports | ⏳ Backend Incomplete |

---

### 🎨 **Frontend Pages**

| Page | Purpose | Status |
|------|---------|--------|
| **Home** | Landing page with featured restaurants and popular dishes | ✅ Ready |
| **About** | About the platform | ✅ Ready |
| **Contact** | Contact form | ✅ Ready |
| **Login** | User login page | ✅ Ready |
| **Register** | User registration page | ✅ Ready |
| **OrderNow** | Browse and filter restaurants/menus | ✅ Ready |
| **RestaurantDisplayMenu** | View restaurant menu in detail | ✅ Ready |
| **UserDashboard** | Customer dashboard with multiple tabs | ✅ Ready |
| **RestaurantDashboard** | Restaurant manager dashboard | ✅ Ready |
| **RiderDashboard** | Rider dashboard (UI only) | ✅ Ready |
| **AdminDashboard** | Admin panel (UI only) | ✅ Ready |
| **NotFound** | 404 error page | ✅ Ready |

---

### 🛠️ **Technical Features**

| Feature | Details | Status |
|---------|---------|--------|
| **Database** | MongoDB with Mongoose ORM | ✅ Working |
| **Authentication** | JWT-based with HTTP-only cookies | ✅ Working |
| **Password Security** | BCrypt hashing with salt rounds (10) | ✅ Working |
| **Email Service** | Nodemailer integration for OTP and notifications | ✅ Working |
| **Image Upload** | Cloudinary integration for image storage | ✅ Working |
| **Form Validation** | Server-side validation for all inputs | ✅ Working |
| **Error Handling** | Centralized error handling middleware | ✅ Working |
| **CORS** | Cross-origin request handling | ✅ Working |
| **Request Logging** | Morgan HTTP request logging | ✅ Working |
| **State Management** | React Context API for auth state | ✅ Working |
| **Routing** | React Router v7 for frontend navigation | ✅ Working |
| **Notifications** | React Hot Toast for user feedback | ✅ Working |
| **Styling** | Tailwind CSS framework | ✅ Working |
| **Icons** | React Icons library | ✅ Working |

---

## 📦 Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool
- **React Router DOM 7.12.0** - Routing
- **Tailwind CSS 4.1.18** - Styling
- **Axios 1.13.2** - HTTP client
- **React Hot Toast 2.6.0** - Notifications
- **React Icons 5.5.0** - Icon library
- **ESLint** - Code linting

### Backend
- **Express 5.2.1** - Web framework
- **MongoDB with Mongoose 9.1.2** - Database
- **JWT** - Authentication
- **BCrypt 6.0.0** - Password hashing
- **Cloudinary 2.9.0** - Image storage
- **Nodemailer 7.0.13** - Email service
- **Multer 2.0.2** - File upload
- **Morgan 1.10.1** - HTTP logging
- **Cookie Parser 1.4.7** - Cookie handling
- **CORS 2.8.5** - Cross-origin handling
- **Dotenv 17.2.3** - Environment variables
- **Nodemon 3.1.11** (Dev) - Auto-reload

---

## ⚠️ Missing/Required Features

The following features are **essential for a complete food delivery platform** but are currently **NOT implemented**:

### 🛒 **Order Management System** (CRITICAL)
- [ ] **Order Model**: Schema for storing order details (items, quantity, total, status)
- [ ] **Create Order**: API to create new orders from cart
- [ ] **Order Tracking**: View order status (placed, confirmed, preparing, on-way, delivered)
- [ ] **Order History**: Retrieve user's past orders with details
- [ ] **Order Updates**: Update order status at different stages
- [ ] **Order Cancellation**: Allow cancellation with refund logic
- [ ] **Order Notifications**: Notify users of status changes
- [ ] **Restaurant Order Queue**: View incoming orders for restaurants

### 💳 **Payment Processing** (CRITICAL)
- [ ] **Payment Gateway Integration**: Stripe, Razorpay, or PayPal integration
- [ ] **Payment Methods**: Support multiple payment types (card, UPI, wallet)
- [ ] **Transaction Recording**: Store all transaction records
- [ ] **Refund Process**: Handle refunds for cancelled orders
- [ ] **Invoice Generation**: Generate invoices for orders

### 🚚 **Rider/Delivery Management** (CRITICAL)
- [ ] **Rider Onboarding**: Complete rider registration workflow
- [ ] **Order Assignment**: Auto-assign orders to nearby riders
- [ ] **Real-time Tracking**: Live GPS tracking of deliveries
- [ ] **Delivery Status**: Update delivery status (assigned, picked-up, delivered)
- [ ] **Rider Rating**: Rate riders on delivery quality
- [ ] **Delivery Analytics**: Track delivery performance metrics

### ⭐ **Ratings & Reviews** (HIGH PRIORITY)
- [ ] **Restaurant Rating**: Rate restaurants (1-5 stars)
- [ ] **Food Reviews**: Write reviews for menu items
- [ ] **Rider Rating**: Rate rider performance
- [ ] **Review Display**: Show ratings and reviews on restaurant/menu pages
- [ ] **Average Rating Calculation**: Display avg rating for restaurants

### 🔍 **Search & Filter** (HIGH PRIORITY)
- [ ] **Restaurant Search**: Search by name, cuisine, location
- [ ] **Menu Search**: Search menu items by name
- [ ] **Filters**: Filter by rating, delivery time, price range, cuisine type
- [ ] **Sorting**: Sort by rating, price, delivery time
- [ ] **Pagination**: Implement proper pagination for results

### ❤️ **Wishlist/Favorites** (MEDIUM PRIORITY)
- [ ] **Save Favorites**: Save favorite restaurants/dishes
- [ ] **View Wishlist**: Display saved items with quick access
- [ ] **Remove from Wishlist**: Remove items from saved list

### 📍 **Address Management** (HIGH PRIORITY)
- [ ] **Multiple Addresses**: Save multiple delivery addresses
- [ ] **Primary Address**: Set default delivery address
- [ ] **Address Validation**: Verify delivery address for coverage area
- [ ] **Location Suggestions**: Auto-complete address suggestions

### 💰 **Promo Codes & Discounts** (MEDIUM PRIORITY)
- [ ] **Promo Code System**: Create and manage promotional codes
- [ ] **Discount Application**: Apply discounts to orders
- [ ] **Coupon Management**: Track coupon usage and validity
- [ ] **Restaurant Discounts**: Special offers from restaurants

### 🔔 **Notifications** (HIGH PRIORITY)
- [ ] **Real-time Notifications**: WebSocket for instant updates
- [ ] **Email Notifications**: Send order updates via email
- [ ] **SMS Notifications**: Send updates via SMS (Twilio/AWS)
- [ ] **In-app Notifications**: Display notifications in app

### 📊 **Analytics & Reporting** (MEDIUM PRIORITY)
- [ ] **Admin Dashboard Stats**: Total orders, revenue, users, restaurants
- [ ] **Restaurant Analytics**: Daily/weekly/monthly earnings, top items
- [ ] **User Behavior Analytics**: Tracking popular restaurants/dishes
- [ ] **Reports Generation**: Download reports in PDF/CSV

### 👨‍💼 **Admin Panel** (MEDIUM PRIORITY)
- [ ] **User Management**: View, edit, suspend users
- [ ] **Restaurant Verification**: Approve/reject new restaurants
- [ ] **Order Monitoring**: Monitor all orders on platform
- [ ] **Support Tickets**: Manage customer support requests
- [ ] **System Settings**: Configure platform settings

### 🎯 **Cart System** (CRITICAL)
- [ ] **Add to Cart**: Add items with quantity
- [ ] **Update Cart**: Modify item quantities
- [ ] **Remove from Cart**: Delete items from cart
- [ ] **Cart Persistence**: Save cart across sessions
- [ ] **Cart Summary**: Display total items and price

### 📱 **Push Notifications** (LOW PRIORITY)
- [ ] **Browser Push**: Browser push notifications
- [ ] **Mobile Push**: Mobile app push notifications (if mobile app exists)

### 🔐 **Two-Factor Authentication** (LOW PRIORITY)
- [ ] **2FA Setup**: Enable two-factor authentication
- [ ] **TOTP Support**: Time-based one-time password
- [ ] **Backup Codes**: Generate backup codes

### 📲 **SMS Integration** (LOW PRIORITY)
- [ ] **OTP via SMS**: Send OTP through SMS instead of email
- [ ] **Order Updates via SMS**: Send order status via SMS

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB instance running
- Cloudinary account (for image upload)
- Email service credentials (Nodemailer)

### Backend Setup

```bash
cd server
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`
Backend will be available at `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication Routes (`/auth`)
```
POST   /auth/register          - Register new user
POST   /auth/login             - Login user
GET    /auth/logout            - Logout user
POST   /auth/genOtp            - Generate OTP
POST   /auth/verifyOtp         - Verify OTP
POST   /auth/forgetPasword     - Reset password
```

### Public Routes (`/public`)
```
GET    /public/allRestaurants              - Get all restaurants
GET    /public/restaurant-menu/:id/:page   - Get restaurant menu
POST   /public/new-contact                 - Submit contact form
```

### User Routes (`/user`)
```
PUT    /user/update                    - Update user profile
PATCH  /user/changePhoto               - Upload profile photo
PATCH  /user/resetPassword             - Change password
```

### Restaurant Routes (`/restaurant`)
```
POST   /restaurant/addMenuItem              - Add menu item
GET    /restaurant/menuItems                - Get all menu items
PUT    /restaurant/updateMenuItem/:id       - Update menu item
PUT    /restaurant/update                   - Update restaurant profile
PATCH  /restaurant/changePhoto              - Upload restaurant photo
PATCH  /restaurant/resetPassword            - Change password
```

---

## 📋 Database Models

### User Model
- fullName, email, mobileNumber, password, role
- dob, gender, address, city, pin, photo
- geoLocation (lat, lon)
- restaurantName, cuisine (for restaurant managers)
- paymentDetails (upi, account_number, ifs_Code)
- documents (gst, fssai, rc, dl, uidai, pan)

### Menu Model
- resturantID, itemName, cuisine
- type (veg/non-veg/vegan/egg/jain/gluten-free/contains-nuts/dairy)
- servingSize, preparationTime, description, price
- availability (available/unavailable/removed)
- images (url, publicID)

### Contact Model
- fullName, email, mobileNumber, message
- timestamps

### OTP Model
- For OTP generation and verification during password reset

---

## 🎨 Project Structure

```
Cravings/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── userDashboard/       # User dashboard components
│   │   │   ├── restaurantDashboard/ # Restaurant dashboard components
│   │   │   ├── publicModals/        # Public modals
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loading.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── dashboards/          # Dashboard pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ...
│   │   ├── config/                  # Configuration
│   │   ├── context/                 # React Context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   ├── db.js                # MongoDB connection
│   │   │   ├── cloudinary.js        # Cloudinary setup
│   │   │   └── email.js             # Email configuration
│   │   ├── controllers/             # Route handlers
│   │   ├── middlewares/             # Custom middlewares
│   │   ├── models/                  # MongoDB schemas
│   │   ├── routers/                 # API routes
│   │   ├── utils/                   # Utility functions
│   │   └── seeders/                 # Database seeders
│   ├── index.js                     # Entry point
│   └── package.json
│
└── README.md                        # This file
```

---

## 🤝 Contributing

To implement missing features, follow these steps:

1. Create a new branch for your feature
2. Implement the feature with proper validation
3. Add comprehensive error handling
4. Test thoroughly before submitting
5. Update this README with new features

---

## 📝 License

ISC License - Free to use

---

## 👨‍💻 Author

Created by Raj Vardhan

---

## 📞 Support

For issues, questions, or feature requests, please contact through the platform's help desk or contact form.

---

**Last Updated**: February 12, 2026
**Version**: 1.0.0 (Features Documented)

---

### Summary of Implementation Status

| Category | Total Features | Implemented | Missing | Status |
|----------|---|---|---| --- |
| Authentication | 8 | 8 | 0 | ✅ Complete |
| User Management | 10 | 10 | 0 | ✅ Complete |
| Restaurant Management | 13 | 13 | 0 | ✅ Complete |
| Public Features | 5 | 5 | 0 | ✅ Complete |
| Order Management | 8 | 0 | 8 | ⏳ NOT STARTED |
| Payment Processing | 5 | 0 | 5 | ⏳ NOT STARTED |
| Delivery/Rider | 6 | 0 | 6 | ⏳ NOT STARTED |
| Ratings & Reviews | 5 | 0 | 5 | ⏳ NOT STARTED |
| Search & Filter | 4 | 0 | 4 | ⏳ NOT STARTED |
| Cart System | 5 | 0 | 5 | ⏳ NOT STARTED |
| | **69** | **42** | **27** | **61% Complete** |