# Ketso Cafe - Collaboration Guide

This guide provides all the information needed to set up and work with the Ketso Cafe project.

## Repository Access

The project is hosted on GitHub at: https://github.com/naddyballia/Ketso_Cafe.git

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (v12.x or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/naddyballia/Ketso_Cafe.git
cd Ketso_Cafe
```

### 2. PostgreSQL Setup

1. Install PostgreSQL if you haven't already:
   - Windows: Download and install from the [official website](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql`
   - Linux: `sudo apt install postgresql postgresql-contrib`

2. Start the PostgreSQL service:
   - Windows: The installer typically sets it up as a service
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

3. Log in to PostgreSQL:
   ```bash
   psql -U postgres
   ```
   (You'll be prompted for the password you set during installation)

4. Create the database:
   ```sql
   CREATE DATABASE ketso_cafe_db;
   ```

5. Connect to the database:
   ```sql
   \c ketso_cafe_db
   ```

6. Create the necessary tables:
   ```sql
   -- Users Table
   CREATE TABLE "Users" (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) NOT NULL UNIQUE,
     password_hash VARCHAR(255) NOT NULL,
     role VARCHAR(50) NOT NULL,
     restaurant_id INTEGER,
     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
     "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
   );

   -- Menu Categories Table
   CREATE TABLE "MenuCategories" (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     restaurant_id INTEGER,
     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
     "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
   );

   -- Menu Items Table
   CREATE TABLE "MenuItems" (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     category_id INTEGER REFERENCES "MenuCategories"(id),
     restaurant_id INTEGER,
     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
     "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
   );
   ```

7. Exit PostgreSQL:
   ```sql
   \q
   ```

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your local configuration:
   ```
   # Database Configuration
   DB_NAME=ketso_cafe_db
   DB_USER=postgres
   DB_PASS=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432

   # Server Configuration
   PORT=3005

   # Authentication
   JWT_SECRET=your_secure_random_string
   JWT_EXPIRES_IN=1h

   # Other Settings
   NODE_ENV=development
   ```
   
   Make sure to replace `your_postgres_password` with your actual PostgreSQL password and generate a secure random string for `JWT_SECRET`.

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   node app.js
   ```

6. The server should now be running at http://localhost:3005

## API Documentation

### Authentication Endpoints

#### Register User
- **Method**: POST
- **URL**: /api/auth/register
- **Description**: Creates a new user account
- **Request Body**:
  ```json
  {
    "username": "staff_user",
    "password": "secure_password",
    "role": "staff",
    "restaurant_id": 1  // Optional
  }
  ```
- **Success Response** (201 Created):
  ```json
  {
    "message": "User registered successfully!",
    "userId": 1
  }
  ```

#### Login User
- **Method**: POST
- **URL**: /api/auth/login
- **Description**: Authenticates a user and returns a JWT token
- **Request Body**:
  ```json
  {
    "username": "staff_user",
    "password": "secure_password"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "message": "Login successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "staff_user",
      "role": "staff"
    }
  }
  ```

### Menu Category Endpoints

#### Get All Categories
- **Method**: GET
- **URL**: /api/categories
- **Description**: Retrieves all menu categories
- **Success Response** (200 OK):
  ```json
  {
    "message": "Menu categories fetched successfully!",
    "count": 2,
    "categories": [
      {
        "id": 1,
        "name": "Appetizers",
        "restaurant_id": 1,
        "createdAt": "2023-06-01T12:00:00.000Z",
        "updatedAt": "2023-06-01T12:00:00.000Z"
      },
      {
        "id": 2,
        "name": "Main Course",
        "restaurant_id": 1,
        "createdAt": "2023-06-01T12:00:00.000Z",
        "updatedAt": "2023-06-01T12:00:00.000Z"
      }
    ]
  }
  ```

#### Create Category
- **Method**: POST
- **URL**: /api/categories
- **Description**: Creates a new menu category
- **Request Body**:
  ```json
  {
    "name": "Desserts",
    "restaurant_id": 1  // Optional
  }
  ```
- **Success Response** (201 Created):
  ```json
  {
    "message": "Menu category created successfully!",
    "category": {
      "id": 3,
      "name": "Desserts",
      "restaurant_id": 1,
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
  }
  ```

#### Get Category by ID
- **Method**: GET
- **URL**: /api/categories/:id
- **Description**: Retrieves a specific menu category by its ID
- **URL Parameters**: 
  - `id`: The ID of the menu category to retrieve
- **Success Response** (200 OK):
  ```json
  {
    "message": "Menu category fetched successfully!",
    "category": {
      "id": 1,
      "name": "Appetizers",
      "restaurant_id": 1,
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
  }
  ```

#### Update Category
- **Method**: PUT
- **URL**: /api/categories/:id
- **Description**: Updates a specific menu category by its ID
- **URL Parameters**: 
  - `id`: The ID of the menu category to update
- **Request Body**:
  ```json
  {
    "name": "Updated Category Name",
    "restaurant_id": 1  // Optional
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "message": "Menu category updated successfully!",
    "category": {
      "id": 1,
      "name": "Updated Category Name",
      "restaurant_id": 1,
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:30:00.000Z"
    }
  }
  ```

#### Delete Category
- **Method**: DELETE
- **URL**: /api/categories/:id
- **Description**: Deletes a specific menu category by its ID
- **URL Parameters**: 
  - `id`: The ID of the menu category to delete
- **Success Response** (200 OK):
  ```json
  {
    "message": "Menu category deleted successfully!"
  }
  ```
- **Note**: If the category has associated menu items, deletion might fail due to foreign key constraints.

## Testing the API

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/):

1. Create a new menu category:
   ```bash
   curl -X POST http://localhost:3005/api/categories \
     -H "Content-Type: application/json" \
     -d '{"name": "Appetizers"}'
   ```

2. Get all menu categories:
   ```bash
   curl http://localhost:3005/api/categories
   ```

3. Get a specific menu category (replace 1 with the actual ID):
   ```bash
   curl http://localhost:3005/api/categories/1
   ```

4. Update a menu category (replace 1 with the actual ID):
   ```bash
   curl -X PUT http://localhost:3005/api/categories/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Appetizers"}'
   ```

5. Delete a menu category (replace 1 with the actual ID):
   ```bash
   curl -X DELETE http://localhost:3005/api/categories/1
   ```

## Next Steps

Once you have the backend running, we'll work on integrating it with the frontend components. The project includes two frontend applications:

1. `customer-frontend`: The customer-facing application for ordering
2. `dashboard-frontend`: The admin/staff dashboard for managing orders and menu items

We'll focus on connecting these frontends to our backend API in the next phase of development. 