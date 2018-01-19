const _ = require('lodash')
const Handlebars = require('handlebars')
const fs = require('fs-extra')

const template = Handlebars.compile(fs.readFileSync('./.github/README.md.hbs', 'utf8'))
const data = {
  projects: _([
    ...[
      'cli-ux',
      'create-dxcli',
      'eslint-config-dxcli',
      'generator-dxcli',
    ].map(name => ({
      name,
      repo: {
        user: 'dxcli',
        name,
      },
    })),
    ...[
      'command',
      'config',
      'dev-circleci',
      'dev-commitmsg',
      'dev-nyc-config',
      'dev-semantic-release',
      'dev-test',
      'dev-tslint',
      'engine',
      'example-single-cli',
      'loader',
      'manifest-file',
      'parser',
      'screen',
      'version',
    ].map(name => ({
      name: `@dxcli/${name}`,
      repo: {
        user: 'dxcli',
        name,
      },
    })),
  ])
  .sortBy('name')
  .value(),
}

fs.writeFileSync('./README.md', template(data).trim())
