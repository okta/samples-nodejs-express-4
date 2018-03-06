# The environment variables (ISSUER, CLIENT_ID, CLIENT_SECRET, SPA_CLIENT_ID) are set in the travis repository settings
sed -i -- "s/\"cid\": \"{clientId}\"/\"cid\": \"$SPA_CLIENT_ID\"/g" .samples.config.json
sed -i -- "s/{clientId}/$CLIENT_ID/g" .samples.config.json
sed -i -- "s/{clientSecret}/$CLIENT_SECRET/g" .samples.config.json

# Escape the backslashes in ISSUER env var
issuer=$(echo "$ISSUER" | sed 's/\//\\\//g')
sed -i -- "s/https:\/\/{yourOktaDomain}.com\/oauth2\/default/$issuer/g" .samples.config.json
