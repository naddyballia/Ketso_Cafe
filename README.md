# Ketso Cafe - QR-Powered Restaurant Management System

## 1. Introduction & Vision

The "Ketso Cafe" project aims to develop a modern, efficient, and user-friendly restaurant management system. The core vision is to revolutionize the in-restaurant dining experience by leveraging QR code technology for seamless self-ordering and payment. Simultaneously, it will provide restaurant staff with a powerful digital dashboard to manage orders, menus, and table operations effectively. This system is designed to enhance customer satisfaction, streamline restaurant workflows, reduce operational overhead, and potentially increase revenue through improved efficiency and upselling opportunities.

## 2. Core Problem Being Solved

The project addresses several key pain points for both diners and restaurants:

**For Diners:**
* **Waiting Times:** Reduces waiting for menus, placing orders with busy staff, and settling bills.
* **Order Accuracy:** Minimizes miscommunication or errors common with verbal orders.
* **Convenience & Control:** Offers a self-paced, contactless ordering experience directly from their smartphones.
* **Menu Accessibility:** Provides an always-up-to-date digital menu with rich details and images.

**For Restaurants:**
* **Staff Workload:** Frees up waitstaff from routine order-taking and payment processing, allowing them to focus on higher-value tasks like customer service and upselling.
* **Operational Efficiency:** Streamlines the order-to-kitchen-to-table pipeline.
* **Order Throughput:** Potentially increases table turnover rates during peak hours.
* **Menu Management Costs:** Eliminates the need for printing and reprinting physical menus.
* **Data & Insights:** Provides valuable data on sales, popular items, and customer preferences for informed decision-making.
* **Reduced Errors:** Digital order entry minimizes mistakes.

## 3. Target Audience

* **Primary Users (Restaurants):** Small to medium-sized cafes, bistros, casual dining restaurants, and quick-service restaurants (QSRs) looking to modernize their operations, improve customer experience, and enhance efficiency. The system is designed to be adaptable to various restaurant types.
* **End Users (Diners):** Tech-savvy customers who appreciate convenience, speed, and a contactless experience. The intuitive UI aims to be accessible to a broad range of smartphone users.

## 4. Key Components & System Architecture (High-Level)

The system comprises two primary, interconnected components:

* **A. Customer-Facing Web Application:** Accessed by diners via scanning a QR code at their table. This will be a mobile-responsive web application, eliminating the need for app downloads.
* **B. Restaurant-Facing Dashboard:** A comprehensive web-based portal for restaurant owners and staff to manage all aspects of the ordering and operational process.

## 5. Detailed Feature Breakdown

### A. Customer-Facing Web Application

1.  **QR Code Initiation:**
    * Each table will have a unique QR code.
    * Scanning with a smartphone camera directs the user to the web application, automatically identifying the table number.
2.  **Welcome & Menu Display:**
    * Visually appealing landing page with restaurant branding (e.g., "Ketso Cafe").
    * Intuitive digital menu with clear categories (e.g., Appetizers, Main Courses, Desserts, Beverages).
    * Search functionality for menu items.
    * High-quality images, detailed descriptions, and prices for each item.
    * Display of allergens or dietary information (e.g., vegetarian, gluten-free) if configured by the restaurant.
3.  **Item Customization & Selection:**
    * Ability to select item variants (e.g., size, spice level, preparation style).
    * Options for add-ons or modifiers (e.g., extra cheese, specific toppings).
    * Easy "Add to Cart" functionality.
4.  **Shopping Cart Management:**
    * Clear overview of all selected items, quantities, and individual/total prices.
    * Ability to modify quantities or remove items from the cart.
    * Display of subtotal, applicable taxes, and final bill amount.
5.  **Order Placement & Customer Information:**
    * Input fields for customer's Name (for order identification).
    * Input field for Mobile Number (optional, for notifications or contact).
    * Table number automatically populated or confirmed.
6.  **Secure Payment Integration:**
    * Integration with one or more secure payment gateways (e.g., Stripe, Razorpay, PayPal).
    * Support for various payment methods (credit/debit cards, UPI, net banking, digital wallets).
    * Secure handling of payment information (PCI DSS compliance primarily handled by the payment gateway).
7.  **Order Confirmation:**
    * Real-time confirmation screen upon successful order placement and payment.
    * Display of a unique Order ID and summary of the order.
    * Message indicating the order has been sent to the kitchen.
8.  **(Future Enhancement):** Real-time order status tracking (e.g., "Preparing," "Ready").

### B. Restaurant-Facing Dashboard (Web Application)

1.  **Secure Staff Login:**
    * Role-based access control (e.g., Manager, Cashier, Kitchen Staff - for future iterations).
    * Authentication to protect sensitive restaurant data.
2.  **Dashboard Overview (Home Screen):**
    * Key Performance Indicators (KPIs): Total Orders, Total Revenue, Breakdown of Take Away vs. Dine-In orders.
    * Popular Items: List or chart showcasing best-selling dishes.
    * Floor/Zone Management: Visual representation of the restaurant layout with tables.
    * Table status indicators (e.g., Vacant, Occupied, Order Placed, Payment Pending, Needs Cleaning).
    * Quick access to main functionalities.
