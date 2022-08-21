# Quick API Automation Framework using Postman and Newman
Node Application to run the Postman Collection and respective Environments and generate Newman Reports

## Configuration

1. Postman - Version 6.1.2
2. Collection - Version 2.1
3. Newman - Version 5.3
4. Reports - htmlextra

## Contents

1. [Pre-Requisites](#pre-requisites)
    1. [Install NodeJS and NPM](#install-nodejs-and-npm)
    2. [Newman](#newman)
    3. [Postman Collection](#postman-collection)
    4. [Assertions - Postman Test Scripts](#assertion-postman-test-scripts)
    5. [Postman Environments](#postman-environments)
    6. [Configure app.js and package.json](#configure-app.js-and-package.json)

2. [Command Line Execution of Collections](#command-line-execution-of-collections)
    1. [Run the Postman Collection](#run-the-postman-collection)
    2. [Run Multiple Postman Collections](#run-multiple-postman-collections)
    3. [Run the Postman Collection with Environment](#run-the-postman-collection-with-environment)
    4. [Run the Collection with Environment and Generate Newman Report](#run-the-postman-collection-with-environment-and-generate-newman-report)
    5. [Run the Collection with Environment and Generate Custom Report](#run-the-postman-collection-with-environment-and-generate-custom-report)
    6. [Report Configuration](#report-configuration)
    7. [Command Line Options](#command-line-options)

3. [Node Application Execution of Collections](#node-application-execution-of-collections)
    1. [Run the Collection as Node app](#run-the-collection-as-node-app)
---

## Pre Requisites

To run Newman, ensure that you have NodeJS >= v4. A copy of the NodeJS installable can be downloaded from [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager).

### Install NodeJS and NPM

#### Windows
http://blog.teamtreehouse.com/install-node-js-npm-windows


#### MacOS 
http://blog.teamtreehouse.com/install-node-js-npm-mac

### Newman

Open you Node Terminal and install globally

```termianl
$ npm install newman --global;
```

### Postman Collection 


### Assertion Postman Test Scripts 


### Postman Environments


### Configure app.js and package.json

---

## Command line Execution of Collections

### Run the Postman Collection
```terminal
$ newman run <collection-file-source>
```

### Run Multiple Postman Collections
```terminal
$ for collection in ./PostmanCollections/*; do newman run "$collection" --environment ./PostmanEnvironments/Test.postman_environment.json' -r cli; done
```

### Run the Postman Collection with Environment
``` terminal
$ newman run <collection-file-source> -e <environment-file-source>
```

### Run the Postman Collection with Environment and Generate Newman Report
```terminal
$ newman run <collection-file-source> -e <environment-file-source> -r report.html
```

### Run the Postman Collection with Environment and Generate Custom Report
```terminal
$ newman run <collection-file-source> -e <environment-file-source> --reporters cli,html --reporter-html-template <path to the template> --reporter-html-exporter <path to export>
```
### Report Configuration

Reporters provide information about the current collection run in a format that is easy to both: disseminate and assimilate.

- `-r <reporter-name>`, `--reporters <reporter-name>`<br />
  Specify one reporter name as `string` or provide more than one reporter name as a comma separated list of reporter names. Available reporters are: `cli`, `json`, `html` and `junit`.<br/><br/>
Spaces should **not** be used between reporter names / commas whilst specifying a comma separted list of reporters. For instance:<br/><br/>
:white_check_mark: `-r html,cli,json,junit` <br/>
:x: `-r html, cli , json,junit`

- `--reporter-{{reporter-name}}-{{reporter-option}}`<br />
  When multiple reporters are provided, if one needs to specifically override or provide an option to one reporter, this
  is achieved by prefixing the option with `--reporter-{{reporter-name}}-`.<br /><br />
  For example, `... --reporters cli,html --reporter-cli-silent` would silence the CLI reporter only.

- `--reporter-{{reporter-options}}`<br />
  If more than one reporter accepts the same option name, they can be provided using the common reporter option syntax.
  <br /<br />
  For example, `... --reporters cli,html --reporter-silent` passes the `silent: true` option to both HTML and CLI
  reporter.

**Note:** Sample collection reports have been provided in [examples/reports](https://github.com/postmanlabs/newman/blob/develop/examples/reports).

#### CLI reporter options
These options are supported by the CLI reporter, use them with appropriate argument switch prefix. For example, the
option `no-summary` can be passed as `--reporter-no-summary` or `--reporter-cli-no-summary`.

CLI reporter is enabled by default, you do not need to specifically provide the same as part of `--reporters` option.
However, enabling one or more of the other reporters will result in no CLI output. Explicitly enable the CLI option in
such a scenario.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-cli-silent`         | The CLI reporter is internally disabled and you see no output to terminal. |
| `--reporter-cli-no-summary`     | The statistical summary table is not shown. |
| `--reporter-cli-no-failures`    | This prevents the run failures from being separately printed. |
| `--reporter-cli-no-assertions`  | This turns off the output for request-wise assertions as they happen. |
| `--reporter-cli-no-success-assertions`  | This turns off the output for successful assertions as they happen. |
| `--reporter-cli-no-console`     | This turns off the output of `console.log` (and other console calls) from collection's scripts. |

##### JSON reporter options
The built-in JSON reporter is useful in producing a comprehensive output of the run summary. It takes the path to the
file where to write the file. The content of this file is exactly same as the `summary` parameter sent to the callback
when Newman is used as a library.

To enable JSON reporter, provide `--reporters json` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-json-export <path>` | Specify a path where the output JSON file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |


#### HTML reporter options

(Source: https://github.com/DannyDainton/newman-reporter-htmlextra)

##### Interactive Example Report

To give you an idea of what the final report will look like, I've added a working example here for you to get your hands on:

- [Standard Report Showing All Successful Requests](https://s3.eu-west-2.amazonaws.com/newman-htmlextra-reports/All_Passed.html)

##### Install

> The reporter works as a plugin with [Newman](https://github.com/postmanlabs/newman) so ensure that you have already installed that package globally, using `npm install -g newman`.

To `globally` install the `htmlextra` package:

```console
npm install -g newman-reporter-htmlextra
```

To use `htmlextra` as a library, install the package as a dependency into a `nodejs` project's `package.json` file using:

```console
npm install -S newman-reporter-htmlextra
```

To install `node`, `newman` and the `htmlextra` packages together, use this command to pull the `Docker` image:

```console
docker pull dannydainton/htmlextra
```

##### Usage

In order to enable this reporter, specify `htmlextra` in Newman's `-r` or `--reporters` option. The following command will create a new report in the `./newman` directory, if the directory does not exist, it will be created as part of the Newman run.

```console
newman run collection.json -r htmlextra
```

##### With Newman as a Library

All the CLI functionality is available for programmatic use within a `nodejs` script.

Creating a very basic `nodejs` project can be done like this:

- Create a new directory using `mkdir <new dir name>`
- Move to the new directory using `cd <new dir name>`
- Create a `package.json` file using `npm init -y`
- Install the required node modules using `npm i -S newman newman-reporter-htmlextra`
- Create a new `<filename>.js` file and add the script below which contains the current list of reporter options
- Add your `collection.json` file reference to the script and run using `node <filename>.js`

Once the node script has run, the report will be created in the default `./newman` directory. A new save location can be specified using the `export` flag. 

To enable the functionality of a given feature, uncomment any of the options within the `htmlextra` object. 

```javascript
const newman = require('newman');

newman.run({
    collection: './pathToFile/collection.json', // Collection URL from a public link or the Postman API can also be used
    reporters: ['htmlextra'],
    iterationCount: 1,
    reporter: {
        htmlextra: {
            // export: './report.html',
            // template: './template.hbs'
            // logs: true,
            // showOnlyFails: true,
            // noSyntaxHighlighting: true,
            // testPaging: true,
            // browserTitle: "My Newman report",
            // title: "My Newman Report",
            // titleSize: 4,
            // omitHeaders: true,
            // skipHeaders: "Authorization",
            // omitRequestBodies: true,
            // omitResponseBodies: true,
            // hideRequestBody: ["Login"],
            // hideResponseBody: ["Auth Request"],
            // showEnvironmentData: true,
            // skipEnvironmentVars: ["API_KEY"],
            // showGlobalData: true,
            // skipGlobalVars: ["API_TOKEN"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            // showFolderDescription: true,
            // timezone: "Australia/Sydney",
            // skipFolders: "folder name with space,folderWithoutSpace",
            // skipRequests: "request name with space,requestNameWithoutSpace",
            // displayProgressBar: true
        }
    }
});
```

### Command Line Options 

(Source: https://www.npmjs.com/package/newman)

`newman run <collection-file-source> [options]`

- `-e <source>`, `--environment <source>`<br />
  Specify an environment file path or URL. Environments provide a set of variables that one can use within collections.
  [Read More](https://www.getpostman.com/docs/environments)

- `-g <source>`, `--globals <source>`<br />
  Specify file path or URL for global variables. Global variables are similar to environment variables but has a lower
  precedence and can be overridden by environment variables having same name.

- `-d <source>`, `--iteration-data <source>`<br />
  Specify a data source file (CSV) to be used for iteration as a path to a file or as a URL.
  [Read More](https://www.getpostman.com/docs/multiple_instances)

- `-n <number>`, `--iteration-count <number>`<br />
  Specifies the number of times the collection has to be run when used in conjunction with iteration data file.

- `--folder <name>`<br />
  Run requests within a particular folder in a collection.

- `--export-environment <path>`<br />
  The path to the file where Newman will output the final environment variables file before completing a run.

- `--export-globals <path>`<br />
  The path to the file where Newman will output the final global variables file before completing a run.

- `--export-collection <path>`<br />
  The path to the file where Newman will output the final collection file before completing a run.

- `--timeout <ms>`<br />
  Specify the time (in milliseconds) to wait for the entire collection run to complete execution.

- `--timeout-request <ms>`<br />
  Specify the time (in milliseconds) to wait for requests to return a response.

- `--timeout-script <ms>`<br />
  Specify the time (in milliseconds) to wait for scripts to complete execution.

- `-k`, `--insecure`<br />
  Disables SSL verification checks and allows self-signed SSL certificates.

- `--ignore-redirects`<br />
  Prevents newman from automatically following 3XX redirect responses.

- `--delay-request`<br />
  Specify the extent of delay between requests (milliseconds).

- `--bail [optional modifiers]`<br />
  Specify whether or not to stop a collection run on encountering the first test script error.<br />
  Can optionally accept modifiers, currently include `folder` and `failure`.<br />
  `folder` allows you to skip the entire collection run in case an invalid folder 
  was specified using the `--folder` option or an error was encountered in general.<br />
  On the failure of a test, `failure` would gracefully stop a collection run after completing the current test script.

- `-x`, `--suppress-exit-code`<br />
  Specify whether or not to override the default exit code for the current run.

- `--color`<br />
  Use this option to force colored CLI output (for use in CLI for CI / non TTY environments).

- `--no-color`<br />
  Newman attempts to automatically turn off color output to terminals when it detects the lack of color support. With
  this property, one can forcibly turn off the usage of color in terminal output for reporters and other parts of Newman
  that output to console.

- `--disable-unicode`<br />
  Specify whether or not to force the unicode disable option. When supplied, all symbols in the output will be replaced
  by their plain text equivalents.

- `--global-var "<global-variable-name>=<global-variable-value>"`<br />
  Allows the specification of global variables via the command line, in a key=value format. Multiple CLI global variables
  can be added by using `--global-var` multiple times, like so: `--global-var "foo=bar" --global-var "alpha=beta"`.

- Use the installed reporter, either via the CLI, or programmatic usage. Here, the `newman-reporter` prefix is **not** required while specifying the reporter name in the options.<br/>
```terminal
newman run /path/to/collection.json -r cli,teamcity
```
```javascript
var newman = require('newman');

newman.run({
    collection: '/path/to/collection.json',
    reporters: ['cli', 'teamcity']
}, process.exit);
```

---

## Node Application Execution of Collections

### Configure the JavaScript and the package

Create a new js file(app.js) and you can pass your options as below

```javascript
var newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('../postmanCollection/apiTesting.postman_collection.json'),
    environment: require('../postmanEnvironment/test.postman_environment.json'),
    iterationData: require('../data/apiTestingData.json'),
    reporters: ['htmlextra', 'cli', 'json'],
    reporter : { htmlextra : { export : './report/html/testEnvReport.html', title: "API Testing"}, json : { export : './report/json/testEnvReport.json'}},
    insecure: true, // allow self-signed certs, required in postman too
    timeout: 180000  // set time out
}).on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
```


Create a package file and you can configure the dependencies as below

```json
{
  "name": "MyNewman",
  "version": "1.0.0",
  "description": "Services",
  "main": "runTest/testEnv.js",
  "scripts": {
    "devEnv": "node ./runTest/devEnv.js",
    "testEnv": "node ./runTest/testEnv.js",
    "uatEnv": "node ./runTest/uatEnv.js"
  },
  "repository": {},
  "author": "Vinh Tat",
  "license": "ISC",
  "dependencies": {
    "newman": "^5.3.2",
    "newman-reporter-htmlextra": "^1.22.10"
  }
}
```


### Run the Collection as Node app

To run the Collection as Node application. Open the Node terminal and run test

```terminal
$ npm run testEnv
```
