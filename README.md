# Airbnb Clone Backend

This is the backend server for an Airbnb clone application built using Node.js, Express, and MongoDB. It provides APIs for managing accommodations, reservations, and user authentication. The backend also supports features such as user registration, login, profile management, and more.

## Features

- **User Authentication:**
  - Register new users.
  - User login with JWT authentication.
  - Get user profile details.

- **Accommodation Management:**
  - Create new accommodations.
  - Get details of all accommodations or a specific accommodation by ID.
  - Delete accommodations by ID.
  - List all accommodations created by a specific user.

- **Reservation Management:**
  - Create new reservations.
  - Get all reservations for a user.
  - Get all reservations for accommodations managed by a specific host.
  - Delete reservations by ID.

## Tech Stack

- **Node.js:** JavaScript runtime for server-side programming.
- **Express.js:** Web framework for Node.js to build RESTful APIs.
- **MongoDB:** NoSQL database to store users, accommodations, and reservations.
- **Mongoose:** ODM library for MongoDB.
- **JWT (JSON Web Tokens):** For secure user authentication.
- **Cors:** To handle Cross-Origin Resource Sharing.
- **dotenv:** To manage environment variables.

## Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** running instance.
- **Postman** or any API client for testing the endpoints.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/airbnb-clone-backend.git
    cd airbnb-clone-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Setup environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/airbnb-clone
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

    The server will be running at `http://localhost:5000`.

## API Endpoints

### User Routes

- **Register a new user**
  - `POST /api/users/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- **Login a user**
  - `POST /api/users/login`
  - Body: `{ "email": "john@example.com", "password": "password123" }`

- **Get user profile**
  - `GET /api/users/profile`
  - Headers: `Authorization: Bearer <token>`

### Accommodation Routes

- **Create an accommodation**
  - `POST /api/accommodations`
  - Headers: `Authorization: Bearer <token>`
  - Body: See the [Accommodation Model](#accommodation-model)

- **Get all accommodations**
  - `GET /api/accommodations`

- **Get accommodation by ID**
  - `GET /api/accommodations/:id`

- **Delete accommodation by ID**
  - `DELETE /api/accommodations/:id`
  - Headers: `Authorization: Bearer <token>`

- **Get all accommodations created by a specific user**
  - `GET /api/accommodations/user/:userId`
  - Headers: `Authorization: Bearer <token>`

### Reservation Routes

- **Create a reservation**
  - `POST /api/reservations`
  - Headers: `Authorization: Bearer <token>`
  - Body: See the [Reservation Model](#reservation-model)

- **Get reservations by host**
  - `GET /api/reservations/host`
  - Headers: `Authorization: Bearer <token>`

- **Get reservations by user**
  - `GET /api/reservations/user`
  - Headers: `Authorization: Bearer <token>`

- **Delete a reservation by ID**
  - `DELETE /api/reservations/:id`
  - Headers: `Authorization: Bearer <token>`

## Models

### Accommodation Model

- `name`: String (required)
- `location`: String (required)
- `price`: Number (required)
- `images`: Array of Strings (required)
- `rating`: Number (required)
- `guests`: Number (required)
- `bedrooms`: Number (required)
- `beds`: Number (required)
- `bathrooms`: Number (required)
- `amenities`: Array of Strings
- `host`: String (required)
- `description`: String (required)
- `createdBy`: ObjectId (refers to User, required)

### Reservation Model

- `accommodation`: ObjectId (refers to Accommodation, required)
- `user`: ObjectId (refers to User, required)
- `checkInDate`: Date (required)
- `checkOutDate`: Date (required)
- `guests`: Number (required)
- `totalPrice`: Number (required)

### User Model

- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required)

## Error Handling

All errors are returned in JSON format with a descriptive message.

Example:
```json
{
  "error": "User not found"
}