3.  **Real-Time Order Management:**
    * Live Order Feed: New orders appear instantly with audible/visual alerts.
    * Order List View: Displaying Item Name(s), Order ID, Category, Amount, Table Number, Time of Order, Current Status.
    * Order Details: Clicking an order reveals full details: customer name, items, customizations, special instructions, payment status.
4.  **Order Actions:**
    * Accept/Acknowledge Order.
    * Reject Order (with an optional reason).
    * Update Order Status (e.g., "Accepted," "Preparing," "Ready for Service," "Completed," "Cancelled").
    * Option to print Kitchen Order Tickets (KOTs).
    * Tabs for filtering orders (e.g., "New," "Active/In Progress," "Completed").
5.  **Menu Management:**
    * Intuitive interface for restaurant staff to manage the digital menu.
    * CRUD Operations: Add, Edit, Delete menu items and categories.
    * Fields for item name, description, price, image upload, category assignment.
    * Ability to mark items as "Available" or "Unavailable" / "In Stock" or "Out of Stock" in real-time.
    * Management of item variants and add-ons.
6.  **Table Management:**
    * Configure the restaurant's table layout (matching the physical setup).
    * Assign/Manage unique QR codes for each table.
    * Manually update table status if necessary (though primarily automated).
7.  **Reporting & Analytics (Basic to Advanced):**
    * Sales reports (daily, weekly, monthly).
    * Analysis of item performance (most/least popular).
    * (Future Enhancement): Customer order patterns.
8.  **Account & Settings:**
    * Manage restaurant profile information.
    * Configure payment gateway settings.
    * Notification preferences for staff.
    * (Future Enhancement): Staff account management.

## 6. User Flows (High-Level)

### Customer Journey:
1.  Scan QR code at the table.
2.  View restaurant menu.
3.  Select items and customize them.
4.  Add items to the cart.
5.  Review cart and proceed to checkout.
6.  Enter name (and optional mobile number).
7.  Make payment through the integrated gateway.
8.  Receive order confirmation.
9.  Enjoy the meal when served.

### Restaurant Staff Journey (Order Fulfillment):
1.  Receive new order notification on the dashboard.
2.  View order details.
3.  Accept the order (sends to kitchen/preparation).
4.  Kitchen staff prepares the order (potentially interacting with a KDS in future iterations).
5.  Update order status to "Preparing," then "Ready for Service".
6.  Waitstaff serves the order to the correct table.
7.  Mark order as "Completed" or "Served".
8.  Table status updates automatically.

## 7. Technology Stack

* **Frontend (Customer App & Restaurant Dashboard):** React.js
* **Backend:** Node.js with Express.js
* **Database:** PostgreSQL
* **Real-time Communication:** WebSockets (Socket.IO) for instant dashboard updates
* **Cloud Hosting (Future):** AWS, Google Cloud Platform, or Azure for scalability and reliability
* **Payment Gateway Integration:** Established providers like Stripe, Razorpay, etc.

## 8. Unique Selling Propositions (USPs)

* **Intuitive & Modern UI/UX:** Based on Figma designs, prioritizing ease of use.
* **Seamless QR Integration:** Direct and hassle-free access.
* **Comprehensive Management Dashboard:** All necessary tools in one place.
* **Efficiency Gains:** Aims to significantly reduce manual effort.
* **Contactless Experience:** Meets modern demands for hygiene and convenience.

## 9. MVP (Minimum Viable Product) Scope

The absolute minimum set of features needed to launch a usable V1:

* **Customer App (MVP):**
    * Scan QR -> View Menu -> Add to Cart -> Place Order (Name, Table No.) -> Basic Order Confirmation (no payment integration for initial development).
* **Restaurant Dashboard (MVP):**
    * Secure Staff Login.
    * View incoming orders in real-time.
    * Mark order as "Accepted" / "Preparing" / "Ready".
    * Basic Menu Management: Add/Edit item name, price, availability.

## 10. Project Structure

The project is organized into the following main directories:
```
Ketso_Cafe/
├── backend/                # Node.js/Express.js API 
│   ├── src/                # Source code directory
│   │   ├── controllers/    # Request handlers 
│   │   ├── models/         # Database schemas/models 
│   │   ├── routes/         # API endpoint definitions 
│   │   ├── services/       # Business logic 
│   │   ├── config/         # Configuration files (DB, JWT, etc.) 
│   │   └── app.js          # Main Express application setup
│   ├── tests/              # Test directory
│   ├── .env.example        # Environment variable template
│   ├── .gitignore
│   └── package.json
├── dashboard-frontend/     # React.js Admin Dashboard 
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # Reusable UI components 
│   │   ├── pages/          # Top-level page components 
│   │   ├── services/       # API communication services 
│   │   ├── contexts/       # React Context for state management 
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── customer-frontend/      # React.js Customer Ordering App 
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── contexts/       # Or other state management (Redux, Zustand) 
    │   ├── App.js
    │   └── index.js
    ├── .env.example
    ├── .gitignore
    └── package.json
├── .gitignore              # Root gitignore
└── README.md
```

