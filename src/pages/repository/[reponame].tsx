import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import Issue from '../../components/Issue';
import ProfileRepositoryCard from '../../components/ProfileRepositoryCard';
import { api } from '../../api';
import * as S from '../Repository/styles';

interface RepositoryProps {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues: number;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface IssueProps {
  id: number;
  html_url: string;
  number: number;
  title: string;
  user: {
    login: string;
  };
  labels: [{
    name: string;
  }];
}

const Repository = () => {
  const [repository, setRepository] = useState<RepositoryProps | null>(null);
  const [issues, setIssues] = useState<IssueProps[]>([]);

  const router = useRouter();
  const { reponame } = router.query as { reponame?: string };

  useEffect(() => {
    if (!reponame) return;
    async function handleGetData(): Promise<void> {
      const repo = await fetch(`${api}/repos/${reponame}`);
      const repoData = await repo.json();

      const issuesRes = await fetch(`${api}/repos/${reponame}/issues`);
      const issuesData = await issuesRes.json();

      setRepository(repoData);
      setIssues(issuesData);
    }

    handleGetData();
  }, [reponame]);

  return (
    <S.Container>
      <Header haveButtonBack="/" />
      <S.Content>
        {
          repository &&
          <ProfileRepositoryCard
            full_name={repository.full_name}
            description={repository.description}
            stargazers_count={repository.stargazers_count}
            forks_count={repository.forks_count}
            open_issues={repository.open_issues}
            owner={repository.owner}
          />
        }
        <S.IssuesContent>
          <strong>Issues</strong>
          {
            issues.length ? issues.map(item => (
              <Issue
                html_url={item.html_url}
                key={item.id}
                number={item.number}
                title={item.title}
                user={item.user}
                labels={item.labels}
              />
            )) : <strong>Nenhuma issue a ser listada</strong>
          }
        </S.IssuesContent>
      </S.Content>
    </S.Container>
  );
};

export default Repository;
