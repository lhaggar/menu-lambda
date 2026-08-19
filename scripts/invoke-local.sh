SLACK_PRESEND_PARAMETER_NAME=${SLACK_PRESEND_PARAMETER_NAME:?set SLACK_PRESEND_PARAMETER_NAME} \
  node -e "require('./handler').run({ destination: 'presend' })"
