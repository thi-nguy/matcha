test
# MATCHA

## Intro & Stacks

Tinder likewise web application containerized (Docker) and done by:

- Front: Figma (marquette), React, Typescript, TailwindCSS, Cypress (Automated End-to-End testing).
- Back: NestJs, Prisma, GraphQl.
- Database: PostgreSQL.
- Docker.

## How to start the project

### Initial phase (no Docker yet)

#### 1/2 - Build FrontEnd:

- cd ./frontend
- npm install (if you clone the project for the first time)
- npm start
- Start building your components.

#### 2/2 - Build Backend:
- cd ./backend

- Build database by docker: `docker-compose -f docker-compose-just-database.yml up` --> Keep the database opened in a terminal window.
- Apply Migration to the database: `npx prisma migrate dev`
- Open Prisma studio to see if database is updated with the migration. (Or we can update database directly by Prisma Studio): `npx prisma studio`

- Install all dependencies (Apollo, Nestjs, Graphql...) for the backend: `npm install` (if it is your first time here)
- Run Nestjs server: `npm run start:dev`. The server is running at the port 3000 by default. But you can check it in `main.ts` to be sure. Here we use port `3333`. So go to `localhost:3333/graphql` to play around with graphql queries.

#### Start developing your site after the two steps above.

### More professional phase (one docker-compose to build it all)

## Todo List - Preparation Phase

### Marquette

- [Stanley] [] Do the marquette for main features of the website.

### Docker

- Do Dockerfile for front service.
- Do Dockerfile for back service.
- Do docker-compose.yml to build up needed service at the same time: front, back, nginx, database, admin.
- Do different docker-compose files for Prod and Dev.

### Database

### FrontEnd Setup

- [x] Build React App with Typescript + TailwindCSS.

## BackEnd Setup

- Setup a database using Docker.
- Build NestJs App and connect to database by Prisma or TypeOrm.

### Others

- Learn about SOLID method: How to write clean code NestJs.

## ToDo List - Development Phase

### Sign Up Feature
