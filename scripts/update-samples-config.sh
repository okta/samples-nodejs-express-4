# The environment variables (OKTA_DOMAIN, CLIENT_ID, CLIENT_SECRET, SPA_CLIENT_ID) are set in the travis repository settings
sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" .samples.config.json
sed -i -- "s/\"cid\": \"{clientId}\"/\"cid\": \"$SPA_CLIENT_ID\"/g" .samples.config.json
sed -i -- "s/{clientId}/$CLIENT_ID/g" .samples.config.json
sed -i -- "s/{clientSecret}/$CLIENT_SECRET/g" .samples.config.json
