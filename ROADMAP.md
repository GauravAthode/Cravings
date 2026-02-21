
# Cravings — Development Roadmap

> **Start Date**: February 19, 2026
> **Daily Commitment**: 3 Hours / Day
> **Estimated Deadline**: March 4, 2026 (14 Days)
> **Buffer Day**: March 5, 2026

---

## Current Codebase Status (After Full Code Review)

### DONE — No Work Needed

| Module | Files | Status |
|--------|-------|--------|
| Auth (Register/Login/Logout/OTP/Forgot Password) | `authController.js`, `authRouter.js` | ✅ Complete |
| JWT Cookie Auth + Role Middlewares | `authMiddleware.js` (Protect, ManagerProtect, CustomerProtect, PartnerProtect, AdminProtect, OtpProtect) | ✅ Complete |
| User Profile (Update/Photo/Password) | `userController.js`, `userRouter.js` | ✅ Complete |
| Restaurant Profile (Update/Photo/Password) | `restaurantController.js`, `restaurantRouter.js` | ✅ Complete |
| Restaurant Menu CRUD (Add/Edit/Get) | `restaurantController.js` | ✅ Complete |
| Public APIs (Restaurants List/Menu/Contact) | `publicControlller.js`, `publicRouter.js` | ✅ Complete |
| Cloudinary Image Uploads | `cloudinary.js`, `imageUploader.js` | ✅ Complete |
| Email Service (OTP Emails) | `email.js`, `emailService.js` | ✅ Complete |
| All DB Models (User/Menu/Contact/OTP) | `models/` folder | ✅ Complete |
| All Frontend Pages (Home/About/Contact/Login/Register/OrderNow) | `pages/` folder | ✅ Complete |
| Cart (localStorage) + Checkout Page UI | `RestaurantDisplayMenu.jsx`, `CheckoutPage.jsx` | ✅ UI Done |
| User Dashboard Shell + Profile/Sidebar | `UserDashboard.jsx`, `UserProfile.jsx`, `UserSideBar.jsx` | ✅ Complete |
| Restaurant Dashboard Shell + Profile/Menu/Sidebar | `ResturantDashboard.jsx`, `RestaurantProfile.jsx`, `RestaurantMenu.jsx`, `RestaurantSideBar.jsx` | ✅ Complete |

### PENDING — Needs to Be Built

| Priority | What | Current State |
|----------|------|---------------|
| 🔴 P0 | Order Model (Schema) | File does not exist |
| 🔴 P0 | Order Controller + Router | File does not exist |
| 🔴 P0 | Checkout → Create Order API call | `handlePlaceOrder()` only shows a toast, no API call |
| 🔴 P0 | Customer Order History UI | `UserOrders.jsx` = empty `<div>UserOrders</div>` |
| 🔴 P0 | Restaurant Incoming Orders UI | `RestaurantOrders.jsx` = placeholder text only |
| 🟠 P1 | Rider Controller + Router | File does not exist |
| 🟠 P1 | Rider Dashboard + Components | `RiderDashboard.jsx` = empty `<div>RiderDashboard</div>` |
| 🟠 P1 | Payment Gateway (Razorpay) | No integration — checkout just shows toast |
| 🟡 P2 | Search & Filter on OrderNow | No search bar, no filters — just lists all restaurants |
| 🟡 P2 | User Overview | `UserOverview.jsx` = empty fragment |
| 🟡 P2 | User Transactions | `UserTransactions.jsx` = empty `<div>` |
| 🟡 P2 | Restaurant Overview (Real Data) | `RestaurantOverview.jsx` = hardcoded zeros |
| 🟡 P2 | Restaurant Earnings (Real Data) | `RestaurantEarnings.jsx` = placeholder |
| 🟢 P3 | HelpDesk Forms (User + Restaurant) | Both are empty/placeholder |
| 🟢 P3 | Admin Dashboard | `AdminDashboard.jsx` = empty `<div>` |

---

## 14-Day Plan (3 Hours/Day)

---

### DAY 1 — Feb 19 (Wed) — Order Model + Order Controller

**Session Goal**: Create the Order schema and all backend controller functions.

#### Hour 1: Order Model

**Topics**: Mongoose Schema with nested objects, ObjectId references, enums

**File to Create**: `server/src/models/orderModel.js`

```
Order Schema:
│
├── customerID         → ObjectId ref "User" (required)
├── restaurantID       → ObjectId ref "User" (required)
├── riderID            → ObjectId ref "User" (default: null)
│
├── items[ ]           → Array of objects:
│   ├── menuItemID     → ObjectId ref "Menu"
│   ├── itemName       → String
│   ├── price          → Number
│   ├── quantity       → Number
│   └── image          → String (url)
│
├── deliveryAddress    → Object:
│   ├── address        → String
│   ├── city           → String
│   ├── pin            → String
│   └── geoLocation    → { lat: String, lon: String }
│
├── pricing            → Object:
│   ├── subtotal       → Number
│   ├── tax            → Number
│   ├── deliveryCharge → Number
│   └── total          → Number
│
├── paymentMethod      → enum ["credit-card", "upi", "wallet", "cod"]
├── paymentStatus      → enum ["pending", "paid", "failed", "refunded"]
├── paymentID          → String (Razorpay ID, default: null)
│
├── orderStatus        → enum ["placed", "confirmed", "preparing",
│                               "ready", "on-way", "delivered", "cancelled"]
│
└── timestamps         → createdAt, updatedAt (auto)
```

**Checklist**:
- [ ] Create `server/src/models/orderModel.js`
- [ ] Define all fields with proper types, enums, defaults, refs
- [ ] Export the model

#### Hour 2–3: Order Controller

**Topics**: Express async controllers, Mongoose CRUD, populate, error handling

**File to Create**: `server/src/controllers/orderController.js`

| Function | Purpose |
|----------|---------|
| `createOrder` | Customer places order from cart — validates items, builds pricing, saves to DB |
| `getCustomerOrders` | Returns all orders for logged-in customer (sorted newest first, populated) |
| `getRestaurantOrders` | Returns all orders for logged-in restaurant manager |
| `getSingleOrder` | Returns one order by ID (with full populate) |
| `updateOrderStatus` | Restaurant updates order status (confirm → prepare → ready) |
| `cancelOrder` | Customer cancels — only allowed if status is "placed" |

