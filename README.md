# User Management Dashboard

Overview
A modern React application for managing user data with authentication, CRUD operations, and a responsive UI.

## Installation

### Frontend Setup (React + Vite + Tailwind)

#### Clone the Repo

```bash
  git clone https://github.com/Keshavvakul/assignment-EmployWise.git
  cd assignment-EmployWise
```

#### Install dependencies:

```bash
  npm install
```

#### Start the development server

```bash
  npm run dev
```

Frontend runs at: http://localhost:5173

## Features

### Authentication System

- Secure login with JWT tokens
- Protected routes for authenticated users
- Form validation using Zod

### User Management

- View users in a paginated table
- Edit user information
- Delete users with confirmation
- Sortable columns

### Modern Tech Stack

- React with TypeScript
- React Query for data fetching and caching
- React Router for navigation
- Tailwind CSS for styling

## Usage

### Login

Use the following credentials to log in:

- Email: eve.holt@reqres.in
- Password: cityslicka

### User Management

After logging in, you'll be redirected to the user management dashboard where you can:

- Browse users with pagination
- Edit user details
- Delete users

## API Integration

This project uses the ReqRes API for demonstration purposes:

- Authentication: POST /api/login
- User listing: GET /api/users?page={page}
- User update: PUT /api/users/{id}
- User deletion: DELETE /api/users/{id}

## Technologies Used

- React 18
- TypeScript
- React Query
- React Router
- Tailwind CSS
- Shadcn Ui
- React Hook Form
- Zod
- Axios

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- ReqRes for providing a test API
- Shadcn UI for accessible UI primitives
- TanStack Query for data fetching
