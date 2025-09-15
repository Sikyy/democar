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
  // 凯美瑞1
  '1': {
    id: '1',
    title: '凯美瑞 2021款 2.0G 豪华版',
    price: 106800,
    images: [
      '/images/toyota/camry/1/1.jpg',
      '/images/toyota/camry/1/2.jpg',
      '/images/toyota/camry/1/3.jpg',
      '/images/toyota/camry/1/4.jpg',
      '/images/toyota/camry/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.7L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '4.4L V8',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '1987cc',
    year: 2021,
    make: 'Toyota',
    model: 'Camry',
    trim: '2.0G 豪华版',
    bodyStyle: 'Sedan',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
    ],
    dealerInfo: {
      name: 'CNCCAR',
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
  },
  // 凯美瑞2
  '2': {
    id: '2',
    title: '凯美瑞 2021款 2.0G 豪华版',
    price: 113800,
    images: [
      '/images/toyota/camry/2/1.jpg',
      '/images/toyota/camry/2/2.jpg',
      '/images/toyota/camry/2/3.jpg',
      '/images/toyota/camry/2/4.jpg',
      '/images/toyota/camry/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.7L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '4.4L V8',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '1987cc',
    year: 2021,
    make: 'Toyota',
    model: 'Camry',
    trim: '2.0G 豪华版',
    bodyStyle: 'Sedan',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '7,700公里',
      distance: '3.2公里',
      rating: 4.9,
      reviews: 156,
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
  },
  // 途胜
  '3': {
    id: '3',
    title: '途胜 2021款 途胜L 1.5T LUX两驱尊贵版',
    price: 139000,
    images: [
      '/images/hyundai/tucson/1/1.jpg',
      '/images/hyundai/tucson/1/2.jpg',
      '/images/hyundai/tucson/1/3.jpg',
      '/images/hyundai/tucson/1/4.jpg',
      '/images/hyundai/tucson/1/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.2L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.5T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '200马力',
    enginecapacity: '1497cc',
    year: 2021,
    make: 'Hyundai',
    model: 'Tucson',
    trim: 'LUX两驱尊贵版',
    bodyStyle: '紧凑型SUV',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
    ],
    dealerInfo: {
      name: 'CNCCAR',
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
  },
  //
  '4': {
    id: '4',
    title: '马自达CX-5 2021款 2.0L 自动两驱智尊型',
    price: 138000,
    images: [
      '/images/mazda/cx5/1/1.jpg',
      '/images/mazda/cx5/1/2.jpg',
      '/images/mazda/cx5/1/3.jpg',
      '/images/mazda/cx5/1/4.jpg',
      '/images/mazda/cx5/1/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '发动机',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '155马力',
    enginecapacity: 'N/A',
    year: 2021,
    make: 'Mazda',
    model: 'CX-5',
    trim: '2.0L 自动两驱智尊型',
    bodyStyle: '紧凑型SUV',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '中控屏',
      '电动后尾门'
    ],
    dealerInfo: {
      name: 'CNCCAR',
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
  },
  //
  '5': {
    id: '5',
    title: 'RAV4荣放 2020款 双擎 2.5L CVT四驱精英版',
    price: 99000,
    images: [
      '/images/toyota/rav4/1/1.jpg',
      '/images/toyota/rav4/1/2.jpg',
      '/images/toyota/rav4/1/3.jpg',
      '/images/toyota/rav4/1/4.jpg',
      '/images/toyota/rav4/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速',
    engine: '2.5L L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '2487cc',
    year: 2020,
    make: 'Toyota',
    model: 'RAV4',
    trim: '双擎 2.5L CVT四驱精英版',
    bodyStyle: '紧凑型SUV',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '13万公里',
      distance: '2.8公里',
      rating: 4.9,
      reviews: 203,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2020年8月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '丰田4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 索纳塔
  '6': {
    id: '6',
    title: '索纳塔 2020款 270TGDi GLS DCT精英版',
    price: 75800,
    images: [
      '/images/hyundai/sonata/1/1.jpg',
      '/images/hyundai/sonata/1/2.jpg',
      '/images/hyundai/sonata/1/3.jpg',
      '/images/hyundai/sonata/1/4.jpg',
      '/images/hyundai/sonata/1/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2020年',
    exteriorColor: '黑色',
    interiorColor: '米色',
    fuelEconomy: '6.0L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.5T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '170马力',
    enginecapacity: '1497cc',
    year: 2020,
    make: 'Hyundai',
    model: 'Sonata',
    trim: '270TGDi GLS DCT精英版',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏',
      '无钥匙启动',
      '自动空调'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '3.1万公里',
      distance: '5.2公里',
      rating: 4.7,
      reviews: 89,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2020年12月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '现代4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 起亚K5
  '7': {
    id: '7',
    title: '起亚K5 2020款 380T GT-Line 旗舰版',
    price: 79800,
    images: [
      '/images/kia/k5/1/1.jpg',
      '/images/kia/k5/1/2.jpg',
      '/images/kia/k5/1/3.jpg',
      '/images/kia/k5/1/4.jpg',
      '/images/kia/k5/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '240马力',
    enginecapacity: '1999cc',
    year: 2020,
    make: 'KIA',
    model: 'K5',
    trim: '380T GT-Line 旗舰版',
    bodyStyle: '中型轿车',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏',
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '7万公里',
      distance: '3.8公里',
      rating: 4.8,
      reviews: 156,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2020年5月首次登记上牌，个人车主',
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
  },
  // 起亚K3
  '8': {
    id: '8',
    title: '起亚K3 2019款 1.5L CVT智享互联版',
    price: 49800,
    images: [
      '/images/kia/k3/1/1.jpg',
      '/images/kia/k3/1/2.jpg',
      '/images/kia/k3/1/3.jpg',
      '/images/kia/k3/1/4.jpg',
      '/images/kia/k3/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2019年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.3L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1497cc',
    year: 2019,
    make: 'Kia',
    model: 'K3',
    trim: '1.5L CVT智享互联版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '车联网',
      '无钥匙进入',
      '无钥匙启动'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '9.1万公里',
      distance: '4.5公里',
      rating: 4.6,
      reviews: 78,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2019年10月首次登记上牌，个人车主',
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
  },
  // 亚洲龙
  '9': {
    id: '9',
    title: '亚洲龙 2022款 2.0L 豪华版',
    price: 105800,
    images: [
      '/images/toyota/avalon/1/1.jpg',
      '/images/toyota/avalon/1/2.jpg',
      '/images/toyota/avalon/1/3.jpg',
      '/images/toyota/avalon/1/4.jpg',
      '/images/toyota/avalon/1/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '黑色',
    interiorColor: '米色',
    fuelEconomy: '6.0L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速',
    engine: '2.0L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '1987cc',
    year: 2022,
    make: 'Toyota',
    model: 'Avalon',
    trim: '2.0L 豪华版',
    bodyStyle: '中型轿车',
    features: [
      '自动驾驶系统',
      '自适应巡航',
      '自动驻车',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙进入'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '8.8万公里',
      distance: '3.9公里',
      rating: 4.8,
      reviews: 134,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2022年3月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '丰田4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 卡罗拉
  '10': {
    id: '10',
    title: '卡罗拉 2021款 1.2T S-CVT先锋PLUS版',
    price: 60800,
    images: [
      '/images/toyota/corolla/1/1.jpg',
      '/images/toyota/corolla/1/2.jpg',
      '/images/toyota/corolla/1/3.jpg',
      '/images/toyota/corolla/1/4.jpg',
      '/images/toyota/corolla/1/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '银色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速',
    engine: '1.2T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '116马力',
    enginecapacity: '1197cc',
    year: 2021,
    make: 'Toyota',
    model: 'Corolla',
    trim: '1.2T S-CVT先锋PLUS版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '无钥匙启动'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '5万公里',
      distance: '4.7公里',
      rating: 4.7,
      reviews: 167,
      logo: 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2021年9月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '丰田4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 雷凌双擎E+
  '11': {
    id: '11',
    title: '雷凌双擎E+ 2019款 1.8PH GS CVT精英版',
    price: 42000,
    images: [
      '/images/toyota/leiling/1/1.jpg',
      '/images/toyota/leiling/1/2.jpg',
      '/images/toyota/leiling/1/3.jpg',
      '/images/toyota/leiling/1/4.jpg',
      '/images/toyota/leiling/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2019年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '4.3L/100km',
    fuelType: '混合动力',
    transmission: 'E-CVT无级变速',
    engine: '1.8L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '99马力',
    enginecapacity: '1798cc',
    year: 2019,
    make: 'Toyota',
    model: 'Leiling',
    trim: '1.8PH GS CVT精英版',
    bodyStyle: '紧凑型轿车',
    features: [
      '上坡辅助',
      '中控屏',
      '无钥匙启动',
      '胎压监测系统',
      '防眩目内后视镜'
    ],
    dealerInfo: {
      name: 'CNCCAR',
      location: '800公里',
      distance: '2.1公里',
      rating: 4.9,
      reviews: 245,
      logo: 'https://img1.baidu.com/it=u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    },
    history: [
      {
        title: '首次登记',
        description: '2019年7月首次登记上牌，个人车主',
        icon: 'history'
      },
      {
        title: '定期保养',
        description: '丰田4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  
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
