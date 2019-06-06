'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-new-repo:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates and configures the .gitignore file', () => {
    assert.file(['.gitignore']);
    assert.fileContent('.gitignore', 'node_modules');
  });
});
