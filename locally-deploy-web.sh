
#!/bin/bash
FILE="/home/yohannes/nisirtech/elearning/eTutor/etutor-web/src/utils/environments/environment.tsx"

# Prompt for the remote server password
sed -i 's/export const PRODUCTION_ENVIRONMENT = true/export const PRODUCTION_ENVIRONMENT = false/' "$FILE"

#Build the react file
npm start


