import React from 'react';

import Link from 'next/link';
import logoImg from '../../assets/logo.svg';
import arrowLeftIcon from '../../assets/arrow-left.svg';

import * as S from './styles';

type Props = {
  haveButtonBack?: string;
  children?: React.ReactNode;
}

const Header = ({children, haveButtonBack}: Props) => {
  
  return (
    <S.Container>
      <S.NavContent>
        <img src={logoImg} alt="github explorer"/>
        {haveButtonBack ? (
          <Link href={haveButtonBack} passHref>
            <a>
              <img src={arrowLeftIcon} alt="Voltar" />Voltar
            </a>
          </Link>
        ) : (
          <div />
        )}
      </S.NavContent>
      {children}
    </S.Container>
  );
}

export default Header;