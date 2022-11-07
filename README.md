This is project is my implementation of
this [assignment](https://www.notion.so/Clerk-frontend-assignment-61192c152234454eadd5384d21e63df5) from Clerk, and it
is built with [Next.js](https://nextjs.org/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

(for production, use `yarn build` and `yarn start`)

### Run with Docker

In case you want to run the app with Docker, I have created a Dockerfile and a docker-compose.yml file. For simplicity,
I added the commands to the *package.json* file.

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

## Additional Information

### Folder Structure

- `pages` - Contains the pages of the application. Each page is a React component. The name of the file is the route of
  the page.
- `components` - Contains the small components of the application. Usually, these components are used in multiple pages.
- `styles` - Contains the global styles of the application. The app is styled with SASS, and CSS modules. Breakpoints,
  Typography and Color variables are defined there.
- `utils` - Contains the helper functions or constants of the application. Simple functions for color manipulation, or
  constants for the breakpoints are defined there.
- `services` - Contains the services of the application. The services are responsible for the communication with the
  backend.
- `modules` - Contains the larger components of the application. Usually, these components are used as whole sections or
  features.
- `layouts` - Contains the layouts of the application. The layouts are used to wrap the pages and the modules. The
  layouts are responsible for the global markup. Also contains helper components that affect the layout of their
  children. F.e. `Stack` is a simple flexbox wrapper.
- `hooks` - Contains the custom hooks of the application that are meant to be used globally.


### Code formatting
`.prettierrc.js` and `.eslintrc.js` files are added to the project to enforce code formatting.

### Testing
For testing I did not used a dedicated directory, but I added the tests to the same directory as the component.
F.e. `Button.test.tsx` is the test file for the `Button.tsx` component.

```bash
#Run tests
yarn test
# ---- or ----
yarn test:ci
```