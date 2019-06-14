# Setup

## Installing dependencies

Run `npm install` in the following places:

- `/frontend`
- `/nodeAPI`
- This directory

## Text editor

### VSCode is recommended with the following extensions

- Prettier (Required)
- ESLint (Required)
- Docker (Recommended)
- GitLens (Recommended)
- Git History (Recommended)
- npm (Recommended)
- npm intellisense (Recommended)

### Configure Settings

To enable auto format on save:

1. Go to file -> preferences -> settings
2. Go to Text Editor -> formatting
3. Check format on save

## Docker

Install Docker or Docker Toolbox (If you have windows home edition)

Run `docker-machine start` if you have docker toolbox

To run the backend, run `docker-compose up -d --build`

To run the backend with logs, run `docker-compose up --build`

To run the backend without building a new image run `docker-compose up -d`

To shut down the docker containers that are running, run `docker-compose down`

To clear all database data run `docker volume prune -f`

If something goes wrong with docker, run `docker system prune -f` and `docker-volume prune -f`

To see all running containers and their IDs run `docker ps`

To see all containers and their IDs run `docker ps -a`

To see the logs of a container run `docker logs <containerid>`

## Reactapp

To run the frontend, go to the `frontend` directory and run `npm start`

## IP addresses and ports

- Reactapp frontend: localhost:3000
- frontend container: 192.168.99.100:3000
- API Backend: 192.168.99.100:3001
- Database: 192.168.99.100:5432
- PG admin: 192.168.99.100:80

## PG admin

Make sure you are running the docker containers.

Go to the pg admin page (192.168.99.100:80)

Login with:

- username: `admin`
- password: `password`

### To add a server

1. IP address is 192.168.99.100
2. Port is 5432
3. Username is `postgres`
4. Password is `admin`

### Bugs and fixes

If ESLint gives you a problem with something related to `cr`, then change the end of line sequence from `CRLF` to `LF` (Bottom right of VSCode)
