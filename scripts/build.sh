set -e # fail immediately
set -x # echo every command
set -o pipefail # fail immediately in pipeline

# if the NPM_DEPLOY_TARGET env var is STYLEGUIDE, build the styleguide
# otherwise, run build.js (from create-react-app)
if [ $NPM_DEPLOY_TARGET == STYLEGUIDE ]
then
  npm run styleguide:build
elif [ $NPM_DEPLOY_TARGET == DEMO ]
then
  npm run storybook:build
elif [ $NPM_DEPLOY_TARGET == NOTES_APP ]
then
  NPM_BUILD_TARGET=NOTES_APP node scripts/build.js
elif [ $NPM_DEPLOY_TARGET == API_SERVER ]
then
  babel packages/databyss-api -d build/api --config-file=./packages/databyss-api/babel.config.js --copy-files
else
  echo 'ERROR: NO TARGETS FOUND'
  exit 1
fi

# NOTE: create-react-app-inner-buildpack only exposes env vars prefixed with
#  "NODE_", "NPM_", and "REACT_APP_"
