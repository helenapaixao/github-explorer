import React from 'react';

import xIcon from '../../assets/x-circle.svg';
import arrowIcon from '../../assets/arrow-right.svg';

import * as S from './styles';
import Link from 'next/link';

interface UserCardProps {
  login: string;
  avatar_url: string;
  name: string;
  bio?: string;
  handleExcludeUser(login: string): void;
}

const UserCard = ({login, avatar_url, name, bio, handleExcludeUser}: UserCardProps) => {
  return (
    <S.Container>
      <S.Card>
        <img src={avatar_url} alt="Avatar"/>
        <S.CardInfos>
          <S.Username>
            <Link href={`/profile/${login}`} passHref>
              <a>{name}</a>
            </Link>
            <span>{login}</span>
          </S.Username>
          <p>{bio}</p>
        </S.CardInfos>
      </S.Card>
      <button onClick={() => handleExcludeUser(login)}>
        <img src={xIcon} alt="Apagar"/>
      </button>
    </S.Container>
  )
}

export default UserCard;