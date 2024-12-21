# Test Project

This project contains both UI tests and API tests using Playwright. The tests are organized into separate directories and can be run independently.

## Tech Stack

- **TypeScript**
- **JavaScript**
- **Playwright**
- **npm**

Refer to [installation steps](#installation-steps) below to install the required dependencies.

## Project Structure

- **`tests/`**: Contains UI tests.
- **`api-tests/`**: Contains API tests.
- **`playwright.config.ts`**: Configuration file for Playwright.
- **`package.json`**: Contains scripts to run the tests.

## Assumptions

- Node.js is installed (version >= 18).
- npm is installed.

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

### Retries

The tests are configured to retry failed tests up to 2 times. If a test fails, it will be retried up to 2 times before failing.

## Test Reports

The test reports are generated in HTML format and can be found in the `playwright-report` directory. To view the report, open the index.html file in a web browser.

## Scripts

| Script     | Description                              |
|------------|------------------------------------------|
| `ui-test`  | Runs the UI tests in the `tests` folder. |
| `api-test` | Runs the API tests in the `api-tests` folder. |

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