# React Migration Dashboard

React Migration Dashboard is part of the codebase for the Migration Dashboard Drupal module. The code is designed to be developed locally, optimized for production, and then added to the custom module's codebase.

The Migration Dashboard Drupal module is a proof-of-concept tool to help authors track content status amidst a large editorial migration project. This isn't intended to be a permanent addition to a site, but rather an assistant for the duration of the internal project.

<img src="/public/images/dashboard-screenshot.png" alt="Migration Dashboard screen" />


Features:
- Initial browser state populated by a JSON fetch
- Moving an item both updates browser state and patches the Drupal bio entity 
- Patches are somewhat secure through session token
- An alert displays for 5 seconds if patch fails
- Items visually fade in and out when moved
- Minimal styling to take advantage of Drupal administrative theme
- All CSS bundled in components for portability
- Code linted with AirBnB's configuration: https://github.com/airbnb/javascript/tree/master/react

## Motivation
Tools like GatherContent offer too many features if clients simply want to track where they're at in the migration process. And giant spreadsheets, while very extensible, can be overwhelming to use and require manual updates (or complicated integrations).

Migration Dashboard provides an easy way to track that data all inside Drupal! And the tool is meant to be customized (by a professional services team) to display the information most relevant to each client.

### Based in Reality
This idea came from a real-world client scenario. A friend's current project involves four law firms who recently merged into one company. Each firm had their own way of writing staff biographies, so new editorial standards were created. Now the communications team is working their way through editing the entire roster. Most of the writing and approval process happens offline, but they need a single source of truth for which bios are currently being edited, which are finished and published on the site, and how many are left to do.

## Local Installation
1. Install app
```
    $ yarn install 
    or 
    $ npm install
```
2. To interact locally, find all comments with 'Switch production/local':
- `src/App.jsx`
  - `initialData` import
  - `this.state` in constructor
  - URL variables in `fetchItems()`
  - URL variables and state in`fetchUpdate()`
- `src/components/Card.jsx` images

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

## Module Installation
1. Comment out all local URLs and resources from step 2 above.

2. Build the optimized app to run on non-Node.js servers. The production-ready app will be in the `build` folder. 
```
    $ yarn build 
    or 
    $ npm run build
```

3. Copy all js files in `build/static/js` to the Drupal Migration Dashboard Drupal module's `js` folder.

4. Update js filenames to match new files in Drupal Migration Dashboard module's `.libraries.yml`. 

5. Clear Drupal caches.

6. Visit Drupal Migration Dashboard URL. 

## More About React

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
