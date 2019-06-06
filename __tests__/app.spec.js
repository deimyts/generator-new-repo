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

  it('creates a folder with the same name as the project, and copies the files into it', () => {
    assert.equal(path.basename(process.cwd()), 'testProject');
  })

  afterAll(() => {
    helpers.cleanTestDirectory()
  })
});

describe('when no project name is given', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
  });

  it('names the project after the current working directory', () => {
    assert.jsonFileContent('package.json', { name: path.basename(process.cwd())})
  })

  it('uses the current directory instead of creating a new one', () => {
    const currentDir = process.cwd()
    const parentDir = path.join(process.cwd(), '..')
    assert.equal(parentDir, '/tmp')
    assert.notEqual(parentDir, currentDir)
  });

  afterAll(() => {
    helpers.cleanTestDirectory()
  })
});
