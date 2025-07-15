import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CarCard from '../components/CarCard';
import EnhancedFilters from '../components/EnhancedFilters';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const CarCount = styled.span`
  background-color: #FF5722;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1rem;
  margin-left: 12px;
`;

const CarTypesFilter = styled.div`
  display: flex;
  gap: 12px;
  margin: 24px 0;
  overflow-x: auto;
  padding-bottom: 12px;
  white-space: nowrap;
`;

const CarTypeButton = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--background-secondary)'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#EEEEEE'};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
`;

const FilterContainer = styled.div`
  border-right: 1px solid var(--border-color);
  padding-right: 24px;
`;

const CarListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  align-items: start;  /* 防止卡片被拉伸 */
  
  & > * {
    height: auto;  /* 让卡片高度自适应内容 */
    min-height: 500px;  /* 设置最小高度，原来是450px，增加50px */
    max-height: 500px;  /* 设置最大高度，原来是450px，增加50px */
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${props => props.active ? 'none' : '1px solid var(--border-color)'};
  border-radius: 8px;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--background-secondary)'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0 12px;
  height: 40px;
  font-weight: 500;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--background-secondary);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// FilterState interface to match EnhancedFilters component
interface FilterState {
  brands: string[];
  priceRange: { min: string; max: string };
  transmissions: string[];
  mileage?: { min: string; max: string };
  year?: { min: string; max: string };
  fuelTypes?: string[];
  driveTypes?: string[];
}

// Mock car data
const carData = [
  {
    id: '1',
    image: '/images/Geely.jpg',
    title: 'BMW 850i xDrive',
    price: 55300,
    location: 'Budapest',
    locationCountry: 'HU',
    specs: {
      mileage: 7700,
      fuelType: 'Petrol',
      power: 390,
      driveType: '4WD'
    },
    description: 'A dream car for true connoisseurs of automotive art! The BMW 850i xDrive is the epitome of luxury, style and power. The combination of a powerful engine, premium interior and cutting-edge technology makes this car truly unique.',
    isFeatured: true
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/random/600x400/?mercedes',
    title: 'Mercedes-Benz A 250 e',
    price: 32509,
    location: 'Rome',
    locationCountry: 'IT',
    specs: {
      mileage: 4227,
      fuelType: 'Hybrid',
      power: 160,
      driveType: 'FWD'
    },
    description: 'The perfect car for confident drivers looking for the perfect combination of elegance and eco-friendliness! The Mercedes-Benz A 250 e combines the iconic Mercedes design with innovative hybrid technology.',
    isFeatured: false
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/random/600x400/?lexus',
    title: 'Lexus IS III Restyling 2',
    price: 79038,
    location: 'Manchester',
    locationCountry: 'UK',
    specs: {
      mileage: 1470,
      fuelType: 'Petrol',
      power: 133,
      driveType: 'RWD'
    },
    description: 'The perfect combination of luxury, elegance and safety! The Lexus IS III Restyling 2 is a vehicle that will catch everyone\'s eye and offer uncompromising comfort to its owner.',
    isFeatured: false
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/random/600x400/?kia',
    title: 'Kia Forte III',
    price: 40149,
    location: 'Athens',
    locationCountry: 'GR',
    specs: {
      mileage: 9452,
      fuelType: 'Electric',
      power: 366,
      driveType: '4WD'
    },
    description: 'A great car for active city dwellers looking for style and economy! Kia Forte III combines dynamic design, spacious interior and excellent fuel efficiency.',
    isFeatured: false
  },
  {
    id: '5',
    image: 'https://source.unsplash.com/random/600x400/?audi',
    title: 'Audi A6 V (C8)',
    price: 110049,
    location: 'London',
    locationCountry: 'UK',
    specs: {
      mileage: 6000,
      fuelType: 'Petrol',
      power: 250,
      driveType: '4WD'
    },
    description: 'Unmatched comfort and safety on the road! The Audi A6 V (C8) embodies the perfect balance of style, comfort, technology and driving dynamics.',
    isFeatured: true
  },
  {
    id: '6',
    image: 'https://source.unsplash.com/random/600x400/?toyota',
    title: 'Toyota Camry VIII',
    price: 39000,
    location: 'Berlin',
    locationCountry: 'DE',
    specs: {
      mileage: 12000,
      fuelType: 'Hybrid',
      power: 155,
      driveType: 'FWD'
    },
    description: 'The ideal choice for those who appreciate reliability and quality! The Toyota Camry VIII offers impressive durability, excellent fuel efficiency and spacious interior.',
    isFeatured: false
  },
  {
    id: '7',
    image: 'https://source.unsplash.com/random/600x400/?porsche',
    title: 'Porsche 911 GT3',
    price: 185000,
    location: 'Stuttgart',
    locationCountry: 'DE',
    specs: {
      mileage: 1200,
      fuelType: 'Petrol',
      power: 510,
      driveType: 'RWD'
    },
    description: 'Experience pure driving excellence with the Porsche 911 GT3. This track-focused masterpiece delivers breathtaking performance and precision engineering at its finest.',
    isFeatured: true
  },
  {
    id: '8',
    image: 'https://source.unsplash.com/random/600x400/?tesla',
    title: 'Tesla Model S Plaid',
    price: 129990,
    location: 'Amsterdam',
    locationCountry: 'NL',
    specs: {
      mileage: 3500,
      fuelType: 'Electric',
      power: 1020,
      driveType: 'AWD'
    },
    description: 'The future of automotive performance is here. Tesla Model S Plaid combines ludicrous acceleration with cutting-edge technology and luxurious comfort.',
    isFeatured: true
  },
  {
    id: '9',
    image: 'https://source.unsplash.com/random/600x400/?volkswagen',
    title: 'Volkswagen Golf R',
    price: 45000,
    location: 'Frankfurt',
    locationCountry: 'DE',
    specs: {
      mileage: 8500,
      fuelType: 'Petrol',
      power: 320,
      driveType: '4WD'
    },
    description: 'The ultimate hot hatch. Volkswagen Golf R delivers exceptional performance and practicality in one refined package.',
    isFeatured: false
  },
  {
    id: '10',
    image: 'https://source.unsplash.com/random/600x400/?honda',
    title: 'Honda Civic Type R',
    price: 42000,
    location: 'Paris',
    locationCountry: 'FR',
    specs: {
      mileage: 5000,
      fuelType: 'Petrol',
      power: 330,
      driveType: 'FWD'
    },
    description: 'The legendary Type R returns with more power and precision. This track-ready Honda Civic combines racing heritage with daily usability.',
    isFeatured: false
  },
  {
    id: '11',
    image: 'https://source.unsplash.com/random/600x400/?maserati',
    title: 'Maserati MC20',
    price: 230000,
    location: 'Milan',
    locationCountry: 'IT',
    specs: {
      mileage: 800,
      fuelType: 'Petrol',
      power: 630,
      driveType: 'RWD'
    },
    description: 'Italian excellence meets supercar performance. The Maserati MC20 represents the pinnacle of automotive design and engineering.',
    isFeatured: true
  }
];

// 添加品牌选择器容器样式
const BrandSelectionContainer = styled.div`
  margin: 20px 0;
  padding: 16px 16px 16px 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const BrandSelectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 16px;
