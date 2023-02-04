import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import DisplayRepos from './components/DisplayRepos.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const fetchPage = () => {
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'GET'
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
        fetchPage();
      },
      error: (err) => { //POST request failED
        console.log('Failed POST request', err)
      }
    })
    console.log(`${term} was searched`);
  }

  return (
    <div>
      <div style={{cursor:'pointer', color: '#9B59B6', fontSize: 40}} onClick={() => window.location.href='http://localhost:1128'} >
        <h1><img width={100} height={100} src='https://icones.pro/wp-content/uploads/2021/06/icone-github-violet.png'/>Github Fetcher</h1>
      </div>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
      <div style={{fontSize: 20, fontWeight: 'bold', margin: 20, color: '#9B59B6'}}>Heres Top {repos.length} repositories</div>
      {repos.map((repo) => (
        <DisplayRepos repo={repo}/>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));