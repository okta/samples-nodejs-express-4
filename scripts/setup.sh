#!/bin/bash -xe

# Install required node version
setup_service node v14.18.0

# Revert the cache-min setting, since the internal cache does not apply to
# these repos (and causes problems in lookups)
npm config set cache-min 10

# Install dependences.
if ! npm install --ignore-scripts; then
  echo "npm install failed! Exiting..."
  exit ${FAILED_SETUP}
fi
