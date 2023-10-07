# User API Documentation

## Get All Reviews

- **Route**: `GET /`
- **Description**: Retrieve all reviews.
- **Usage**: Protected route; accessible to all authenticated users.
- **Response**: JSON list of all reviews.

---

## Create a New Review

- **Route**: `POST /`
- **Description**: Create a new review for a tour.
- **Usage**: Restricted to regular users (non-admin).
- **Request Body**: JSON data representing the new review.
- **Response**: JSON data representing the created review.

---

## Get Review by ID

- **Route**: `GET /:id`
- **Description**: Retrieve a review by its ID.
- **Usage**: Protected route; accessible to all authenticated users.
- **Request Parameters**:
  - `id` (string): The ID of the review.
- **Response**: JSON data representing the review.

---

## Delete Review by ID

- **Route**: `DELETE /:id`
- **Description**: Delete a review by its ID.
- **Usage**: Restricted to regular users (non-admin) and admins.
- **Request Parameters**:
  - `id` (string): The ID of the review to delete.
- **Response**: No content (204) on successful deletion.

---

## Update Review by ID

- **Route**: `PATCH /:id`
- **Description**: Update a review by its ID.
- **Usage**: Restricted to regular users (non-admin) and admins.
- **Request Parameters**:
  - `id` (string): The ID of the review to update.
- **Request Body**: JSON data with updates for the review.
- **Response**: JSON data representing the updated review.
