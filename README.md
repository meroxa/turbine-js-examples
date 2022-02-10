# turbine-js-examples

## Dependencies
- Node
- Yarn

## Installation
Install turbine-js:
```
npm install -g git+ssh://git@github.com/meroxa/turbine-js.git
```
Note, due to the turbine-js repo being private, turbine-js is NOT a dependency for the data app, although in the future it will be.

This is why we install turbine-js globally 👆 instead of project local.

Next, clone this repo
```
git clone git@github.com:meroxa/turbine-js-examples.git

cd turbine-js-examples
```

Create a `.env` in the project root and fill out the fields, or make sure these are set in your environment before running
```
# Meroxa API Auth token
AUTH_TOKEN=

# Meroxa API URL
MEROXA_API_URL=https://api.staging.meroxa.io

# Dockerhub username
DOCKERHUB_PREFIX=

# Dockerhub image name (can be anything)
DOCKERHUB_IMAGE_NAME=

# Dockerhub access token
DOCKERHUB_ACCESS_TOKEN=
```

### To run the sample app in local mode ("I am just locally testing that my data app works")
```
turbine test
```

### To run the sample app in platform mode ("I am ready to run/deploy my data app as meroxa platform services")
```
turbine deploy
```
