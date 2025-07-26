import React from 'react';

import codeIcon from '../../assets/code.svg';
import * as S from './styles';
import Link from 'next/link';

interface RepoProps {
  name: string;
  description: string;
  language: string;
  full_name: string;
}

const RepoBasic = ({
  description,
  language,
  name,
  full_name,
}: RepoProps) => {
  return (
    <Link href={`/repository/${full_name}`} passHref>
      <S.Container>
        <S.RepoName>{name}</S.RepoName>
        <S.RepoDescription>{description}</S.RepoDescription>
        <S.RepoLanguage>
          <img src={codeIcon} alt="Linguagem" />
          {language}
        </S.RepoLanguage>
      </S.Container>
    </Link>
  );
}

export default RepoBasic;