# Tour API Documentation

## Get Top 5 Cheap Tours

- **Route**: `GET /top-5-cheap`
- **Description**: Retrieve the top 5 cheapest tours.
- **Usage**: Open to all users.
- **Response**: JSON list of top 5 cheapest tours.

---

## Get Monthly Plan for Tours

- **Route**: `GET /monthly-plan/:year`
- **Description**: Retrieve the monthly plan for tours for a specific year.
- **Usage**: Restricted to admin, lead guide, and guide roles.
- **Request Parameters**:
  - `year` (integer): The year for which to retrieve the plan.
- **Response**: JSON data representing the monthly plan.

---

## Get Tour Stats

- **Route**: `GET /tour-stats`
- **Description**: Retrieve statistics about tours.
- **Usage**: Open to all users.
- **Response**: JSON data with tour statistics.

---

## Get Tours Within a Distance

- **Route**: `GET /tours-within/:distance/center/:latlng/unit/:unit`
- **Description**: Retrieve tours within a specified distance from a geographic point.
- **Usage**: Open to all users.
- **Request Parameters**:
  - `distance` (number): The maximum distance in the specified unit.
  - `latlng` (string): Geographic coordinates in the format "lat,lng."
  - `unit` (string): Unit of measurement (e.g., "km" or "mi").
- **Response**: JSON data with tours within the specified distance.

---

## Get Distances to Tours

- **Route**: `GET /distances/:latlng/unit/:unit`
- **Description**: Calculate distances to all tours from a geographic point.
- **Usage**: Open to all users.
- **Request Parameters**:
  - `latlng` (string): Geographic coordinates in the format "lat,lng."
  - `unit` (string): Unit of measurement (e.g., "km" or "mi").
- **Response**: JSON data with distances to tours.

---

## Get All Tours

- **Route**: `GET /`
- **Description**: Retrieve a list of all tours.
- **Usage**: Open to all users.
- **Response**: JSON list of all tours.

---

## Create a New Tour

- **Route**: `POST /`
- **Description**: Create a new tour.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Body**: JSON data representing the new tour.
- **Response**: JSON data representing the created tour.

---

## Get Tour by ID

- **Route**: `GET /:id`
- **Description**: Retrieve a tour by its ID.
- **Usage**: Open to all users.
- **Request Parameters**:
  - `id` (string): The ID of the tour.
- **Response**: JSON data representing the tour.

---

## Update Tour by ID

- **Route**: `PATCH /:id`
- **Description**: Update a tour by its ID.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Parameters**:
  - `id` (string): The ID of the tour to update.
- **Request Body**: JSON data with updates for the tour.
- **Response**: JSON data representing the updated tour.

---

## Delete Tour by ID

- **Route**: `DELETE /:id`
- **Description**: Delete a tour by its ID.
- **Usage**: Restricted to admin and lead guide roles.
- **Request Parameters**:
  - `id` (string): The ID of the tour to delete.
- **Response**: No content (204) on successful deletion.
