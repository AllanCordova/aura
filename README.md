# Aura

A finance application designed to help users recognize and solve financial problems.

## Description

Aura is a finance management application that empowers users to identify and resolve their financial challenges. The app provides tools and insights to help users better understand their financial situation and make informed decisions.

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Docker and Docker Compose (for database)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
POSTGRES_DB_NAME=your_db_name
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
```

### 3. Start the Database

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d db_postgres
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev
```

### 5. (Optional) Seed the Database

```bash
npx prisma db seed
```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:setup` - Setup test database

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Testing**: Jest
