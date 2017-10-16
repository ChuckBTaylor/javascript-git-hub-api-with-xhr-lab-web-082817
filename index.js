window.onload = function() {
  const form = document.getElementById("getUsernameForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    handleSubmit();
  });
};

const BaseUrl = `https://api.github.com`;

function handleSubmit() {
  const username = document.getElementById("username").value;
  getRepositories(username);
}

function getRepositories(username) {
  fetch(`${BaseUrl}/users/${username}/repos`, {
    headers: { Authorization: `token d6ba26b719807d2ab7ebfac24cbb4b03c2d6d1e3` }
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      displayRepos(json);
    });
}

function displayRepos(repos) {
  repos.forEach(repo => renderRepo(repo));
}

function renderRepo(repo) {
  const div = document.getElementById("repositories");
  newRepo = document.createElement("p");
  newRepo.innerHTML = `<p> Name: ${repo.name} <br>
  URL: <a href="${repo.html_url}" target='_blank'>Link to Repo</a><br>
    <a href='#' onclick='getCommits()' data-owner="${repo.owner
      .login}" data-reponame="${repo.name}"> Get Commits </a><br>
    <a href="#" onclick='getBranches("${repo.owner
      .login}", "${repo.name}")' data-id="funTime">Get Branches</a></p>`;
  div.prepend(newRepo);
}

function getCommits() {
  const repoInfo = event.target.dataset;
  fetch(`${BaseUrl}/repos/${repoInfo.owner}/${repoInfo.reponame}/commits`, {
    headers: {
      Authorization: `token d6ba26b719807d2ab7ebfac24cbb4b03c2d6d1e3`
    }
  })
    .then(res => res.json())
    .then(json => displayCommits(json));
}

function displayCommits(commits) {
  const div = document.getElementById("details");
  div.innerHTML = "";
  const innerDiv = document.createElement("p");
  innerDiv.innerHTML = `<ul> ${commits
    .map(
      commit =>
        "<li><ul><li>Author: " +
        (commit.author ? commit.author.login : "<None>") +
        "</li><li> Author's Name: " +
        commit.commit.committer.name +
        "</li><li> Message: " +
        commit.commit.message +
        "</li></ul></li>"
    )
    .join("")}</ul>`;
  div.append(innerDiv);
}

function getBranches(owner, repoName) {
  fetch(`${BaseUrl}/repos/${owner}/${repoName}/branches`, {
    headers: { Authorization: `token d6ba26b719807d2ab7ebfac24cbb4b03c2d6d1e3` }
  })
    .then(res => res.json())
    .then(json => displayBranches(json));
}

function displayBranches(json) {
  const div = document.getElementById("details");
  div.innerHTML = "";
  const innerDiv = document.createElement("p");
  innerDiv.innerHTML = `<ul>${json
    .map(branch => "<li>Name: " + branch.name + "</li>")
    .join("")}</ul>`;
  div.append(innerDiv);
}
