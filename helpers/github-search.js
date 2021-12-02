const parse = require("parse-link-header");
import { GITHUB_API_TOKEN, GITHUB_API_URL } from "../constants/github";

export async function retrieveGithubRepos(apiUrl) {
  let pageNum = 1;
  let maxPages = 2;
  let repos = new Set();

  while (pageNum < maxPages) {
    let url = `${apiUrl}&per_page=100&page=${pageNum}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (res.status > 400) {
      console.log(`Hitting secondary rate limits. Waiting for 90 seconds ....`);
      await delay(90000);
    } else {
      const jsonResp = await res.json();
      if (jsonResp.items) {
        jsonResp.items.map((item) => {
          repos.add(item.repository.html_url);
        });
      }

      const links = parse(res.headers.get("link"));

      maxPages = parseInt(links.last.page);
      pageNum = parseInt(links.next.page);
    }
  }

  return repos;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function retrieveOrgRepos(orgNames) {
  let orgRepos = new Set();

  orgNames.map((org) => {
    let url = `${GITHUB_API_URL}/orgs/${org}/repos`;
    retrieveGithubRepos(url).then((repos) => {
      repos.forEach((repo) => {
        orgRepos.add(repo);
      });
    });
  });

  return orgRepos;
}

export function retrieveTopicRepos(topics) {
  let topicRepos = new Set();

  topics.map((topic) => {
    let url = `${GITHUB_API_URL}/search/code?q=topic%3A${topic}&sort=indexed`;
    retrieveGithubRepos(url).then((repos) => {
      repos.forEach((repo) => {
        topicRepos.add(repo);
      });
    });
  });

  return topicRepos;
}
