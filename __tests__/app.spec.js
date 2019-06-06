'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-new-repo:app', () => {
  const runGenerator = () =>
    helpers.run(path.join(__dirname, '../generators/app'));

  describe('when no project name is given', () => {
    beforeAll(() => {
      return runGenerator();
    });

    it('names the project after the current working directory', () => {
      assert.jsonFileContent('package.json', {
        name: path.basename(process.cwd())
      });
    });

    it('uses the current directory instead of creating a new one', () => {
      const currentDir = process.cwd();
      const parentDir = path.join(currentDir, '..');
      assert.equal(parentDir, '/tmp');
      assert.notEqual(parentDir, currentDir);
    });

    afterAll(() => {
      helpers.cleanTestDirectory();
    });
  });

  describe('when a project name is provided', () => {
    const projectName = 'testProject';

    beforeAll(() => {
      return runGenerator().withPrompts({ name: projectName });
    });

    it('uses the project name in package.json', () => {
      assert.jsonFileContent('package.json', { name: projectName });
    });

    it('creates a folder with the same name as the project, and copies the files into it', () => {
      assert.equal(path.basename(process.cwd()), projectName);
    });

    afterAll(() => {
      helpers.cleanTestDirectory();
    });
  });

  describe('when copying the base files', () => {
    const projectName = 'testProject';

    beforeAll(() => {
      return runGenerator().withPrompts({ name: projectName });
    });

    it('copies the default config files', () => {
      assert.file(['.gitignore', 'package.json', 'jest.config.js', 'jest-runner-eslint.config.js', '.eslintrc.js', '.babelrc']);
    });

    it('configures the .gitignore file', () => {
      assert.fileContent('.gitignore', 'node_modules');
    });

    it('copies the src files', () => {
      assert.file(['src/index.js']);
    })

    it('copies the test files', () => {
      assert.file(['__test__/index.spec.js']);
    })

    it('uses the project name in package.json, and in the starter src & test files', () => {
      assert.jsonFileContent('package.json', { name: projectName });
      assert.fileContent('src/index.js', projectName);
      assert.fileContent('__test__/index.spec.js', projectName);
    });

    afterAll(() => {
      helpers.cleanTestDirectory();
    });
  });
});
