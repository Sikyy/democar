import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CarCard from '../components/CarCard';
import EnhancedFilters from '../components/EnhancedFilters';

const PageContainer = styled.div`
  max-width: 1600px;
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




const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
`;

const FilterContainer = styled.div`
  border-right: 1px solid var(--border-color);
  padding-right: 20px;
`;

const CarListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: start;  /* 防止卡片被拉伸 */
  
  & > * {
    height: auto;  /* 让卡片高度自适应内容 */
  }
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
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

const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})<{ active?: boolean }>`
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
    brand: 'BMW',
    price: 55300,
    location: 'Budapest',
    locationCountry: 'HU',
    vehicleType: 'sports',
    energyType: 'petrol',
    specs: {
      mileage: 7700,
      fuelType: 'Petrol',
      displacement: '4.4L',
      power: 390,
      driveType: '4WD'
    },
    description: 'A dream car for true connoisseurs of automotive art! The BMW 850i xDrive is the epitome of luxury, style and power. The combination of a powerful engine, premium interior and cutting-edge technology makes this car truly unique.',
    isFeatured: true
  },
  {
    id: '2',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1lcmNlZGVzLUJlbno8L3RleHQ+PC9zdmc+',
    title: 'Mercedes-Benz A 250 e',
    brand: 'Mercedes-Benz',
    price: 32509,
    location: 'Rome',
    locationCountry: 'IT',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 4227,
      fuelType: 'Hybrid',
      displacement: '1.3L',
      power: 160,
      driveType: 'FWD'
    },
    description: 'The perfect car for confident drivers looking for the perfect combination of elegance and eco-friendliness! The Mercedes-Benz A 250 e combines the iconic Mercedes design with innovative hybrid technology.',
    isFeatured: false
  },
  {
    id: '3',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxleHVzPC90ZXh0Pjwvc3ZnPg==',
    title: 'Lexus IS III Restyling 2',
    brand: 'Lexus',
    price: 79038,
    location: 'Manchester',
    locationCountry: 'UK',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 1470,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 133,
      driveType: 'RWD'
    },
    description: 'The perfect combination of luxury, elegance and safety! The Lexus IS III Restyling 2 is a vehicle that will catch everyone\'s eye and offer uncompromising comfort to its owner.',
    isFeatured: false
  },
  {
    id: '4',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPktpYTwvdGV4dD48L3N2Zz4=',
    title: 'Kia Forte III',
    brand: 'Kia',
    price: 40149,
    location: 'Athens',
    locationCountry: 'GR',
    vehicleType: 'sedan',
    energyType: 'electric',
    specs: {
      mileage: 9452,
      fuelType: 'Electric',
      displacement: 'N/A',
      power: 366,
      driveType: '4WD'
    },
    description: 'A great car for active city dwellers looking for style and economy! Kia Forte III combines dynamic design, spacious interior and excellent fuel efficiency.',
    isFeatured: false
  },
  {
    id: '5',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkF1ZGk8L3RleHQ+PC9zdmc+',
    title: 'Audi A6 V (C8)',
    brand: 'Audi',
    price: 110049,
    location: 'London',
    locationCountry: 'UK',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 6000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 250,
      driveType: '4WD'
    },
    description: 'Unmatched comfort and safety on the road! The Audi A6 V (C8) embodies the perfect balance of style, comfort, technology and driving dynamics.',
    isFeatured: true
  },
  {
    id: '6',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRveW90YTwvdGV4dD48L3N2Zz4=',
    title: 'Toyota Camry VIII',
    brand: 'Toyota',
    price: 39000,
    location: 'Berlin',
    locationCountry: 'DE',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 12000,
      fuelType: 'Hybrid',
      displacement: '2.5L',
      power: 155,
      driveType: 'FWD'
    },
    description: 'The ideal choice for those who appreciate reliability and quality! The Toyota Camry VIII offers impressive durability, excellent fuel efficiency and spacious interior.',
    isFeatured: false
  },
  {
    id: '7',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBvcnNjaGU8L3RleHQ+PC9zdmc+',
    title: 'Porsche 911 GT3',
    brand: 'Porsche',
    price: 185000,
    location: 'Stuttgart',
    locationCountry: 'DE',
    vehicleType: 'sports',
    energyType: 'petrol',
    specs: {
      mileage: 1200,
      fuelType: 'Petrol',
      displacement: '4.0L',
      power: 510,
      driveType: 'RWD'
    },
    description: 'Experience pure driving excellence with the Porsche 911 GT3. This track-focused masterpiece delivers breathtaking performance and precision engineering at its finest.',
    isFeatured: true
  },
  {
    id: '8',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRlc2xhPC90ZXh0Pjwvc3ZnPg==',
    title: 'Tesla Model S Plaid',
    brand: 'Tesla',
    price: 129990,
    location: 'Amsterdam',
    locationCountry: 'NL',
    vehicleType: 'sedan',
    energyType: 'electric',
    specs: {
      mileage: 3500,
      fuelType: 'Electric',
      displacement: 'N/A',
      power: 1020,
      driveType: 'AWD'
    },
    description: 'The future of automotive performance is here. Tesla Model S Plaid combines ludicrous acceleration with cutting-edge technology and luxurious comfort.',
    isFeatured: true
  },
  {
    id: '9',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlZvbGtzd2FnZW48L3RleHQ+PC9zdmc+',
    title: 'Volkswagen Golf R',
    brand: 'Volkswagen',
    price: 45000,
    location: 'Frankfurt',
    locationCountry: 'DE',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 8500,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 320,
      driveType: '4WD'
    },
    description: 'The ultimate hot hatch. Volkswagen Golf R delivers exceptional performance and practicality in one refined package.',
    isFeatured: false
  },
  {
    id: '10',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhvbmRhPC90ZXh0Pjwvc3ZnPg==',
    title: 'Honda Civic Type R',
    brand: 'Honda',
    price: 42000,
    location: 'Paris',
    locationCountry: 'FR',
    vehicleType: 'sports',
    energyType: 'petrol',
    specs: {
      mileage: 5000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 330,
      driveType: 'FWD'
    },
    description: 'The legendary Type R returns with more power and precision. This track-ready Honda Civic combines racing heritage with daily usability.',
    isFeatured: false
  },
  {
    id: '11',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hc2VyYXRpPC90ZXh0Pjwvc3ZnPg==',
    title: 'Maserati MC20',
    brand: 'Maserati',
    price: 230000,
    location: 'Milan',
    locationCountry: 'IT',
    vehicleType: 'sports',
    energyType: 'petrol',
    specs: {
      mileage: 800,
      fuelType: 'Petrol',
      displacement: '3.0L',
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

const BrandCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop)
})<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  padding: 16px 12px;
  min-height: 50px;
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

// 品牌数据
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

// 车型数据
const carTypes = [
  { type: 'sedan', name: '轿车' },
  { type: 'suv', name: 'SUV' },
  { type: 'mpv', name: 'MPV' },
  { type: 'sports', name: '跑车' }
];

// 能源类型数据
const fuelTypes = [
  { type: 'petrol', name: '汽油' },
  { type: 'diesel', name: '柴油' },
  { type: 'hybrid', name: '油电混合' },
  { type: 'electric', name: '纯电' }
];

const BuyPage: React.FC = () => {

  const [currentPage, setCurrentPage] = useState(1);
  // 移除未使用的filters状态变量
  const [filteredCars, setFilteredCars] = useState(carData);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  
  // 每页显示的车辆数量
  const ITEMS_PER_PAGE = 12;
  
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


    

  // 更新筛选器处理函数
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    
    // 应用所有筛选条件
    let result = [...carData];
    
    // 1. 应用品牌筛选
    if (selectedBrands.length > 0) {
      result = result.filter(car => 
        selectedBrands.includes(car.brand)
      );
    }
    
    // 1.5. 应用车型筛选（基于vehicleType字段）
    if (selectedCarTypes.length > 0) {
      result = result.filter(car => 
        selectedCarTypes.includes(car.vehicleType)
      );
    }
    
    // 1.6. 应用能源类型筛选
    if (selectedFuelTypes.length > 0) {
      result = result.filter(car => {
        const fuelType = car.specs.fuelType.toLowerCase();
        return selectedFuelTypes.some(type => {
          switch(type) {
            case 'petrol': return fuelType === 'petrol';
            case 'diesel': return fuelType === 'diesel';
            case 'hybrid': return fuelType === 'hybrid';
            case 'electric': return fuelType === 'electric';
            default: return false;
          }
        });
      });
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
  }, [selectedBrands, selectedCarTypes, selectedFuelTypes]);

  // 品牌选择相关函数
  const handleBrandCardClick = useCallback((brand: string) => {
    setSelectedBrands(prev => {
      const newBrands = prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand];
      return newBrands;
    });
  }, []);
  
  // 车型选择相关函数
  const handleCarTypeClick = useCallback((type: string) => {
    setSelectedCarTypes(prev => {
      const newTypes = prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type];
      return newTypes;
    });
  }, []);
  
  // 能源类型选择相关函数
  const handleFuelTypeClick = useCallback((type: string) => {
    setSelectedFuelTypes(prev => {
      const newTypes = prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type];
      return newTypes;
    });
  }, []);
  


  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title>Buy a car</Title>
          <CarCount>{filteredCars.length} cars</CarCount>
        </div>
        

      </PageHeader>
      
      {/* 品牌选择器 */}
      {/* 横向筛选器 */}
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
        
        <BrandSelectionTitle style={{marginTop: '24px'}}>车型筛选</BrandSelectionTitle>
        <BrandCardsContainer>
          {carTypes.map(item => (
            <BrandCard 
              key={item.type} 
              isSelected={selectedCarTypes.includes(item.type)}
              onClick={() => handleCarTypeClick(item.type)}
            >
              <BrandCardName>{item.name}</BrandCardName>
              {selectedCarTypes.includes(item.type) && (
                <RemoveCardButton onClick={(e) => {
                  e.stopPropagation();
                  handleCarTypeClick(item.type);
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
        
        <BrandSelectionTitle style={{marginTop: '24px'}}>能源类型</BrandSelectionTitle>
        <BrandCardsContainer>
          {fuelTypes.map(item => (
            <BrandCard 
              key={item.type} 
              isSelected={selectedFuelTypes.includes(item.type)}
              onClick={() => handleFuelTypeClick(item.type)}
            >
              <BrandCardName>{item.name}</BrandCardName>
              {selectedFuelTypes.includes(item.type) && (
                <RemoveCardButton onClick={(e) => {
                  e.stopPropagation();
                  handleFuelTypeClick(item.type);
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