`;

// 卡片式品牌选择器样式
const BrandCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
`;

const BrandCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  padding: 10px 8px;
  border: 1px solid ${props => props.isSelected ? '#FF5722' : '#E0E0E0'};
  border-radius: 8px;
  background-color: ${props => props.isSelected ? '#FFF0EB' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    border-color: ${props => props.isSelected ? '#FF5722' : '#BDBDBD'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const BrandCardLogo = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandCardName = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 2px;
`;

const BrandCardModel = styled.div`
  font-size: 0.7rem;
  color: #757575;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const RemoveCardButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  svg {
    width: 10px;
    height: 10px;
  }
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

// 删除品牌分类数据
const brandModels = [
  { brand: 'Mercedes-Benz', model: 'AMG GT, C 150' },
  { brand: 'BMW', model: 'X7, M2, X5' },
  { brand: 'Lexus', model: 'LX 570, RX 300, RX...' },
  { brand: 'Audi', model: 'A6, Q7, RS6' },
  { brand: 'Toyota', model: 'Land Cruiser, Camry' },
  { brand: 'Honda', model: 'Civic, Accord, CR-V' },
  { brand: 'Ford', model: 'Mustang, Explorer' },
  { brand: 'Volkswagen', model: 'Golf, Tiguan, Polo' }
];

const BuyPage: React.FC = () => {
  const [activeCarType, setActiveCarType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [filteredCars, setFilteredCars] = useState(carData);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // 每页显示的车辆数量
  const ITEMS_PER_PAGE = 4;
  
  // 计算总页数
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  // 当筛选条件改变时，重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCars.length]);

  // 页面切换处理函数
  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
      console.log(`切换到页面 ${pageNum}`);
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 计算当前页面要显示的车辆
  const getCurrentCars = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredCars.length);
    return filteredCars.slice(startIndex, endIndex);
  };

  // 获取当前页面的车辆
  const currentCars = getCurrentCars();

  const handleCarTypeChange = (type: string) => {
    setActiveCarType(type);
    // 这里应该添加按车型筛选的逻辑
  };

  // 更新筛选器处理函数
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    
    // 应用所有筛选条件
    let result = [...carData];
    
    // 1. 应用品牌筛选
    if (selectedBrands.length > 0) {
      result = result.filter(car => 
        selectedBrands.some(brand => car.title.includes(brand))
      );
    }
    
    // 2. 应用价格范围筛选
    if (newFilters.priceRange) {
      const minPrice = parseFloat(newFilters.priceRange.min.replace(/\s/g, ''));
      const maxPrice = parseFloat(newFilters.priceRange.max.replace(/\s/g, ''));
      
      if (!isNaN(minPrice)) {
        result = result.filter(car => car.price >= minPrice);
      }
      
      if (!isNaN(maxPrice)) {
        result = result.filter(car => car.price <= maxPrice);
      }
    }
    
    // 3. 应用里程筛选
    if (newFilters.mileage) {
      const minMileage = parseFloat(newFilters.mileage.min.replace(/\s/g, ''));
      const maxMileage = parseFloat(newFilters.mileage.max.replace(/\s/g, ''));
      
      if (!isNaN(minMileage)) {
        result = result.filter(car => car.specs.mileage >= minMileage);
      }
      
      if (!isNaN(maxMileage)) {
        result = result.filter(car => car.specs.mileage <= maxMileage);
      }
    }
    
    // 4. 应用燃料类型筛选
    if (newFilters.fuelTypes && newFilters.fuelTypes.length > 0) {
      result = result.filter(car => 
        newFilters.fuelTypes!.includes(car.specs.fuelType)
      );
    }
    
    // 5. 应用驱动方式筛选
    if (newFilters.driveTypes && newFilters.driveTypes.length > 0) {
      result = result.filter(car => 
        newFilters.driveTypes!.includes(car.specs.driveType)
      );
    }
    
    // 更新筛选后的车辆列表
    setFilteredCars(result);
  }, [selectedBrands]);

  // 品牌选择相关函数
  const handleBrandCardClick = useCallback((brand: string) => {
    // 更新选中的品牌
    setSelectedBrands(prev => {
      const newBrands = prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand];
      
      // 应用筛选条件
      let result = [...carData];
      
      // 应用品牌筛选
      if (newBrands.length > 0) {
        result = result.filter(car =>
          newBrands.some(b => car.title.includes(b))
        );
      }
      
      // 如果存在其他筛选条件，继续应用
      if (filters) {
        // 应用价格范围
        if (filters.priceRange) {
          const minPrice = parseFloat(filters.priceRange.min.replace(/\s/g, ''));
          const maxPrice = parseFloat(filters.priceRange.max.replace(/\s/g, ''));
          
          if (!isNaN(minPrice)) {
            result = result.filter(car => car.price >= minPrice);
          }
          
          if (!isNaN(maxPrice)) {
            result = result.filter(car => car.price <= maxPrice);
          }
        }
        
        // 应用其他筛选条件
        if (filters.fuelTypes && filters.fuelTypes.length > 0) {
          result = result.filter(car => 
            filters.fuelTypes!.includes(car.specs.fuelType)
          );
        }
        
        if (filters.driveTypes && filters.driveTypes.length > 0) {
          result = result.filter(car => 
            filters.driveTypes!.includes(car.specs.driveType)
          );
        }
      }
      
      // 更新筛选后的车辆列表
      setFilteredCars(result);
      
      return newBrands;
    });
  }, [filters]);

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title>Buy a car</Title>
          <CarCount>{filteredCars.length} cars</CarCount>
        </div>
        
        <CarTypesFilter>
          <CarTypeButton 
            active={activeCarType === 'all'} 
            onClick={() => handleCarTypeChange('all')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke={activeCarType === 'all' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke={activeCarType === 'all' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke={activeCarType === 'all' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All cars
          </CarTypeButton>
          
          <CarTypeButton 
            active={activeCarType === 'sedan'} 
            onClick={() => handleCarTypeChange('sedan')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 17H21V11L17 7H9L5 11V17H7" stroke={activeCarType === 'sedan' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="17" r="2" stroke={activeCarType === 'sedan' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="19" cy="17" r="2" stroke={activeCarType === 'sedan' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sedan
          </CarTypeButton>
          
          <CarTypeButton 
            active={activeCarType === 'suv'} 
            onClick={() => handleCarTypeChange('suv')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11L7 4H17L21 11M3 11V17H5M3 11H21M21 11V17H19M5 17H19M5 17C5 17 5 19 7 19C9 19 9 17 9 17M19 17C19 17 19 19 17 19C15 19 15 17 15 17" stroke={activeCarType === 'suv' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            SUV
          </CarTypeButton>
          
          <CarTypeButton 
            active={activeCarType === 'coupe'} 
            onClick={() => handleCarTypeChange('coupe')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L5 17H19L17 10L13 7H11L7 10Z" stroke={activeCarType === 'coupe' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 17H3V19H5V17Z" stroke={activeCarType === 'coupe' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 17H21V19H19V17Z" stroke={activeCarType === 'coupe' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Coupe
          </CarTypeButton>
          
          <CarTypeButton 
            active={activeCarType === 'hatchback'} 
            onClick={() => handleCarTypeChange('hatchback')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 11L7 7H15L19 11M5 11V17H7M5 11H19M19 11V17H17M7 17H17M7 17C7 17 7 19 9 19C11 19 11 17 11 17M17 17C17 17 17 19 15 19C13 19 13 17 13 17" stroke={activeCarType === 'hatchback' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Hatchback
          </CarTypeButton>
          
          <CarTypeButton 
            active={activeCarType === 'pickup'} 
            onClick={() => handleCarTypeChange('pickup')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 15H21V10L19 5H9L7 10V15H12" stroke={activeCarType === 'pickup' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 5V15" stroke={activeCarType === 'pickup' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="18" r="3" stroke={activeCarType === 'pickup' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="21" cy="18" r="3" stroke={activeCarType === 'pickup' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Pickup
          </CarTypeButton>
        </CarTypesFilter>
      </PageHeader>
      
      {/* 品牌选择器 */}
      <BrandSelectionContainer>
        <BrandSelectionTitle>品牌筛选</BrandSelectionTitle>
        
        <BrandCardsContainer>
          {brandModels.map(item => (
            <BrandCard 
              key={item.brand} 
              isSelected={selectedBrands.includes(item.brand)}
              onClick={() => handleBrandCardClick(item.brand)}
            >
              <BrandCardLogo>
                {item.brand === 'Mercedes-Benz' && (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                    <path d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="black" strokeWidth="1.5" />
                  </svg>
                )}
                {item.brand === 'BMW' && (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                    <path d="M12 12H22M12 12V22M12 12H2M12 12V2" stroke="black" strokeWidth="1.5" />
                  </svg>
                )}
                {item.brand === 'Lexus' && (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                    <path d="M8 8L16 16M16 8L8 16" stroke="black" strokeWidth="2" />
                  </svg>
                )}
                {(item.brand !== 'Mercedes-Benz' && item.brand !== 'BMW' && item.brand !== 'Lexus') && (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                  </svg>
                )}
              </BrandCardLogo>
              <BrandCardName>{item.brand}</BrandCardName>
              <BrandCardModel>{item.model}</BrandCardModel>
              {selectedBrands.includes(item.brand) && (
                <RemoveCardButton onClick={(e) => {
                  e.stopPropagation();
                  handleBrandCardClick(item.brand);
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L3 9" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 3L9 9" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </RemoveCardButton>
              )}
            </BrandCard>
          ))}
        </BrandCardsContainer>
      </BrandSelectionContainer>
      
      <ContentContainer>
        <FilterContainer>
          <EnhancedFilters onFilterChange={handleFilterChange} />
        </FilterContainer>
        
        <div>
          <CarListContainer>
            {currentCars.length > 0 ? (
              currentCars.map(car => (
                <CarCard 
                  key={car.id} 
                  {...car} 
                />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0' }}>
                <h3>没有找到匹配的车辆</h3>
                <p>请尝试调整筛选条件以查看更多结果。</p>
              </div>
            )}
          </CarListContainer>
          
          {filteredCars.length > ITEMS_PER_PAGE && (
            <Pagination>
              <NavButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                上一页
              </NavButton>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <PageButton 
                  key={pageNum}
                  active={currentPage === pageNum} 
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </PageButton>
              ))}
              
              <NavButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </NavButton>
            </Pagination>
          )}
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default BuyPage; 