import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
      $.ajax({
        url: 'http://localhost:1128/repos',
        type: 'POST',
        data: {
          username: term
        },
        success: () => {
          console.log('POST sucessfully');
        },
        error: (err) => { //POST request failED
          console.log('Failed POST request', err)
        }
      })

      // $.ajax({
      //   url: 'http://localhost:1128/repos',
      //   type: 'GET',
      //   data: {
      //     username: term
      //   },
      //   success: () => {
      //   }
      // })

    console.log(`${term} was searched`);
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));