**Checklist**:
- [ ] Create `server/src/controllers/orderController.js`
- [ ] `createOrder` — accept items array, delivery address, payment method; calculate pricing; save
- [ ] `getCustomerOrders` — `Order.find({ customerID }).sort({ createdAt: -1 }).populate("restaurantID")`
- [ ] `getRestaurantOrders` — `Order.find({ restaurantID }).sort({ createdAt: -1 }).populate("customerID")`
- [ ] `getSingleOrder` — `Order.findById(id).populate("customerID restaurantID riderID")`
- [ ] `updateOrderStatus` — validate allowed transitions, save new status
- [ ] `cancelOrder` — check `orderStatus === "placed"` before allowing cancel

---

### DAY 2 — Feb 20 (Thu) — Order Router + Wire to Server + Test APIs

**Session Goal**: Create the router, register it, and verify all endpoints work with Postman.

#### Hour 1: Order Router

**Topics**: Express Router, middleware chaining

**File to Create**: `server/src/routers/orderRouter.js`

```
POST   /order/create              → Protect, CustomerProtect  → createOrder
GET    /order/my-orders           → Protect, CustomerProtect  → getCustomerOrders
GET    /order/:id                 → Protect                   → getSingleOrder
PATCH  /order/cancel/:id          → Protect, CustomerProtect  → cancelOrder
GET    /order/restaurant-orders   → Protect, ManagerProtect   → getRestaurantOrders
PATCH  /order/update-status/:id   → Protect, ManagerProtect   → updateOrderStatus
```

**File to Update**: `server/index.js`
- Import `OrderRouter`
- Add `app.use("/order", OrderRouter)`

**Checklist**:
- [ ] Create `server/src/routers/orderRouter.js` with all 6 routes
- [ ] Update `server/index.js` to register the order router
- [ ] Verify server starts without errors

#### Hour 2–3: API Testing with Postman/Thunder Client

**Test each endpoint**:

| # | Test | Method | URL | Body/Notes |
|---|------|--------|-----|------------|
| 1 | Login as customer | POST | `/auth/login` | Get cookie |
| 2 | Create order | POST | `/order/create` | Send items, address, payment |
| 3 | Get my orders | GET | `/order/my-orders` | Should return the order |
| 4 | Get single order | GET | `/order/:id` | Should return populated order |
| 5 | Cancel order | PATCH | `/order/cancel/:id` | Status should become "cancelled" |
| 6 | Create another order | POST | `/order/create` | For restaurant testing |
| 7 | Login as manager | POST | `/auth/login` | Switch user |
| 8 | Get restaurant orders | GET | `/order/restaurant-orders` | Should show the order |
| 9 | Update status to confirmed | PATCH | `/order/update-status/:id` | `{ orderStatus: "confirmed" }` |
| 10 | Update status to preparing | PATCH | `/order/update-status/:id` | `{ orderStatus: "preparing" }` |

**Checklist**:
- [ ] Test all 6 endpoints
- [ ] Fix any bugs found
- [ ] Verify populate works correctly
- [ ] Verify status transitions are validated

---

### DAY 3 — Feb 21 (Fri) — Connect Checkout Page + Customer Order History

**Session Goal**: Customer can place real orders and see them in their dashboard.

#### Hour 1: Update CheckoutPage.jsx

**Topics**: Axios POST request, building request payload, handling API responses

**File to Update**: `client/src/pages/CheckoutPage.jsx`

**Changes to `handlePlaceOrder()`**:
```
Current Flow (broken):
  → toast.success("Order placed successfully!")
  → remove cart
  → navigate

New Flow:
  1. Build payload:
     {
       items: cart.cartItem.map(item => ({
         menuItemID: item._id,
         itemName: item.itemName,
         price: item.price,
         quantity: item.quantity,
         image: item.images?.[0]?.url
       })),
       restaurantID: cart.resturantID,
       deliveryAddress: {
         address: user.address,
         city: user.city,
         pin: user.pin,
         geoLocation: user.geoLocation
       },
       pricing: { subtotal, tax, deliveryCharge: DELIVERY_CHARGE, total },
       paymentMethod: paymentMethod
     }
  2. POST /order/create with payload
  3. On success → clear cart → toast → navigate to user-dashboard orders
  4. On error → toast error message
```

**Checklist**:
- [ ] Update `handlePlaceOrder()` to call `api.post("/order/create", payload)`
- [ ] Build payload object from cart state + user info
- [ ] Handle success (clear localStorage, toast, navigate)
- [ ] Handle error (toast server error message)
- [ ] Test: Add to cart → Checkout → Place Order → Verify order in DB

#### Hour 2–3: Customer Order History UI

**Topics**: useEffect data fetching, status badge rendering, conditional buttons

**File to Update**: `client/src/components/userDashboard/UserOrders.jsx`

```
UserOrders Component Structure:
│
├── useEffect → fetch GET /order/my-orders on mount
├── Loading state (show <Loading /> component)
├── Empty state ("You haven't placed any orders yet")
│
├── Order Cards List (map over orders):
│   ├── Order ID (last 8 chars of _id)
│   ├── Restaurant name (from populated restaurantID)
│   ├── Items: "Item1 × 2, Item2 × 1"
│   ├── Total: ₹{pricing.total}
│   ├── Status Badge (color-coded):
│   │   ├── placed     → bg-yellow-100 text-yellow-800
│   │   ├── confirmed  → bg-blue-100 text-blue-800
│   │   ├── preparing  → bg-orange-100 text-orange-800
│   │   ├── ready      → bg-indigo-100 text-indigo-800
│   │   ├── on-way     → bg-purple-100 text-purple-800
│   │   ├── delivered  → bg-green-100 text-green-800
│   │   └── cancelled  → bg-red-100 text-red-800
│   ├── Date: new Date(createdAt).toLocaleDateString()
│   └── Cancel Button (only if orderStatus === "placed")
│       → calls PATCH /order/cancel/:id → refetch orders
│
└── Refetch function to refresh after cancel
```

