'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-new-repo:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'testProject' });
  });

  it('creates the base files', () => {
    assert.file(['.gitignore', 'package.json']);
  })

  it('configures the .gitignore file', () => {
    assert.fileContent('.gitignore', 'node_modules');
  });

  it('uses the project name in package.json', () => {
    assert.jsonFileContent('package.json', { name: 'testProject' })
  })
});
