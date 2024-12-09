<a href="https://3umgroup.com/" ><img alt="3um, Inc. Ai platform" src="https://3umgroup.com/_next/static/media/3UM-light.2725140a.png" height="120px"/></a>

# Fortuna
Fortuna is 3um's Vendor, Datalake, and AI Model marketplace application born out of early standardization R&D. With Fortuna one is able about to manage billing and account detais, search for 3rd party tools, provided datalakes, AI models and cloud offerings as Add-Ons to a workspace in Metis


## Sister Projects

### Fata
Fata is 3um's Customer Workspace Dashboard Product for the Metis project with LLM query, Reactflow, and Recharts to interact with the Metis AI hosting cloud

The two frontend projects should work together to build the Metis product which communicate via a MQTT pubsub system similar to ra-realtime (https://registry.marmelab.com/documentation/ra-realtime) to our backend cloud.

### Metis
Metis is our cloud ecosystem geared to hosting ollama models, data processes, and dashboarding which uses hashicrop's ecosystem Nomad+Consul+Vault+Fabio with podman and Influxdata v2, Oras, and Ollama+TinyLlama  with langchain to host end user's AI models, dashboards, and data processing, in a simple preconfigured environment that scales with the user's needs. Metis uses a Zero trust access model with policly as code gatekeepers, ORAS compliant OCI registries and highly scalable infrastructure to execute end user's data processing in a high security environment.

### Lore
Lore and Lorefile specification is the intergration point for Git Flow DataOps making DAG based batch processing, datalake management, and Ai Model deployment simple. A user would drop a Lorefile into a git repository then using Fata, create the project workspace pointing the the git repo with the Lorefile. This will be picked up by Metis to create the customer's namespace and infrastructure then deploy the dataset, ai model, dashboard template, and execute the dag.


## Notes

- https://marmelab.com/blog/2023/11/28/using-react-admin-with-your-favorite-ui-library.html

## Developer details:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### Dependancies
Besides the usual React-Admin and related tools. This project also consumes atomic designed
### Deployment

Deployment is executed by Github Actions [.github/workflows/ci.yml](.github/workflows/ci.yml) to deploy a static built frontend to Github Pages.
