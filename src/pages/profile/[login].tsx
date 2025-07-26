import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import RepoBasic from '../../components/RepoBasic/RepoBasic';
import ProfileUserCard from '../../components/ProfileUserCard';
import { api } from '../../api';
import * as S from '../Profile/styles';

interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Repos {
  name: string;
  description: string;
  language: string;
  full_name: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repos[]>([]);

  const router = useRouter();
  const { login } = router.query as { login?: string };

  useEffect(() => {
    if (!login) return;
    async function loadProfileData(): Promise<void> {
      fetch(`${api}/users/${login}`)
        .then(response => response.json())
        .then(response => setUser(response));

      fetch(`${api}/users/${login}/repos`)
        .then(response => response.json())
        .then(response => setRepos(response));
    }

    loadProfileData();

  }, [login]);

  return (
    <S.Container>
      <Header haveButtonBack="/" />
      <S.Content>
        { user &&
            <ProfileUserCard
              avatar_url={user.avatar_url}
              bio={user.bio}
              followers={user.followers}
              following={user.following}
              login={user.login}
              name={user.name}
              public_repos={user.public_repos}
            />
        }
        <S.RepositoriesList>
          <strong>Repositórios</strong>

          {
            repos.length ? repos.map(item => (
              <RepoBasic
                key={item.name}
                description={item.description}
                language={item.language}
                name={item.name}
                full_name={item.full_name}
              />
            )) : <strong>Nenhum repositório a ser listado</strong>
          }
        </S.RepositoriesList>
      </S.Content>
    </S.Container>
  );
};

export default Profile;
