# Postgres Info

## Local IP Address

- 192.168.99.100:5432
- We use the default port **5432**

## View Database Via PgAdmin

After running the docker, go to the following address:
`192.168.99.100:80`

## Updating the database

1. `docker-compose down`
2. `docker volume prune -f`
3. `docker-compose up --build`

## Frontend

- endpoints to communicate with backend are in server.js

- after doing `docker-compose up` go to `192.168.99.100:3000`
