# Booking API Documentation

## Get Checkout Session

- **Route**: `GET /checkout-session/:tourID`
- **Description**: Retrieve the checkout session for booking a specific tour.
- **Usage**: Protected route; accessible to authenticated users.
- **Request Parameters**:
  - `tourID` (string): The ID of the tour for which to create a checkout session.
- **Response**: JSON data representing the checkout session.

---

## Get User's Bookings

- **Route**: `GET /mybookings`
- **Description**: Retrieve all bookings made by the currently authenticated user.
- **Usage**: Protected route; accessible to authenticated users.
- **Response**: JSON list of the user's bookings.

---

## Create Temporary Booking

- **Route**: `GET /tempbookmethod`
- **Description**: Create a temporary booking for method testing purposes.
- **Usage**: Accessible to all users.
- **Response**: JSON data representing the temporary booking.

---

## Get All Bookings

- **Route**: `GET /`
- **Description**: Retrieve a list of all bookings.
- **Usage**: Restricted to admin and lead guide roles.
- **Response**: JSON list of all bookings.

---

## Create a New Booking

- **Route**: `POST /`
- **Description**: Create a new booking.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Body**: JSON data representing the new booking.
- **Response**: JSON data representing the created booking.

---

## Get Booking by ID

- **Route**: `GET /:id`
- **Description**: Retrieve a booking by its ID.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Parameters**:
  - `id` (string): The ID of the booking.
- **Response**: JSON data representing the booking.

---

## Update Booking by ID

- **Route**: `PATCH /:id`
- **Description**: Update a booking by its ID.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Parameters**:
  - `id` (string): The ID of the booking to update.
- **Request Body**: JSON data with updates for the booking.
- **Response**: JSON data representing the updated booking.

---

## Delete Booking by ID

- **Route**: `DELETE /:id`
- **Description**: Delete a booking by its ID.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Parameters**:
  - `id` (string): The ID of the booking to delete.
- **Response**: No content (204) on successful deletion.
