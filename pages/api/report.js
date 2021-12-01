import { retrieveGithubRepos } from "../../helpers/github-search";

export default async function handler(req, res) {
  // clarity repos
  const clarity = Array.from(await retrieveGithubRepos(`extension:clar`));
  // stacksjs repos
  const stacksjs = Array.from(
    await retrieveGithubRepos(`"%40stacks%2Ftransactions"`)
  );
  // clarinet repos
  const clarinet = Array.from(
    await retrieveGithubRepos(`"%5Baccounts.wallet_1%5D"`)
  );

  res.status(200).json({ clarity, stacksjs, clarinet });
}
