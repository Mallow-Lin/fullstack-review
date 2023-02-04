import React from 'react';

const DisplayRepos = ({ repo }) => (
  <div style={{border: 'dashed', width: 800,borderRadius: '30px', borderColor: '#EAEDED', backgroundColor: '#EAEDED', marginTop: '20px', color: '#9B59B6', fontColor: '#9B59B6'}}>
    <div style={{marginLeft: '30px'}}>
      <div style={{cursor:'pointer', color: '#9B59B6', fontSize: 25, fontWeight: 'bold'}}>
        <a onClick={() => window.location.href= repo.owner_url}>{repo.owner} / </a>
        <a onClick={() => window.location.href=repo.url}>{repo.repo_name}</a>
      </div>
      <div style={{fontSize: 15, marginTop: 10}}>About: {repo.description}</div>
      <div style={{fontSize: 12, margin: 15}}>
        <a style={{margin: 10, backgroundColor: 'white'}}>Fork: {repo.forks}</a>
        <a style={{margin: 10, backgroundColor: 'white'}}>Watch: {repo.watchers}</a>
        <a style={{margin: 10, backgroundColor: 'white'}}>Branch: {repo.branch}</a>
        <a style={{margin: 10, backgroundColor: 'white'}}>Created_at: {repo.created_at}</a>
        <a style={{margin: 10, backgroundColor: 'white'}}>Language: {repo.language}</a>
      </div>
    </div>
  </div>
)

export default DisplayRepos;