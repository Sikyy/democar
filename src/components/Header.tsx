import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const LogoIcon = styled.div`
  margin-right: 0.5rem;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 0;
  font-weight: 400;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &.active {
    font-weight: 600;
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const LanguageSelector = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const LanguageDropdown = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop)
})<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 120px;
  z-index: 100;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const LanguageOption = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? 'var(--primary-color)' : 'inherit'};
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Header: React.FC = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('中文');
  
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };
  
  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    setIsLanguageDropdownOpen(false);
  };
  
  return (
    <HeaderContainer>
      <LogoSection>
        <Logo to="/">
          <LogoIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#FF5722" />
              <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </LogoIcon>
          CNCCAR
        </Logo>
      </LogoSection>
      
      <Navigation>
        <NavLink to="/buy">Buy Car</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/business">Business</NavLink>
      </Navigation>
      
      <RightSection>
        <LanguageSelector>
          <LanguageButton onClick={toggleLanguageDropdown}>
            {currentLanguage}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </LanguageButton>
          
          <LanguageDropdown isOpen={isLanguageDropdownOpen}>
            <LanguageOption 
              active={currentLanguage === '中文'} 
              onClick={() => changeLanguage('中文')}
            >
              中文
            </LanguageOption>
            <LanguageOption 
              active={currentLanguage === 'English'} 
              onClick={() => changeLanguage('English')}
            >
              English
            </LanguageOption>
            <LanguageOption 
              active={currentLanguage === 'Русский'} 
              onClick={() => changeLanguage('Русский')}
            >
              Русский
            </LanguageOption>
          </LanguageDropdown>
        </LanguageSelector>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;