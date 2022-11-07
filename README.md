This is project is my implementation of this [assignment](https://www.notion.so/Clerk-frontend-assignment-61192c152234454eadd5384d21e63df5) from Clerk, and it is built with [Next.js](https://nextjs.org/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

(for production, use `yarn build` and `yarn start`)

### Run with Docker

In case you want to run the app with Docker, I have created a Dockerfile and a docker-compose.yml file. For simplicity, I added the commands to the *package.json* file.

The below command will build the app for production as a Next *standalone* application
```bash
#Build and run with docker-compose
yarn docker-compose:up

# ---- or ----

#Build the image
yarn docker:build
#Run the container on port 8080
yarn docker:run
```