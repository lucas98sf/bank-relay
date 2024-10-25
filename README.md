# Banking Application with Relay

A full-stack banking application built with React, Relay, GraphQL, Prisma, and MongoDB.

## Features

- 🔐 User authentication (registration & login)
- 💰 Account balance tracking
- 📝 Transaction history
- 💸 Send/receive money between accounts
- 📱 Responsive design using shadcn/ui
- 🔄 Real-time updates with GraphQL
- 🎯 Type-safe operations with TypeScript

## Technology Stack

### Backend
- Node.js
- GraphQL Yoga
- Pothos GraphQL Schema Builder
- Prisma ORM
- MongoDB
- JWT Authentication

### Frontend
- React
- Relay
- React Router
- shadcn/ui
- TailwindCSS
- TypeScript
- Vite

## Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Docker (for MongoDB)
- Git

## Getting Started

### Backend Setup

1. Navigate to the API directory:
```bash
cd packages/api
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
pnpm db
```

5. Generate Prisma client and GraphQL schema:
```bash
pnpm prisma:generate
pnpm schema
```

6. Start the development server:
```bash
pnpm dev
```

The GraphQL API will be available at `http://localhost:4000/graphql`

### Frontend Setup

1. Navigate to the app directory:
```bash
cd packages/app
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Testing

The API has tests which can be run with
```bash
pnpm test
```