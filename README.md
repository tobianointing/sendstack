# SendStack Delivery

SendStack Delivery Public Link [sendstack.co](https://SendStackDelivery.co)

## Table of Content:

- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Setup](#setup)
- [Conventions](#conventions-&-rules)

## About The App

**SendStack Delivery** Sendstack helps businesses grow with ease by providing the most reliable, affordable and efficient delivery service.

## Technologies

The frontend architecture use `Nextjs` as the JavaScript Framework written in `TypeScript` and Using `Tailwind` for UI Styling.

It is recommended to install the following tools:

- VSCode: [SpellChecker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- VSCode: [HeadWind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) - TailWindCSS classname sorter
- VSCode [TailWindIntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

It is **required** to learn about the following tools:

1. [Husky - Git hooks](https://typicode.github.io/husky/#/) - pre-push & pre-commit validator
2. [classNames](https://github.com/JedWatson/classnames) - Helper function for the Styling tool
3. [TailwindCSS ](https://tailwindcss.com/) - Styling tool

## Setup

### Prerequisites

Before getting started, ensure that you have a NextJS Framework knowledge, Tailwind CSS knowledge. **Please make sure you've read Conventions & Rules before starting.**

### Download or clone the repository

### Install dependencies

```bash

pnpm install
```

### After, run the development server:

```bash

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Conventions

### Commit messages

Please, use the following convention to commit messages:

    <type>: <description>
    eg. feat: implement google login

Where `<type>` can be:

- `feat`: for new features
- `fix`: for bug fixes
- `docs`: for documentation changes
- `style`: for changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: for adding or updating tests
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)

### Testing

[Jest](https://jestjs.io/) is use as the project testing framework. All components and hooks should have corresponding tests. Tests should cover the happy path as well as the edge cases. Use `describe` and `it` blocks to organize your tests. You can run tests with the following command:

    pnpm test

### Folder structure

Logic is group with [folder by feature](https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature), not folder by type.
Example with 'Auth' feature.

```
features > Auth
> components > Auth.tsx, AuthSocialButton.tsx, index.ts // Use named exports, and re-export in index.ts
> hooks > useSocialLogin > useSocialLogin.ts, .generated, .graphql, .test, index.ts // Create .graphql file and run pnpm gql-generate
// In case of only one helpters.ts file, store it in the root for the feature as helpers.ts, otherwise inside helper directory
> helpers.ts // Helper functions, eg. function formatOdds (if one helper file per feature);
> helpers > dates.ts // When helpers grew out of hand, split to utils. dates.ts may have: convertDateToISOString
> @types > index.d.ts // Shared types that we want to export
consts.ts // Easy to access constants, use UPPERCASE_NAMING

```
