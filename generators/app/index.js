'use strict';
const path = require('path');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the outstanding ${chalk.red(
          'generator-new-repo'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project Name',
        default: path.basename(process.cwd())
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const name = this.props.name;
    if (path.basename(process.cwd()) !== name) {
      mkdirp(name);
      this.destinationRoot(name);
    }

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { name }
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
