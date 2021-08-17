<h1 align="center">
  IC Address Book App
</h1>

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/krpeacock/ic-vcf-gatsby)

<h2>Now with a blog post tutorial!</h2>
<a href="https://kyle-peacock.com/blog/dfinity/static-site-generators-ic">https://kyle-peacock.com/blog/dfinity/static-site-generators-ic</a>

---

This app is a sample application meant to illustrate how to start up a new web app on the IC.
The project was bootstrapped using `npm init gatsby`, with the following modifications:

- Changing `src/pages/index.js` to be our new app
- adding `dfx.json` to deploy the application on the IC

Then, to add an IC backend,

- Adds `src/backend` with HashMap logic
- adds `gatsby-node` to configure webpack to handle environment variables for the dfx-generated actor

## Quickstart

Install the codebase with `npm install`

Follow directions to install `dfx` if you don't have it yet: https://sdk.dfinity.org/docs/index.html

run `dfx start --background` to start a replica;

run `dfx deploy phone_book` to deploy the backend canister

run `npm start` to spin up a development server

## Publishing

Run `npm run build` to compile the frontend app

Run `dfx deploy --network=ic` to deploy the app on Sodium
