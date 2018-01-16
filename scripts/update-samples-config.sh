# The environment variables (OKTA_DOMAIN, CLIENT_ID, CLIENT_SECRET) are set in the travis repository settings
sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" .samples.config.json
sed -i -- "s/{clientId}/$CLIENT_ID/g" .samples.config.json
sed -i -- "s/{clientSecret}/$CLIENT_SECRET/g" .samples.config.json
