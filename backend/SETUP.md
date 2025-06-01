# Ketso Cafe Setup Instructions

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (v12.x or higher)

## Clone the Repository

```bash
git clone [REPOSITORY_URL]
cd Ketso_Cafe
```

## PostgreSQL Setup

1. Log in to PostgreSQL:
   ```bash
   psql -U postgres
   ```

2. Create the database:
   ```sql
   CREATE DATABASE ketso_cafe_db;
   ```

3. Connect to the database:
   ```sql
   \c ketso_cafe_db
   ```

4. Create the necessary tables:
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

## Backend Project Setup

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
   DB_USER=your_postgres_username
   DB_PASS=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432

   # Server Configuration
   PORT=3005

   # Authentication
   JWT_SECRET=your_secure_random_string

   # Other Settings
   NODE_ENV=development
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   node app.js
   ```

6. The server should now be running at http://localhost:3005

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