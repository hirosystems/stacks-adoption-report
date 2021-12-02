import {
  retrieveGithubRepos,
  retrieveOrgRepos,
  retrieveTopicRepos,
} from "../../helpers/github-search";
import {
  GITHUB_API_URL,
  STACKS_ORGS,
  STACKS_TOPICS,
} from "../../constants/github";

export default async function handler(req, res) {
  // clarity repos
  const clarity = Array.from(
    await retrieveGithubRepos(
      `${GITHUB_API_URL}/search/code?q=extension:clar&sort=indexed`
    )
  );
  // stacksjs repos
  const stacksjs = Array.from(
    await retrieveGithubRepos(
      `${GITHUB_API_URL}/search/code?q="%40stacks%2Ftransactions"&sort=indexed`
    )
  );
  // clarinet repos
  const clarinet = Array.from(
    await retrieveGithubRepos(
      `${GITHUB_API_URL}/search/code?q="%5Baccounts.wallet_1%5D"&sort=indexed`
    )
  );
  // org repos
  const organizations = Array.from(await retrieveOrgRepos(STACKS_ORGS));

  // topics
  const topics = Array.from(await retrieveTopicRepos(STACKS_TOPICS));

  res.status(200).json({ clarity, stacksjs, clarinet, organizations, topics });
}
