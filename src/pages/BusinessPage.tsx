import React, { useState } from 'react';
import styled from 'styled-components';

const BusinessContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  color: black;
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: black;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333333;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }
`;

const RightSection = styled.div`
  flex: 1;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
  
  &::after {
    content: ' *';
    color: #e74c3c;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #333;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const BusinessPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 这里可以添加表单提交逻辑
    alert('感谢您的留言！我们会尽快回复您。');
  };

  return (
    <BusinessContainer>
      <ContentWrapper>
        <LeftSection>
          <Logo>CNCCAR</Logo>
          <ContactInfo>
            <ContactItem>INFO@CNCCAR.CN</ContactItem>
            <ContactItem>123-456-7890</ContactItem>
            <ContactItem>Москва, Каширское шоссе 61к3А,</ContactItem>
            <ContactItem>павильон 52е</ContactItem>
          </ContactInfo>
        </LeftSection>
        
        <RightSection>
          <FormCard>
            <FormTitle>联系我们 / 7917</FormTitle>
            <Form onSubmit={handleSubmit}>
              <InputRow>
                <InputGroup>
                  <Label>姓</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>名</Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </InputRow>
              
              <InputGroup>
                <Label>电子邮件</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <Label>信息</Label>
                <TextArea
                  name="message"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              
              <SubmitButton type="submit">
                提交
              </SubmitButton>
            </Form>
          </FormCard>
        </RightSection>
      </ContentWrapper>
    </BusinessContainer>
  );
};

export default BusinessPage;