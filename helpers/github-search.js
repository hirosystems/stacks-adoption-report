const parse = require("parse-link-header");
import { GITHUB_API_URL, GITHUB_API_TOKEN } from "../constants/github";

export async function retrieveGithubRepos(query) {
  let pageNum = 1;
  let maxPages = 2;
  let repos = new Set();

  while (pageNum < maxPages) {
    let url = `${GITHUB_API_URL}/search/code?q=${query}&sort=indexed&per_page=100&page=${pageNum}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (res.status > 400) {
      console.log(`Hitting secondary rate limits. Waiting for 60 seconds ....`);
      await delay(60000);
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

function parseLink(s) {
  const output = {};
  const regex = /<([^>]+)>; rel="([^"]+)"/g;

  let m;
  while ((m = regex.exec(s))) {
    const [_, v, k] = m;
    output[k] = v;
  }

  return output;
}
