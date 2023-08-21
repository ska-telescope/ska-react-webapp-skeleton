During development
~~~~~~~~~~~~~~~~~~

It is note that the introduction of new libraries may throw an error. This is usually because WebPack requires the library to be included as part of the ModuleFederationPlugin entry within the webpack.config.js It is suggested that the new library be added into the area on the configuration annotated mixture.

Adjustment once final positioning within the SKA-Portal has been determined
===========================================================================

So that there is no clashes with other applications originating from a skeleton, the following steps should be taken. Once these are done the application will no longer be available via the ReactSKeleton menu item within the SKA-Portal

1. webpack.config.js : Change the devServer port number from 8090.
2. webpack.config.js : Change the final ReactSkeleton entry to NewApp.
3. Relate these new values back to the developer responsible for updating the SKA-Portal

Once these steps have been completed, the application should be accessible from it's new location in the SKA-Portal

SKA Components
==============

These are supplied from the ska-javascript-component library for pure components, or from the ska-gui-components library for those that has been built using Material UI. It is noted that all the components from ska-javascript are passed through so separate inclusion is not required if the ska-gui-components are also required.

For specifics of the components available, please refer to the appropriate repository

Services
========

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

