import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import DisplayRepos from './components/DisplayRepos.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [term, setTerm] = useState('');

  const fetchPage = () => {
    $.ajax({
      url: 'http://localhost:1128',
      type: 'POST'
    })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        console.log('err fetch initial page', err)
      })
  }

  useEffect(() => {
    fetchPage();
  }, []);

  const search = (term) => {
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'POST',
      data: { username: term },
      success: () => {
        $.ajax({
          url: 'http://localhost:1128/repos',
          type: 'GET',
          data: { username: term },
          success: (data) => {
            setRepos(data);
            setTerm(term);
          },
          error: (err) => {
            console.log('Failed GET request', err)
          }
        })
      },
      error: (err) => { //POST request failED
        console.log('Failed POST request', err)
      }
    })
    console.log(`${term} was searched`);
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
      <h4>Heres {term} Top {repos.length} repositories</h4>
      {repos.map((repo) => (
        <DisplayRepos repo={repo}/>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));