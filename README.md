A NextJS applications that communicates with the GitHub API in order to run queries that return all repositories associated with the Stacks ecosystem (Clarity files, Clarinet projects, Stacksjs projects, other entity projects).

## Features

- [x] Find repos with `.clar` files
- [x] Find repos with `@stacks/transactions` import
- [x] Find repos with Clarinet configuration
- [x] Find repos for known organizations

## Installation

First, install all dependencies:

```bash
npm install
# or
yarn
```

## Set Github API key

To run the NextJS application successfully, you need to add an environmental key: `GITHUB_API_TOKEN`. If you run the app locally, you can create a `.env.local` file in the root of the project and set the key.

To generate a new key with your GitHub account, visit this page: https://github.com/settings/tokens.

## Getting Started

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run the Stacks adoption report

Open `http://localhost:3000/api/report` and let it run for a couple of minutes. The server will paginate through the Github results and retry API calls when seeing rate limits. 

Once completed, a JSON response in the format of the `/report/dec2021.json` file will be returned. To keep track of the last result, copy the JSON response and create a new file manually inside the `report` folder.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
