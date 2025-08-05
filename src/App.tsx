import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import { BuyPage, CarDetailPage } from './pages';
import BusinessPage from './pages/BusinessPage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const FooterWrapper = styled.div`
  padding: 20px;
`;

// 车辆详情数据映射
const carDetailsMap: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'BMW 850i xDrive',
    price: 553000,
    monthlyPayment: 9200,
    images: [
      'https://p9-dcd-sign.byteimg.com/tos-cn-i-f042mdwyw7/6dfa232167dc4a1ea087986e59c7137f~tplv-f042mdwyw7-auto-webp:640:0.jpg?rk3s=23c6fcc1&x-expires=1754992517&x-signature=4%2FCuNp0zQ13dZ9Khu%2Bk3KTfty5Q%3D&psm=motor.business.sku_item',
      'https://p9-dcd-sign.byteimg.com/tos-cn-i-f042mdwyw7/bbd690d1b99849b5837553720c612c96~tplv-f042mdwyw7-auto-webp:640:0.jpg?rk3s=23c6fcc1&x-expires=1754992517&x-signature=t34SdGNK4aZjYlJzTMf1auEzVq4%3D&psm=motor.business.sku_item',
      'https://p9-dcd-sign.byteimg.com/tos-cn-i-f042mdwyw7/0421b2d04d5b48daaf14d58c720df8c0~tplv-f042mdwyw7-auto-webp:640:0.jpg?rk3s=23c6fcc1&x-expires=1754992517&x-signature=gV4E%2BmaVXVLwTt8%2B3fivUH0rwV0%3D&psm=motor.business.sku_item'
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '矿物灰',
    interiorColor: '黑色',
    fuelEconomy: '9.8L/100km',
    fuelType: '汽油',
    transmission: '8速自动',
    engine: '4.4L V8',
    drivetrain: '四驱',
    vin: 'WBADT43452G000001',
    seats: '4座',
    hoursePower: '390马力',
    enginecapacity: '4395cc',
    stockNumber: 'BMW12345',
    year: 2021,
    make: 'BMW',
    model: '850i',
    trim: 'xDrive',
    bodyStyle: '跑车',
    features: [
      '全景天窗',
      '自适应巡航',
      '车道保持',
      '倒车影像',
      '无钥匙进入',
      '无钥匙启动',
      '座椅加热',
      '哈曼卡顿音响',
      '苹果CarPlay',
      '安卓Auto'
    ],
    dealerInfo: {
      name: 'BMW授权经销商',
      location: '7,700公里',
      distance: '3.2公里',
      rating: 4.9,
      reviews: 156,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2021年5月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: 'BMW 4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
    similarCars: [
      {
        id: '2',
        title: 'Mercedes-Benz A 250 e',
        price: 325090,
        mileage: '4,227公里',
        image: 'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '5',
        title: 'Audi A6 V (C8)',
        price: 1100490,
        mileage: '6,000公里',
        image: 'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '7',
        title: 'Porsche 911 GT3',
        price: 1850000,
        mileage: '1,200公里',
        image: 'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Mercedes-Benz A 250 e',
    price: 325090,
    monthlyPayment: 5400,
    images: [
      'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '极地白',
    interiorColor: '黑色',
    fuelEconomy: '1.4L/100km',
    fuelType: '油电混合',
    transmission: '7速双离合',
    engine: '1.3L L4',
    drivetrain: '前驱',
    vin: 'WDD1770452A000001',
    seats: '5座',
    hoursePower: '160马力',
    enginecapacity: '1332cc',
    stockNumber: 'MB12345',
    year: 2022,
    make: 'Mercedes-Benz',
    model: 'A 250',
    trim: 'e',
    bodyStyle: '紧凑型车',
    features: [
      '全景天窗',
      '自适应巡航',
      '车道保持',
      '倒车影像',
      '无钥匙进入',
      '无钥匙启动',
      '座椅加热',
      'MBUX系统',
      '苹果CarPlay',
      '安卓Auto'
    ],
    dealerInfo: {
      name: '奔驰授权经销商',
      location: '4,227公里',
      distance: '2.8公里',
      rating: 4.7,
      reviews: 89,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2022年8月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '奔驰4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
    similarCars: [
      {
        id: '1',
        title: 'BMW 850i xDrive',
        price: 553000,
        mileage: '7,700公里',
        image: '/images/Geely.jpg'
      },
      {
        id: '3',
        title: 'Lexus IS III Restyling 2',
        price: 790380,
        mileage: '1,470公里',
        image: 'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '6',
        title: 'Toyota Camry VIII',
        price: 390000,
        mileage: '12,000公里',
        image: 'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Lexus IS III Restyling 2',
    price: 790380,
    monthlyPayment: 13100,
    images: [
      'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2023年',
    exteriorColor: '珍珠白',
    interiorColor: '棕色',
    fuelEconomy: '7.2L/100km',
    fuelType: '汽油',
    transmission: '6速自动',
    engine: '2.5L L4',
    drivetrain: '后驱',
    vin: 'JTHBA1D26L5000001',
    seats: '5座',
    hoursePower: '133马力',
    enginecapacity: '2494cc',
    stockNumber: 'LEX12345',
    year: 2023,
    make: 'Lexus',
    model: 'IS III',
    trim: 'Restyling 2',
    bodyStyle: '中型车',
    features: [
      '全景天窗',
      '自适应巡航',
      '车道保持',
      '倒车影像',
      '无钥匙进入',
      '无钥匙启动',
      '座椅加热',
      'Mark Levinson音响',
      '苹果CarPlay',
      '安卓Auto'
    ],
    dealerInfo: {
      name: '雷克萨斯授权经销商',
      location: '1,470公里',
      distance: '4.1公里',
      rating: 4.8,
      reviews: 92,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2023年1月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '雷克萨斯4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
    similarCars: [
      {
        id: '2',
        title: 'Mercedes-Benz A 250 e',
        price: 325090,
        mileage: '4,227公里',
        image: 'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '5',
        title: 'Audi A6 V (C8)',
        price: 1100490,
        mileage: '6,000公里',
        image: 'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '6',
        title: 'Toyota Camry VIII',
        price: 390000,
        mileage: '12,000公里',
        image: 'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      }
    ]
  },
  '4': {
    id: '4',
    title: 'Kia Forte III',
    price: 401490,
    monthlyPayment: 6700,
    images: [
      'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '星云蓝',
    interiorColor: '黑色',
    fuelEconomy: '13.5kWh/100km',
    fuelType: '纯电',
    transmission: '单速自动',
    engine: '电动机',
    drivetrain: '四驱',
    vin: 'KNAFK4A67N5000001',
    seats: '5座',
    hoursePower: '366马力',
    enginecapacity: 'N/A',
    stockNumber: 'KIA12345',
    year: 2022,
    make: 'Kia',
    model: 'Forte',
    trim: 'III',
    bodyStyle: '紧凑型车',
    features: [
      '全景天窗',
      '自适应巡航',
      '车道保持',
      '倒车影像',
      '无钥匙进入',
      '无钥匙启动',
      '座椅加热',
      'JBL音响',
      '苹果CarPlay',
      '安卓Auto'
    ],
    dealerInfo: {
      name: '起亚授权经销商',
      location: '9,452公里',
      distance: '6.3公里',
      rating: 4.5,
      reviews: 67,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2022年6月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '起亚4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
    similarCars: [
      {
        id: '8',
        title: 'Tesla Model S Plaid',
        price: 1299900,
        mileage: '3,500公里',
        image: 'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '2',
        title: 'Mercedes-Benz A 250 e',
        price: 325090,
        mileage: '4,227公里',
        image: 'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '9',
        title: 'Volkswagen Golf R',
        price: 450000,
        mileage: '8,500公里',
        image: 'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      }
    ]
  }
};

// 包装组件，用于获取参数并提供模拟数据
const CarDetailPageWrapper: React.FC = () => {
  const { carId } = useParams();
  
  // 根据carId获取对应的车辆数据，如果没有找到则使用默认数据
  const carData = carDetailsMap[carId || '1'] || carDetailsMap['1'];

  return <CarDetailPage car={carData} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyles />
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Navigate to="/buy" replace />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/car/:carId" element={<CarDetailPageWrapper />} />
            <Route path="/sell" element={<div>Sell Page</div>} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/reviews" element={<div>Reviews Page</div>} />
            <Route path="*" element={<Navigate to="/buy" replace />} />
          </Routes>
        </MainContent>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </AppContainer>
    </Router>
  );
};

export default App;
