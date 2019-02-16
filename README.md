# Postgres Info
## Local IP Address
  - 192.168.99.100:5432
  - We use the default port **5432**

## View Database Via PgAdmin
  After running the docker, go to the following address:
  `192.168.99.100:80`

## Adding Volumes
  - run `docker volume create data` for persistent data storage

## Updating the database
  1. `docker volume rm data`
  2. `docker volume create data`
  3. `docker-compose up --build -d`

# TODO
  - Setup all the endpoints
  - Create frontend forms



  - login *
  - registration *
  - classes *
  - lessons *
  - lesson *
  - create lesson
  - calendar
