/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const fs = require('fs');
const globby = require('globby');
const path = require('path');

const globs = process.argv.slice(2);
const bannerSourcePath = path.join(__dirname, 'license-banner.txt');

let files = [];

globs.forEach(glob => {
  files = files.concat(globby.sync(glob));
});

const bannerSource = fs.readFileSync(bannerSourcePath).toString();
const copyrightRegex = /(Copyright \(c\) )([0-9]+)-?([0-9]+)?/;
const match = bannerSource.match(copyrightRegex);
const firstYear = match[2];
const currentYear = new Date().getFullYear().toString();

if (firstYear !== currentYear) {
  fs.writeFileSync(bannerSourcePath, bannerSource.replace(copyrightRegex, `$1$2-${currentYear}`));
}

files.forEach(file => {
  const contents = fs.readFileSync(file).toString();
  const match = contents.match(copyrightRegex);
  if (!match) {
    return fs.writeFileSync(file, bannerSource + '\n' + contents);
  }
  const firstYear = match[2];
  if (firstYear !== currentYear) {
    return fs.writeFileSync(file, contents.replace(copyrightRegex, `$1$2-${currentYear}`));
  }
});
