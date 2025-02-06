import pkg from 'inquirer';
const { prompt } = pkg;
import { writeFile } from 'fs';

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is your project title?',
    validate: (value) => value ? true : 'Please enter a project title',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
    validate: (value) => value ? true : 'Please enter a description',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?',
    validate: (value) => value ? true : 'Please enter installation instructions',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is the usage information?',
    validate: (value) => value ? true : 'Please enter usage information',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What are the contribution guidelines?',
    validate: (value) => value ? true : 'Please enter contribution guidelines',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What are the test instructions?',
    validate: (value) => value ? true : 'Please enter test instructions',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your application:',
    choices: [
      'MIT',
      'Apache 2.0',
      'GPLv3',
      'BSD 3-Clause',
      'None'
    ],
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:',
    validate: (value) => value ? true : 'Please enter your GitHub username',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
    validate: (value) => value ? true : 'Please enter your email address',
  },
];

function generateREADME(answers) {
  const licenseBadge = answers.license ? `[![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-yellow.svg)](https://opensource.org/licenses/${answers.license})` : '';

  return `# ${answers.title}

${licenseBadge}

## Description

${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## License

This application is covered under the ${answers.license || "Unspecified"} license.

## Questions

* GitHub: [${answers.github}](https://github.com/${answers.github})
* Email: ${answers.email}

Please feel free to reach out with any additional questions.
`;
}

function writeToFile(fileName, data) {
  writeFile(fileName, data, (err) => {
    if (err) {
      console.error(`Error writing to ${fileName}:`, err);
    } else {
      console.log(`${fileName} created successfully!`);
    }
  });
}

function init() {
  prompt(questions).then((answers) => {
    const readmeContent = generateREADME(answers);
    writeToFile('README.md', readmeContent);
  });
}

// Function call to initialize app
init();
