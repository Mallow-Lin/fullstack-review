import React from 'react';

const DisplayRepos = ({ repo }) => (
  <div>
    <a>{repo.owner} / </a>
    <a>{repo.repo_name}</a>
    <div>About: {repo.description}</div>
    <ul>Fork: {repo.forks}</ul>
    <ul>Watch: {repo.watchers}</ul>
    <ul>Branch: {repo.branch}</ul>
    <ul>Created_at: {repo.created_at}</ul>
    <ul>Language: {repo.language}</ul>
  </div>
)

export default DisplayRepos;