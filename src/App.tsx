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
  // 凯美瑞3
  '3': {
    id: '3',
    title: '凯美瑞 2021款 2.0S 锋尚版',
    price: 103800,
    images: [
      '/images/toyota/camry/3/1.jpg',
      '/images/toyota/camry/3/2.jpg',
      '/images/toyota/camry/3/3.jpg',
      '/images/toyota/camry/3/4.jpg',
      '/images/toyota/camry/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '2.0L L4',
    drivetrain: '2WD',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '1987cc',
    year: 2021,
    make: 'Toyota',
    model: 'Camry',
    trim: '2.0S 锋尚版',
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
  // 凯美瑞4
  '4': {
    id: '4',
    title: '凯美瑞 2019款 改款 双擎 2.5HS 锋尚版',
    price: 126800,
    images: [
      '/images/toyota/camry/4/1.jpg',
      '/images/toyota/camry/4/2.jpg',
      '/images/toyota/camry/4/3.jpg',
      '/images/toyota/camry/4/4.jpg',
      '/images/toyota/camry/4/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2019年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '4.1L/100km',
    fuelType: '混动',
    transmission: '7挡手自一体',
    engine: '2.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '2487cc',
    year: 2019,
    make: 'Toyota',
    model: 'Camry',
    trim: '2.5HS 锋尚版',
    bodyStyle: 'Sedan',
    features: [
      '自适应巡航',
      '自动驻车',
      '倒车影像',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动',
      '主动刹车/主动安全',
      '车道偏离预警'
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
  //凯美瑞5
  '5': {
    id: '5',
    title: '凯美瑞 2019款 2.5G 豪华版 国VI',
    price: 106800,
    images: [
      '/images/toyota/camry/5/1.jpg',
      '/images/toyota/camry/5/2.jpg',
      '/images/toyota/camry/5/3.jpg',
      '/images/toyota/camry/5/4.jpg',
      '/images/toyota/camry/5/5.jpg',
      '/images/toyota/camry/5/6.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2019年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '2.5L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '209马力',
    enginecapacity: '2487cc',
    year: 2019,
    make: 'Toyota',
    model: 'Camry',
    trim: '2.5G 豪华版',
    bodyStyle: 'Sedan',
    features: [
      '自适应巡航',
      '自动驻车',
      '定速巡航',
      '倒车影像',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动',
      '主动刹车/主动安全'
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
  // 途胜1
  '6': {
    id: '6',
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
  //途胜2
  '7': {
    id: '7',
    title: '途胜 2020款 280TGDi 双离合两驱时尚版 国VI',
    price: 76800,
    images: [
      '/images/hyundai/tucson/2/1.jpg',
      '/images/hyundai/tucson/2/2.jpg',
      '/images/hyundai/tucson/2/3.jpg',
      '/images/hyundai/tucson/2/4.jpg',
      '/images/hyundai/tucson/2/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.6T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '177马力',
    enginecapacity: '1591cc',
    year: 2021,
    make: 'Hyundai',
    model: 'Tucson',
    trim: '280TGDi 双离合两驱时尚版',
    bodyStyle: '紧凑型SUV',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动',
      '自动大灯'
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
  // 途胜3
  '8': {
    id: '8',
    title: '途胜 2020款 280TGDi 双离合两驱时尚版 国VI',
    price: 129900,
    images: [
      '/images/hyundai/tucson/3/1.jpg',
      '/images/hyundai/tucson/3/2.jpg',
      '/images/hyundai/tucson/3/3.jpg',
      '/images/hyundai/tucson/3/4.jpg',
      '/images/hyundai/tucson/3/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.5T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '200马力',
    enginecapacity: '1497cc',
    year: 2022,
    make: 'Hyundai',
    model: 'Tucson',
    trim: '1.5T LUX两驱尊贵版 N Line',
    bodyStyle: '紧凑型SUV',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
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
  //途胜4
  '9': {
    id: '9',
    title: '途胜 2022款 途胜L 2.0L HEV LUX混动·尊贵版',
    price: 129900,
    images: [
      '/images/hyundai/tucson/4/1.jpg',
      '/images/hyundai/tucson/4/2.jpg',
      '/images/hyundai/tucson/4/3.jpg',
      '/images/hyundai/tucson/4/4.jpg',
      '/images/hyundai/tucson/4/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.7L/100km',
    fuelType: '混动',
    transmission: '6挡双离合',
    engine: '2.0L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1999cc',
    year: 2022,
    make: 'Hyundai',
    model: 'Tucson',
    trim: '2.0L HEV LUX混动·尊贵版',
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
  //途胜5
  '10': {
    id: '10',
    title: '途胜 2020款 280TGDi 双离合两驱智享版 国VI',
    price: 129900,
    images: [
      '/images/hyundai/tucson/5/1.jpg',
      '/images/hyundai/tucson/5/2.jpg',
      '/images/hyundai/tucson/5/3.jpg',
      '/images/hyundai/tucson/5/4.jpg',
      '/images/hyundai/tucson/5/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2020年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '混动',
    transmission: '7挡双离合',
    engine: '1.6T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '177马力',
    enginecapacity: '1591cc',
    year: 2020,
    make: 'Hyundai',
    model: 'Tucson',
    trim: '280TGDi 双离合两驱智享版 国VI',
    bodyStyle: '紧凑型SUV',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '电动后尾门',
      '无钥匙进入',
      '无钥匙启动',
      '主动刹车/主动安全'
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
  // 马自达CX-5 1
  '11': {
    id: '11',
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
  // 马自达CX-5 2
  '12': {
    id: '12',
    title: '马自达CX-5 2021款 2.0L 自动两驱黑骑士型',
    price: 92900,
    images: [
      '/images/mazda/cx5/2/1.jpg',
      '/images/mazda/cx5/2/2.jpg',
      '/images/mazda/cx5/2/3.jpg',
      '/images/mazda/cx5/2/4.jpg',
      '/images/mazda/cx5/2/5.jpg',
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
    trim: '2.0L 自动两驱黑骑士型',
    bodyStyle: '紧凑型SUV',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
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
  // 马自达CX-5 3
  '13': {
    id: '13',
    title: '马自达CX-5 2020款 改款 2.0L 自动两驱智慧型',
    price: 108000,
    images: [
      '/images/mazda/cx5/3/1.jpg',
      '/images/mazda/cx5/3/2.jpg',
      '/images/mazda/cx5/3/3.jpg',
      '/images/mazda/cx5/3/4.jpg',
      '/images/mazda/cx5/3/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2020年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '发动机',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '155马力',
    enginecapacity: 'N/A',
    year: 2020,
    make: 'Mazda',
    model: 'CX-5',
    trim: '2.0L 自动两驱智慧型',
    bodyStyle: '紧凑型SUV',
    features: [
      '前后雷达',
      '倒车影像',
      '定速巡航',
      '无钥匙进入',
      '无钥匙启动',
      'LED大灯',
      '电动天窗',
      '抬头显示',
      '真皮座椅',
      '自动空调'
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
  // 马自达CX-5 4
  '14': {
    id: '14',
    title: '马自达CX-5 2020款 改款 2.0L 自动两驱智慧型',
    price: 99800,
    images: [
      '/images/mazda/cx5/4/1.jpg',
      '/images/mazda/cx5/4/2.jpg',
      '/images/mazda/cx5/4/3.jpg',
      '/images/mazda/cx5/4/4.jpg',
      '/images/mazda/cx5/4/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '红色',
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
    trim: '2.0L 自动两驱智慧型',
    bodyStyle: '紧凑型SUV',
    features: [
      '无钥匙进入',
      '一键启动',
      '抬头显示',
      '定速巡航',
      '电动天窗',
      '大屏导航',
      '倒车影像',
      '并线辅助',
      '自动大灯'
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
  // 马自达CX-5 5
  '15': {
    id: '15',
    title: '马自达CX-5 2021款 2.5L 自动四驱旗舰型',
    price: 185000,
    images: [
      '/images/mazda/cx5/5/1.jpg',
      '/images/mazda/cx5/5/2.jpg',
      '/images/mazda/cx5/5/3.jpg',
      '/images/mazda/cx5/5/4.jpg',
      '/images/mazda/cx5/5/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '7.7L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '发动机',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '196马力',
    enginecapacity: 'N/A',
    year: 2021,
    make: 'Mazda',
    model: 'CX-5',
    trim: '2.5L 自动四驱旗舰型',
    bodyStyle: '紧凑型SUV',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
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
  // 丰田RAV4 1
  '16': {
    id: '16',
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
  // 丰田RAV4 2
  '17': {
    id: '17',
    title: 'RAV4荣放 2021款 2.0L CVT四驱风尚版',
    price: 168800,
    images: [
      '/images/toyota/rav4/2/1.jpg',
      '/images/toyota/rav4/2/2.jpg',
      '/images/toyota/rav4/2/3.jpg',
      '/images/toyota/rav4/2/4.jpg',
      '/images/toyota/rav4/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.3L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '2.0L L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '171马力',
    enginecapacity: '1987cc',
    year: 2022,
    make: 'Toyota',
    model: 'RAV4',
    trim: '2.0L CVT四驱风尚版',
    bodyStyle: '紧凑型SUV',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 丰田RAV4 3
  '18': {
    id: '18',
    title: 'RAV4荣放 2022款 2.0L CVT两驱风尚PLUS版',
    price: 146800,
    images: [
      '/images/toyota/rav4/3/1.jpg',
      '/images/toyota/rav4/3/2.jpg',
      '/images/toyota/rav4/3/3.jpg',
      '/images/toyota/rav4/3/4.jpg',
      '/images/toyota/rav4/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '2.0L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '171马力',
    enginecapacity: '1987cc',
    year: 2022,
    make: 'Toyota',
    model: 'RAV4',
    trim: '2.0L CVT两驱风尚PLUS版',
    bodyStyle: '紧凑型SUV',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
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
  // 丰田RAV4 4
  '19': {
    id: '19',
    title: 'RAV4荣放 2020款 双擎 2.5L CVT四驱旗舰版',
    price: 177000,
    images: [
      '/images/toyota/rav4/4/1.jpg',
      '/images/toyota/rav4/4/2.jpg',
      '/images/toyota/rav4/4/3.jpg',
      '/images/toyota/rav4/4/4.jpg',
      '/images/toyota/rav4/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5L/100km',
    fuelType: '汽油',
    transmission: 'E-CVT无级变速',
    engine: '2.5L L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '2487cc',
    year: 2020,
    make: 'Toyota',
    model: 'RAV4',
    trim: '2.5L CVT四驱旗舰版',
    bodyStyle: '紧凑型SUV',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '电动后尾门'
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
  // 丰田RAV4 4
  '20': {
    id: '20',
    title: 'RAV4荣放 2021款 2.0L CVT两驱都市版',
    price: 89800,
    images: [
      '/images/toyota/rav4/5/1.jpg',
      '/images/toyota/rav4/5/2.jpg',
      '/images/toyota/rav4/5/3.jpg',
      '/images/toyota/rav4/5/4.jpg',
      '/images/toyota/rav4/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '2.0L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '171马力',
    enginecapacity: '1987cc',
    year: 2021,
    make: 'Toyota',
    model: 'RAV4',
    trim: '2.0L CVT两驱都市版',
    bodyStyle: '紧凑型SUV',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '道路救援服务',
      '中控屏',
      '主动刹车/主动安全',
      '前方碰撞预警',
      '车道偏离预警'
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
  // 索纳塔 1
  '21': {
    id: '21',
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
  // 索纳塔 2
  '22': {
    id: '22',
    title: '索纳塔 2020款 380TGDi GLS 自动豪华版',
    price: 85000,
    images: [
      '/images/hyundai/sonata/2/1.jpg',
      '/images/hyundai/sonata/2/2.jpg',
      '/images/hyundai/sonata/2/3.jpg',
      '/images/hyundai/sonata/2/4.jpg',
      '/images/hyundai/sonata/2/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '240马力',
    enginecapacity: '1975cc',
    year: 2021,
    make: 'Hyundai',
    model: 'Sonata',
    trim: '380TGDi GLS 自动豪华版',
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
  // 索纳塔 3
  '23': {
    id: '23',
    title: '索纳塔 2020款 380TGDi TOP 自动旗舰版',
    price: 85000,
    images: [
      '/images/hyundai/sonata/3/1.jpg',
      '/images/hyundai/sonata/3/2.jpg',
      '/images/hyundai/sonata/3/3.jpg',
      '/images/hyundai/sonata/3/4.jpg',
      '/images/hyundai/sonata/3/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '240马力',
    enginecapacity: '1975cc',
    year: 2021,
    make: 'Hyundai',
    model: 'Sonata',
    trim: '380TGDi TOP 自动旗舰版',
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
  // 索纳塔 4
  '24': {
    id: '24',
    title: '索纳塔 2020款 380TGDi GLS 自动豪华版',
    price: 86800,
    images: [
      '/images/hyundai/sonata/4/1.jpg',
      '/images/hyundai/sonata/4/2.jpg',
      '/images/hyundai/sonata/4/3.jpg',
      '/images/hyundai/sonata/4/4.jpg',
      '/images/hyundai/sonata/4/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '240马力',
    enginecapacity: '1975cc',
    year: 2021,
    make: 'Hyundai',
    model: 'Sonata',
    trim: '380TGDi GLS 自动豪华版',
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
  // 索纳塔 4
  '25': {
    id: '25',
    title: '索纳塔 2020款 270TGDi GLS DCT精英版',
    price: 69800,
    images: [
      '/images/hyundai/sonata/5/1.jpg',
      '/images/hyundai/sonata/5/2.jpg',
      '/images/hyundai/sonata/5/3.jpg',
      '/images/hyundai/sonata/5/4.jpg',
      '/images/hyundai/sonata/5/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.6L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.5T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '170马力',
    enginecapacity: '1497cc',
    year: 2021,
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
  // 起亚K5 1
  '26': {
    id: '26',
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
  // 起亚K5 2
  '27': {
    id: '27',
    title: '起亚K5 2020款 270T CVVD 豪华版',
    price: 121800,
    images: [
      '/images/kia/k5/2/1.jpg',
      '/images/kia/k5/2/2.jpg',
      '/images/kia/k5/2/3.jpg',
      '/images/kia/k5/2/4.jpg',
      '/images/kia/k5/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.6L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.5T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '170马力',
    enginecapacity: '1497cc',
    year: 2021,
    make: 'KIA',
    model: 'K5',
    trim: '270T CVVD 豪华版',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务'
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
  // 起亚K5 3
  '28': {
    id: '28',
    title: '起亚K5 2021款 380T GT-Line 旗舰版',
    price: 118000,
    images: [
      '/images/kia/k5/3/1.jpg',
      '/images/kia/k5/3/2.jpg',
      '/images/kia/k5/3/3.jpg',
      '/images/kia/k5/3/4.jpg',
      '/images/kia/k5/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '240马力',
    enginecapacity: '1957cc',
    year: 2022,
    make: 'KIA',
    model: 'K5',
    trim: '380T GT-Line 旗舰版',
    bodyStyle: '中型轿车',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
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
  // 起亚K5 4
  '29': {
    id: '29',
    title: '起亚K5 2020款 380T GT-Line 尊贵版',
    price: 83800,
    images: [
      '/images/kia/k5/4/1.jpg',
      '/images/kia/k5/4/2.jpg',
      '/images/kia/k5/4/3.jpg',
      '/images/kia/k5/4/4.jpg',
      '/images/kia/k5/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '240马力',
    enginecapacity: '1957cc',
    year: 2020,
    make: 'KIA',
    model: 'K5',
    trim: '380T GT-Line 尊贵版',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
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
  // 起亚K5 5
  '30': {
    id: '30',
    title: '起亚K5 2021款 270T CVVD 焕新版',
    price: 126800,
    images: [
      '/images/kia/k5/5/1.jpg',
      '/images/kia/k5/5/2.jpg',
      '/images/kia/k5/5/3.jpg',
      '/images/kia/k5/5/4.jpg',
      '/images/kia/k5/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.6L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.5T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '170马力',
    enginecapacity: '1497cc',
    year: 2021,
    make: 'KIA',
    model: 'K5',
    trim: '270T CVVD 焕新版',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务'
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
  // 起亚K3 1
  '31': {
    id: '31',
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
  // 起亚K3 2
  '32': {
    id: '32',
    title: '起亚K3 2019款 1.5L CVT新锐版',
    price: 40900,
    images: [
      '/images/kia/k3/2/1.jpg',
      '/images/kia/k3/2/2.jpg',
      '/images/kia/k3/2/3.jpg',
      '/images/kia/k3/2/4.jpg',
      '/images/kia/k3/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '5.1L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1497cc',
    year: 2020,
    make: 'Kia',
    model: 'K3',
    trim: '1.5L CVT新锐版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
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
  // 起亚K3 3
  '33': {
    id: '33',
    title: '起亚K3 2021款 1.5L IVT 时尚版',
    price: 74800,
    images: [
      '/images/kia/k3/3/1.jpg',
      '/images/kia/k3/3/2.jpg',
      '/images/kia/k3/3/3.jpg',
      '/images/kia/k3/3/4.jpg',
      '/images/kia/k3/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1497cc',
    year: 2021,
    make: 'Kia',
    model: 'K3',
    trim: '1.5L IVT 时尚版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '感应式后尾门',
      '无钥匙进入'
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
  // 起亚K3 4
  '34': {
    id: '34',
    title: '起亚K3 2021款 1.4T DCT GT-Line智驾运动版',
    price: 92000,
    images: [
      '/images/kia/k3/4/1.jpg',
      '/images/kia/k3/4/2.jpg',
      '/images/kia/k3/4/3.jpg',
      '/images/kia/k3/4/4.jpg',
      '/images/kia/k3/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.3L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '130马力',
    enginecapacity: '1353cc',
    year: 2022,
    make: 'Kia',
    model: 'K3',
    trim: '1.4T DCT GT-Line智驾运动版',
    bodyStyle: '紧凑型轿车',
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
  // 起亚K3 5
  '35': {
    id: '35',
    title: '起亚K3 2021款 1.5L IVT 青春版',
    price: 56800,
    images: [
      '/images/kia/k3/5/1.jpg',
      '/images/kia/k3/5/2.jpg',
      '/images/kia/k3/5/3.jpg',
      '/images/kia/k3/5/4.jpg',
      '/images/kia/k3/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1497cc',
    year: 2021,
    make: 'Kia',
    model: 'K3',
    trim: '1.5L IVT 青春版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '胎压监测系统',
      '自动大灯'
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
  // 亚洲龙 1
  '36': {
    id: '36',
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
  // 亚洲龙 2
  '37': {
    id: '37',
    title: '亚洲龙 2019款 双擎 2.5L XLE尊贵版 国VI',
    price: 126800,
    images: [
      '/images/toyota/avalon/2/1.jpg',
      '/images/toyota/avalon/2/2.jpg',
      '/images/toyota/avalon/2/3.jpg',
      '/images/toyota/avalon/2/4.jpg',
      '/images/toyota/avalon/2/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '4.3L/100km',
    fuelType: '混动',
    transmission: 'E-CVT无级变速',
    engine: '2.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '2487cc',
    year: 2022,
    make: 'Toyota',
    model: 'Avalon',
    trim: '双擎 2.5L XLE尊贵版 国VI',
    bodyStyle: '中型轿车',
    features: [
      '自动驾驶系统',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '语音识别控制系统',
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
  // 亚洲龙 4
  '39': {
    id: '39',
    title: '亚洲龙 2019款 2.0L 豪华版 国VI',
    price: 106800,
    images: [
      '/images/toyota/avalon/4/1.jpg',
      '/images/toyota/avalon/4/2.jpg',
      '/images/toyota/avalon/4/3.jpg',
      '/images/toyota/avalon/4/4.jpg',
      '/images/toyota/avalon/4/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2020年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '2.0L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '1987cc',
    year: 2021,
    make: 'Toyota',
    model: 'Avalon',
    trim: '2.0L 豪华版 国VI',
    bodyStyle: '中型轿车',
    features: [
      '自动驾驶系统',
      '自适应巡航',
      '自动驻车',
      '倒车影像',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动',
      '主动刹车/主动安全'
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
  // 亚洲龙 5
  '40': {
    id: '40',
    title: '亚洲龙 2019款 双擎 2.5L XLE尊贵版 国VI',
    price: 133800,
    images: [
      '/images/toyota/avalon/5/1.jpg',
      '/images/toyota/avalon/5/2.jpg',
      '/images/toyota/avalon/5/3.jpg',
      '/images/toyota/avalon/5/4.jpg',
      '/images/toyota/avalon/5/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '4.3L/100km',
    fuelType: '汽油',
    transmission: 'E-CVT无级变速',
    engine: '2.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '178马力',
    enginecapacity: '2487cc',
    year: 2021,
    make: 'Toyota',
    model: 'Avalon',
    trim: '双擎 2.5L XLE尊贵版 国VI',
    bodyStyle: '中型轿车',
    features: [
      '自动驾驶系统',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '语音识别控制系统',
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
  // 卡罗拉 1
  '41': {
    id: '41',
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
  // 卡罗拉 2
  '42': {
    id: '42',
    title: '卡罗拉 2021款 双擎 1.8L E-CVT精英版',
    price: 63800,
    images: [
      '/images/toyota/corolla/2/1.jpg',
      '/images/toyota/corolla/2/2.jpg',
      '/images/toyota/corolla/2/3.jpg',
      '/images/toyota/corolla/2/4.jpg',
      '/images/toyota/corolla/2/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '4.1L/100km',
    fuelType: '混动',
    transmission: 'E-CVT无级变速',
    engine: '1.8L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '98马力',
    enginecapacity: '1798cc',
    year: 2021,
    make: 'Toyota',
    model: 'Corolla',
    trim: '双擎 1.8L E-CVT精英版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 卡罗拉 3
  '43': {
    id: '43',
    title: '卡罗拉 2021款 1.5L CVT精英版',
    price: 65000,
    images: [
      '/images/toyota/corolla/3/1.jpg',
      '/images/toyota/corolla/3/2.jpg',
      '/images/toyota/corolla/3/3.jpg',
      '/images/toyota/corolla/3/4.jpg',
      '/images/toyota/corolla/3/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2022年',
    exteriorColor: '深灰色',
    interiorColor: '米色',
    fuelEconomy: '5.2L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '1.5L L3',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '121马力',
    enginecapacity: '1490cc',
    year: 2022,
    make: 'Toyota',
    model: 'Corolla',
    trim: '1.5L CVT精英版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 卡罗拉 4
  '44': {
    id: '44',
    title: '卡罗拉 2021款 1.2T S-CVT精英版',
    price: 76800,
    images: [
      '/images/toyota/corolla/4/1.jpg',
      '/images/toyota/corolla/4/2.jpg',
      '/images/toyota/corolla/4/3.jpg',
      '/images/toyota/corolla/4/4.jpg',
      '/images/toyota/corolla/4/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '1.2T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '116马力',
    enginecapacity: '1197cc',
    year: 2021,
    make: 'Toyota',
    model: 'Corolla',
    trim: '1.2T S-CVT精英版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 卡罗拉 5
  '45': {
    id: '45',
    title: '卡罗拉 2021款 1.2T S-CVT精英PLUS版',
    price: 59800,
    images: [
      '/images/toyota/corolla/5/1.jpg',
      '/images/toyota/corolla/5/2.jpg',
      '/images/toyota/corolla/5/3.jpg',
      '/images/toyota/corolla/5/4.jpg',
      '/images/toyota/corolla/5/5.jpg',
    ],
    condition: 'used' as const,
    special: false,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.6L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '1.2T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '116马力',
    enginecapacity: '1197cc',
    year: 2021,
    make: 'Toyota',
    model: 'Corolla',
    trim: '1.2T S-CVT精英PLUS版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 雷凌 1
  '46': {
    id: '46',
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
  // 雷凌 2
  '47': {
    id: '47',
    title: '雷凌 2021款 185T CVT运动版',
    price: 55800,
    images: [
      '/images/toyota/leiling/2/1.jpg',
      '/images/toyota/leiling/2/2.jpg',
      '/images/toyota/leiling/2/3.jpg',
      '/images/toyota/leiling/2/4.jpg',
      '/images/toyota/leiling/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '5.7L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '1.2T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '116马力',
    enginecapacity: '1197cc',
    year: 2020,
    make: 'Toyota',
    model: 'Leiling',
    trim: '185T CVT运动版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 雷凌 3
  '48': {
    id: '48',
    title: '雷凌 2022款 双擎 1.8H E-CVT运动版',
    price: 65800,
    images: [
      '/images/toyota/leiling/3/1.jpg',
      '/images/toyota/leiling/3/2.jpg',
      '/images/toyota/leiling/3/3.jpg',
      '/images/toyota/leiling/3/4.jpg',
      '/images/toyota/leiling/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '4.2L/100km',
    fuelType: '混合动力',
    transmission: 'E-CVT无级变速',
    engine: '1.8L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '98马力',
    enginecapacity: '1798cc',
    year: 2021,
    make: 'Toyota',
    model: 'Leiling',
    trim: '1.8H E-CVT运动版',
    bodyStyle: '紧凑型轿车',
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
  // 雷凌 4
  '49': {
    id: '49',
    title: '雷凌 2022款 双擎 1.8H E-CVT运动版',
    price: 66600,
    images: [
      '/images/toyota/leiling/4/1.jpg',
      '/images/toyota/leiling/4/2.jpg',
      '/images/toyota/leiling/4/3.jpg',
      '/images/toyota/leiling/4/4.jpg',
      '/images/toyota/leiling/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '4.2L/100km',
    fuelType: '混合动力',
    transmission: 'E-CVT无级变速',
    engine: '1.8L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '98马力',
    enginecapacity: '1798cc',
    year: 2021,
    make: 'Toyota',
    model: 'Leiling',
    trim: '1.8H E-CVT运动版',
    bodyStyle: '紧凑型轿车',
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
  // 雷凌 5
  '50': {
    id: '50',
    title: '雷凌 2021款 185T CVT运动版',
    price: 59800,
    images: [
      '/images/toyota/leiling/5/1.jpg',
      '/images/toyota/leiling/5/2.jpg',
      '/images/toyota/leiling/5/3.jpg',
      '/images/toyota/leiling/5/4.jpg',
      '/images/toyota/leiling/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.7L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟10挡)',
    engine: '1.2T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '116马力',
    enginecapacity: '1197cc',
    year: 2021,
    make: 'Toyota',
    model: 'Leiling',
    trim: '185T CVT运动版',
    bodyStyle: '紧凑型轿车',
    features: [
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏'
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
  // 大众高尔夫 1
  '51': {
    id: '51',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    price: 93500,
    images: [
      '/images/volkswagen/golf/1/1.jpg',
      '/images/volkswagen/golf/1/2.jpg',
      '/images/volkswagen/golf/1/3.jpg',
      '/images/volkswagen/golf/1/4.jpg',
      '/images/volkswagen/golf/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Golf',
    trim: '280TSI DSG R-Line',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 大众高尔夫 2
  '52': {
    id: '52',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    price: 78800,
    images: [
      '/images/volkswagen/golf/2/1.jpg',
      '/images/volkswagen/golf/2/2.jpg',
      '/images/volkswagen/golf/2/3.jpg',
      '/images/volkswagen/golf/2/4.jpg',
      '/images/volkswagen/golf/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Golf',
    trim: '280TSI DSG R-Line',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 大众高尔夫 3
  '53': {
    id: '53',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    price: 93800,
    images: [
      '/images/volkswagen/golf/3/1.jpg',
      '/images/volkswagen/golf/3/2.jpg',
      '/images/volkswagen/golf/3/3.jpg',
      '/images/volkswagen/golf/3/4.jpg',
      '/images/volkswagen/golf/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Golf',
    trim: '280TSI DSG R-Line',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 大众高尔夫 4
  '54': {
    id: '54',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    price: 129000,
    images: [
      '/images/volkswagen/golf/4/1.jpg',
      '/images/volkswagen/golf/4/2.jpg',
      '/images/volkswagen/golf/4/3.jpg',
      '/images/volkswagen/golf/4/4.jpg',
      '/images/volkswagen/golf/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Golf',
    trim: '280TSI DSG R-Line',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 大众高尔夫 5
  '55': {
    id: '55',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    price: 82000,
    images: [
      '/images/volkswagen/golf/5/1.jpg',
      '/images/volkswagen/golf/5/2.jpg',
      '/images/volkswagen/golf/5/3.jpg',
      '/images/volkswagen/golf/5/4.jpg',
      '/images/volkswagen/golf/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Golf',
    trim: '280TSI DSG R-Line',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探影 1
  '56': {
    id: '56',
    title: '探影 2021款 280TSI DSG R-Line智联版',
    price: 93800,
    images: [
      '/images/volkswagen/tacqua/1/1.jpg',
      '/images/volkswagen/tacqua/1/2.jpg',
      '/images/volkswagen/tacqua/1/3.jpg',
      '/images/volkswagen/tacqua/1/4.jpg',
      '/images/volkswagen/tacqua/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '280TSI DSG R-Line智联版',
    bodyStyle: '中型轿车',
    features: [
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '远程控制',
      '主动刹车/主动安全'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探影 2
  '57': {
    id: '57',
    title: '探影 2020款 1.5L 自动 悦Pro',
    price: 63800,
    images: [
      '/images/volkswagen/tacqua/2/1.jpg',
      '/images/volkswagen/tacqua/2/2.jpg',
      '/images/volkswagen/tacqua/2/3.jpg',
      '/images/volkswagen/tacqua/2/4.jpg',
      '/images/volkswagen/tacqua/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '113马力',
    enginecapacity: '1498cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2020款 1.5L 自动 悦Pro',
    bodyStyle: '中型轿车',
    features: [
      '上坡辅助',
      '定速巡航',
      '倒车影像',
      '无钥匙进入',
      '无钥匙启动',
      '主动刹车/主动安全',
      '防眩目内后视镜',
      '雨量感应式雨刷'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探影 3
  '58': {
    id: '58',
    title: '探影 2021款 1.5L 自动 悦智联版',
    price: 69800,
    images: [
      '/images/volkswagen/tacqua/3/1.jpg',
      '/images/volkswagen/tacqua/3/2.jpg',
      '/images/volkswagen/tacqua/3/3.jpg',
      '/images/volkswagen/tacqua/3/4.jpg',
      '/images/volkswagen/tacqua/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '113马力',
    enginecapacity: '1498cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2020款 1.5L 自动 悦Pro',
    bodyStyle: '中型轿车',
    features: [
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '远程控制',
      '胎压监测系统'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探影 4
  '59': {
    id: '59',
    title: '探影 2021款 280TSI DSG 悦Pro智联版',
    price: 77500,
    images: [
      '/images/volkswagen/tacqua/4/1.jpg',
      '/images/volkswagen/tacqua/4/2.jpg',
      '/images/volkswagen/tacqua/4/3.jpg',
      '/images/volkswagen/tacqua/4/4.jpg',
      '/images/volkswagen/tacqua/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '深色',
    fuelEconomy: '5.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2021款 280TSI DSG 悦Pro智联版',
    bodyStyle: '中型轿车',
    features: [
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '远程控制',
      '无钥匙进入'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探影 5
  '60': {
    id: '60',
    title: '探影 2021款 200TSI DSG R-Line智联版',
    price: 88800,
    images: [
      '/images/volkswagen/tacqua/5/1.jpg',
      '/images/volkswagen/tacqua/5/2.jpg',
      '/images/volkswagen/tacqua/5/3.jpg',
      '/images/volkswagen/tacqua/5/4.jpg',
      '/images/volkswagen/tacqua/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.6L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '151马力',
    enginecapacity: '1197cc',
    year: 2022,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2021款 200TSI DSG R-Line智联版',
    bodyStyle: '中型轿车',
    features: [
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '远程控制',
      '胎压监测系统'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探岳 1
  '61': {
    id: '61',
    title: '探岳 2020款 380TSI 豪华智联版Pro 四驱',
    price: 115800,
    images: [
      '/images/volkswagen/tayron/1/1.jpg',
      '/images/volkswagen/tayron/1/2.jpg',
      '/images/volkswagen/tayron/1/3.jpg',
      '/images/volkswagen/tayron/1/4.jpg',
      '/images/volkswagen/tayron/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '咖啡色',
    interiorColor: '黑色',
    fuelEconomy: '7.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '220马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2020款 380TSI 豪华智联版Pro 四驱',
    bodyStyle: '中型轿车',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探岳 2
  '62': {
    id: '62',
    title: '探岳 2020款 380TSI 豪华智联版Pro 四驱',
    price: 102800,
    images: [
      '/images/volkswagen/tayron/2/1.jpg',
      '/images/volkswagen/tayron/2/2.jpg',
      '/images/volkswagen/tayron/2/3.jpg',
      '/images/volkswagen/tayron/2/4.jpg',
      '/images/volkswagen/tayron/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '7.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '220马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2020款 380TSI 豪华智联版Pro 四驱',
    bodyStyle: '中型轿车',
    features: [
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探岳 3
  '63': {
    id: '63',
    title: '探岳 2020款 380TSI R-Line智联版 四驱',
    price: 105900,
    images: [
      '/images/volkswagen/tayron/3/1.jpg',
      '/images/volkswagen/tayron/3/2.jpg',
      '/images/volkswagen/tayron/3/3.jpg',
      '/images/volkswagen/tayron/3/4.jpg',
      '/images/volkswagen/tayron/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '7.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '220马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2020款 380TSI R-Line智联版 四驱',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙进入',
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探岳 4
  '64': {
    id: '64',
    title: '探岳 2023款 380TSI 四驱R-Line Pro智慧版',
    price: 183000,
    images: [
      '/images/volkswagen/tayron/4/1.jpg',
      '/images/volkswagen/tayron/4/2.jpg',
      '/images/volkswagen/tayron/4/3.jpg',
      '/images/volkswagen/tayron/4/4.jpg',
      '/images/volkswagen/tayron/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7.92L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '220马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '2023款 380TSI 四驱R-Line Pro智慧版',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '语音识别控制系统',
      '车联网',
      '中控屏'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 探岳 5
  '65': {
    id: '65',
    title: '探岳 2019款 380TSI 四驱旗舰型 国V',
    price: 92800,
    images: [
      '/images/volkswagen/tayron/5/1.jpg',
      '/images/volkswagen/tayron/5/2.jpg',
      '/images/volkswagen/tayron/5/3.jpg',
      '/images/volkswagen/tayron/5/4.jpg',
      '/images/volkswagen/tayron/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2019年',
    exteriorColor: '黄色',
    interiorColor: '黑色',
    fuelEconomy: '7.1L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '220马力',
    enginecapacity: '1984cc',
    year: 2019,
    make: 'Volkswagen',
    model: 'Tacqua',
    trim: '探岳 2019款 380TSI 四驱旗舰型 国V',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '语音识别控制系统',
      '中控屏',
      '电动后尾门'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 明锐 1
  '66': {
    id: '66',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    price: 139800,
    images: [
      '/images/skoda/octavia/1/1.jpg',
      '/images/skoda/octavia/1/2.jpg',
      '/images/skoda/octavia/1/3.jpg',
      '/images/skoda/octavia/1/4.jpg',
      '/images/skoda/octavia/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '紫色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Octavia',
    trim: '明锐 2021款 PRO TSI280 DSG旗舰版',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 明锐 2
  '67': {
    id: '67',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    price: 126000,
    images: [
      '/images/skoda/octavia/2/1.jpg',
      '/images/skoda/octavia/2/2.jpg',
      '/images/skoda/octavia/2/3.jpg',
      '/images/skoda/octavia/2/4.jpg',
      '/images/skoda/octavia/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Octavia',
    trim: '明锐 2021款 PRO TSI280 DSG旗舰版',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 明锐 3
  '68': {
    id: '68',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    price: 108800,
    images: [
      '/images/skoda/octavia/3/1.jpg',
      '/images/skoda/octavia/3/2.jpg',
      '/images/skoda/octavia/3/3.jpg',
      '/images/skoda/octavia/3/4.jpg',
      '/images/skoda/octavia/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Octavia',
    trim: '明锐 2021款 PRO TSI280 DSG旗舰版',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 明锐 4
  '69': {
    id: '69',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    price: 109800,
    images: [
      '/images/skoda/octavia/4/1.jpg',
      '/images/skoda/octavia/4/2.jpg',
      '/images/skoda/octavia/4/3.jpg',
      '/images/skoda/octavia/4/4.jpg',
      '/images/skoda/octavia/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.5L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Octavia',
    trim: '明锐 2021款 PRO TSI280 DSG旗舰版',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '360全景影像',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 明锐 5
  '70': {
    id: '70',
    title: '明锐 2019款 TSI230 DSG智行豪华版 国V',
    price: 47800,
    images: [
      '/images/skoda/octavia/5/1.jpg',
      '/images/skoda/octavia/5/2.jpg',
      '/images/skoda/octavia/5/3.jpg',
      '/images/skoda/octavia/5/4.jpg',
      '/images/skoda/octavia/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.2L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.2T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '116马力',
    enginecapacity: '1197cc',
    year: 2020,
    make: 'Skoda',
    model: 'Octavia',
    trim: '明锐 2019款 TSI230 DSG智行豪华版 国V',
    bodyStyle: '中型轿车',
    features: [
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '车联网',
      '中控屏',
      '胎压监测系统',
      '车内空气净化'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 速派 1
  '71': {
    id: '71',
    title: '速派 2022款 TSI280 DSG尊享版',
    price: 139800,
    images: [
      '/images/skoda/superb/1/1.jpg',
      '/images/skoda/superb/1/2.jpg',
      '/images/skoda/superb/1/3.jpg',
      '/images/skoda/superb/1/4.jpg',
      '/images/skoda/superb/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Skoda',
    model: 'Superb',
    trim: '速派 2022款 TSI280 DSG尊享版',
    bodyStyle: '中型轿车',
    features: [
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '车联网',
      '中控屏',
      '胎压监测系统',
      '车内空气净化'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 速派 2
  '72': {
    id: '72',
    title: '速派 2022款 TSI280 DSG尊享版',
    price: 83800,
    images: [
      '/images/skoda/superb/2/1.jpg',
      '/images/skoda/superb/2/2.jpg',
      '/images/skoda/superb/2/3.jpg',
      '/images/skoda/superb/2/4.jpg',
      '/images/skoda/superb/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Skoda',
    model: 'Superb',
    trim: '速派 2022款 TSI280 DSG尊享版',
    bodyStyle: '中型轿车',
    features: [
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '车联网',
      '中控屏',
      '胎压监测系统',
      '车内空气净化'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 速派 3
  '73': {
    id: '73',
    title: '速派 2021款 TSI280 DSG标准版',
    price: 75800,
    images: [
      '/images/skoda/superb/3/1.jpg',
      '/images/skoda/superb/3/2.jpg',
      '/images/skoda/superb/3/3.jpg',
      '/images/skoda/superb/3/4.jpg',
      '/images/skoda/superb/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Skoda',
    model: 'Superb',
    trim: '速派 2021款 TSI280 DSG标准版',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '车联网',
      '中控屏',
      '远程控制',
      '胎压监测系统',
      '雨量感应式雨刷'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 速派 4
  '74': {
    id: '74',
    title: '速派 2021款 TSI280 DSG标准版',
    price: 139800,
    images: [
      '/images/skoda/superb/4/1.jpg',
      '/images/skoda/superb/4/2.jpg',
      '/images/skoda/superb/4/3.jpg',
      '/images/skoda/superb/4/4.jpg',
      '/images/skoda/superb/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Superb',
    trim: '速派 2021款 TSI280 DSG标准版',
    bodyStyle: '中型轿车',
    features: [
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '车联网',
      '中控屏',
      '远程控制',
      '胎压监测系统',
      '雨量感应式雨刷'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 速派 5
  '75': {
    id: '75',
    title: '速派 2022款 TSI280 DSG奢享版',
    price: 125800,
    images: [
      '/images/skoda/superb/5/1.jpg',
      '/images/skoda/superb/5/2.jpg',
      '/images/skoda/superb/5/3.jpg',
      '/images/skoda/superb/5/4.jpg',
      '/images/skoda/superb/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.1L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2022,
    make: 'Skoda',
    model: 'Superb',
    trim: '速派 2022款 TSI330 DSG奢享版',
    bodyStyle: '中型轿车',
    features: [
      '自动泊车入位',
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别系统',
      '车联网',
      '中控屏'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯迪亚克 1
  '76': {
    id: '76',
    title: '柯迪亚克 2020款 TSI330 7座两驱豪华优享版',
    price: 82800,
    images: [
      '/images/skoda/kodiaq/1/1.jpg',
      '/images/skoda/kodiaq/1/2.jpg',
      '/images/skoda/kodiaq/1/3.jpg',
      '/images/skoda/kodiaq/1/4.jpg',
      '/images/skoda/kodiaq/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '6.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '7座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Skoda',
    model: 'Kodiaq',
    trim: '柯迪亚克 2020款 TSI330 7座两驱豪华优享版',
    bodyStyle: 'SUV',
    features: [
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别系统',
      '中控屏'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯迪亚克 2
  '77': {
    id: '77',
    title: '柯迪亚克 2020款 TSI330 7座两驱豪华优享版',
    price: 103600,
    images: [
      '/images/skoda/kodiaq/2/1.jpg',
      '/images/skoda/kodiaq/2/2.jpg',
      '/images/skoda/kodiaq/2/3.jpg',
      '/images/skoda/kodiaq/2/4.jpg',
      '/images/skoda/kodiaq/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '7座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Skoda',
    model: 'Kodiaq',
    trim: '柯迪亚克 2021款 TSI330 7座两驱豪华优享版',
    bodyStyle: 'SUV',
    features: [
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯迪亚克 3
  '78': {
    id: '78',
    title: '柯迪亚克 2022款 TSI330 5座两驱奢享版',
    price: 165800,
    images: [
      '/images/skoda/kodiaq/3/1.jpg',
      '/images/skoda/kodiaq/3/2.jpg',
      '/images/skoda/kodiaq/3/3.jpg',
      '/images/skoda/kodiaq/3/4.jpg',
      '/images/skoda/kodiaq/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2022,
    make: 'Skoda',
    model: 'Kodiaq',
    trim: '柯迪亚克 2022款 TSI330 5座两驱奢享版',
    bodyStyle: 'SUV',
    features: [
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯迪亚克 4
  '79': {
    id: '79',
    title: '柯迪亚克 2022款 TSI330 7座两驱奢享版',
    price: 166800,
    images: [
      '/images/skoda/kodiaq/4/1.jpg',
      '/images/skoda/kodiaq/4/2.jpg',
      '/images/skoda/kodiaq/4/3.jpg',
      '/images/skoda/kodiaq/4/4.jpg',
      '/images/skoda/kodiaq/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '7.1L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '7座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2022,
    make: 'Skoda',
    model: 'Kodiaq',
    trim: '柯迪亚克 2022款 TSI330 7座两驱奢享版',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯迪亚克 5
  '80': {
    id: '80',
    title: '柯迪亚克 2022款 TSI330 7座两驱奢享版',
    price: 172800,
    images: [
      '/images/skoda/kodiaq/5/1.jpg',
      '/images/skoda/kodiaq/5/2.jpg',
      '/images/skoda/kodiaq/5/3.jpg',
      '/images/skoda/kodiaq/5/4.jpg',
      '/images/skoda/kodiaq/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '7.1L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '7座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2022,
    make: 'Skoda',
    model: 'Kodiaq',
    trim: '柯迪亚克 2022款 TSI330 7座两驱奢享版',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3 1
  '81': {
    id: '81',
    title: '奥迪Q3 2021款 40 TFSI 时尚动感型',
    price: 124300,
    images: [
      '/images/audi/q3/1/1.jpg',
      '/images/audi/q3/1/2.jpg',
      '/images/audi/q3/1/3.jpg',
      '/images/audi/q3/1/4.jpg',
      '/images/audi/q3/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '灰红色',
    fuelEconomy: '6.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3',
    trim: '40 TFSI 时尚动感型',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3 2
  '82': {
    id: '82',
    title: '奥迪Q3 2021款 35 TFSI 进取动感型',
    price: 105800,
    images: [
      '/images/audi/q3/2/1.jpg',
      '/images/audi/q3/2/2.jpg',
      '/images/audi/q3/2/3.jpg',
      '/images/audi/q3/2/4.jpg',
      '/images/audi/q3/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3',
    trim: '2021款 35 TFSI 进取动感型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '中控屏',
      '电动后尾门',
      '主动刹车/主动安全',
      '前方碰撞预警',
      '胎压监测系统'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3 3
  '83': {
    id: '83',
    title: '奥迪Q3 2020款 35 TFSI 时尚动感型',
    price: 106900,
    images: [
      '/images/audi/q3/3/1.jpg',
      '/images/audi/q3/3/2.jpg',
      '/images/audi/q3/3/3.jpg',
      '/images/audi/q3/3/4.jpg',
      '/images/audi/q3/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '6.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3',
    trim: '2020款 35 TFSI 时尚动感型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3 4
  '84': {
    id: '84',
    title: '奥迪Q3 2021款 35 TFSI 进享人生版',
    price: 159800,
    images: [
      '/images/audi/q3/4/1.jpg',
      '/images/audi/q3/4/2.jpg',
      '/images/audi/q3/4/3.jpg',
      '/images/audi/q3/4/4.jpg',
      '/images/audi/q3/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '红色',
    interiorColor: '黑色',
    fuelEconomy: '6.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3',
    trim: '2021款 35 TFSI 进享人生版',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3 5
  '85': {
    id: '85',
    title: '奥迪Q3 2022款 35 TFSI 时尚致雅型',
    price: 165800,
    images: [
      '/images/audi/q3/5/1.jpg',
      '/images/audi/q3/5/2.jpg',
      '/images/audi/q3/5/3.jpg',
      '/images/audi/q3/5/4.jpg',
      '/images/audi/q3/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '绿色',
    interiorColor: '黑色',
    fuelEconomy: '6.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Audi',
    model: 'Q3',
    trim: '2022款 35 TFSI 时尚致雅型',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3sportback 1
  '86': {
    id: '86',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    price: 126800,
    images: [
      '/images/audi/q3sportback/1/1.jpg',
      '/images/audi/q3sportback/1/2.jpg',
      '/images/audi/q3sportback/1/3.jpg',
      '/images/audi/q3sportback/1/4.jpg',
      '/images/audi/q3sportback/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2020,
    make: 'Audi',
    model: 'Q3 Sportback',
    trim: '2020款 40 TFSI 时尚型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3sportback 2
  '87': {
    id: '87',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    price: 108800,
    images: [
      '/images/audi/q3sportback/2/1.jpg',
      '/images/audi/q3sportback/2/2.jpg',
      '/images/audi/q3sportback/2/3.jpg',
      '/images/audi/q3sportback/2/4.jpg',
      '/images/audi/q3sportback/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3 Sportback',
    trim: '2020款 40 TFSI 时尚型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3sportback 3
  '88': {
    id: '88',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    price: 136800,
    images: [
      '/images/audi/q3sportback/3/1.jpg',
      '/images/audi/q3sportback/3/2.jpg',
      '/images/audi/q3sportback/3/3.jpg',
      '/images/audi/q3sportback/3/4.jpg',
      '/images/audi/q3sportback/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3 Sportback',
    trim: '2020款 40 TFSI 时尚型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3sportback 4
  '89': {
    id: '89',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    price: 163800,
    images: [
      '/images/audi/q3sportback/4/1.jpg',
      '/images/audi/q3sportback/4/2.jpg',
      '/images/audi/q3sportback/4/3.jpg',
      '/images/audi/q3sportback/4/4.jpg',
      '/images/audi/q3sportback/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '绿色',
    interiorColor: '黑色',
    fuelEconomy: '7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '2.0T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '186马力',
    enginecapacity: '1984cc',
    year: 2021,
    make: 'Audi',
    model: 'Q3 Sportback',
    trim: '2020款 40 TFSI 时尚型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 q3sportback 5
  '90': {
    id: '90',
    title: '奥迪Q3 Sportback 2022款 35 TFSI 进取型',
    price: 181800,
    images: [
      '/images/audi/q3sportback/5/1.jpg',
      '/images/audi/q3sportback/5/2.jpg',
      '/images/audi/q3sportback/5/3.jpg',
      '/images/audi/q3sportback/5/4.jpg',
      '/images/audi/q3sportback/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '黑色',
    interiorColor: '黑色',
    fuelEconomy: '6.7L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Audi',
    model: 'Q3 Sportback',
    trim: '2022款 35 TFSI 进取型',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '电动后尾门',
      '无钥匙进入',
      '无钥匙启动',
      '主动刹车/主动安全'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC60 1
  '91': {
    id: '91',
    title: '沃尔沃XC60 2021款 T5 四驱智远豪华版',
    price: 164900,
    images: [
      '/images/volvo/xc60/1/1.jpg',
      '/images/volvo/xc60/1/2.jpg',
      '/images/volvo/xc60/1/3.jpg',
      '/images/volvo/xc60/1/4.jpg',
      '/images/volvo/xc60/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7.9L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '250马力',
    enginecapacity: '1969cc',
    year: 2021,
    make: 'Volvo',
    model: 'XC60',
    trim: '2021款 T5 四驱智远豪华版',
    bodyStyle: 'SUV',
    features:[
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC60 2
  '92': {
    id: '92',
    title: '沃尔沃XC60 2021款 T5 四驱智逸豪华版',
    price: 133800,
    images: [
      '/images/volvo/xc60/2/1.jpg',
      '/images/volvo/xc60/2/2.jpg',
      '/images/volvo/xc60/2/3.jpg',
      '/images/volvo/xc60/2/4.jpg',
      '/images/volvo/xc60/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '咖啡色',
    interiorColor: '黑色',
    fuelEconomy: '7.9L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '250马力',
    enginecapacity: '1969cc',
    year: 2020,
    make: 'Volvo',
    model: 'XC60',
    trim: '2021款 T5 四驱智逸豪华版',
    bodyStyle: 'SUV',
    features:[
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC60 3
  '93': {
    id: '93',
    title: '沃尔沃XC60 2021款 T5 四驱智逸豪华版',
    price: 133800,
    images: [
      '/images/volvo/xc60/3/1.jpg',
      '/images/volvo/xc60/3/2.jpg',
      '/images/volvo/xc60/3/3.jpg',
      '/images/volvo/xc60/3/4.jpg',
      '/images/volvo/xc60/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '咖啡色',
    interiorColor: '黑色',
    fuelEconomy: '7.9L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '250马力',
    enginecapacity: '1969cc',
    year: 2020,
    make: 'Volvo',
    model: 'XC60',
    trim: '2021款 T5 四驱智逸豪华版',
    bodyStyle: 'SUV',
    features:[
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC60 4
  '94': {
    id: '94',
    title: '沃尔沃XC60 2022款 B5 四驱智远豪华版',
    price: 172800,
    images: [
      '/images/volvo/xc60/4/1.jpg',
      '/images/volvo/xc60/4/2.jpg',
      '/images/volvo/xc60/4/3.jpg',
      '/images/volvo/xc60/4/4.jpg',
      '/images/volvo/xc60/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7.9L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4 48V轻混',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '250马力',
    enginecapacity: '1969cc',
    year: 2021,
    make: 'Volvo',
    model: 'XC60',
    trim: '2022款 B5 四驱智远豪华版',
    bodyStyle: 'SUV',
    features:[
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '电动后尾门'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC60 5
  '95': {
    id: '95',
    title: '沃尔沃XC60 2022款 B5 四驱智远豪华版',
    price: 199000,
    images: [
      '/images/volvo/xc60/5/1.jpg',
      '/images/volvo/xc60/5/2.jpg',
      '/images/volvo/xc60/5/3.jpg',
      '/images/volvo/xc60/5/4.jpg',
      '/images/volvo/xc60/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '银灰色',
    interiorColor: '黑色',
    fuelEconomy: '7.9L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4 48V轻混',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '250马力',
    enginecapacity: '1969cc',
    year: 2021,
    make: 'Volvo',
    model: 'XC60',
    trim: '2022款 B5 四驱智远豪华版',
    bodyStyle: 'SUV',
    features:[
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '电动后尾门'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC40 1
  '96': {
    id: '96',
    title: '沃尔沃XC40 2021款 T4 四驱智远运动版',
    price: 119800,
    images: [
      '/images/volvo/xc40/1/1.jpg',
      '/images/volvo/xc40/1/2.jpg',
      '/images/volvo/xc40/1/3.jpg',
      '/images/volvo/xc40/1/4.jpg',
      '/images/volvo/xc40/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '7.4L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '190马力',
    enginecapacity: '1969cc',
    year: 2020,
    make: 'Volvo',
    model: 'XC40',
    trim: '2021款 T4 四驱智远运动版',
    bodyStyle: 'SUV',
    features:[
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '远程控制'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC40 2
  '97': {
    id: '97',
    title: '沃尔沃XC40 2021款 T4 四驱智远运动版',
    price: 142800,
    images: [
      '/images/volvo/xc40/2/1.jpg',
      '/images/volvo/xc40/2/2.jpg',
      '/images/volvo/xc40/2/3.jpg',
      '/images/volvo/xc40/2/4.jpg',
      '/images/volvo/xc40/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7.4L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '190马力',
    enginecapacity: '1969cc',
    year: 2022,
    make: 'Volvo',
    model: 'XC40',
    trim: '2021款 T4 四驱智远运动版',
    bodyStyle: 'SUV',
    features:[
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '远程控制'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC40 3
  '98': {
    id: '98',
    title: '沃尔沃XC40 2022款 T4 四驱智行时尚版',
    price: 139800,
    images: [
      '/images/volvo/xc40/3/1.jpg',
      '/images/volvo/xc40/3/2.jpg',
      '/images/volvo/xc40/3/3.jpg',
      '/images/volvo/xc40/3/4.jpg',
      '/images/volvo/xc40/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '7.4L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '190马力',
    enginecapacity: '1969cc',
    year: 2022,
    make: 'Volvo',
    model: 'XC40',
    trim: '2021款 T4 四驱智远运动版',
    bodyStyle: 'SUV',
    features:[
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '远程控制'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC40 4
  '99': {
    id: '99',
    title: '沃尔沃XC40 2022款 T3 智行时尚版',
    price: 96800,
    images: [
      '/images/volvo/xc40/4/1.jpg',
      '/images/volvo/xc40/4/2.jpg',
      '/images/volvo/xc40/4/3.jpg',
      '/images/volvo/xc40/4/4.jpg',
      '/images/volvo/xc40/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '7.4L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '1.5T L3',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '163马力',
    enginecapacity: '1477cc',
    year: 2021,
    make: 'Volvo',
    model: 'XC40',
    trim: '2021款 T3 智行时尚版',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '远程控制'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 沃尔沃XC40 5
  '100': {
    id: '100',
    title: '沃尔沃XC40 2021款 T4 四驱智雅豪华版',
    price: 139800,
    images: [
      '/images/volvo/xc40/5/1.jpg',
      '/images/volvo/xc40/5/2.jpg',
      '/images/volvo/xc40/5/3.jpg',
      '/images/volvo/xc40/5/4.jpg',
      '/images/volvo/xc40/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '7.4L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '190马力',
    enginecapacity: '1969cc',
    year: 2021,
    make: 'Volvo',
    model: 'XC40',
    trim: '2021款 T4 四驱智雅豪华版',
    bodyStyle: 'SUV',
    features:[
      '自适应巡航',
      '自动驻车',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '道路救援服务',
      '中控屏',
      '远程控制'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 宝马X3 xDrive28i M 1 
  '101': {
    id: '101',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    price: 205800,
    images: [
      '/images/bmw/x3/1/1.jpg',
      '/images/bmw/x3/1/2.jpg',
      '/images/bmw/x3/1/3.jpg',
      '/images/bmw/x3/1/4.jpg',
      '/images/bmw/x3/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黑色',
    interiorColor: '淡红色',
    fuelEconomy: '8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '224马力',
    enginecapacity: '1998cc',
    year: 2021,
    make: 'BMW',
    model: 'X3',
    trim: '2021款 xDrive28i M运动套装',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 宝马X3 xDrive28i M 2 
  '102': {
    id: '102',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    price: 189800,
    images: [
      '/images/bmw/x3/2/1.jpg',
      '/images/bmw/x3/2/2.jpg',
      '/images/bmw/x3/2/3.jpg',
      '/images/bmw/x3/2/4.jpg',
      '/images/bmw/x3/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '棕色',
    fuelEconomy: '8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '224马力',
    enginecapacity: '1998cc',
    year: 2021,
    make: 'BMW',
    model: 'X3',
    trim: '2021款 xDrive28i M运动套装',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 宝马X3 xDrive28i M 3 
  '103': {
    id: '103',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    price: 165800,
    images: [
      '/images/bmw/x3/3/1.jpg',
      '/images/bmw/x3/3/2.jpg',
      '/images/bmw/x3/3/3.jpg',
      '/images/bmw/x3/3/4.jpg',
      '/images/bmw/x3/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '棕色',
    fuelEconomy: '8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '224马力',
    enginecapacity: '1998cc',
    year: 2021,
    make: 'BMW',
    model: 'X3',
    trim: '2021款 xDrive28i M运动套装',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 宝马X3 xDrive28i M 4
  '104': {
    id: '104',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    price: 206800,
    images: [
      '/images/bmw/x3/4/1.jpg',
      '/images/bmw/x3/4/2.jpg',
      '/images/bmw/x3/4/3.jpg',
      '/images/bmw/x3/4/4.jpg',
      '/images/bmw/x3/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '红色',
    interiorColor: '棕色',
    fuelEconomy: '8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '224马力',
    enginecapacity: '1998cc',
    year: 2021,
    make: 'BMW',
    model: 'X3',
    trim: '2021款 xDrive28i M运动套装',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 宝马X3 xDrive28i M 5
  '105': {
    id: '105',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    price: 163800,
    images: [
      '/images/bmw/x3/5/1.jpg',
      '/images/bmw/x3/5/2.jpg',
      '/images/bmw/x3/5/3.jpg',
      '/images/bmw/x3/5/4.jpg',
      '/images/bmw/x3/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '棕色',
    fuelEconomy: '8L/100km',
    fuelType: '汽油',
    transmission: '8挡手自一体',
    engine: '2.0T L4',
    drivetrain: '四驱',
    seats: '5座',
    hoursePower: '224马力',
    enginecapacity: '1998cc',
    year: 2021,
    make: 'BMW',
    model: 'X3',
    trim: '2021款 xDrive28i M运动套装',
    bodyStyle: 'SUV',
    features:[
      '自动泊车入位',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯米克 1
  '106': {
    id: '106',
    title: '柯米克 2020款 1.5L 自动舒适版',
    price: 57900,
    images: [
      '/images/skoda/kamiq/1/1.jpg',
      '/images/skoda/kamiq/1/2.jpg',
      '/images/skoda/kamiq/1/3.jpg',
      '/images/skoda/kamiq/1/4.jpg',
      '/images/skoda/kamiq/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '112马力',
    enginecapacity: '1498cc',
    year: 2021,
    make: 'Skoda',
    model: 'Kamiq',
    trim: '2020款 1.5L 自动舒适版',
    bodyStyle: 'Sedan',
    features:[
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯米克 2
  '107': {
    id: '107',
    title: '柯米克 2021款 1.5L 自动舒适版',
    price: 99800,
    images: [
      '/images/skoda/kamiq/2/1.jpg',
      '/images/skoda/kamiq/2/2.jpg',
      '/images/skoda/kamiq/2/3.jpg',
      '/images/skoda/kamiq/2/4.jpg',
      '/images/skoda/kamiq/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '6L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '112马力',
    enginecapacity: '1498cc',
    year: 2021,
    make: 'Skoda',
    model: 'Kamiq',
    trim: '2021款 1.5L 自动舒适版',
    bodyStyle: 'Sedan',
    features:[
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯米克 3
  '108': {
    id: '108',
    title: '柯米克 2020款 1.5L 自动舒适版',
    price: 58800,
    images: [
      '/images/skoda/kamiq/3/1.jpg',
      '/images/skoda/kamiq/3/2.jpg',
      '/images/skoda/kamiq/3/3.jpg',
      '/images/skoda/kamiq/3/4.jpg',
      '/images/skoda/kamiq/3/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '香槟色',
    interiorColor: '黑色',
    fuelEconomy: '6L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '112马力',
    enginecapacity: '1498cc',
    year: 2021,
    make: 'Skoda',
    model: 'Kamiq',
    trim: '2020款 1.5L 自动舒适版',
    bodyStyle: 'Sedan',
    features:[
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯米克 4
  '109': {
    id: '109',
    title: '柯米克 2021款 1.5L 自动舒适版',
    price: 89800,
    images: [
      '/images/skoda/kamiq/4/1.jpg',
      '/images/skoda/kamiq/4/2.jpg',
      '/images/skoda/kamiq/4/3.jpg',
      '/images/skoda/kamiq/4/4.jpg',
      '/images/skoda/kamiq/4/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '6L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '112马力',
    enginecapacity: '1498cc',
    year: 2022,
    make: 'Skoda',
    model: 'Kamiq',
    trim: '2021款 1.5L 自动舒适版',
    bodyStyle: 'Sedan',
    features:[
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯米克 5
  '110': {
    id: '110',
    title: '柯米克 2021款 1.5L 自动舒适版',
    price: 86800,
    images: [
      '/images/skoda/kamiq/5/1.jpg',
      '/images/skoda/kamiq/5/2.jpg',
      '/images/skoda/kamiq/5/3.jpg',
      '/images/skoda/kamiq/5/4.jpg',
      '/images/skoda/kamiq/5/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '6L/100km',
    fuelType: '汽油',
    transmission: '6挡手自一体',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '112马力',
    enginecapacity: '1498cc',
    year: 2022,
    make: 'Skoda',
    model: 'Kamiq',
    trim: '2021款 1.5L 自动舒适版',
    bodyStyle: 'Sedan',
    features:[
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯珞克 1
  '111': {
    id: '111',
    title: '柯珞克 2021款 TSI280 豪华版',
    price: 79800,
    images: [
      '/images/skoda/karoq/1/1.jpg',
      '/images/skoda/karoq/1/2.jpg',
      '/images/skoda/karoq/1/3.jpg',
      '/images/skoda/karoq/1/4.jpg',
      '/images/skoda/karoq/1/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '香槟色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Karoq',
    trim: '2021款 TSI280 豪华版',
    bodyStyle: 'Sedan',
    features:[
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯珞克 2
  '112': {
    id: '112',
    title: '柯珞克 2021款 TSI280 豪华版',
    price: 88000,
    images: [
      '/images/skoda/karoq/2/1.jpg',
      '/images/skoda/karoq/2/2.jpg',
      '/images/skoda/karoq/2/3.jpg',
      '/images/skoda/karoq/2/4.jpg',
      '/images/skoda/karoq/2/5.jpg',
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Skoda',
    model: 'Karoq',
    trim: '2021款 TSI280 豪华版',
    bodyStyle: 'Sedan',
    features:[
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯珞克 3
  '113': {
    id: '113',
    title: '柯珞克 2021款 TSI280 豪华版',
    price: 88000,
    images: [
      '/images/skoda/karoq/3/1.jpg',
      '/images/skoda/karoq/3/2.jpg',
      '/images/skoda/karoq/3/3.jpg',
      '/images/skoda/karoq/3/4.jpg',
      '/images/skoda/karoq/3/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Skoda',
    model: 'Karoq',
    trim: '柯珞克 2022款 TSI280 尊享版',
    bodyStyle: 'Sedan',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯珞克 4
  '114': {
    id: '114',
    title: '柯珞克 2021款 TSI280 奢享版',
    price: 129800,
    images: [
      '/images/skoda/karoq/4/1.jpg',
      '/images/skoda/karoq/4/2.jpg',
      '/images/skoda/karoq/4/3.jpg',
      '/images/skoda/karoq/4/4.jpg',
      '/images/skoda/karoq/4/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Skoda',
    model: 'Karoq',
    trim: '柯珞克 2022款 TSI280 奢享版',
    bodyStyle: 'Sedan',
    features:[
      '自动泊车入位',
      '自适应巡航',
      '自动驻车',
      '上坡辅助',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 斯柯达 柯珞克 5
  '115': {
    id: '115',
    title: '柯珞克 2021款 TSI280 科技版',
    price: 99800,
    images: [
      '/images/skoda/karoq/5/1.jpg',
      '/images/skoda/karoq/5/2.jpg',
      '/images/skoda/karoq/5/3.jpg',
      '/images/skoda/karoq/5/4.jpg',
      '/images/skoda/karoq/5/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '黄色',
    interiorColor: '黑色',
    fuelEconomy: '5.9L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Skoda',
    model: 'Karoq',
    trim: '柯珞克 2021款 TSI280 科技版',
    bodyStyle: 'Sedan',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '中控屏'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 起亚 傲跑 1
  '116': {
    id: '116',
    title: '傲跑 2021款 1.5L CVT全能版',
    price: 103000,
    images: [
      '/images/kia/kx3/1/1.jpg',
      '/images/kia/kx3/1/2.jpg',
      '/images/kia/kx3/1/3.jpg',
      '/images/kia/kx3/1/4.jpg',
      '/images/kia/kx3/1/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Kia',
    model: 'KX3',
    trim: '傲跑 2022款 1.5L CVT全能版',
    bodyStyle: 'SUV',
    features:[
      '360全景影像',
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 起亚 傲跑 2
  '117': {
    id: '117',
    title: '傲跑 2020款 1.5L CVT潮流版',
    price: 79900,
    images: [
      '/images/kia/kx3/2/1.jpg',
      '/images/kia/kx3/2/2.jpg',
      '/images/kia/kx3/2/3.jpg',
      '/images/kia/kx3/2/4.jpg',
      '/images/kia/kx3/2/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Kia',
    model: 'KX3',
    trim: '傲跑 2020款 1.5L CVT潮流版',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 起亚 傲跑 3
  '118': {
    id: '118',
    title: '傲跑 2021款 1.5L CVT焕新版',
    price: 99800,
    images: [
      '/images/kia/kx3/3/1.jpg',
      '/images/kia/kx3/3/2.jpg',
      '/images/kia/kx3/3/3.jpg',
      '/images/kia/kx3/3/4.jpg',
      '/images/kia/kx3/3/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Kia',
    model: 'KX3',
    trim: '傲跑 2021款 1.5L CVT焕新版',
    bodyStyle: 'SUV',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '无钥匙进入',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 起亚 傲跑 4
  '119': {
    id: '119',
    title: '傲跑 2020款 1.5L CVT智慧版',
    price: 86800,
    images: [
      '/images/kia/kx3/4/1.jpg',
      '/images/kia/kx3/4/2.jpg',
      '/images/kia/kx3/4/3.jpg',
      '/images/kia/kx3/4/4.jpg',
      '/images/kia/kx3/4/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1395cc',
    year: 2020,
    make: 'Kia',
    model: 'KX3',
    trim: '傲跑 2021款 1.5L CVT焕新版',
    bodyStyle: 'SUV',
    features:[
      '360全景影像',
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '倒车影像',
      '中控屏',
      '无钥匙进入'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 起亚 傲跑 5
  '120': {
    id: '120',
    title: '傲跑 2021款 1.5L CVT风尚版',
    price: 96800,
    images: [
      '/images/kia/kx3/5/1.jpg',
      '/images/kia/kx3/5/2.jpg',
      '/images/kia/kx3/5/3.jpg',
      '/images/kia/kx3/5/4.jpg',
      '/images/kia/kx3/5/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.4L/100km',
    fuelType: '汽油',
    transmission: 'CVT无级变速(模拟8挡)',
    engine: '1.5L L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '115马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Kia',
    model: 'KX3',
    trim: '傲跑 2021款 1.5L CVT风尚版',
    bodyStyle: 'SUV',
    features:[
      '上坡辅助',
      '胎压监测系统',
      '大灯高度调节',
      '防眩目内后视镜',
      '自动大灯'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 A3 1
  '121': {
    id: '121',
    title: '奥迪A3 2020款 改款 Limousine 35 TFSI 进取型',
    price: 70800,
    images: [
      '/images/audi/a3/1/1.jpg',
      '/images/audi/a3/1/2.jpg',
      '/images/audi/a3/1/3.jpg',
      '/images/audi/a3/1/4.jpg',
      '/images/audi/a3/1/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2020,
    make: 'Audi',
    model: 'A3',
    trim: '2020款 改款 Limousine 35 TFSI 进取型',
    bodyStyle: 'Sedan',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '语音识别控制系统',
      '中控屏',
      '胎压监测系统',
      '雨量感应式雨刷'  
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 A3 2
  '122': {
    id: '122',
    title: '奥迪A3 2020款 改款 Limousine 35 TFSI 进取型',
    price: 89800,
    images: [
      '/images/audi/a3/2/1.jpg',
      '/images/audi/a3/2/2.jpg',
      '/images/audi/a3/2/3.jpg',
      '/images/audi/a3/2/4.jpg',
      '/images/audi/a3/2/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '白色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Audi',
    model: 'A3',
    trim: '2020款 改款 Limousine 35 TFSI 进取型',
    bodyStyle: 'Sedan',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '语音识别控制系统',
      '中控屏',
      '胎压监测系统',
      '雨量感应式雨刷'  
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 A3 3
  '123': {
    id: '123',
    title: '奥迪A3 2020款 改款 Limousine 35 TFSI 进取型',
    price: 83000,
    images: [
      '/images/audi/a3/3/1.jpg',
      '/images/audi/a3/3/2.jpg',
      '/images/audi/a3/3/3.jpg',
      '/images/audi/a3/3/4.jpg',
      '/images/audi/a3/3/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2020年',
    exteriorColor: '深灰色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2020,
    make: 'Audi',
    model: 'A3',
    trim: '2020款 改款 Limousine 35 TFSI 进取型',
    bodyStyle: 'Sedan',
    features:[
      '自动驻车',
      '上坡辅助',
      '定速巡航',
      '驻车雷达',
      '语音识别控制系统',
      '中控屏',
      '胎压监测系统',
      '雨量感应式雨刷'  
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 A3 4
  '124': {
    id: '124',
    title: '奥迪A3 2022款 Sportback 35 TFSI 时尚运动型',
    price: 148000,
    images: [
      '/images/audi/a3/4/1.jpg',
      '/images/audi/a3/4/2.jpg',
      '/images/audi/a3/4/3.jpg',
      '/images/audi/a3/4/4.jpg',
      '/images/audi/a3/4/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2022年',
    exteriorColor: '蓝色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2022,
    make: 'Audi',
    model: 'A3',
    trim: '2022款 Sportback 35 TFSI 时尚运动型',
    bodyStyle: 'Sedan',
    features:[
      '自适应巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏',
      '电动后尾门'
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
        description: '大众4S店定期保养，保养记录完整',
        icon: 'info'
      },
      {
        title: '无事故记录',
        description: '经检测，该车无重大事故记录',
        icon: 'file'
      }
    ],
  },
  // 奥迪 A3 5
  '125': {
    id: '125',
    title: '奥迪A3 2021款 Sportback 35 TFSI 时尚运动型',
    price: 142000,
    images: [
      '/images/audi/a3/5/1.jpg',
      '/images/audi/a3/5/2.jpg',
      '/images/audi/a3/5/3.jpg',
      '/images/audi/a3/5/4.jpg',
      '/images/audi/a3/5/5.jpg', 
    ],
    condition: 'used' as const,
    special: true,
    mileage: '2021年',
    exteriorColor: '绿色',
    interiorColor: '黑色',
    fuelEconomy: '5.8L/100km',
    fuelType: '汽油',
    transmission: '7挡双离合',
    engine: '1.4T L4',
    drivetrain: '前驱',
    seats: '5座',
    hoursePower: '150马力',
    enginecapacity: '1395cc',
    year: 2021,
    make: 'Audi',
    model: 'A3',
    trim: '奥迪A3 2021款 Sportback 35 TFSI 时尚运动型',
    bodyStyle: 'Sedan',
    features:[
      '自适应巡航',
      '驻车雷达',
      '倒车影像',
      '语音识别控制系统',
      '车联网',
      '道路救援服务',
      '中控屏',
      '电动后尾门',
      '无钥匙启动'
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
        description: '大众4S店定期保养，保养记录完整',
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
