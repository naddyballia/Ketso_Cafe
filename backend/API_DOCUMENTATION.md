# Ketso Cafe API Documentation

## Authentication Endpoints

### Register User
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

### Login User
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

## Menu Category Endpoints

### Get All Categories
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

### Create Category
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

### Get Category by ID
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