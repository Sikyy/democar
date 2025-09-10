import React from 'react';
import styled from 'styled-components';

interface CarCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  location: string;
  locationCountry: string;
  specs: {
    mileage: number;
    fuelType: string;
    displacement: string;
    power: number;
    driveType: string;
  };
  description: string;
  isFeatured?: boolean;
}

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--background-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  cursor: pointer;
  min-height: 500px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardLink = styled.div`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:active {
    transform: scale(0.99);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PriceTag = styled.div<{ featured?: boolean }>`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
`;

const FeaturedTag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #FF5722;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const SpecsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  margin: 16px 0;
`;

const Spec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpecIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

const SpecValue = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 16px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const BuyButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #111;
  }
`;

const FavoriteButton = styled.button`
  border: 1px solid var(--border-color);
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--background-secondary);
  }
`;

const CarCard: React.FC<CarCardProps> = ({ 
  id,
  image, 
  title, 
  price, 
  location, 
  locationCountry, 
  specs, 
  description, 
  isFeatured 
}) => {

  const handleCardClick = () => {
    console.log(`点击了汽车卡片，正在导航到 /car/${id}`);
    window.location.href = `/car/${id}`;
  };

  return (
    <Card onClick={handleCardClick}>
      <CardLink>
        <ImageContainer>
          {isFeatured && <FeaturedTag>Featured</FeaturedTag>}
          <CarImage src={image} alt={title} loading="lazy" />
          <PriceTag>¥{price.toLocaleString()}</PriceTag>
        </ImageContainer>
        
        <CardContent>
          <Title>{title}</Title>
          <Location>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {location}, {locationCountry}
          </Location>
          
          <Description>{description}</Description>
          
          <SpecsContainer>
            <Spec>
              <SpecIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16V21M12 16L17 18V13L22 15V7L17 5V10L12 8V3L7 5V10L2 8V16L7 18V13L12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SpecIcon>
              <SpecValue>{specs.mileage.toLocaleString()} km</SpecValue>
            </Spec>
            
            <Spec>
              <SpecIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12V19M12 12L7 14M12 12L17 14M12 12V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SpecIcon>
              <SpecValue>{specs.fuelType}</SpecValue>
            </Spec>
            
            <Spec>
              <SpecIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SpecIcon>
              <SpecValue>{specs.displacement}</SpecValue>
            </Spec>
            
            <Spec>
              <SpecIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SpecIcon>
              <SpecValue>{specs.power} hp</SpecValue>
            </Spec>
            
            <Spec>
              <SpecIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17L4 12L9 7M15 17L20 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SpecIcon>
              <SpecValue>{specs.driveType}</SpecValue>
            </Spec>
          </SpecsContainer>
          
          <ButtonsContainer>
            <BuyButton onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}>
              查看详情
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </BuyButton>
            
            <FavoriteButton onClick={(e) => e.stopPropagation()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FavoriteButton>
          </ButtonsContainer>
        </CardContent>
      </CardLink>
    </Card>
  );
};

export default CarCard;