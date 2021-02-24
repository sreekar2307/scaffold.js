const scaffold = require('..');
const faker = require('faker');
const schema = {
  types: {
    Commit: {
      author: 'User',
      commitTime: 'date',
      committer: 'User',
      message: 'text',
      sha: {
        _func: [faker.git.commitSha],
      },
    },
    Repository: {
      _hasMany: 'Commit',
      description: 'text',
      forks: 'number',
      id: 'id',
      name: 'string',
      owner: 'User',
      private: 'boolean',
      url: {
        _func: [faker.internet.url],
      },
    },
    User: {
      _hasMany: 'Repository',
      company: 'string',
      email: {
        _func: [faker.internet.email, 'scaffold', 'awesome'],
      },
      id: 'id',
      name: 'string',
    },
  },
};
const { userGenerator } = scaffold({
  hasManyMin: 1,
  schema,
});
const user = userGenerator();
const userRepos = user.repositories;
const firstRepoCommits = userRepos[0].commits;

console.log(user);
console.log(userRepos);
console.log(firstRepoCommits);
