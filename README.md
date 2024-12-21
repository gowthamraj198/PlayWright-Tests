# Test Project

This project contains both UI tests and API tests using Playwright. The tests are organized into separate directories and can be run independently.

## Tech Stack

- **TypeScript**
- **JavaScript**
- **Playwright**
- **npm**

## Project Structure

- **`tests/`**: Contains UI tests.
- **`api-tests/`**: Contains API tests.
- **`playwright.config.ts`**: Configuration file for Playwright.
- **`package.json`**: Contains scripts to run the tests.

## Pre-requisites

Ensure the following are installed on your machine:

- Node.js is installed (version >= 18).
- npm is installed.
- Playwright is installed as a dev dependency.
- Install all project dependencies using `npm install`.

#### Refer to [installation steps](#installation-steps) below to install the required dependencies.


## About the Tests

- All assumptions, observations and limitations are documented as comments in the test files.
- The tests are organized into separate directories for UI and API tests.
- POM design pattern is used.
- No cross browser or responsive testing is implemented.
- The tests are configured to retry failed tests up to 2 times. If a test fails, it will be retried up to 2 times before failing.
- No tagging of tests is implemented.
- Unit level tests are not covered exhaustively. However some unit level tests are added to demonstrate the testing framework.
- The tests are designed to run on a local environment. No CI/CD pipeline or dockerisation is added.


#### Test files are inside the spec folders in the tests and api-tests directories.

| Script     | Description                              |
|------------|------------------------------------------|
| `ui-test`  | Runs the UI tests in the `tests` folder. |
| `api-test` | Runs the API tests in the `api-tests` folder. |


## Running the Tests

### UI Tests

To run the UI tests, use the following command:

```sh
npm run ui-test 
```

### API Tests

To run the API tests, use the following command:

```sh
npm run api-test 
```

## Test Reports

The test reports are generated in HTML format and can be found in the `playwright-report` directory. To view the report, open the index.html file in a web browser.


## Configuration

The `playwright.config.ts` file contains the configuration for Playwright, including the project settings for UI and API tests.

## Dependencies

The project uses the following dev dependencies:

- **@playwright/test**: Playwright testing framework.
- **@types/node**: TypeScript definitions for Node.js.



## Installation steps:

### Install Node.js

1. Download and install Node.js from the [official website](https://nodejs.org/). Ensure you download the version >= 18.
2. Verify the installation by running the following commands in your terminal:

```sh
node -v
npm -v
```

### Install Playwright

1. Initialize a new Node.js project (if you haven't already):

```sh
npm init -y
```

2. Install Playwright as a development dependency:

```sh
npm install --save-dev @playwright/test
```

3. Verify the installation by running the following command:

```sh
npx playwright --version
```