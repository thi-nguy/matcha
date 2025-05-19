# MATCHA

## 1. Intro & Stacks

Tinder likewise web application containerized (Docker) and done by:

- Front: Figma (marquette), React, Typescript, TailwindCSS, Cypress (Automated End-to-End testing).
- Back - Old version: NestJs, Prisma, GraphQl.
- Back - New Version: Express, Nodejs. (no ORM)
- Database: PostgreSQL.
- Docker.

## 2. How to start the project

### 2.1/ Initial phase (no Docker yet)

#### Step 1/2 - Build FrontEnd:

- cd ./frontend
- npm install (if you clone the project for the first time)
- npm start
- Start building your components.

#### Step 2/2 - Build Backend - Old Version:
- cd ./backend

- Build database by docker: `docker-compose -f docker-compose-just-database.yml up` --> Keep the database opened in a terminal window.
- Apply Migration to the database: `npx prisma migrate dev`
- Open Prisma studio to see if database is updated with the migration. (Or we can update database directly by Prisma Studio): `npx prisma studio`

- Install all dependencies (Apollo, Nestjs, Graphql...) for the backend: `npm install` (if it is your first time here)
- Run Nestjs server: `npm run start:dev`. The server is running at the port 3000 by default. But you can check it in `main.ts` to be sure. Here we use port `3333`. So go to `localhost:3333/graphql` to play around with graphql queries.


### 2.2/ More professional phase (one docker-compose to build it all)

## 3. Other things

### 3.1/ Marquette

- Old version: [figma](https://www.figma.com/design/Fk3uNc9sXpJAGlf6RVKOgA/Matcha?node-id=0-1)
- New version: [uk.match.com](https://uk.match.com/)
