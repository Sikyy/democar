import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SubscribeSection = styled.div``;

const SubscribeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SubscribeForm = styled.form`
  display: flex;
  margin-bottom: 1.5rem;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem 0 0 0.25rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubscribeButton = styled.button`
  background-color: var(--primary-color, #FF5722);
  color: white;
  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
  padding: 0 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #e64a19;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #f5f5f5;
  border-radius: 50%;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
  font-size: 0.8rem;
  color: #666;
`;

const Copyright = styled.div``;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const BottomLink = styled(Link)`
  color: #666;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <Logo>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#FF5722" />
              <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CNCCAR
          </Logo>
        </Section>
        
        <Section>
          <SectionTitle>Buy</SectionTitle>
          <LinkList>
            <LinkItem><FooterLink to="/buy/sedan">Sedan</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/buy/suv">SUV</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/buy/hatchback">Hatchback</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/buy/motorcycles">Motorcycles</FooterLink></LinkItem>
          </LinkList>
        </Section>
        
        <Section>
          <SectionTitle>Sell</SectionTitle>
          <LinkList>
            <LinkItem><FooterLink to="/sell/valuation">Valuation</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/sell/trade-in">Traded-in</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/sell/commission">Commission sale</FooterLink></LinkItem>
          </LinkList>
        </Section>
        
        <Section>
          <SectionTitle>Company</SectionTitle>
          <LinkList>
            <LinkItem><FooterLink to="/about">About</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/career">Career</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/contacts">Contacts</FooterLink></LinkItem>
            <LinkItem><FooterLink to="/magazine">Magazine</FooterLink></LinkItem>
          </LinkList>
        </Section>
        
        <SubscribeSection>
          <SubscribeTitle>Subscribe to the newsletter</SubscribeTitle>
          <SubscribeForm>
            <EmailInput type="email" placeholder="E-mail" />
            <SubscribeButton>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SubscribeButton>
          </SubscribeForm>
          
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1H7C5.93913 1 4.92172 1.42143 4.17157 2.17157C3.42143 2.92172 3 3.93913 3 5V7H1V10H3V15H6V10H8L9 7H6V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H9V1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 1H4.5C2.56705 1 1 2.56705 1 4.5V11.5C1 13.433 2.56705 15 4.5 15H11.5C13.433 15 15 13.433 15 11.5V4.5C15 2.56705 13.433 1 11.5 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.7 7.61001C10.7965 8.13804 10.7416 8.68524 10.5416 9.17555C10.3417 9.66586 10.0055 10.0793 9.57231 10.3648C9.13912 10.6502 8.62409 10.7947 8.09978 10.7782C7.57546 10.7617 7.07053 10.5848 6.65687 10.2712C6.24321 9.95761 5.93624 9.52428 5.77939 9.02558C5.62254 8.52688 5.62207 7.99402 5.77801 7.49506C5.93394 6.9961 6.24009 6.5623 6.65313 6.24799C7.06618 5.93368 7.57076 5.75596 8.095 5.73901C8.62974 5.72151 9.15738 5.86573 9.60178 6.15079C10.0462 6.43585 10.3899 6.85023 10.598 7.33801C10.6658 7.49189 10.7158 7.65304 10.747 7.81901" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.75 4.25H11.758" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://whatsapp.com" target="_blank">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.075 3.9C12.624 3.44445 12.0867 3.08331 11.4919 2.84122C10.8971 2.59913 10.2579 2.48099 9.61254 2.5C5.0125 2.5 1.32504 6.175 1.30004 10.7625C1.30004 12.0875 1.65004 13.375 2.30004 14.5L1.25 19L5.86254 18C7.02254 18.6 8.30004 18.9 9.60004 18.9H9.61254C13.0125 18.9 16.7 15.225 16.7 10.6375C16.7 9.35 16.475 8.0875 15.95 6.95C15.5561 6.07274 14.9745 5.2984 14.2466 4.68402C13.5188 4.06963 12.6641 3.63131 11.75 3.4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.2 13.4C11.6 13.7 10.9 13.9 10.2 13.9C8 13.9 6.2 12.1 6.2 9.9C6.2 7.7 8 5.9 10.2 5.9C12.4 5.9 14.2 7.7 14.2 9.9C14.2 10.6 14 11.3 13.7 11.9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
          </SocialLinks>
        </SubscribeSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>© 2024 «CNCCAR» All rights reserved</Copyright>
        <BottomLinks>
          <BottomLink to="/terms">Terms of use</BottomLink>
          <BottomLink to="/privacy">Privacy Policy</BottomLink>
          <BottomLink to="/agreement">User Agreement</BottomLink>
        </BottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 