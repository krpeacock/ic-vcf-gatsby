<h1 align="center">
  IC Address Book App
</h1>

<h2>Now with a blog post tutorial!</h2>
<a href="https://kyle-peacock.com/blog/dfinity/static-site-generators-ic">https://kyle-peacock.com/blog/dfinity/static-site-generators-ic</a>

---

This app is a sample application meant to illustrate how to start up a new web app on the IC.
The project was bootstrapped using `npm init gatsby`, with the following modifications:

- Changing `src/pages/index.js` to be our new app
- adding `dfx.json` to deploy the application on the IC

Then, to add an IC backend,

- Adds `src/backend` with HashMap logic
- Adds `src/actor.js` to interface with IC
- adds `gatsby-node` to configure webpack with an alias for `dfx-generated` references

## Quickstart

Install the codebase with `npm install`

Follow directions to install `dfx` if you don't have it yet: https://sdk.dfinity.org/docs/index.html

run `dfx start --background` to start a replica;

run `dfx deploy` to deploy your canisters

run `npm start` to spin up a development server

## Publishing

Run `npm run build` to compile the frontend app

Run `npm deploy --network=ic` to deploy the app on Sodium
