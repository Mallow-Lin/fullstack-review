const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
 });
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: { type: Number, unique: true, required: true},
  repo_name: String,
  owner: String,
  owner_url: String,
  description: { type: String, required: true},
  url: String,
  forks: Number,
  watchers: Number,
  branch: String,
  created_at: String,
  language: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos = repos.data;
  repos.forEach((repo) => {
    Repo.findOne({repo_id: repo.id})
      .then((result) => {
      if (result) {
        console.log('file saved already')
      } else {
        var newRepo = new Repo ({
          repo_id: repo.id,
          repo_name: repo.name,
          owner: repo.owner.login,
          owner_url: repo.owner.html_url,
          description: repo.description || 'No Description',
          url: repo.html_url,
          forks: repo.forks,
          watchers: repo.watchers_count,
          branch: repo.default_branch,
          created_at: repo.created_at.split('T')[0],
          language: repo.language
        })
        console.log('reporeporepo', newRepo)
        return newRepo.save((err)=> {
          if (err) {
            console.log('save failed')
          } else {
            console.log('save successfully');
          }
        })
      }
    })
  })
}

module.exports.save = save;
module.exports.Repo = Repo;