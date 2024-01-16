# How to create a Backend Service manually (not dockerize) (PorstGres, NestJs, Prisma, Graphql)

1. Create project nestjs

- Install nest: `npm i @nestjs/cli`
- Create project nest (backend): `nest new project-name`. If this does not work, use `npx @nestjs/cli new project-name`.
- Run Project nest: `npm run start:dev`. You can see the project is launched at `localhost:3000`.

- May need to change to newer npm version by using: `nvm use v20.9.0` (to be compatible between `node` and `nest`).

2. Create Database by docker

- Add docker compose file to build up database from container. Here the file is named `docker-compose-just-database.yml`.
- Run `docker-compose -f file_name.yml up`
- Keep the database opened. At this step, your project nest above has not yet connected to your database.

3. Connect project nestjs to database.

3a. Install Prisma

- `yarn add -D prisma` => Prisma is updated and listed in the `package.json`
- `yarn add @prisma/client` => Prisma/client is updated and listed in the `package.json`
- `npx prisma init`
  => This command will create a prisma folder which has `schema.prisma`. We will define our database in this file: how many table we have, in each table has how many columns, the relationship between tables. See 3b.
  => This command also create a file `.env` which inside we'll change the `DATABASE_URL` to connect to our database which is launched at step 2.

3b. Create first schemas.

- As you wish. At the initial database, I created just table `User` and `Post` with some basic columns.

3c. Change file `.env` to point the project nest to our database.

- Info is taken from the docker-compose file on step 2 (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB and the port)

3d. Migration

- Run `npx prisma migrate dev`. This will 1) apply everything in the schema to our database. 2) generate migration file (SQL code) in the folder `prisma/migrations`. 3) Create type User and Post in typescript so we can use directly in our project nestjs.

3e. Check database is updated with the migration

- `npx prisma studio` ==> Open the database and we can modify it directly (without the migration).

4. Create Prisma global Module and Service

- `nest g service prisma` or `npx @nestjs/cli g service prisma`
- `nest g module prisma` or `npx @nestjs/cli g module prisma`

5. Back to basic

- At this point we have the database connected to our backend project. We now have 2 choices, either using REST or Graphql API.
- If we use REST: Controller --> Service --> Prisma --> Database
- If we use Graphql: Resolver --> Service --> Prisma --> Database
- In this project we'll use GraphQl. So the next steps will be how to setup Graphql into our project.

6. Config Graphql into the project

Ref: https://docs.nestjs.com/graphql/quick-start

- Install required packages (for Express and Apollo): `npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql`
- At this step, we have 2 approaches: Code first or Schema first. In here we choose Code First approach.
- Config GraphQlModule in the file `app.module.ts`. (Your approach that you chose above will affect the Config).

7. Start a Post Module to test.

- `nest g resource post` ==> Choose Code first ==> This creates folder `post` that have all necessary files (Post Module / Resolver / Service + DTO and entities). All you need is to modify them to suit your use. I kept only needed files in this case.
- Now we can go to the playground `localhost:3000/graphql` to test our first graphql query. Before that, you'll need to build your database as in Step 2 and 3. Also you might need to add some data to your database in order to test your query.

8. Connect Backend to Frontend.
