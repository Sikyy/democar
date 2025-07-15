import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import { BuyPage, CarDetailPage } from './pages';

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

// 包装组件，用于获取参数并提供模拟数据
const CarDetailPageWrapper: React.FC = () => {
  const { carId } = useParams();
  
  // 模拟车辆数据
  const mockCar = {
    id: carId || '1',
    title: '本田 雅阁 2023款 锐·混动 2.0L 锐智版',
    price: 229800,
    monthlyPayment: 3800,
    images: [
      'https://img2.baidu.com/it/u=1814268193,3787302302&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=427',
      'https://img1.baidu.com/it/u=1436013126,3038199303&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
      'https://img2.baidu.com/it/u=2429798992,2679723072&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
    ],
    condition: 'used' as const,
    special: true,
    mileage: '12,345公里',
    exteriorColor: '珍珠白',
    interiorColor: '黑色',
    fuelEconomy: '5.3L/100km',
    fuelType: '汽油/电混合',
    transmission: '无级变速',
    engine: '2.0L L4',
    drivetrain: '前置前驱',
    vin: 'LHGCV1652N4000001',
    stockNumber: 'H12345',
    year: 2023,
    make: '本田',
    model: '雅阁',
    trim: '锐·混动 2.0L 锐智版',
    bodyStyle: '中型车',
    features: [
      '全景天窗',
      '自适应巡航',
      '车道保持',
      '倒车影像',
      '无钥匙进入',
      '无钥匙启动',
      '座椅加热',
      '蓝牙连接',
      '苹果CarPlay',
      '安卓Auto'
    ],
    dealerInfo: {
      name: '广州本田4S店',
      location: '广州市天河区',
      distance: '5.2公里',
      rating: 4.8,
      reviews: 123,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2023年3月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '4S店定期保养，保养记录完整',
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
        title: '丰田 凯美瑞 2023款 双擎 2.5L 豪华版',
        price: 239800,
        mileage: '8,920公里',
        image: 'https://img0.baidu.com/it/u=2817938386,1723201939&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '3',
        title: '日产 天籁 2022款 2.0L XL 舒适版',
        price: 209800,
        mileage: '15,600公里',
        image: 'https://img1.baidu.com/it/u=2147981746,2874547118&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      },
      {
        id: '4',
        title: '马自达 阿特兹 2022款 2.5L 蓝天运动版',
        price: 219800,
        mileage: '10,200公里',
        image: 'https://img2.baidu.com/it/u=1933029983,3832359342&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
      }
    ]
  };

  return <CarDetailPage car={mockCar} />;
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