**Checklist**:
- [ ] Rewrite `UserOrders.jsx` with data fetching from `/order/my-orders`
- [ ] Build order card with all fields
- [ ] Add color-coded status badges
- [ ] Add cancel button (visible only for "placed" orders)
- [ ] Wire cancel to `api.patch("/order/cancel/" + orderId)` → refetch
- [ ] Test full flow: Place order → See in history → Cancel it

---

### DAY 4 — Feb 22 (Sat) — Restaurant Order Management UI

**Session Goal**: Restaurant manager can see, accept, and manage incoming orders.

#### Hour 1–2: RestaurantOrders Component

**Topics**: Tab filtering, action buttons with API calls, state refresh after actions

**File to Update**: `client/src/components/restaurantDashboard/RestaurantOrders.jsx`

```
RestaurantOrders Component Structure:
│
├── useEffect → fetch GET /order/restaurant-orders
├── Filter Tabs Row:
│   ├── All | New (placed) | Confirmed | Preparing | Ready | On-Way | Delivered
│   └── Each tab filters the orders array by status
│
├── Order Cards (filtered list):
│   ├── Order ID
│   ├── Customer name (populated)
│   ├── Items with quantities
│   ├── Total ₹amount
│   ├── Delivery address
│   ├── Status badge (same colors as customer side)
│   ├── Order time (relative: "5 mins ago" or formatted date)
│   │
│   └── Action Buttons (based on current status):
│       ├── status "placed"    → [Accept Order] [Reject]
│       ├── status "confirmed" → [Start Preparing]
│       ├── status "preparing" → [Mark Ready]
│       ├── status "ready"     → (waiting for rider)
│       ├── status "on-way"    → (rider is delivering)
│       └── status "delivered" → (completed, no action)
│
└── Empty state per tab
```

**Each action button calls**: `api.patch("/order/update-status/" + orderId, { orderStatus: newStatus })`

**Checklist**:
- [ ] Rewrite `RestaurantOrders.jsx` with full functionality
- [ ] Fetch orders from API on mount
- [ ] Implement filter tabs
- [ ] Build order cards with customer details
- [ ] Add action buttons per status
- [ ] Each action calls API → refetch orders
- [ ] Test: Place order as customer → Login as manager → See & manage it

#### Hour 3: Restaurant Overview + Earnings (Real Data)

**File to Update**: `client/src/components/restaurantDashboard/RestaurantOverview.jsx`

```
Changes:
├── Fetch restaurant orders in useEffect
├── Calculate from orders:
│   ├── Total Orders = orders.length
│   ├── Active Orders = orders.filter(o => !["delivered","cancelled"].includes(o.orderStatus)).length
│   ├── Total Earnings = orders.filter(o => o.orderStatus === "delivered").reduce(sum pricing.total)
│   └── Rating = keep hardcoded 4.5 for now
├── Recent Orders = orders.slice(0, 5) → show in table
```

**File to Update**: `client/src/components/restaurantDashboard/RestaurantEarnings.jsx`

```
Changes:
├── Fetch orders with status "delivered"
├── Show earnings list with: Order ID, Customer, Amount, Date
├── Summary: Total Earnings, This Month, Order Count
```

**Checklist**:
- [ ] Update `RestaurantOverview.jsx` — fetch orders, compute stats, display
- [ ] Update `RestaurantEarnings.jsx` — show delivered orders as earnings
- [ ] Test with delivered orders

---

### DAY 5 — Feb 23 (Sun) — Rider Backend + Router

**Session Goal**: Build the complete rider backend so the dashboard can consume it.

#### Hour 1–2: Rider Controller

**Topics**: Reusing auth middleware, filtering by riderID/orderStatus, updating nested fields

**File to Create**: `server/src/controllers/riderController.js`

| Function | Logic |
|----------|-------|
| `getAvailableOrders` | `Order.find({ orderStatus: "ready", riderID: null }).populate("restaurantID customerID")` |
| `acceptOrder` | Find order by ID → verify `riderID === null` and `orderStatus === "ready"` → set `riderID = req.user._id`, `orderStatus = "on-way"` → save |
| `completeDelivery` | Find order by ID → verify `riderID === req.user._id` and `orderStatus === "on-way"` → set `orderStatus = "delivered"` → save |
| `getRiderDeliveries` | `Order.find({ riderID: req.user._id }).sort({ createdAt: -1 }).populate("restaurantID customerID")` |

**Checklist**:
- [ ] Create `server/src/controllers/riderController.js`
- [ ] Implement all 4 functions with proper validation
- [ ] `acceptOrder` must check `riderID === null` to prevent race condition

#### Hour 2–3: Rider Router + Register + Test

**File to Create**: `server/src/routers/riderRouter.js`

```
GET    /rider/available-orders      → Protect, PartnerProtect → getAvailableOrders
PATCH  /rider/accept-order/:id      → Protect, PartnerProtect → acceptOrder
PATCH  /rider/complete-delivery/:id → Protect, PartnerProtect → completeDelivery
GET    /rider/my-deliveries         → Protect, PartnerProtect → getRiderDeliveries
```

**File to Update**: `server/index.js`
- Import `RiderRouter`
- Add `app.use("/rider", RiderRouter)`

**Checklist**:
- [ ] Create router with all 4 routes
- [ ] Register in `index.js`
- [ ] Test all endpoints with Postman:
  - Create order as customer → Accept as manager → Prepare → Mark Ready
  - Login as rider → See available orders → Accept → Complete delivery
- [ ] Fix any bugs

---

### DAY 6 — Feb 24 (Mon) — Rider Dashboard Frontend

**Session Goal**: Build all rider dashboard components and the dashboard page.

#### Hour 1: RiderSideBar + Dashboard Shell

**Topics**: Reusing component patterns from existing sidebars

**New Folder**: `client/src/components/riderDashboard/`

**File to Create**: `client/src/components/riderDashboard/RiderSideBar.jsx`
- Copy structure from `RestaurantSideBar.jsx`
- Menu items: Overview, Available Orders, My Deliveries, Profile, Help Desk

**File to Update**: `client/src/pages/dashboards/RiderDashboard.jsx`
- Add role check (`role !== "partner"` → show error)
- Add login check
- Add sidebar + tab switching (same pattern as UserDashboard)
- Tabs: overview, available, deliveries, profile, helpdesk

