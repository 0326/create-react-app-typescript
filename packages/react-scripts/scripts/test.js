// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end
'use strict';

process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

const jest = require('jest');
const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
// Exit process when stdin ends only when watch mode enabled
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');

  // Issue: https://github.com/facebookincubator/create-react-app/issues/1753
  // The below lines are added to make sure that this process is
  // exited when stdin is ended. The consequence of not doing this means
  // that all watch processes will stay running despite the process that spawned
  // them being closed.

  process.stdin.on('end', function() {
    process.exit(0);
  });
  process.stdin.resume();
}

// @remove-on-eject-begin
// This is not necessary after eject because we embed config into package.json.
const createJestConfig = require('./utils/createJestConfig');
const path = require('path');
const paths = require('../config/paths');
argv.push(
  '--config',
  JSON.stringify(
    createJestConfig(
      relativePath => path.resolve(__dirname, '..', relativePath),
      path.resolve(paths.appSrc, '..'),
      false
    )
  )
);
// @remove-on-eject-end
jest.run(argv);
