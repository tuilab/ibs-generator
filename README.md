# [Draft.js filters](https://tuilab.github.io/ibs-generator/) [![Build Status](https://travis-ci.org/tuilab/ibs-generator.svg?branch=master)](https://travis-ci.org/tuilab/ibs-generator) [![Coverage Status](https://coveralls.io/repos/github/tuilab/ibs-generator/badge.svg)](https://coveralls.io/github/tuilab/ibs-generator)

> Automatically generate [IBS](http://ibs.biocuckoo.org/) (_Illustrator for BioSequence_) diagrams from raw data and XML templates.

## Contributing

See anything you like in here? Anything missing? We welcome all support, whether on bug reports, feature requests, code, design, reviews, tests, documentation, and more. Please have a look at our [contribution guidelines](.github/CONTRIBUTING.md).

## Development

### Install

> Clone the project on your computer, and install [Node](https://nodejs.org). This project also uses [nvm](https://github.com/creationix/nvm) and [yarn](https://yarnpkg.com/).

```sh
nvm install
# Then, install all project dependencies.
yarn
# Install the git hooks.
./.githooks/deploy
```

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the server and the development tools.
yarn start
```

### Releases

Use `yarn release`, which uses [standard-version](https://github.com/conventional-changelog/standard-version) to generate the CHANGELOG and decide on the version bump based on the commits since the last release.

## Credits

View the full list of [contributors](https://github.com/springload/draftail/graphs/contributors). [MIT](LICENSE) licensed. Website content available as [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

Microsoft Word toolbars screenshot from _PCWorld – Microsoft Word Turns 25_ article.
