const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('componentName', { type: String, required: false })

    if (this.options.componentName) {
      this.componentName = _.upperFirst(_.camelCase(this.options.componentName))
    }
  }

  prompting() {
    const prompts = []

    if (!this.options.componentName) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: 'What would like to name this Component?',
        validate: (input) => {
          if (input.length <= 0) {
            return 'You must provide a component name'
          }
          return true
        }
      })
    }

    prompts.push({
      type: 'list',
      name: 'componentType',
      message: [
        'What type of component is this?',
        chalk.dim('Stateless: No state. No Lifecycle.'),
        chalk.dim('Pure: No state. Yes Lifecycle.'),
        chalk.dim('Full: Yes state. Yes Lifecycle.')
      ].join('\n'),
      default: 0,
      choices: [
        'Stateless', 'Pure', 'Full'
      ],
      filter(val) {
        return val.toLowerCase()
      }
    })

    return this.prompt(prompts).then((answers) => {
      if (answers.componentName) {
        this.componentName = _.upperFirst(_.camelCase(answers.componentName))
      }

      this.componentType = answers.componentType
    })
  }

  write() {
    // Copy component template
    this.fs.copyTpl(
      this.templatePath(`index.${this.componentType}.js`),
      this.destinationPath(`src/components/${this.componentName}/index.js`),
      {
        componentName: this.componentName,
        projectCSSPrefix: this.projectCSSPrefix
      }
    )

    // Copy style template
    this.fs.copyTpl(
      this.templatePath('styles.scss'),
      this.destinationPath(`src/components/${this.componentName}/styles.scss`),
      {
        componentName: this.componentName,
        projectCSSPrefix: this.projectCSSPrefix
      }
    )

    // Copy Test template
    this.fs.copyTpl(
      this.templatePath('__tests__/index.test.js'),
      this.destinationPath(`src/components/${this.componentName}/__tests__/index.test.js`),
      {
        componentName: this.componentName
      }
    )
  }
}
