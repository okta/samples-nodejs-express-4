/**
 * Generates a JS module that contains keys that can be used to sign and
 * verify JWT's.
 *
 * The generated JS module will export an object with:
 * {
 *   privatePem: 'The private key, in PEM format',
 *   publicPem: 'The public key, in PEM format',
 *   publicJwk: 'THe public key, in JWK format'
 * }
 *
 * Usage: node index.js kid > module_name.js
 */

const execSync = require('child_process').execSync;
const fs = require('fs');
const pem2jwk = require('pem-jwk').pem2jwk;

function exec(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
}

// 1. Get kid from cli args
const kid = process.argv[2];
if (!kid) {
  console.log('Must specify kid, i.e. node index.js TEST_KID > module_name.js');
  process.exit(1);
}

// 2. Generating private key, in PEM format
const privateCmd = 'openssl genrsa -out /tmp/generate-keys-private.pem 2048';
exec(privateCmd);
const privatePem = fs.readFileSync('/tmp/generate-keys-private.pem', { encoding: 'utf8' });

// 3. Extracting public key from private key, in PEM format
const publicCmd = 'openssl rsa -in /tmp/generate-keys-private.pem -pubout';
const publicPem = exec(publicCmd);

// 4. Converting public PEM to JWK
const publicJwk = pem2jwk(publicPem);
publicJwk.alg = 'RS256';
publicJwk.use = 'sig';
publicJwk.kid = kid;

console.log(`module.exports = {
  privatePem: \`${privatePem}\`,
  publicPem: \`${publicPem}\`,
  publicJwk: ${JSON.stringify(publicJwk)}
};`);
