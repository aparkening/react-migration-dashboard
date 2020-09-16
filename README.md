# React Migration Dashboard

Migration Dashboard is a React-based proof-of-concept tool to help authors track content status amidst a large editorial migration project. This isn't intended to be a permanent addition to a site, but rather an assistant for the duration of the internal project. 

The sample content is biographies of well-known chefs in the Portland, Maine restaurant scene.

Features:
- Initial state is populated by a JSON fetch
- Moving an item updates state and patches the bio entity on the server 
- Patches are more secure using a session token
- An alert component displays for 5 seconds if patch fails
- Items visually fade in and out when moved
- AirBnB-based linting configuration: https://github.com/airbnb/javascript/tree/master/react
- Styling generally in components for portability

## Local Installation
1. Install app
```
    $ yarn install 
    or 
    $ npm install
```
2. To interact locally:
- Swap comments with live and test url variables in the `src/App.jsx` fetch methods.
-  Uncomment the `src/App.jsx` initialData import to grab local data. Then swap comments with live and test `this.state` in the constructor.
-  Change the img src to be `/images/${headshotFilename}` in `src/components/Card.jsx`.

3. Start server, which will also open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload if you make edits. You will also see basic lint errors in the console.
```
    $ yarn start 
    or 
    $ npm start
```

4. Manually lint files using the AirBnB eslint configuration using `npx eslint <file>`. For example:
```
    npx eslint src/components/ListItem.jsx
```

## Executable Installation
1. Build optimized app to run on non-Node.js servers. App will be in production `build` folder. 
```
    $ yarn build 
    or 
    $ npm run build
```

2. To place inside a Drupal module, for example, move the files and folders from `/static` to your corresponding module locations.

3. Place a React-specific html tag where you want to see the dashboard. For example:
```
  <div id="react-app">React code goes here.</div>
```

## Learn More About React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
