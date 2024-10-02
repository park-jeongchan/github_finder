import { Octokit } from "https://esm.sh/octokit";


const octokit = new Octokit({
  // api key 깃허브에 올릴시 삭제되서 따로 저장
  auth: ""
});
export class Github {

  async getUser(user) {
    const profileResponse =
      await octokit.request("GET /users/{username}",
        {
          username: user,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      console.log(profileResponse);

    const repoResponse =
      await octokit.request('GET /users/{username}/repos?=per_page=5',
        {
          username: user,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      console.log(repoResponse);

    const profile = profileResponse;
    const repos = repoResponse;

    return {
      profile,
      repos
    }
  }
}