**Checklist**:
- [ ] Create `RiderSideBar.jsx`
- [ ] Rewrite `RiderDashboard.jsx` with sidebar + tab switching
- [ ] Verify routing works

#### Hour 2: RiderAvailableOrders + RiderMyDeliveries

**File to Create**: `client/src/components/riderDashboard/RiderAvailableOrders.jsx`

```
RiderAvailableOrders:
├── Fetch GET /rider/available-orders
├── Order Cards:
│   ├── Restaurant name & address
│   ├── Customer delivery address
│   ├── Items list
│   ├── Total amount
│   └── [Accept Delivery] button → PATCH /rider/accept-order/:id → refetch
└── Empty state: "No orders available right now"
```

**File to Create**: `client/src/components/riderDashboard/RiderMyDeliveries.jsx`

```
RiderMyDeliveries:
├── Fetch GET /rider/my-deliveries
├── Active Delivery Section (orderStatus === "on-way"):
│   ├── Full order details
│   ├── Pickup: Restaurant address
│   ├── Dropoff: Customer address
│   └── [Mark Delivered] button → PATCH /rider/complete-delivery/:id → refetch
├── Completed Deliveries (orderStatus === "delivered"):
│   └── List with order details, date, amount
└── Empty states for both sections
```

**Checklist**:
- [ ] Create `RiderAvailableOrders.jsx`
- [ ] Create `RiderMyDeliveries.jsx`
- [ ] Wire accept and complete buttons to APIs
- [ ] Test the complete rider flow

#### Hour 3: RiderOverview + RiderProfile

**File to Create**: `client/src/components/riderDashboard/RiderOverview.jsx`

```
RiderOverview:
├── Stat Cards:
│   ├── Total Deliveries (all delivered orders count)
│   ├── Active Delivery (on-way count — should be 0 or 1)
│   ├── Today's Deliveries
│   └── Earnings (sum of delivered orders — could show delivery charges)
└── Recent Deliveries (last 5)
```

**File to Create**: `client/src/components/riderDashboard/RiderProfile.jsx`
- Reuse the same pattern as `UserProfile.jsx` (calls `/user/update`, `/user/changePhoto`, `/user/resetPassword`)

**Checklist**:
- [ ] Create `RiderOverview.jsx` with stats from deliveries data
- [ ] Create `RiderProfile.jsx` (copy UserProfile pattern)
- [ ] Test rider dashboard end-to-end

---

### DAY 7 — Feb 25 (Tue) — E2E Testing: Full Order Flow

**Session Goal**: Test the complete Customer → Restaurant → Rider flow, fix all bugs.

#### 3 Hours: Systematic Testing

**The Complete Flow**:

```
Step  1: Customer registers/logs in
Step  2: Customer browses restaurants on /order-now
Step  3: Customer clicks a restaurant → sees menu
Step  4: Customer adds items to cart
Step  5: Customer goes to checkout
Step  6: Customer places order (COD for now)
         ✓ Order created in DB with status "placed"
Step  7: Customer sees order in UserOrders with status "placed"
Step  8: Customer cancels one order → status becomes "cancelled"
Step  9: Customer places another order

Step 10: Login as restaurant manager
Step 11: Manager sees order in RestaurantOrders (status "placed")
Step 12: Manager clicks "Accept" → status "confirmed"
Step 13: Manager clicks "Start Preparing" → status "preparing"
Step 14: Manager clicks "Mark Ready" → status "ready"
Step 15: RestaurantOverview shows updated stats
Step 16: RestaurantEarnings shows earnings (after delivery)

Step 17: Login as rider (partner role)
Step 18: Rider sees order in Available Orders (status "ready")
Step 19: Rider clicks "Accept Delivery" → status "on-way"
Step 20: Rider clicks "Mark Delivered" → status "delivered"

Step 21: Login as customer again
Step 22: Customer sees order with status "delivered"
Step 23: User dashboard overview shows correct stats
```

**Bug Tracking Table**:

| # | Bug Description | File | Fix Status |
|---|-----------------|------|------------|
| 1 | | | ☐ |
| 2 | | | ☐ |
| 3 | | | ☐ |
| 4 | | | ☐ |
| 5 | | | ☐ |

**Checklist**:
- [ ] Create test accounts: 1 customer, 1 manager, 1 partner (rider)
- [ ] Run through all 23 steps
- [ ] Log every bug found
- [ ] Fix all bugs
- [ ] Re-test after fixes
- [ ] Verify data consistency across all dashboards

---

### DAY 8 — Feb 26 (Wed) — Search & Filter (Backend + Frontend)

**Session Goal**: Add restaurant search and filtering to OrderNow page.

#### Hour 1: Search Backend

**Topics**: MongoDB `$regex` for text search, `$or` queries, query parameters

**File to Update**: `server/src/controllers/publicControlller.js`

**New Function**: `searchRestaurants`

```javascript
// Query params: q (search text), cuisine, city
// Logic:
//   filter = { role: "manager" }
//   if (q) → filter.$or = [
//     { restaurantName: { $regex: q, $options: "i" } },
//     { cuisine: { $regex: q, $options: "i" } },
//     { fullName: { $regex: q, $options: "i" } }
//   ]
//   if (cuisine) → filter.cuisine = { $regex: cuisine, $options: "i" }
//   if (city) → filter.city = { $regex: city, $options: "i" }
//   User.find(filter).select("-password")
```

**File to Update**: `server/src/routers/publicRouter.js`
- Add `GET /public/search-restaurants` → `searchRestaurants`

**Checklist**:
- [ ] Add `searchRestaurants` to public controller
- [ ] Add route in public router
- [ ] Test with Postman: `/public/search-restaurants?q=pizza`, `?cuisine=indian`, `?city=delhi`

#### Hour 2–3: Search Frontend

**Topics**: Controlled inputs, query building, debouncing (optional)

**File to Update**: `client/src/pages/OrderNow.jsx`

```
Updated OrderNow Page Structure:
│
├── Search Section (new — at top):
│   ├── Text Input: placeholder "Search restaurants, cuisines..."
│   ├── Cuisine Dropdown: All | Indian | Chinese | Italian | Mexican | etc.
│   ├── City Input: text field
│   ├── [Search] button → calls /public/search-restaurants with params
│   └── [Clear] button → resets to show all restaurants
│
├── Results Info: "Showing X restaurants" or "No restaurants found"
│
└── Restaurant Cards Grid (existing design — no change)
```

