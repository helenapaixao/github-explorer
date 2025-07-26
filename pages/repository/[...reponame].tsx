import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../src/components/Header/Header';
import Issue from '../../src/components/Issue';
import ProfileRepositoryCard from '../../src/components/ProfileRepositoryCard';

import { api } from '../../src/api';
import * as S from '../../src/pages/Repository/styles';

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
  const { reponame } = router.query as { reponame?: string[] };
  const repoParam = Array.isArray(reponame) ? reponame.join('/') : reponame || '';

  useEffect(() => {
    if (!repoParam) return;
    async function handleGetData(): Promise<void> {
      const repo = await fetch(`${api}/repos/${repoParam}`);
      const repoData = await repo.json();

      const issuesRes = await fetch(`${api}/repos/${repoParam}/issues`);
      const issuesData = await issuesRes.json();

      setRepository(repoData);
      setIssues(issuesData);
    }

    handleGetData();
  }, [repoParam]);

  return (
    <S.Container>
      <Header haveButtonBack="/" />
      <S.Content>
        {repository && (
          <ProfileRepositoryCard
            full_name={repository.full_name}
            description={repository.description}
            stargazers_count={repository.stargazers_count}
            forks_count={repository.forks_count}
            open_issues={repository.open_issues}
            owner={repository.owner}
          />
        )}
        <S.IssuesContent>
          <strong>Issues</strong>

          {issues.length ? (
            issues.map(item => (
              <Issue
                html_url={item.html_url}
                key={item.id}
                number={item.number}
                title={item.title}
                user={item.user}
                labels={item.labels}
              />
            ))
          ) : (
            <strong>Nenhuma issue a ser listada</strong>
          )}
        </S.IssuesContent>
      </S.Content>
    </S.Container>
  );
};

export default Repository;
