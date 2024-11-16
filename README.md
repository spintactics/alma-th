This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# Lead Application

This repository contains a web application for managing leads through a public lead form and an internal leads list.

## Features

- **Public Lead Form**: Collects leads through a user-friendly form.
- **Thank You Page**: Redirects users after successful submission.
- **Internal Leads List**: Displays a table of all submitted leads (requires authentication).

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v22.11.0 or higher)
- **npm** (v10.9.0 or higher)

---

## How to Run the Application Locally

### 1. Clone the Repository

Run the following command in your terminal to clone the repository:

```bash
git clone https://github.com/spintactics/alma-th.git
cd alma-th
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Access the Application

Public Lead Form: Open your browser and go to [http://localhost:3000](http://localhost:3000). This is the public-facing form for submitting leads. Successful submissions redirect to the Thank You page.

Internal Leads List: Navigate to [http://localhost:3000/leads](http://localhost:3000/leads). This page displays all submitted leads and is secured by an authentication step. If you haven't authenticated, the webapp will redirect you to the login page.

### 5. Login Details for Internal Leads List

To access the **Internal Leads List**, use the following credentials:

- **Username**: `admin`
- **Password**: `password`

> **Note**: If no valid `authToken` is present, users will be redirected to the login page.

### Technologies Used

- **React**: Frontend framework
- **Next.js**: Full-stack framework for React
- **JsonForms**: JSON Schema-driven form generation
- **Tailwind CSS**: Utility-first CSS framework

## Contact

For further assistance or inquiries, please contact [ycfang87@gmail.com](mailto:ycfang87@gmail.com).

