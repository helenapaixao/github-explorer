import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../src/components/Header/Header';
import RepositoryCard from '../src/components/RepositoryCard';
import UserCard from '../src/components/UserCard';

import searchIcon from '../src/assets/search.svg';
import searchImg from '../src/assets/searchimg.svg';

import { api } from '../src/api';
import * as S from '../src/pages/Explorer/styles';

interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

interface Repository {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  owner: {
    avatar_url: string;
  };
}

const Explorer = () => {
  const [inputError, setInputError] = useState('');
  const [filter, setFilter] = useState('repos');
  const [newSearch, setNewSearch] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@github_explorer:repositories');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const storagedUsers = localStorage.getItem('@github_explorer:users');

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }

    return [];
  });

  useEffect(() => {
    setInputError('');
  }, [filter]);

  useEffect(() => {
    localStorage.setItem('@github_explorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  useEffect(() => {
    localStorage.setItem('@github_explorer:users', JSON.stringify(users));
  }, [users]);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newSearch) {
      setInputError('Favor preencha o campo!');
      return;
    }

    fetch(`${api}/${filter}/${newSearch}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        filter === 'repos'
          ? setRepositories([...repositories, response])
          : setUsers([...users, response]);

        setNewSearch('');
        setInputError('');
      })
      .catch(() => setInputError('Houve um erro na sua busca. Tente outro repositório ou usuário.'));
  }

  function handleExcludeRepository(id: number) {
    const newRepositoriesList = repositories.filter(item => item.id !== id);
    setRepositories(newRepositoriesList);
  }

  function handleExcludeUser(login: string) {
    const newUsersList = users.filter(item => item.login !== login);
    setUsers(newUsersList);
  }

  return (
    <S.Container>
      <Header />

      <S.Title>Explore no Github.</S.Title>
      <S.Form hasError={Boolean(inputError)} onSubmit={handleSearch}>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="repos">Repositórios</option>
          <option value="users">Usuários</option>
        </select>
        <input
          type="text"
          placeholder="Digite aqui"
          value={newSearch}
          onChange={e => setNewSearch(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="Pesquisar" />
        </button>

        <S.InputError>{inputError}</S.InputError>
      </S.Form>

      <S.MainContent>
        {!repositories.length && !users.length && <S.Search src={searchImg} alt="Nenhum recente" />}

        {filter === 'repos' &&
          repositories
            .map(repo => (
              <RepositoryCard
                key={repo.id}
                id={repo.id}
                html_url={repo.html_url}
                full_name={repo.full_name}
                description={repo.description}
                stargazers_count={repo.stargazers_count}
                forks_count={repo.forks_count}
                language={repo.language}
                owner={repo.owner}
                handleExcludeRepository={handleExcludeRepository}
              />
            ))
            .reverse()}

        {filter === 'users' &&
          users
            .map(user => (
              <UserCard
                key={user.login}
                login={user.login}
                avatar_url={user.avatar_url}
                name={user.name}
                bio={user.bio}
                handleExcludeUser={handleExcludeUser}
              />
            ))
            .reverse()}
      </S.MainContent>
    </S.Container>
  );
};

export default Explorer;