**Checklist**:
- [ ] Add search bar UI at top of `OrderNow.jsx`
- [ ] Add state for searchQuery, cuisineFilter, cityFilter
- [ ] On Search click → call `api.get("/public/search-restaurants", { params: { q, cuisine, city } })`
- [ ] Update restaurant list with results
- [ ] Clear button resets to `fetctAllRestaurants()` (existing function)
- [ ] Handle "no results" gracefully
- [ ] Test: Search by name → Filter by cuisine → Clear → Combine filters

---

### DAY 9 — Feb 27 (Thu) — Razorpay Backend

**Session Goal**: Set up Razorpay on the server — config, create order, verify payment.

#### Pre-requisites (Do before starting)
- Sign up at https://razorpay.com
- Go to Dashboard → Settings → API Keys → Generate Test Keys
- Note down `key_id` (starts with `rzp_test_`) and `key_secret`

#### Hour 1: Razorpay Config + Install

**Terminal**:
```bash
cd server
npm install razorpay
```

**File to Create**: `server/src/config/razorpay.js`
```javascript
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpayInstance;
```

**Update `.env`**:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxx
```

#### Hour 2–3: Payment Controller + Router

**Topics**: Razorpay order creation, HMAC SHA256 signature verification, crypto module

**File to Create**: `server/src/controllers/paymentController.js`

| Function | Purpose |
|----------|---------|
| `createPaymentOrder` | 1. Receive `orderId` + `amount` from frontend.<br>2. Create Razorpay order via `razorpayInstance.orders.create({ amount: amount*100, currency: "INR", receipt: orderId })`.<br>3. Return `{ razorpayOrderId, amount, key_id }` |
| `verifyPayment` | 1. Receive `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, `orderId`.<br>2. Generate expected signature: `crypto.createHmac("sha256", key_secret).update(razorpay_order_id + "\|" + razorpay_payment_id).digest("hex")`.<br>3. Compare with received signature.<br>4. If match → update Order's `paymentStatus = "paid"`, `paymentID = razorpay_payment_id` → save.<br>5. Return success. |

**File to Create**: `server/src/routers/paymentRouter.js`

```
POST   /payment/create-order  → Protect, CustomerProtect → createPaymentOrder
POST   /payment/verify        → Protect, CustomerProtect → verifyPayment
```

**File to Update**: `server/index.js`
- Import and register `app.use("/payment", PaymentRouter)`

**Checklist**:
- [ ] Install `razorpay` package
- [ ] Create `razorpay.js` config
- [ ] Add env variables
- [ ] Create `paymentController.js` with both functions
- [ ] Create `paymentRouter.js`
- [ ] Register in `index.js`
- [ ] Test `createPaymentOrder` with Postman
- [ ] Test `verifyPayment` with Postman (manual signature for now)

---

### DAY 10 — Feb 28 (Fri) — Razorpay Frontend

**Session Goal**: Integrate Razorpay checkout popup into the checkout page.

#### Hour 1: Load Razorpay Script + Understand Flow

