# User API Documentation

## Authentication

### Sign Up

- **Route**: `POST /signup`
- **Description**: Create a new user account.
- **Request Body**:
  - `username` (string): User's username.
  - `email` (string): User's email address.
  - `password` (string): User's password.
  - `passwordConfirm` (string): User's confirm password.
- **Response**:
  - Status: 201 Created (User successfully created).
  - Status: 400 Bad Request (Invalid request data).

### Log In

- **Route**: `POST /login`
- **Description**: Log in with an existing user account.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response**:
  - Status: 200 OK (User successfully logged in).
  - Status: 401 Unauthorized (Invalid credentials).

### Log Out

- **Route**: `POST /logout`
- **Description**: Log out the currently authenticated user.
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login.
- **Response**:
  - Status: 204 No Content (User successfully logged out).

### Forgot Password

- **Route**: `POST /forgotPassword`
- **Description**: Send an email with instructions for resetting the password.
- **Request Body**:
  - `email` (string): User's email address.
- **Response**:
  - Status: 200 OK (Email sent with reset instructions).
  - Status: 400 Bad Request (Invalid request data).

### Reset Password

- **Route**: `PATCH /resetPassword/:token`
- **Description**: Reset the user's password with a valid reset token.
- **Request Parameters**:
  - `token` (string): Reset token received via email.
- **Request Body**:
  - `password` (string): New password.
- **Response**:
  - Status: 200 OK (Password successfully reset).
  - Status: 400 Bad Request (Invalid token or password).

## User Management

### Get Current User

- **Route**: `GET /me`
- **Description**: Retrieve the profile of the currently authenticated user.
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login.
- **Response**:
  - Status: 200 OK (User profile retrieved).

### Update Current User

- **Route**: `PATCH /updateMe`
- **Description**: Update the profile of the currently authenticated user.
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login.
- **Request Body**: (Provide details about expected fields for updating the user profile)
- **Response**:
  - Status: 200 OK (User profile successfully updated).
  - Status: 400 Bad Request (Invalid request data).

### Delete Current User

- **Route**: `DELETE /deleteMe`
- **Description**: Delete the profile of the currently authenticated user.
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login.
- **Response**:
  - Status: 204 No Content (User profile successfully deleted).

### Get User by ID

- **Route**: `GET /:id`
- **Description**: Retrieve the profile of a user by their ID.
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login (for protected routes).
- **Request Parameters**:
  - `id` (string): User's ID.
- **Response**:
  - Status: 200 OK (User profile retrieved).
  - Status: 404 Not Found (Invalid user ID).

## Admin Operations

### Get All Users (Admin)

- **Route**: `GET /`
- **Description**: Retrieve a list of all user profiles (admin-only).
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login (admin role required).
- **Response**:
  - Status: 200 OK (List of user profiles retrieved).

### Update User by ID (Admin)

- **Route**: `PATCH /:id`
- **Description**: Update the profile of a user by their ID (admin-only).
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login (for protected routes).
- **Request Parameters**:
  - `id` (string): User's ID.
- **Request Body**: (Provide details about expected fields for updating the user profile)
- **Response**:
  - Status: 200 OK (User profile successfully updated).
  - Status: 404 Not Found (Invalid user ID).

### Delete User by ID (Admin)

- **Route**: `DELETE /:id`
- **Description**: Delete the profile of a user by their ID (admin-only).
- **Request Headers**:
  - `Authorization` (string): Bearer token obtained during login (for protected routes).
- **Request Parameters**:
  - `id` (string): User's ID.
- **Response**:
  - Status: 204 No Content (User profile successfully deleted).
  - Status: 404 Not Found (Invalid user ID).

## Middlewares

### Protect

- **Description**: The `protect` middleware is used to protect routes that require authentication. It checks the validity of the provided authentication token (Bearer token) in the request headers. If a valid token is not present or is expired, the middleware returns a 401 Unauthorized response, denying access to the protected route.

- **Usage**: Apply the `protect` middleware to routes that require authentication by including it as middleware in the route definition.

- **Response**:
  - **Status**: 401 Unauthorized (Access denied due to missing or invalid token).

### Restrict To

- **Description**: The `restrictTo` middleware is used to restrict routes for specific role of users. It checks the role of the user. If a valid role is not present, the middleware returns a 403 Forbidden response, denying access to the restricted route.

- **Usage**: Apply the `restrictTo` middleware to routes that require restriction by including it as middleware in the route definition.

- **Response**:
  - **Status**: 403 Forbidden (Access denied due to invalid rule).
