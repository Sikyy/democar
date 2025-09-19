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
    image: '/images/toyota/camry/1/1.jpg',
    title: '凯美瑞 2021款 2.0G 豪华版',
    brand: 'Toyota',
    price: 106800,
    location: 'Hangzhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 72000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 178,
      driveType: '2WD'
    },
    description: '2021年8月上牌，丰田凯美瑞2.0G豪华版，一手7万多公里原版，一键启动，车道辅助，真皮电动座椅，抬头显示，大屏倒影等配置',
    isFeatured: true
  },
  {
    id: '2',
    image: '/images/toyota/camry/2/1.jpg',
    title: '凯美瑞 2021款 2.0G 豪华版',
    brand: 'Toyota',
    price: 113800,
    location: 'Hangzhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 41000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 178,
      driveType: '2WD'
    },
    description: '个人一手车，原厂大屏，360影像。原版原漆，抬显电动座椅.',
    isFeatured: false
  },
  {
    id: '3',
    image: '/images/toyota/camry/3/1.jpg',
    title: '凯美瑞 2021款 2.0S 锋尚版',
    brand: 'Toyota',
    price: 103800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 95000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 178,
      driveType: '2WD'
    },
    description: '这款车首次上牌时间是2021年11月，表显里程9.50万公里，对于它的车龄来说，这个里程数很正常。车身是银灰色，耐脏又大气，深色内饰也非常有质感。车辆是非营运性质，车况极佳，漆面完好，是个人一手车。支持第三方检测，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况，空间宽敞，车内功能正常，干净整洁。像雨量感应式雨刷、车道保持辅助、外后视镜电动折叠这些实用配置也都有',
    isFeatured: false
  },
  {
    id: '4',
    image: '/images/toyota/camry/4/1.jpg',
    title: '凯美瑞 2019款 改款 双擎 2.5HS 锋尚版',
    brand: 'Toyota',
    price: 126800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 17000,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 178,
      driveType: '2WD'
    },
    description: '20年丰田凯美瑞2.5S油电混合锋尚版，一手车实表1.7万公里全程4S保养，原版车况，车子极新',
    isFeatured: false
  },
  {
    id: '5',
    image: '/images/toyota/camry/5/1.jpg',
    title: '凯美瑞 2019款 2.5G 豪华版 国VI',
    brand: 'Toyota',
    price: 106800,
    location: 'NanNing',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 67000,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 209,
      driveType: '2WD'
    },
    description: '准21年最炫酷丰田凯美瑞2.5G豪华版黑色，多功能方向盘，定速巡航，导航，倒车影像，双电动真皮座椅加热，全景天窗，车道偏离电脑自动纠正，抬头演示仪，自动大灯 清洗，等等功能强大，有兴趣欢迎来现场研究，用户一手全车原版只有一两个面剐蹭补漆其他的都是原漆，当时新车落地25万，全部费用同步，目前安全行驶了6-7万公里左右，',
    isFeatured: false
  },
  //途胜1
  {
    id: '6',
    image: '/images/hyundai/tucson/1/1.jpg',
    title: '途胜 2021款 途胜L 1.5T LUX两驱尊贵版',
    brand: 'Tucson',
    price: 139000,
    location: 'Hangzhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 50000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 200,
      driveType: '2WD'
    },
    description: 'The perfect combination of luxury, elegance and safety! The Lexus IS III Restyling 2 is a vehicle that will catch everyone\'s eye and offer uncompromising comfort to its owner.',
    isFeatured: false
  },
  //途胜2
  {
    id: '7',
    image: '/images/hyundai/tucson/2/1.jpg',
    title: '途胜 2020款 280TGDi 双离合两驱时尚版 国VI',
    brand: 'Tucson',
    price: 76800,
    location: 'TaiYuan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 60000,
      fuelType: 'Petrol',
      displacement: '1.6T',
      power: 177,
      driveType: '2WD'
    },
    description: '外观：漆面保养良好，车身结构无修复，无重大事故。 内饰：干净整洁。安全指示灯正常，气囊等被动安全项正常，车辆内电子器件使用良好， 车内静态动态设备完善。 驾驶：车辆点火、起步、提速、过弯、减速、制动均无问题，加速迅猛，动力输出平稳舒 适,无怠速抖动。 整体：整体车况一般。车体骨架结构无变形扭曲、无火烧泡水痕迹。车身没有喷漆痕迹，整体漆面良好，排除大事故车辆。视野宽阔，空间宽敞明亮通风性好！',
    isFeatured: false
  },
  //途胜3
  {
    id: '8',
    image: '/images/hyundai/tucson/3/1.jpg',
    title: '途胜 2022款 途胜L 1.5T LUX两驱尊贵版 N Line',
    brand: 'Tucson',
    price: 129900,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 48000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 200,
      driveType: '2WD'
    },
    description: '原版原漆，22款1.5T 尊贵版  NLine，加装电动尾门。实表4.8万公里。出厂时间2021年12月。已经清洗整备好，到手不需要其他投资。视频已拍好。',
    isFeatured: false
  },
  //途胜4
  {
    id: '9',
    image: '/images/hyundai/tucson/4/1.jpg',
    title: '途胜 2022款 途胜L 2.0L HEV LUX混动·尊贵版',
    brand: 'Tucson',
    price: 99800,
    location: 'FuZhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 44000,
      fuelType: 'Hybrid',
      displacement: '2.0L',
      power: 200,
      driveType: '2WD'
    },
    description: '现代 途胜 2022款 L 2.0L 混动·尊贵版，全景天窗 电动座椅 胎压监测 车道偏离辅助系统 驾驶模式切换 倒车影像 L2辅助系统 无钥匙进入 一键启动 手机远程APP功能 多功能方向盘 换挡拨片 后排出风口等 4万多公里 原版车况 有看有满意',
    isFeatured: false
  },
  //途胜5
  {
    id: '10',
    image: '/images/hyundai/tucson/5/1.jpg',
    title: '途胜 2020款 280TGDi 双离合两驱智享版 国VI',
    brand: 'Tucson',
    price: 60000,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 123000,
      fuelType: 'Petrol',
      displacement: '1.6T',
      power: 177,
      driveType: '2WD'
    },
    description: '个人一手车，内饰非常好，发动机变速箱很好。',
    isFeatured: false
  },
  //马自达CX-5 1
  {
    id: '11',
    image: '/images/mazda/cx5/1/1.jpg',
    title: '马自达CX-5 2021款 2.0L 自动两驱智尊型',
    brand: 'Mazda',
    price: 138000,
    location: 'Hangzhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 72000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 155,
      driveType: '2WD'
    },
    description: '马自达CX-5是一款紧凑型跨界SUV，以其“魂动”设计、卓越操控和可靠性能在二手车市场备受青睐。作为马自达的明星车型，二手CX-5凭借高保值率、较低维护成本和出色的驾驶体验，成为追求性价比和驾驶乐趣消费者的理想选择。',
    isFeatured: false
  },
  //马自达CX-5 2
  {
    id: '12',
    image: '/images/mazda/cx5/2/1.jpg',
    title: '马自达CX-5 2021款 2.0L 自动两驱黑骑士型',
    brand: 'Mazda',
    price: 92900,
    location: 'XiAn',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 61800,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 155,
      driveType: '2WD'
    },
    description: '马自达CX-5是一款紧凑型跨界SUV，以其“魂动”设计、卓越操控和可靠性能在二手车市场备受青睐。作为马自达的明星车型，二手CX-5凭借高保值率、较低维护成本和出色的驾驶体验，成为追求性价比和驾驶乐趣消费者的理想选择。',
    isFeatured: false
  },
  //马自达CX-5 3
  {
    id: '13',
    image: '/images/mazda/cx5/3/1.jpg',
    title: '马自达CX-5 2020款 改款 2.0L 自动两驱智慧型',
    brand: 'Mazda',
    price: 108000,
    location: 'GuangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 18000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 155,
      driveType: '2WD'
    },
    description: '马自达CX-5是一款紧凑型跨界SUV，以其“魂动”设计、卓越操控和可靠性能在二手车市场备受青睐。作为马自达的明星车型，二手CX-5凭借高保值率、较低维护成本和出色的驾驶体验，成为追求性价比和驾驶乐趣消费者的理想选择。',
    isFeatured: false
  },
  //马自达CX-5 4
  {
    id: '14',
    image: '/images/mazda/cx5/4/1.jpg',
    title: '马自达CX-5 2020款 改款 2.0L 自动两驱智慧型',
    brand: 'Mazda',
    price: 99800,
    location: 'DaLian',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 25000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 155,
      driveType: '2WD'
    },
    description: '马自达CX-5是一款紧凑型跨界SUV，以其“魂动”设计、卓越操控和可靠性能在二手车市场备受青睐。作为马自达的明星车型，二手CX-5凭借高保值率、较低维护成本和出色的驾驶体验，成为追求性价比和驾驶乐趣消费者的理想选择。',
    isFeatured: false
  },
  //马自达CX-5 5
  {
    id: '15',
    image: '/images/mazda/cx5/5/1.jpg',
    title: '马自达CX-5 2021款 2.5L 自动四驱旗舰型',
    brand: 'Mazda',
    price: 185000,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 37000,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 196,
      driveType: '4WD'
    },
    description: '马自达CX-5是一款紧凑型跨界SUV，以其“魂动”设计、卓越操控和可靠性能在二手车市场备受青睐。作为马自达的明星车型，二手CX-5凭借高保值率、较低维护成本和出色的驾驶体验，成为追求性价比和驾驶乐趣消费者的理想选择。',
    isFeatured: false
  },
  {
    id: '16',
    image: '/images/toyota/rav4/1/1.jpg',
    title: 'RAV4荣放 2020款 双擎 2.5L CVT四驱精英版',
    brand: 'Toyota',
    price: 99000,
    location: 'Hangzhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 130000,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 178,
      driveType: '4WD'
    },
    description: '丰田RAV4（Recreational Active Vehicle with 4-wheel drive）是一款紧凑型跨界SUV，自1995年推出以来，以其可靠耐用、宽敞实用和高保值率成为二手车市场的热门选择。作为紧凑型SUV的开创者之一，RAV4凭借卓越的品质和均衡性能，深受家庭用户和城市驾驶者的喜爱。',
    isFeatured: true
  },
  {
    id: '17',
    image: '/images/toyota/rav4/2/1.jpg',
    title: 'RAV4荣放 2021款 2.0L CVT四驱风尚版',
    brand: 'Toyota',
    price: 168800,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 39000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 171,
      driveType: '4WD'
    },
    description: '丰田RAV4（Recreational Active Vehicle with 4-wheel drive）是一款紧凑型跨界SUV，自1995年推出以来，以其可靠耐用、宽敞实用和高保值率成为二手车市场的热门选择。作为紧凑型SUV的开创者之一，RAV4凭借卓越的品质和均衡性能，深受家庭用户和城市驾驶者的喜爱。',
    isFeatured: true
  },
  {
    id: '18',
    image: '/images/toyota/rav4/3/1.jpg',
    title: 'RAV4荣放 2022款 2.0L CVT两驱风尚PLUS版',
    brand: 'Toyota',
    price: 146800,
    location: 'JiXi',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 25000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 171,
      driveType: '2WD'
    },
    description: '丰田RAV4（Recreational Active Vehicle with 4-wheel drive）是一款紧凑型跨界SUV，自1995年推出以来，以其可靠耐用、宽敞实用和高保值率成为二手车市场的热门选择。作为紧凑型SUV的开创者之一，RAV4凭借卓越的品质和均衡性能，深受家庭用户和城市驾驶者的喜爱。',
    isFeatured: true
  },
  // 丰田RAV4 4
  {
    id: '19',
    image: '/images/toyota/rav4/4/1.jpg',
    title: 'RAV4荣放 2020款 双擎 2.5L CVT四驱旗舰版',
    brand: 'Toyota',
    price: 177000,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 24500,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 178,
      driveType: '4WD'
    },
    description: '丰田RAV4（Recreational Active Vehicle with 4-wheel drive）是一款紧凑型跨界SUV，自1995年推出以来，以其可靠耐用、宽敞实用和高保值率成为二手车市场的热门选择。作为紧凑型SUV的开创者之一，RAV4凭借卓越的品质和均衡性能，深受家庭用户和城市驾驶者的喜爱。',
    isFeatured: true
  },
  // 丰田RAV4 5
  {
    id: '20',
    image: '/images/toyota/rav4/5/1.jpg',
    title: 'RAV4荣放 2021款 2.0L CVT两驱都市版',
    brand: 'Toyota',
    price: 89800,
    location: 'YiYang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 110000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 171,
      driveType: '2WD'
    },
    description: '丰田RAV4（Recreational Active Vehicle with 4-wheel drive）是一款紧凑型跨界SUV，自1995年推出以来，以其可靠耐用、宽敞实用和高保值率成为二手车市场的热门选择。作为紧凑型SUV的开创者之一，RAV4凭借卓越的品质和均衡性能，深受家庭用户和城市驾驶者的喜爱。',
    isFeatured: true
  },
  //索纳塔 1
  {
    id: '21',
    image: '/images/hyundai/sonata/1/1.jpg',
    title: '索纳塔 2020款 270TGDi GLS DCT精英版',
    brand: 'Hyundai',
    price: 75800,
    location: 'WenZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 31000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 170,
      driveType: '2WD'
    },
    description: 'The ideal choice for those who appreciate reliability and quality! The Toyota Camry VIII offers impressive durability, excellent fuel efficiency and spacious interior.',
    isFeatured: false
  },
  //索纳塔 2
  {
    id: '22',
    image: '/images/hyundai/sonata/2/1.jpg',
    title: '索纳塔 2020款 380TGDi GLS 自动豪华版',
    brand: 'Hyundai',
    price: 85000,
    location: 'WenZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 40000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 240,
      driveType: '2WD'
    },
    description: '车况精品，无重大事故，无火烧泡水，无加装改装配置。让您买的放心，省心，开心。底盘结构:无明显磨损发动机舱:运转良好外观:车身无结构性损伤内饰:干净整洁 漆面:保养良好车源',
    isFeatured: false
  },
  //索纳塔 3
  {
    id: '23',
    image: '/images/hyundai/sonata/3/1.jpg',
    title: '索纳塔 2020款 380TGDi TOP 自动旗舰版',
    brand: 'Hyundai',
    price: 85000,
    location: 'WenZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 46000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 240,
      driveType: '2WD'
    },
    description: '全车原版原漆，无任何事故，享有3年10公里质保，全车4s店保养，0出险，支持线下试乘试驾，公里数少。本店购车享有终身免费道路救援。购车享有更多豪华礼包等你来拿。',
    isFeatured: false
  },
  //索纳塔 4
  {
    id: '24',
    image: '/images/hyundai/sonata/4/1.jpg',
    title: '索纳塔 2020款 380TGDi GLS 自动豪华版',
    brand: 'Hyundai',
    price: 86800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 32000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 240,
      driveType: '2WD'
    },
    description: '原版车况，已过三方查博士，东莞本地1手车，内饰外观九成新，车况毫无瑕疵，多种驾驶模式，确保无事故，无水泡，无火烧，无切割',
    isFeatured: false
  },
  //索纳塔 5
  {
    id: '25',
    image: '/images/hyundai/sonata/5/1.jpg',
    title: '索纳塔 2020款 270TGDi GLS DCT精英版',
    brand: 'Hyundai',
    price: 69800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 103000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 170,
      driveType: '2WD'
    },
    description: '陕西鑫亚特集团是西北汽车贸易，旗下众合名车，总面积30000平米，是集汽车金融、车商库融、汽车进出口、汽车贸易供应链、二手车平台、二手车业务、车务等相关服务为一体的综合性汽车服务领航企业。集团自成立以来，始终坚持为会员提供专业化、高品质的全方位汽车服务，并积极推进汽车文化发展，倡导由“车”至“人”“人”至“家”的汽车服务理念.凭着专业的技术，优质的服务和先进的设备。',
    isFeatured: false
  },
  //起亚K5 1
  {
    id: '26',
    image: '/images/kia/k5/1/1.jpg',
    title: '起亚K5 2020款 380T GT-Line 旗舰版',
    brand: 'KIA',
    price: 79800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 70000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 240,
      driveType: '2WD'
    },
    description: 'Experience pure driving excellence with the Porsche 911 GT3. This track-focused masterpiece delivers breathtaking performance and precision engineering at its finest.',
    isFeatured: true
  },
  //起亚K5 2
  {
    id: '27',
    image: '/images/kia/k5/2/1.jpg',
    title: '起亚K5 2020款 270T CVVD 豪华版',
    brand: 'KIA',
    price: 121800,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 53000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 170,
      driveType: '2WD'
    },
    description: '原版原漆。出厂时间2020年12月，上牌时间2021年1月。20款豪华。实表5.3万公里，到手不需要其他投资。视频已拍好。检测已做。',
    isFeatured: true
  },
  //起亚K5 3
  {
    id: '28',
    image: '/images/kia/k5/3/1.jpg',
    title: '起亚K5 2021款 380T GT-Line 旗舰版',
    brand: 'KIA',
    price: 118000,
    location: 'LanZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 50000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 240,
      driveType: '2WD'
    },
    description: '2021款起亚K5 380T GT - Line旗舰版。它在2022年6月20日首次上牌，实表五万三千公里，更换左前大灯，三方检测S级，仅有机盖、左前翼子板划痕补漆！ 和同级别竞品车型相比，起亚K5这款车的优势十分明显。它配备了车侧盲区影像、360全景影像和车道偏离预警等实用功能，很多竞品车型要么只有部分配置，要么需要额外花钱选装。而且，它的空间宽敞，内饰精美，做工精致，干净整洁，在驾乘体验上要比一些竞品更胜一筹',
    isFeatured: true
  },
  //起亚K5 4
  {
    id: '29',
    image: '/images/kia/k5/4/1.jpg',
    title: '起亚K5 2020款 380T GT-Line 尊贵版',
    brand: 'KIA',
    price: 83800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 84000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 240,
      driveType: '2WD'
    },
    description: '2020款起亚K5 380T GT - Line尊贵版。这款车在2020年10月09日首次上牌，表显里程8.40万公里，排量2.0T，蓝色车身搭配深色内饰，时尚又大气。 和同级别竞品相比，起亚K5有着独特的优势。很多竞品车型可能外观设计比较普通，而起亚K5外观线条流畅，造型动感，回头率超高。在配置上，它配备了自动大灯、语音识别控制、外后视镜电动折叠等实用功能',
    isFeatured: true
  },
  //起亚K5 5
  {
    id: '30',
    image: '/images/kia/k5/5/1.jpg',
    title: '起亚K5 2021款 270T CVVD 焕新版',
    brand: 'KIA',
    price: 126800,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 28000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 170,
      driveType: '2WD'
    },
    description: '起亚K5凯酷 4门5座三厢车 发动机1.5T 170马力L4 最大功率125KW （170PS）发动机型号G4FS 前置前驱 前后驻车雷达 倒车影像 定速巡航 真皮多功能方向盘 主驾驶电动座椅 可开全景天窗 全车一键升降式车窗',
    isFeatured: true
  },
  //起亚K3 1
  {
    id: '31',
    image: '/images/kia/k3/1/1.jpg',
    title: '起亚K3 2019款 1.5L CVT智享互联版',
    brand: 'Kia',
    price: 49800,
    location: 'ZhangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 91000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: 'The future of automotive performance is here. Tesla Model S Plaid combines ludicrous acceleration with cutting-edge technology and luxurious comfort.',
    isFeatured: true
  },
  //起亚K3 2
  {
    id: '32',
    image: '/images/kia/k3/2/1.jpg',
    title: '起亚K3 2019款 1.5L CVT新锐版',
    brand: 'Kia',
    price: 40900,
    location: 'JiNan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 27900,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: 'The future of automotive performance is here. Tesla Model S Plaid combines ludicrous acceleration with cutting-edge technology and luxurious comfort.',
    isFeatured: true
  },
  //起亚K3 3
  {
    id: '33',
    image: '/images/kia/k3/3/1.jpg',
    title: '起亚K3 2021款 1.5L IVT 时尚版',
    brand: 'Kia',
    price: 74800,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 37000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '原版原漆，实表3.7万公里。符合出口时间。已经清洗整备好，到手不需要其他投资。',
    isFeatured: true
  },
  //起亚K3 4
  {
    id: '34',
    image: '/images/kia/k3/4/1.jpg',
    title: '起亚K3 2021款 1.4T DCT GT-Line智驾运动版',
    brand: 'Kia',
    price: 92000,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 32500,
      fuelType: 'Petrol',
      displacement: '1.4L',
      power: 130,
      driveType: '2WD'
    },
    description: '所有车辆收购前经过严格检验，并辅以查询维保记录和出险记录等大数据查证，确保每台车车况真实。所售车辆有第三方检测报告，享90天内回购保障，让每一位奔联达严选而来的用户，买的明明白白，用着放心、舒心！',
    isFeatured: true
  },
  //起亚K3 5
  {
    id: '35',
    image: '/images/kia/k3/5/1.jpg',
    title: '起亚K3 2021款 1.5L IVT 青春版',
    brand: 'Kia',
    price: 56800,
    location: 'YinChuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 86000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '车况相当好，无色差，内饰精美、干净整洁，空间宽敞，一家人出行也不会觉得拥挤。它的做工精致，功能都正常，发动机和变速箱运转良好，底盘紧凑，开起来特别稳。自动大灯、自动驻车、上坡辅助这些配置也都有，日常驾驶更轻松。',
    isFeatured: true
  },
  //亚洲龙 1
  {
    id: '36',
    image: '/images/toyota/avalon/1/1.jpg',
    title: '亚洲龙 2022款 2.0L 豪华版',
    brand: 'Toyota',
    price: 105800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 88000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 178,
      driveType: '2WD'
    },
    description: 'The ultimate hot hatch. Volkswagen Golf R delivers exceptional performance and practicality in one refined package.',
    isFeatured: false
  },
  //亚洲龙 2
  {
    id: '37',
    image: '/images/toyota/avalon/2/1.jpg',
    title: '亚洲龙 2019款 双擎 2.5L XLE尊贵版 国VI',
    brand: 'Toyota',
    price: 126800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 58000,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 178,
      driveType: '2WD'
    },
    description: '车况相当不错。支持第三方检测，漆面完好，发动机和变速箱运转良好，内饰精美，深色内饰看着既大气又耐脏。它的配置也很丰富，有语音识别控制、车道偏离预警、外后视镜电动折叠等，能让驾驶更轻松、更安全。',
    isFeatured: false
  },
  //亚洲龙 3
  {
    id: '38',
    image: '/images/toyota/avalon/3/1.jpg',
    title: '亚洲龙 2019款 2.5L Touring尊贵版 国VI',
    brand: 'Toyota',
    price: 136800,
    location: 'GuangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 55000,
      fuelType: 'Petrol',
      displacement: '2.5L',
      power: 209,
      driveType: '2WD'
    },
    description: '车况相当不错。支持第三方检测，漆面完好，发动机和变速箱运转良好，内饰精美，深色内饰看着既大气又耐脏。它的配置也很丰富，有语音识别控制、车道偏离预警、外后视镜电动折叠等，能让驾驶更轻松、更安全。',
    isFeatured: false
  },
  //亚洲龙 4
  {
    id: '39',
    image: '/images/toyota/avalon/4/1.jpg',
    title: '亚洲龙 2019款 2.0L 豪华版 国VI',
    brand: 'Toyota',
    price: 106800,
    location: 'GuangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 46000,
      fuelType: 'Petrol',
      displacement: '2.0L',
      power: 178,
      driveType: '2WD'
    },
    description: '车况相当不错。支持第三方检测，漆面完好，发动机和变速箱运转良好，内饰精美，深色内饰看着既大气又耐脏。它的配置也很丰富，有语音识别控制、车道偏离预警、外后视镜电动折叠等，能让驾驶更轻松、更安全。',
    isFeatured: false
  },
  //亚洲龙 5
  {
    id: '40',
    image: '/images/toyota/avalon/5/1.jpg',
    title: '亚洲龙 2019款 双擎 2.5L XLE尊贵版 国VI',
    brand: 'Toyota',
    price: 133800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 46000,
      fuelType: 'Hybrid',
      displacement: '2.5L',
      power: 178,
      driveType: '2WD'
    },
    description: '车况相当不错。支持第三方检测，漆面完好，发动机和变速箱运转良好，内饰精美，深色内饰看着既大气又耐脏。它的配置也很丰富，有语音识别控制、车道偏离预警、外后视镜电动折叠等，能让驾驶更轻松、更安全。',
    isFeatured: false
  },
  {
    id: '41',
    image: '/images/toyota/corolla/1/1.jpg',
    title: '卡罗拉 2021款 1.2T S-CVT先锋PLUS版',
    brand: 'Toyota',
    price: 60800,
    location: 'ChangSha',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 50000,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: 'The legendary Type R returns with more power and precision. This track-ready Honda Civic combines racing heritage with daily usability.',
    isFeatured: false
  },
  {
    id: '46',
    image: '/images/toyota/leiling/1/1.jpg',
    title: '雷凌双擎E+ 2019款 1.8PH GS CVT精英版',
    brand: 'Toyota',
    price: 42000,
    location: 'HangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 800,
      fuelType: 'Hybrid',
      displacement: '1.8L',
      power: 99,
      driveType: '2WD'
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
  { brand: 'Toyota', model: '凯美瑞, 卡罗拉, RAV4' },
  { brand: 'Honda', model: '雅阁, 思域, CR-V' },
  { brand: 'Mazda', model: '阿特兹, CX-5, 昂克赛拉' },
  { brand: 'Hyundai', model: '伊兰特, 途胜, 索纳塔' },
  { brand: 'Kia', model: 'K5, 智跑, 狮跑' }
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


    

  // 处理EnhancedFilters的筛选变化
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    
    // 应用所有筛选条件，包括品牌/车型/能源类型
    let result = [...carData];
    
    // 1. 应用品牌筛选
    if (selectedBrands.length > 0) {
      result = result.filter(car => 
        selectedBrands.includes(car.brand)
      );
    }
    
    // 2. 应用车型筛选（基于vehicleType字段）
    if (selectedCarTypes.length > 0) {
      result = result.filter(car => 
        selectedCarTypes.includes(car.vehicleType)
      );
    }
    
    // 3. 应用能源类型筛选
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
    
    // 4. 应用价格范围筛选
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
    
    // 5. 应用里程筛选
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
    
    // 6. 应用燃料类型筛选
    if (newFilters.fuelTypes && newFilters.fuelTypes.length > 0) {
      result = result.filter(car => 
        newFilters.fuelTypes!.includes(car.specs.fuelType)
      );
    }
    
    // 7. 应用驱动方式筛选
    if (newFilters.driveTypes && newFilters.driveTypes.length > 0) {
      result = result.filter(car => 
        newFilters.driveTypes!.includes(car.specs.driveType)
      );
    }
    
    // 更新筛选后的车辆列表
    setFilteredCars(result);
  }, [selectedBrands, selectedCarTypes, selectedFuelTypes]);

  // 应用所有筛选条件的函数
  const applyAllFilters = useCallback(() => {
    let result = [...carData];
    
    // 1. 应用品牌筛选
    if (selectedBrands.length > 0) {
      result = result.filter(car => 
        selectedBrands.includes(car.brand)
      );
    }
    
    // 2. 应用车型筛选
    if (selectedCarTypes.length > 0) {
      result = result.filter(car => 
        selectedCarTypes.includes(car.vehicleType)
      );
    }
    
    // 3. 应用能源类型筛选
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

  // 当筛选条件变化时，重新应用所有筛选
  useEffect(() => {
    applyAllFilters();
  }, [selectedBrands, selectedCarTypes, selectedFuelTypes, applyAllFilters]);
  


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