## 11. Getting Started (Development Setup)

### Prerequisites
* Node.js (v18.x or later)
* npm or yarn
* PostgreSQL (v14 or later)
* Git
* VS Code (Recommended IDE)

### Environment Variables
Create `.env` files in the `backend`, `dashboard-frontend`, and `customer-frontend` directories based on their respective `.env.example` files. These will store sensitive information like database credentials, API keys, JWT secrets, etc.
**DO NOT commit `.env` files to Git**.

Example for `backend/.env.example`:
```
PORT=3001 # Or your preferred port for the backend
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_jwt_secret_key"
# Add other variables as needed
```

### Installation & Running the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Ketso_Cafe
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install # or yarn install
    # Ensure PostgreSQL server is running and you've created the database
    # Update your .env file with database credentials
    # npm run db:migrate (if using a migration tool - to be set up)
    npm run dev # (Assuming a dev script in package.json, e.g., using nodemon)
    ```
    The backend should be running on the port specified in its `.env` file (e.g., `http://localhost:3001`).

3.  **Dashboard Frontend Setup:**
    ```bash
    cd ../dashboard-frontend
    npm install # or yarn install
    # Update your .env file (e.g., VITE_API_BASE_URL=http://localhost:3001/api)
    npm run dev # (or npm start, yarn dev, yarn start depending on React setup)
    ```
    The dashboard frontend should be running on its development server (e.g., `http://localhost:3000`).

4.  **Customer Frontend Setup:**
    ```bash
    cd ../customer-frontend
    npm install # or yarn install
    # Update your .env file (e.g., VITE_API_BASE_URL=http://localhost:3001/api)
    npm run dev # (or npm start, yarn dev, yarn start)
    ```
    The customer frontend should be running on its development server (e.g., `http://localhost:5173`).

*(Note: Specific commands like `npm run dev` or `db:migrate` depend on scripts defined in `package.json` and tools chosen for database migrations, which will be set up during development.)*

## 12. API Endpoints (Planned - Backend)

Base URL: `/api`

* **Authentication (`/auth`):**
    * `POST /staff/login`: Staff login
    * `POST /staff/register`: (Initially manual setup or one admin)
* **Menu Categories (`/restaurants/{restaurantId}/categories`):**
    * `GET /`: List all categories for a restaurant
    * `POST /`: Create a new category
    * `GET /{categoryId}`: Get a specific category
    * `PUT /{categoryId}`: Update a specific category
    * `DELETE /{categoryId}`: Delete a specific category
* **Menu Items (`/restaurants/{restaurantId}/menu-items`):**
    * `GET /`: List all menu items for a restaurant (can include filtering by category)
    * `POST /`: Create a new menu item (handle image upload)
    * `GET /{itemId}`: Get a specific menu item
    * `PUT /{itemId}`: Update a specific menu item (including availability toggle, image update)
    * `DELETE /{itemId}`: Delete a specific menu item
* **Orders (`/restaurants/{restaurantId}/orders`):**
    * `POST /`: Place a new order (customer name, table ID, items)
    * `GET /`: List all orders (for dashboard, with filtering options)
    * `GET /{orderId}`: Get details of a specific order
    * `PUT /{orderId}/status`: Update order status (e.g., accepted, preparing, ready, completed)
* **Tables (`/restaurants/{restaurantId}/tables`):** (For Table Management)
    * `GET /`: List all tables with their status and QR identifiers
    * `POST /`: Add a new table
    * `PUT /{tableId}`: Update table information (e.g., assign QR code)

*(These are illustrative endpoints based on the project description. They will be refined during backend development. `{restaurantId}` might be implicit based on authenticated staff for some routes.)*

## 13. Key Principles During Development

* **Iterate in Small Steps:** Build, test, then build the next piece.
* **Commit Regularly:** Use Git effectively.
* **Write Readable Code:** Use meaningful names, comment where necessary.
* **Don't Repeat Yourself (DRY):** Create reusable functions/components.
* **Start Simple with Testing:** Manual testing initially, introduce automated tests (unit, integration) as you progress.
* **Use Environment Variables:** For API keys, database credentials, etc. Do NOT commit sensitive keys to Git.

## 14. Potential Future Enhancements (Post-MVP)

* Advanced Kitchen Display System (KDS).
* Customer accounts for re-ordering and loyalty programs.
* Reservation system integration.
* Advanced inventory management.
* Deeper analytics and reporting.
* Staff roles and permissions (more granular).
* Customer feedback and rating system.
* Multi-language support.

## 15. Conclusion

The "Ketso Cafe" QR-Powered Restaurant Management System is a well-thought-out project with the potential to significantly enhance the dining experience and restaurant operational efficiency. By focusing on a clean user interface, robust core functionalities, and leveraging modern web technologies, this system is poised to offer a compelling solution in the evolving food-tech landscape. Its success will depend on meticulous execution, continuous iteration based on user feedback, and a strong focus on reliability and ease of use.

---
*This README.md is a living document and will be updated as the project progresses.* 