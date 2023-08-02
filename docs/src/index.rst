Welcome to ska-react-webapp-skeleton's documentation!
=====================================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

This project is intended to act as a skeleton for any SKA developer looking to make a React based web application.

It includes tools for linting, code formatting, and testing which are easily integrated into various IDEs.
It also includes modular federation, exposing the ReactSkeleton component, which can be imported into other applications.

### Requirements

This skeleton requires **Node** and **YARN** to install and run. To install these follow the instructions for your operating system at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

Alternatively the official Node docker image can be used. Instructions can be found on the [official Node docker image site](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image).

### Installation

_All the following notes assume you are at the command prompt for your chosen environment._

1.  Confirm Node and YARN are installed and configured correctly, both the following commands should return the relevant version number.

        > node --version
        > yarn --version

2.  Clone the project from GitHub

3.  Install the SKAO specific library

> npm config set @ska-telescope:registry https://artefact.skao.int/repository/npm-internal/

> yarn add @ska-telescope/ska-gui-components@latest

4.  Install all the necessary project dependencies by running

> yarn init

### Steps to convert to your own application.

Here are the steps required to migrate this application for use within the Portal. These are required so that we can ensure a unique reference into the Portal. For this example we will use the name NewApp as the name of the new application

1. Clone the application into the appropriate folder
2. Follow the installation instructions in the previous paragraph
3. ReactSkeleton.tsx : Change `ReactSkeleton` to `NewApp` in 2 locations
4. ReactSkeleton.tsx : Change filename to `NewApp.tsx
5. ReactSkeleton.cy.tsx : Change `ReactSkeleton` to `NewApp` in 4 locations
6. ReactSkeleton.cy.tsx : Change filename to `NewApp.cy.tsx
7. Change Folder name from ReactSkeleton to NewApp
8. App.tsx : Change `ReactSkeleton` to `NewApp` in 4 locations
9. webPack.config.js : Change path for `ReactSkeleton` so it points to `NewApp\NewApp`.

Compilation and running this application will allow it to be shown within the ReactSkeleton menu item within the developer section of the SKA-Portal. Whilst initial development is being done and until the application is allocated a permanent location, it is suggested that no other WebPack changes are done.

### During development

It is note that the introduction of new libraries may throw an error. This is usually because WebPack requires the library to be included as part of the ModuleFederationPlugin entry within the webpack.config.js It is suggested that the new library be added into the area on the configuration annotated mixture.

### Adjustment once final positioning within the SKA-Portal has been determined.

So that there is no clashes with other applications originating from a skeleton, the following steps should be taken. Once these are done the application will no longer be available via the ReactSKeleton menu item within the SKA-Portal

1. webpack.config.js : Change the devServer port number from 8090.
2. webpack.config.js : Change the final ReactSkeleton entry to NewApp.
3. Relate these new values back to the developer responsible for updating the SKA-Portal

Once these steps have been completed, the application should be accessible from it's new location in the SKA-Portal

### SKA Components

These are supplied from the ska-javascript-component library for pure components, or from the ska-gui-components library for those that has been built using Material UI. It is noted that all the components from ska-javascript are passed through so separate inclusion is not required if the ska-gui-components are also required.

For specifics of the components available, please refer to the appropriate repository

### Services

Included are a number of services, which have also been implemented into the code, providing simple examples.
It is expected that in the main that there will be no updates to these services directly

Below is a list of the current services, together with their purpose.

i18n : Allows for text to be displayed in the language of the browser, with English as the default
redux-telescope : Local storage containing the current telescope. Accessed via the stateStorage service
redux-theme : Local storage containing the current theme. Accessed via the stateStorage service
redux-user : Local storage containing the current user. Accessed via the stateStorage service
stateStorage : Contains Creation and access to the localStorage
theme : Contains the initialization of the latest SKAO Theme
types : Contains the TS type definitions for the services above

### Running and Building the Application

Scripts for running, testing, and building the application are provided as part of the standard configuration. These are run using YARN and listed in the scripts section of the package.json file.

From the project directory, you can run any of the following:

- `> yarn dev`

  Runs the app in the development mode at [http://localhost:8090](http://localhost:8090). The app will recompile and restart if you make any edits to the source files. Any linting errors will also be shown in the console.

- `> yarn start`

  Same as `yarn dev` but for some implementations it is prefixed with NODE_ENV=testing. This is used in the CI/CD Processes

- `> yarn cypress`

  Launches Cypress which has been set up to provide component testing. For further information on the use of Cypress, see https://docs.cypress.io/guides/component-testing/overview

- `> yarn test`

  Launches the test runner in the interactive watch mode. See the [testing](#testing) section for more information.

- `> yarn build`

  Builds the app for production to the `build` folder. The build is minified and any JSX is transpiled to JavaScript. Your app is ready to be deployed!

### Running the application inside a container

There are two ways that this can be done as below:

1. Run using docker compose

```
 docker-compose up -d
```

2. build the docker file in the root directory and run the container exposing port 8090.

```
 docker build -t ska-react-webapp-skeleton .
 docker run -p 8090:8090 ska-react-webapp-skeleton
```

The project will then be accessible at the url http://localhost:8090/

## Testing

### Writing

We use Cypress as the test running framework. It will look for test files within a number of locations, however the standard that the SKAO will employ will be the use of `.cy.{tsx | jsx}` in the same folder as the component being tested.

```
App
|  App.cy.tsx
|  App.tsx
|
components
|
└─ ReactSkeleton
   |  ReactSkeleton.cy.tsx
   |  ReactSkeleton.tsx

```

Note that the ReactSkeleton component is exposed via WebPack 5 ModuleFederationPlugin, so this name should be changed to reflect the application being written ( e.g. SignalDisplay, DataProductDashboard ...)

See the developer guide for more information

### Running

To run the interactive test runner, execute

    > yarn test

This will also watch the source files and re-run when any changes are detected

To run the tests with coverage, execute

    > yarn test:coverage

The coverage results are displayed in the console. They are also written to the `coverage` folder.

- `./build/coverage/index.html` - open in a web browser to view

**All the tests should pass before merging the code**

## Code Analysis

[ESLint](https://ESLint.org/) and [Prettier](https://prettier.io/) are included as code analysis and formatting tools.
These do not need installing as they're included in `node_modules` by running `yarn init`.

These tools can be run in the command line or integrated into your IDE (recommended).

JavaScript based SKA projects must comply with the [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript). These rules are included in this project and ESLint and Prettier are configured to use them.

### Running

To run the analysis tools, execute

    > yarn code-analysis

This will display any errors in the command line. If there are any errors, YARN will exit with a non-zero code, the `-s` argument suppresses this and cleans up the output.

### IDE Integration

#### VS Code

Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-ESLint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions and reload the IDE.

Errors should now show in the editor. `shift + alt + F` will format a file, or you can turn on the format on save setting.

#### JetBrains (WebStorm, etc.)

ESLint is integrated into the Ultimate versions of all JetBrains IDEs

Prettier can be installed through a [plugin](https://plugins.jetbrains.com/plugin/10456-prettier). Follow the steps [here](https://www.jetbrains.com/help/idea/prettier.html) to configure it.
