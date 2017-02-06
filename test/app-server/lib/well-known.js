/*!
 * Copyright (c) 2015-2016, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the 'License.')
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const config = require('../../../.samples.config.json');

// Use 0.0.0.0 to verify that .well-known is loaded dynamically
const issuer = `http://0.0.0.0:${config.mockOkta.port}`;

module.exports = {
  'issuer': `${issuer}`,
  'authorization_endpoint': `${issuer}/oauth2/v1/authorize`,
  'token_endpoint': `${issuer}/oauth2/v1/token`,
  'userinfo_endpoint': `${issuer}/oauth2/v1/userinfo`,
  'jwks_uri': `${issuer}/oauth2/v1/keys`,
  'response_types_supported': [
    'code',
    'code id_token',
    'code token',
    'code id_token token',
    'id_token',
    'id_token token'
  ],
  'response_modes_supported': [
    'query',
    'fragment',
    'form_post',
    'okta_post_message'
  ],
  'grant_types_supported': [
    'authorization_code',
    'implicit',
    'refresh_token',
    'password'
  ],
  'subject_types_supported': [
    'public'
  ],
  'id_token_signing_alg_values_supported': [
    'RS256'
  ],
  'scopes_supported': [
    'openid',
    'email',
    'profile',
    'address',
    'phone',
    'offline_access',
    'groups'
  ],
  'token_endpoint_auth_methods_supported': [
    'client_secret_basic',
    'client_secret_post',
    'none'
  ],
  'claims_supported': [
    'iss',
    'ver',
    'sub',
    'aud',
    'iat',
    'exp',
    'jti',
    'auth_time',
    'amr',
    'idp',
    'nonce',
    'name',
    'nickname',
    'preferred_username',
    'given_name',
    'middle_name',
    'family_name',
    'email',
    'email_verified',
    'profile',
    'zoneinfo',
    'locale',
    'address',
    'phone_number',
    'picture',
    'website',
    'gender',
    'birthdate',
    'updated_at',
    'at_hash',
    'c_hash'
  ],
  'introspection_endpoint': `${issuer}/oauth2/v1/introspect`,
  'introspection_endpoint_auth_methods_supported': [
    'client_secret_basic',
    'client_secret_post',
    'none'
  ],
  'revocation_endpoint': `${issuer}/oauth2/v1/revoke`,
  'revocation_endpoint_auth_methods_supported': [
    'client_secret_basic',
    'client_secret_post',
    'none'
  ]
}
