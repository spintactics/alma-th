# System Design

## Overview

This document provides a detailed explanation of the system design for the project, including its architecture, components, and decision-making processes. While the scope of the project focuses primarily on the front-end application, certain considerations are made to integrate back-end functionality, such as handling form submissions and managing authentication.

---

## Architecture

### High-Level Diagram

Frontend (Next.js + React) ---> Backend API (Next.js API Routes) ---> Data Storage (Simulated with In-Memory Storage)

## Components

### 1. Frontend

Built with: React and Next.js.
Purpose: Handles user interactions, form submissions, and displays internal leads.

Key Libraries:
JsonForms: For dynamically rendering forms using JSON schemas.
Tailwind CSS: For responsive, utility-first styling.

Features:
Public Lead Form: A form for collecting lead data.
Internal Leads List: A protected page displaying submitted leads.
Authentication: Login with a basic username-password system.

### 2. Backend API

Built with: Next.js API routes.
Purpose: Processes data submissions and validates input.
Storage: Temporarily stores leads in memory (e.g., array) for demonstration purposes.

### 3. Data Handling

Submission Flow:
- Data is validated on the client side. Ideally, as much validation is possible is handled on the client, to avoid overloading the backend. The only validation backend should do is complicated operations that require lookups, or additional logic that we want to keep hidden from the client
- Submitted leads are stored in memory and displayed on the Internal Leads List page.

### 4. Key Design Decisions

- Why React with Next.js?
**SEO**: Supports server-side rendering (SSR) for better search engine optimization.
**Simplified Routing**: Page-based routing works seamlessly for protected routes like /leads.
**Integrated API**: No need for a separate backend server.
- Why JsonForms?
**Schema-Driven**: Allows dynamic form generation based on JSON schemas.
**Validation**: Automatically validates input according to schema rules.
- Why Tailwind CSS?
**Utility-First**: Speeds up development with pre-defined CSS classes.
**Customizable**: Easy to extend styles for specific elements.

### 5. Endpoints

/api/leads
Method: POST
Purpose: Handles form submissions.
Request Payload:
```json
{
  "id": "number",
  "state": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "citizenship": "string",
  "website": "string",
  "visaCategories": ["string"],
  "helpText": "string",
  "resume": "File",
  "submittedAt": "string"
}
```
**Response**:
- 201 Created
- 500 Internal Server Error

/api/leads
Method: PATCH
Purpose: Handles updating the lead's state, from pending to reached out.
Request Payload:
```json
{
  "id": "number",
  "state": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "citizenship": "string",
  "website": "string",
  "visaCategories": ["string"],
  "helpText": "string",
  "resume": "File",
  "submittedAt": "string"
}
```
**Response**:
- 200 OK: Submission successful
- 500 Internal Server Error

/api/leads
Method: GET
Purpose: Handles fetching for all leads.

**Response**:
- 200 OK: Successful Fetch

### 6. Authentication

#### Internal Leads List
**Mechanism**: Simple form-based authentication.
- Username: admin
- Password: password
**Storage**: Credentials validated in-memory (not production-ready).

### 7. Data Flow
- 1. User Interaction
A user accesses the Public Lead Form and submits data.
- 2. Frontend Validation
Validates input dynamically (e.g., required fields, email formatting).
- 3. Backend Processing
Processes data via the /api/leads route.
Validates data again and stores it in memory.
- 4. Internal Leads List
Displays submitted leads upon successful login.

### 8. Future Improvements
- 1. Persistent Storage
Use a database (e.g., PostgreSQL or MongoDB) instead of in-memory storage.
Leverage ORM tools like Prisma for easier schema management.
- 2. Enhanced Authentication
Use industry-standard protocols like OAuth2 or JWT for secure authentication.
Protect API routes with middleware to ensure only authenticated requests.
- 3. Error Tracking
Implement error tracking tools like Sentry.
Ensure robust error messages and API response handling.
- 4. Scalability
Deploy the application on cloud services like AWS.
Introduce caching mechanisms to optimize performance.
- 5. Automated tests
Introduce unit tests for key components like the Public Lead Form and the Leads List page using a testing framework like Jest or React Testing Library.
Add integration tests for the /api/leads endpoint to validate proper handling of input data and response structure.
Incorporate end-to-end tests using Cypress to simulate user interactions and ensure the app behaves as expected.
- 6. Mobile-Friendly View
Optimize the UI for responsiveness to provide a seamless experience on smaller devices.
Adjust styles and layouts to ensure fields and buttons scale properly on mobile screens.
Test touch interactions (e.g., dropdowns and file uploads) to ensure usability on mobile devices.

### 9. Conclusion

This project demonstrates a robust and extendable design for handling public form submissions and internal lead management. While built as a front-end-focused application, the system's modular architecture allows for easy expansion to a full-stack solution with scalable and production-ready features.