**File to Update**: `client/index.html`
```html
<!-- Add before </head> -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

**The Payment Flow**:
```
1. Customer clicks "Place Order"
2. Frontend calls POST /order/create → gets back { order } with order._id
3. If paymentMethod !== "cod":
   a. Frontend calls POST /payment/create-order → gets { razorpayOrderId, amount, key_id }
   b. Open Razorpay popup with these details
   c. Customer enters card/UPI details in popup
   d. On success → Razorpay returns { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   e. Frontend calls POST /payment/verify with above + orderId
   f. Backend verifies signature → updates order payment status
   g. Navigate to orders page with success toast
4. If paymentMethod === "cod":
   a. Skip Razorpay
   b. Order already created with paymentStatus "pending"
   c. Navigate to orders page with success toast
```

#### Hour 2–3: Update CheckoutPage.jsx

**Topics**: Dynamic Razorpay options, promise-based popup handling

**File to Update**: `client/src/pages/CheckoutPage.jsx`

```
Updated handlePlaceOrder():
│
├── Call POST /order/create → get createdOrder
│
├── IF paymentMethod === "cod":
│   └── toast.success → clear cart → navigate
│
└── ELSE (online payment):
    ├── Call POST /payment/create-order with { orderId, amount: total }
    ├── Get back { razorpayOrderId, amount, key_id }
    ├── Open Razorpay Checkout:
    │   options = {
    │     key: key_id,
    │     amount: amount,
    │     currency: "INR",
    │     name: "Cravings",
    │     description: "Food Order Payment",
    │     order_id: razorpayOrderId,
    │     prefill: { name: user.fullName, email: user.email, contact: user.mobileNumber },
    │     handler: async (response) => {
    │       // Payment success callback
    │       await api.post("/payment/verify", {
    │         razorpay_order_id: response.razorpay_order_id,
    │         razorpay_payment_id: response.razorpay_payment_id,
    │         razorpay_signature: response.razorpay_signature,
    │         orderId: createdOrder._id
    │       });
    │       toast.success("Payment successful!");
    │       localStorage.removeItem("cart");
    │       navigate("/user-dashboard");
    │     }
    │   }
    └── new window.Razorpay(options).open()
```

**Checklist**:
- [ ] Add Razorpay script to `index.html`
- [ ] Update `handlePlaceOrder()` to handle COD vs online payment
- [ ] Implement Razorpay popup opening
- [ ] Handle success callback → verify → navigate
- [ ] Handle failure/dismiss → show error toast
- [ ] Test with Razorpay test card: `4111 1111 1111 1111`, Expiry: any future, CVV: any 3 digits

---

### DAY 11 — Mar 1 (Sun) — User Dashboard Completion

**Session Goal**: Complete UserOverview, UserTransactions, and HelpDesk components.

#### Hour 1: User Overview

**File to Update**: `client/src/components/userDashboard/UserOverview.jsx`

```
UserOverview:
├── Fetch orders from /order/my-orders
├── Stat Cards (4 cards in a row):
│   ├── Total Orders = orders.length
│   ├── Active Orders = filter(status not delivered/cancelled).length
│   ├── Total Spent = filter(delivered).reduce(sum, pricing.total)
│   └── Cancelled = filter(cancelled).length
├── Recent Orders (last 5):
│   └── Mini table: Order ID, Restaurant, Amount, Status badge, Date
└── Quick Actions:
    ├── [Order Now] → navigate("/order-now")
    └── [View All Orders] → setActive("orders") via props or callback
```

**Checklist**:
- [ ] Rewrite `UserOverview.jsx` with order fetching and stat calculation
- [ ] Build stat cards (reuse RestaurantOverview design pattern)
- [ ] Add recent orders mini-table
- [ ] Add quick action buttons

#### Hour 2: User Transactions

**File to Update**: `client/src/components/userDashboard/UserTransactions.jsx`

```
UserTransactions:
├── Fetch orders (reuse /order/my-orders — transactions come from orders)
├── Transaction Table:
│   ├── # (index)
│   ├── Order ID (last 8 chars)
│   ├── Restaurant Name
│   ├── Amount (pricing.total)
│   ├── Payment Method (credit-card/upi/wallet/cod)
│   ├── Payment Status badge (pending/paid/failed/refunded)
│   └── Date
├── Summary Bar:
│   ├── Total Spent (sum of "paid" orders)
│   ├── Pending Payments (sum of "pending" payments)
│   └── Total Transactions count
└── Empty state
```

**Checklist**:
- [ ] Rewrite `UserTransactions.jsx`
- [ ] Fetch from `/order/my-orders`
- [ ] Build transaction table/cards
- [ ] Add summary section
- [ ] Test with mix of COD and paid orders

#### Hour 3: HelpDesk Forms (User + Restaurant)

**File to Update**: `client/src/components/userDashboard/UserHelpDesk.jsx`
**File to Update**: `client/src/components/restaurantDashboard/RestaurantHelpDesk.jsx`

```
HelpDesk Component (same for both):
├── Support Form:
│   ├── Subject: dropdown (Order Issue / Payment Issue / Account Issue / Other)
│   ├── Message: textarea
│   └── [Submit] button → POST /public/new-contact with { fullName: user.fullName, email: user.email, mobileNumber: user.mobileNumber, message: `[${subject}] ${message}` }
├── Success message after submit
└── Contact Info:
    ├── Email: support@cravings.com
    ├── Phone: +91-XXXXXXXXXX
    └── Response time: 24-48 hours
```

**Checklist**:
- [ ] Update `UserHelpDesk.jsx` with form + contact info
- [ ] Update `RestaurantHelpDesk.jsx` with same pattern
- [ ] Wire form to `/public/new-contact` API
- [ ] Test submission

---

### DAY 12 — Mar 2 (Mon) — Edge Cases + Order Polling

**Session Goal**: Handle edge cases and add order status auto-refresh.

#### Hour 1: Backend Validations & Edge Cases

**Topics**: Data integrity, race conditions, price verification

**Files to Update**: `server/src/controllers/orderController.js`, `riderController.js`

```
Edge Cases to Handle:
│
├── createOrder:
│   ├── Verify each item exists in Menu model and is "available"
│   ├── Verify current prices match what frontend sent (prevent price tampering)
│   ├── Verify restaurant exists and is active
│   └── Prevent empty items array
│
├── updateOrderStatus:
│   ├── Valid transitions only:
│   │   placed → confirmed OR cancelled
│   │   confirmed → preparing
│   │   preparing → ready
│   │   ready → on-way (only via rider accept)
│   │   on-way → delivered (only via rider complete)
│   └── Reject invalid transitions with clear error message
│
├── acceptOrder (rider):
│   ├── Check riderID is null (prevent double-accept race condition)
│   └── Check orderStatus is "ready"
│
└── cancelOrder:
    ├── Only if status is "placed" (not yet accepted by restaurant)
    └── If online payment was "paid" → set paymentStatus to "refunded"
```

**Checklist**:
- [ ] Add item availability check in `createOrder`
- [ ] Add price verification in `createOrder`
- [ ] Add status transition validation in `updateOrderStatus`
- [ ] Add race condition check in rider `acceptOrder`
- [ ] Add refund status handling in `cancelOrder`
- [ ] Test all edge cases

#### Hour 2: Order Status Polling (Frontend)

**Topics**: `setInterval`, useEffect cleanup, comparing state

**File to Update**: `client/src/components/userDashboard/UserOrders.jsx`

```
Add to UserOrders:
├── Poll /order/my-orders every 30 seconds
├── On each poll, compare old orders vs new orders
├── If any order's status changed → toast("Order #xxxx status: preparing")
├── Cleanup interval on unmount: return () => clearInterval(intervalId)
└── Add manual [Refresh] button
```

**Also add polling to**: `client/src/components/restaurantDashboard/RestaurantOrders.jsx`
- Poll every 20 seconds for new incoming orders
- Toast when a new order arrives

**Checklist**:
- [ ] Add 30-sec polling in `UserOrders.jsx`
- [ ] Add status-change toast notification
- [ ] Add cleanup in useEffect return
- [ ] Add manual refresh button
- [ ] Add 20-sec polling in `RestaurantOrders.jsx`
- [ ] Test: Change order status from one browser → see update in another

#### Hour 3: Frontend Error Handling + UX Fixes

**Quick fixes across the app**:

```
Fixes to address:
├── CheckoutPage: Disable "Place Order" button while processing (already has isProcessing ✅)
├── CheckoutPage: Verify cart isn't empty before API call
├── RestaurantDisplayMenu: Check item availability before "Add to Cart"
├── Cart: If cart restaurant doesn't exist anymore → show warning
├── All API calls: Ensure catch blocks show user-friendly toast messages
├── Login redirect: If user tries to access dashboard without login → redirect to /login (already done ✅)
└── Remove console.log in RestaurantDisplayMenu line: {console.log("cartFlag", ...)}
```

**Checklist**:
- [ ] Remove stray `console.log` in production code (RestaurantDisplayMenu.jsx)
- [ ] Add availability check before add-to-cart
- [ ] Verify all error toasts show meaningful messages
- [ ] Quick test of all error scenarios

---

### DAY 13 — Mar 3 (Tue) — Admin Dashboard (Basic)

**Session Goal**: Build a basic but functional admin dashboard.

#### Hour 1: Admin Backend (Optional — can compute on frontend)

**Option A (Simpler — Do This First)**: Frontend fetches from existing endpoints
- Since admin is a special role, create minimal endpoints

**File to Create**: `server/src/controllers/adminController.js`

| Function | Purpose |
|----------|---------|
| `getPlatformStats` | Count users by role, count orders by status, sum revenue |
| `getAllOrders` | Return all orders with populate (paginated) |
| `getAllUsers` | Return all users (select "-password") |

**File to Create**: `server/src/routers/adminRouter.js`

```
GET    /admin/stats       → Protect, AdminProtect → getPlatformStats
GET    /admin/all-orders  → Protect, AdminProtect → getAllOrders
GET    /admin/all-users   → Protect, AdminProtect → getAllUsers
```

**File to Update**: `server/index.js` — register admin router

**Checklist**:
- [ ] Create admin controller with 3 functions
- [ ] Create admin router
- [ ] Register in index.js
- [ ] Test with Postman (login as admin)

#### Hour 2–3: Admin Dashboard Frontend

**File to Update**: `client/src/pages/dashboards/AdminDashboard.jsx`

```
AdminDashboard:
├── Auth check (role === "admin")
├── Stats Cards Row:
│   ├── Total Customers
│   ├── Total Restaurants
│   ├── Total Riders
│   ├── Total Orders
│   └── Total Revenue
├── Recent Orders Table (last 10):
│   ├── Order ID, Customer, Restaurant, Amount, Status, Date
│   └── Scrollable table
├── Users Table (basic):
│   ├── Name, Email, Role, Status, Joined Date
│   └── Simple list
└── (No sidebar needed — keep it simple with sections)
```

**Checklist**:
- [ ] Rewrite `AdminDashboard.jsx`
- [ ] Fetch stats from `/admin/stats`
- [ ] Display stat cards
- [ ] Fetch and display recent orders
- [ ] Fetch and display users list
- [ ] Test with admin account

---

### DAY 14 — Mar 4 (Wed) — Final Testing + Cleanup

**Session Goal**: Complete test matrix, fix remaining bugs, clean up code.

#### Hour 1–2: Full Test Matrix

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 1 | Customer registers | Account created | ☐ |
| 2 | Customer logs in | JWT cookie set, navigates to dashboard | ☐ |
| 3 | Customer browses restaurants | All restaurants shown | ☐ |
| 4 | Customer searches restaurants | Filtered results | ☐ |
| 5 | Customer views restaurant menu | Menu items shown with Add to Cart | ☐ |
| 6 | Customer adds items to cart | Cart bar appears at bottom | ☐ |
| 7 | Customer proceeds to checkout | Checkout page with items, address, payment | ☐ |
| 8 | Customer places order (COD) | Order created, cart cleared, redirected | ☐ |
| 9 | Customer places order (Razorpay) | Payment popup, order paid | ☐ |
| 10 | Customer views order history | Orders listed with status badges | ☐ |
| 11 | Customer cancels a "placed" order | Status → cancelled | ☐ |
| 12 | Customer views overview | Correct stats shown | ☐ |
| 13 | Customer views transactions | Payment list shown | ☐ |
| 14 | Customer submits help ticket | Contact form submitted | ☐ |
| 15 | Restaurant sees new order | Order appears with "Accept" button | ☐ |
| 16 | Restaurant accepts order | Status → confirmed | ☐ |
| 17 | Restaurant starts preparing | Status → preparing | ☐ |
| 18 | Restaurant marks ready | Status → ready | ☐ |
| 19 | Restaurant overview shows stats | Real numbers from orders | ☐ |
| 20 | Restaurant earnings shows data | Delivered orders with amounts | ☐ |
| 21 | Rider sees available orders | Orders with status "ready" | ☐ |
| 22 | Rider accepts delivery | Status → on-way, rider assigned | ☐ |
| 23 | Rider marks delivered | Status → delivered | ☐ |
| 24 | Rider overview shows stats | Delivery counts | ☐ |
| 25 | Admin sees platform stats | All counts correct | ☐ |
| 26 | Search works | Correct restaurants returned | ☐ |
| 27 | Password reset works | OTP sent, password changed | ☐ |
| 28 | Profile update works | Fields saved | ☐ |
| 29 | Forgot password works | OTP → verify → new password | ☐ |
| 30 | Logout works | Cookie cleared, redirected | ☐ |

#### Hour 3: Code Cleanup

**Checklist**:
- [ ] Remove all stray `console.log` statements from frontend
- [ ] Ensure all API error responses are caught and shown to user
- [ ] Verify no hardcoded URLs (use `api` instance everywhere)
- [ ] Check all pages are accessible via routes in `App.jsx`
- [ ] Ensure mobile-responsive (basic — Tailwind responsive classes)
- [ ] Final commit with clean code

---

### BUFFER — Mar 5 (Thu) — Deadline Safety Net

Use this day ONLY if needed for:
- Remaining bug fixes from Day 14 test matrix
- Any deployment preparation
- Final polish

---

## Files to Create (Complete List)

### Backend (New Files)

| File | Day | Purpose |
|------|-----|---------|
| `server/src/models/orderModel.js` | Day 1 | Order schema |
| `server/src/controllers/orderController.js` | Day 1 | Order CRUD functions |
| `server/src/routers/orderRouter.js` | Day 2 | Order API routes |
| `server/src/controllers/riderController.js` | Day 5 | Rider order functions |
| `server/src/routers/riderRouter.js` | Day 5 | Rider API routes |
| `server/src/config/razorpay.js` | Day 9 | Razorpay instance config |
| `server/src/controllers/paymentController.js` | Day 9 | Payment functions |
| `server/src/routers/paymentRouter.js` | Day 9 | Payment API routes |
| `server/src/controllers/adminController.js` | Day 13 | Admin stats functions |
| `server/src/routers/adminRouter.js` | Day 13 | Admin API routes |

### Frontend (New Files)

| File | Day | Purpose |
|------|-----|---------|
| `client/src/components/riderDashboard/RiderSideBar.jsx` | Day 6 | Rider sidebar navigation |
| `client/src/components/riderDashboard/RiderOverview.jsx` | Day 6 | Rider stats dashboard |
| `client/src/components/riderDashboard/RiderAvailableOrders.jsx` | Day 6 | Available orders list |
| `client/src/components/riderDashboard/RiderMyDeliveries.jsx` | Day 6 | Rider's delivery history |
| `client/src/components/riderDashboard/RiderProfile.jsx` | Day 6 | Rider profile management |

### Existing Files to Modify

| File | Day | What Changes |
|------|-----|-------------|
| `server/index.js` | Day 2, 5, 9, 13 | Register new routers |
| `client/src/pages/CheckoutPage.jsx` | Day 3, 10 | API call + Razorpay |
| `client/src/components/userDashboard/UserOrders.jsx` | Day 3 | Full rewrite with data |
| `client/src/components/restaurantDashboard/RestaurantOrders.jsx` | Day 4 | Full rewrite with data |
| `client/src/components/restaurantDashboard/RestaurantOverview.jsx` | Day 4 | Real data from orders |
| `client/src/components/restaurantDashboard/RestaurantEarnings.jsx` | Day 4 | Real earnings data |
| `client/src/pages/dashboards/RiderDashboard.jsx` | Day 6 | Full rewrite with sidebar |
| `client/src/pages/OrderNow.jsx` | Day 8 | Add search & filter UI |
| `client/src/components/userDashboard/UserOverview.jsx` | Day 11 | Stats from orders |
| `client/src/components/userDashboard/UserTransactions.jsx` | Day 11 | Transaction list |
| `client/src/components/userDashboard/UserHelpDesk.jsx` | Day 11 | Help form |
| `client/src/components/restaurantDashboard/RestaurantHelpDesk.jsx` | Day 11 | Help form |
| `client/src/pages/dashboards/AdminDashboard.jsx` | Day 13 | Full rewrite |
| `client/index.html` | Day 10 | Razorpay script tag |
| `server/src/controllers/publicControlller.js` | Day 8 | Add search function |
| `server/src/routers/publicRouter.js` | Day 8 | Add search route |

### NPM Packages to Install

| Package | Location | Day | Command |
|---------|----------|-----|---------|
| `razorpay` | server | Day 9 | `cd server && npm install razorpay` |

---

## Visual Order Status Flow

```
CUSTOMER                 RESTAURANT               RIDER
────────                 ──────────               ─────
Place Order
    │
    ▼
 [placed] ──────────────► See New Order
                              │
                         Accept Order
                              │
                              ▼
 [confirmed] ◄──────── [confirmed]
                              │
                         Start Preparing
                              │
                              ▼
 [preparing] ◄──────── [preparing]
                              │
                         Mark Ready
                              │
                              ▼
 [ready] ◄────────────  [ready] ─────────────► See Available
                                                    │
                                               Accept Delivery
                                                    │
                                                    ▼
 [on-way] ◄──────────────────────────────── [on-way]
                                                    │
                                              Deliver & Mark
                                                    │
                                                    ▼
 [delivered] ◄─────────────────────────────  [delivered]
```

---

## Daily Quick Reference

| Day | Date | Focus | Hours | Key Deliverable |
|-----|------|-------|-------|-----------------|
| 1 | Feb 19 (Wed) | Order Model + Controller | 3h | Order backend logic complete |
| 2 | Feb 20 (Thu) | Order Router + API Testing | 3h | All order APIs tested & working |
| 3 | Feb 21 (Fri) | Checkout API + Customer Orders UI | 3h | Customer can place & view orders |
| 4 | Feb 22 (Sat) | Restaurant Orders + Overview | 3h | Restaurant can manage orders |
| 5 | Feb 23 (Sun) | Rider Backend | 3h | Rider APIs tested & working |
| 6 | Feb 24 (Mon) | Rider Dashboard Frontend | 3h | Rider can accept & deliver |
| 7 | Feb 25 (Tue) | E2E Full Flow Testing | 3h | Complete flow verified, bugs fixed |
| 8 | Feb 26 (Wed) | Search & Filter | 3h | Restaurant search working |
| 9 | Feb 27 (Thu) | Razorpay Backend | 3h | Payment APIs ready |
| 10 | Feb 28 (Fri) | Razorpay Frontend | 3h | Online payments working |
| 11 | Mar 1 (Sun) | User Dashboard Completion | 3h | Overview, Transactions, HelpDesk done |
| 12 | Mar 2 (Mon) | Edge Cases + Polling | 3h | Validations, auto-refresh, cleanup |
| 13 | Mar 3 (Tue) | Admin Dashboard | 3h | Basic admin panel working |
| 14 | Mar 4 (Wed) | Final Testing + Cleanup | 3h | All 30 test cases pass, code clean |
| Buffer | Mar 5 (Thu) | Safety net | 3h | Only if needed |

**Total Estimated Hours**: 42 hours (14 days × 3 hours)

---

## Key Concepts You'll Practice Each Day

| Day | Technical Concepts |
|-----|-------------------|
| 1 | Mongoose Schema Design, ObjectId refs, enums, nested objects |
| 2 | Express Router, Middleware chaining, Postman API testing |
| 3 | Axios POST, React state → API payload, useEffect fetching, conditional rendering |
| 4 | Tab-based filtering, action buttons with API calls, frontend data aggregation |
| 5 | Backend controller patterns, query filters, race condition prevention |
| 6 | Component reuse, sidebar pattern, multiple new components in one module |
| 7 | Integration testing, cross-role testing, systematic debugging |
| 8 | MongoDB `$regex`, query parameters, search UI, controlled inputs |
| 9 | Third-party SDK (Razorpay), HMAC signature verification, crypto module |
| 10 | Dynamic script loading, popup-based payment UX, callback handling |
| 11 | Dashboard stat calculation, data aggregation, form components |
| 12 | setInterval polling, useEffect cleanup, input validation, error handling |
| 13 | Platform-wide aggregation, admin role patterns |
| 14 | QA testing, code cleanup, final validation |

---

> **Rule**: Finish each day's checklist before moving to the next day. If a day's work takes 4 hours instead of 3, that's okay — but don't skip to the next day with unfinished items. The order matters because each day builds on the previous one.

---

**Document Created**: February 19, 2026
