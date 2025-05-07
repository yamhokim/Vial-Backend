# Vial Backend

A RESTful API service built with Fastify, TypeScript, and Prisma for managing form data and queries. This backend service provides the necessary endpoints for the Vial frontend application to handle form data entries and their associated queries.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v22+)
- npm (v10+)
- Docker and Docker Compose

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vial-backend
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Start the services using Docker:

```bash
docker-compose build
docker-compose up
npm run migrate
npm run seed
```

The API will be available at [http://localhost:8080](http://localhost:8080) by default.

If you ever make any changes to the schema and need to migrate them to keep the database up to data:

```bash
docker exec -it vial-backend-api npx prisma migrate dev --name <name-of-migration>
```

## API Documentation

### Base URL

```
http://localhost:8080
```

### Authentication

Currently, the API does not require authentication.

### Response Format

All responses are in JSON format and follow this structure:

```json
{
  "data": {}, // Response data (if successful)
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
  // Error information (if failed)
}
```

### Endpoints

#### 1. Get All Form Data

Retrieves all form data entries with their associated queries.

```http
GET /form-data
```

**Response**

```json
{
  "total": 10,
  "formData": [
    {
      "id": "uuid",
      "question": "What was the Individual Dose of the Medication?",
      "answer": "500mg",
      "query": {
        "id": "uuid",
        "title": "Query Title",
        "description": "Query Description",
        "status": "OPEN",
        "createdAt": "2024-03-20T12:00:00Z",
        "updatedAt": "2024-03-20T12:00:00Z"
      }
    }
  ]
}
```

#### 2. Create Query

Creates a new query for a form data entry.

```http
POST /query
```

**Request Body**

```json
{
  "title": "Query Title",
  "description": "Query Description",
  "formDataId": "uuid"
}
```

**Response (201 Created)**

```json
{
  "id": "uuid",
  "title": "Query Title",
  "description": "Query Description",
  "status": "OPEN",
  "createdAt": "2024-03-20T12:00:00Z",
  "updatedAt": "2024-03-20T12:00:00Z",
  "formDataId": "uuid"
}
```

**Error Responses**

- `400 Bad Request`: Invalid request body
- `404 Not Found`: Form data not found
- `400 Bad Request`: Query already exists for this form data

#### 3. Update Query

Updates an existing query's status and optional description.

```http
PUT /query/:id
```

**URL Parameters**

- `id`: Query UUID

**Request Body**

```json
{
  "status": "RESOLVED"
}
```

**Response (200 OK)**

```json
{
  "id": "uuid",
  "title": "Query Title",
  "description": "Query description",
  "status": "RESOLVED",
  "createdAt": "2024-03-20T12:00:00Z",
  "updatedAt": "2024-03-20T13:00:00Z",
  "formDataId": "uuid"
}
```

**Error Responses**

- `400 Bad Request`: Invalid request body
- `404 Not Found`: Query not found

#### 4. Delete Query

Deletes a query by ID.

```http
DELETE /query/:id
```

**URL Parameters**

- `id`: Query UUID

**Response (204 No Content)**
No response body

**Error Responses**

- `404 Not Found`: Query not found

### Error Codes

| Code                   | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `FORM_DATA_NOT_FOUND`  | The specified form data entry does not exist                |
| `QUERY_NOT_FOUND`      | The specified query does not exist                          |
| `QUERY_ALREADY_EXISTS` | A query already exists for this form data                   |
| `INVALID_STATUS`       | The provided status is not valid (must be OPEN or RESOLVED) |

## Database Schema

### Form Data Model

```prisma
model FormData {
  id       String  @id @default(uuid())
  question String
  answer   String
  query    Query?
}
```

### Query Model

```prisma
model Query {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   @default("OPEN")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  formData    FormData @relation(fields: [formDataId], references: [id])
  formDataId  String   @unique
}
```

## Testing the API

You can test the API using curl:

```bash
# Get all form data
curl --location 'http://localhost:8080/form-data' \
--header 'Content-Type: application/json'

# Create a new query
curl --location 'http://localhost:8080/query' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Query Title",
    "description": "Query Description",
    "formDataId": "form-data-id"
}'
```

## Project Structure

```
vial-backend/
├── src/
│   ├── routes/              # API route handlers
│   ├── db/                  # Database configuration
│   ├── errors/             # Error handling
│   └── schemas/            # TypeScript interfaces
├── prisma/                 # Prisma schema and migrations
└── docker-compose.yml      # Docker configuration
```
