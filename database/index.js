const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach((repo) => {
    var newRepo = new Repo ({
      repo_id: repo.id,
      repo_name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      url: repo.url,
      forks: repo.forks
    })
    newRepo.save((err)=> {
      if (err) {
        console.log('error in savinv', err)
      } else {
        console.log('save successfully');
      }
    })
  })
}

module.exports.save = save;