# Sample code

This codebase is a sample for demo purpose only and is not executable. It only contains some of the sample code from the project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Both ther server and client side version of the code is in the repo.

Following is the structure of the code:


.   
├── README.md   
├── config **(React build/env configurations)**   
├── package.json **(Used for both the server and the client)**   
├── public **(Public assets coppied over to the build)**   
├── scripts **(React's build configuration)**   
├── server **(Server code, Express JS)**   
├── src (**React source code used in both client and server**)   
├── tsconfig.json   
└── yarn.lock   


## Available Scripts

In the project directory, you can run:

**`npm` is prefered over `yarn` but both work fine**
** You should run `npm run setup` or `yarn run setup` rather than `npm install` or `yarn` to install the packages**

### `npm start` or `yarn start` runs the app as client app.

Runs the app as client side in the development mode. Ideal for development in most cases and when not working on SSR specific functionality.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The token is required to run the app on local. In order to set the token correctly follow these setps:

1. Create a `settings.json` file in the `src` directory.
2. Use the `settings.json.sample` file.
3. The `baseURL` key is what points to the correct API end point.
4. Copy the base URL from the `settings.json.sample`'s local,dev or staging keys and put is as the value of `baseUrl`.
5. Leave the token as blank string.
6. Add `/login` to the URL in the address bar. It will navigate you to the login page.
7. Use the credentials of the environemtn you set in step 4 to login, this will set the token for that user in the cookie.

The page will reload if you make edits.   
You will also see any lint errors in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.   
It correctly bundles React in production mode and optimizes the build for the best performance.   

The build is minified and the filenames include the hashes.   
Your app is ready to be deployed!   

The build gets copied to `server/dashboard`. Express serves the code to the client with the static assets from this directory.

> If you run this command on local to do some SSR work, make sure that you are not pushing the changes to the `server/dashboard` directory to git.

### `npm run server` or `yarn server`

Runs the code in SSR mode, it runs the code on the SRC directory and serves it on the client. To make sure that the changes reflected, you will have to run the build every time you make changes to the `src` directory.

The server starts automatically when a file changes.

> This is the command that needs to run on the server while starting the node service. 

### `npm run format` or `yarn format` [DO NOT USE]

This needs some fixes in the configuration. Format the code with the project's custom code style guide.

## File and folder naming

- Use camel casing starting with _Capital letter_ for components, eg. ComponentName.
- Name the folders inside components with camel cases, starting with _Capital letter_.