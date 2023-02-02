const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
 });
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: { type: Number, unique: true},
  repo_name: String,
  owner: String,
  description: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos = repos.data;
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
        console.log('save failed', err)
      } else {
        console.log('save successfully');
      }
    })
  })
}

module.exports.save = save;
module.exports.Repo = Repo;