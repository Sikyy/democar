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

// const CarCount = styled.span`
//   background-color: #FF5722;
//   color: white;
//   padding: 4px 8px;
//   border-radius: 4px;
//   font-size: 1rem;
//   margin-left: 12px;
// `;




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
    brand: 'KIA',
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
    brand: 'KIA',
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
    brand: 'KIA',
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
    brand: 'KIA',
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
    brand: 'KIA',
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
  //卡罗拉 1
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
  //卡罗拉 2
  {
    id: '42',
    image: '/images/toyota/corolla/2/1.jpg',
    title: '卡罗拉 2021款 双擎 1.8L E-CVT精英版',
    brand: 'Toyota',
    price: 63800,
    location: 'ChiFeng',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 66200,
      fuelType: 'Hybrid',
      displacement: '1.8L',
      power: 98,
      driveType: '2WD'
    },
    description: '动力系统：搭载1.8L自然吸气发动机，最大功率72kW，最大扭矩142N·m，电动机总功率53kW，总扭矩163N·m，系统综合功率90kW，匹配E-CVT无级变速箱，NEDC综合油耗4.1L/100km。​- 底盘悬挂：驱动方式为前置前驱，前悬挂为麦弗逊式独立悬挂，后悬挂为双叉臂式独立悬挂。',
    isFeatured: false
  },
  //卡罗拉 3
  {
    id: '43',
    image: '/images/toyota/corolla/3/1.jpg',
    title: '卡罗拉 2021款 1.5L CVT精英版',
    brand: 'Toyota',
    price: 65000,
    location: 'JinHua',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 21000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 121,
      driveType: '2WD'
    },
    description: '【外观情况】好 【车漆情况】好 【发变情况】好',
    isFeatured: false
  },
  //卡罗拉 4
  {
    id: '44',
    image: '/images/toyota/corolla/4/1.jpg',
    title: '卡罗拉 2021款 1.2T S-CVT精英版',
    brand: 'Toyota',
    price: 76800,
    location: 'MuDanJiang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 36000,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: '车况精品，内饰干净，欢迎选购，资料齐全，各种配合',
    isFeatured: false
  },
  //卡罗拉 5
  {
    id: '44',
    image: '/images/toyota/corolla/5/1.jpg',
    title: '卡罗拉 2021款 1.2T S-CVT精英PLUS版',
    brand: 'Toyota',
    price: 59800,
    location: 'HaiKou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 75000,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: '这辆车保养的很好，整车外观内饰还很新，外观没有明显的刮蹭，内饰各个按键也没有太多使用痕迹，是一款里外保养的都很不错的二手车。',
    isFeatured: false
  },
  //雷凌 1
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
  },
  //雷凌 2
  {
    id: '47',
    image: '/images/toyota/leiling/2/1.jpg',
    title: '雷凌 2021款 185T CVT运动版',
    brand: 'Toyota',
    price: 55800,
    location: 'HuiZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 71000,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: '个人一手车，全程4S店维护保养，安全行驶7万公里，全车原版，仅有右前叶喷漆，其余都原版原漆，磨损低，配置高，流线漂亮，手续齐全，价格实惠。',
    isFeatured: true
  },
  //雷凌 3
  {
    id: '48',
    image: '/images/toyota/leiling/3/1.jpg',
    title: '雷凌 2022款 双擎 1.8H E-CVT运动版',
    brand: 'Toyota',
    price: 65800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 51000,
      fuelType: 'Hybrid',
      displacement: '1.8L',
      power: 98,
      driveType: '2WD'
    },
    description: ' 这台雷凌排量1.8L，车身是银灰色，内饰为深色，车辆是非营运性质。咱们再看看车况，发动机和变速箱运转良好，底盘紧凑，而且还是原版原漆，外观崭新，内饰也精美，里程数又低，个人一手车，整体车况极佳',
    isFeatured: true
  },
  //雷凌 4
  {
    id: '49',
    image: '/images/toyota/leiling/4/1.jpg',
    title: '雷凌 2022款 双擎 1.8H E-CVT运动版',
    brand: 'Toyota',
    price: 66600,
    location: 'YangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'hybrid',
    specs: {
      mileage: 58000,
      fuelType: 'Hybrid',
      displacement: '1.8L',
      power: 98,
      driveType: '2WD'
    },
    description: ' 2022款丰田雷凌双擎1.8H E - CVT运动版。这台车于2022年9月首次上牌，表显里程仅5.00万公里，对于一辆不到两年的车来说，这个里程数相当低。 和同级别竞品相比，雷凌双擎优势明显。像某些竞品虽然也有混动车型，但在油耗和可靠性上远不如雷凌。丰田雷凌双擎的1.8L发动机搭配E - CVT变速箱，动力输出平稳，油耗极低，日常使用成本大幅降低',
    isFeatured: true
  },
  //雷凌 5
  {
    id: '50',
    image: '/images/toyota/leiling/5/1.jpg',
    title: '雷凌 2021款 185T CVT运动版',
    brand: 'Toyota',
    price: 59800,
    location: 'FoShan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 61000,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: '2021年6月丰田雷凌双擎运动版，自波1.8，天窗，导航，真皮，多功能方向盘，17寸大铃寸，无匙进入，一健启动，后排出风口',
    isFeatured: true
  },
  //大众高尔夫 1
  {
    id: '51',
    image: '/images/volkswagen/golf/1/1.jpg',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    brand: 'Volkswagen',
    price: 93500,
    location: 'HangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 20000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2021款大众高尔夫280TSI DSG R - Line。和同级别竞品相比，高尔夫的优势十分明显。像思域这类竞品，在驾驶质感上就和高尔夫有差距，高尔夫的底盘紧凑扎实，开起来更稳。 这款高尔夫首次上牌是2021年7月，表显里程仅2万公里，是个人一手车。车况相当好，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况。',
    isFeatured: true
  },
  //大众高尔夫 2
  {
    id: '52',
    image: '/images/volkswagen/golf/2/1.jpg',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    brand: 'Volkswagen',
    price: 78800,
    location: 'ChengDu',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 95800,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2021款大众高尔夫280TSI DSG R - Line。和同级别竞品相比，高尔夫的优势十分明显。像思域这类竞品，在驾驶质感上就和高尔夫有差距，高尔夫的底盘紧凑扎实，开起来更稳。 这款高尔夫首次上牌是2021年7月，表显里程仅2万公里，是个人一手车。车况相当好，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况。',
    isFeatured: true
  },
  //大众高尔夫 2
  {
    id: '52',
    image: '/images/volkswagen/golf/2/1.jpg',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    brand: 'Volkswagen',
    price: 78800,
    location: 'ChengDu',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 95800,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2021款大众高尔夫280TSI DSG R - Line。和同级别竞品相比，高尔夫的优势十分明显。像思域这类竞品，在驾驶质感上就和高尔夫有差距，高尔夫的底盘紧凑扎实，开起来更稳。 这款高尔夫首次上牌是2021年7月，表显里程仅2万公里，是个人一手车。车况相当好，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况。',
    isFeatured: true
  },
  //大众高尔夫 3
  {
    id: '53',
    image: '/images/volkswagen/golf/3/1.jpg',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    brand: 'Volkswagen',
    price: 93800,
    location: 'ChengDu',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 53000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2021款大众高尔夫280TSI DSG R - Line。和同级别竞品相比，高尔夫的优势十分明显。像思域这类竞品，在驾驶质感上就和高尔夫有差距，高尔夫的底盘紧凑扎实，开起来更稳。 这款高尔夫首次上牌是2021年7月，表显里程仅2万公里，是个人一手车。车况相当好，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况。',
    isFeatured: true
  },
  //大众高尔夫 4
  {
    id: '54',
    image: '/images/volkswagen/golf/4/1.jpg',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    brand: 'Volkswagen',
    price: 129000,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 41000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2021款大众高尔夫280TSI DSG R - Line。和同级别竞品相比，高尔夫的优势十分明显。像思域这类竞品，在驾驶质感上就和高尔夫有差距，高尔夫的底盘紧凑扎实，开起来更稳。 这款高尔夫首次上牌是2021年7月，表显里程仅2万公里，是个人一手车。车况相当好，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况。',
    isFeatured: true
  },
  //大众高尔夫 5
  {
    id: '55',
    image: '/images/volkswagen/golf/5/1.jpg',
    title: '高尔夫 2021款 280TSI DSG R-Line',
    brand: 'Volkswagen',
    price: 82000,
    location: 'ChangZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 60000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2021款大众高尔夫280TSI DSG R - Line。和同级别竞品相比，高尔夫的优势十分明显。像思域这类竞品，在驾驶质感上就和高尔夫有差距，高尔夫的底盘紧凑扎实，开起来更稳。 这款高尔夫首次上牌是2021年7月，表显里程仅2万公里，是个人一手车。车况相当好，发动机和变速箱运转良好，底盘紧凑，没有漏油渗油的情况。',
    isFeatured: true
  },
  //大众探影 1
  {
    id: '56',
    image: '/images/volkswagen/tacqua/1/1.jpg',
    title: '探影 2021款 280TSI DSG R-Line智联版',
    brand: 'Volkswagen',
    price: 93800,
    location: 'ChongQing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 37500,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '原版原漆，车辆具体信息请电话咨询销售员。',
    isFeatured: true
  },
  //大众探影 2
  {
    id: '57',
    image: '/images/volkswagen/tacqua/2/1.jpg',
    title: '探影 2020款 1.5L 自动 悦Pro',
    brand: 'Volkswagen',
    price: 63800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 49000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '这台车发动机变速箱运转良好，底盘紧凑，而且是原版原漆，漆面完好无色差，车身外观也没有明显划痕或凹陷，就跟新车似的。它还是个人一手车，没有越野史，整体车况极佳。内饰是深色的，精美又干净整洁，做工精致，功能也都正常，空间宽敞，日常家用或者短途旅行都很合适',
    isFeatured: true
  },
  //大众探影 3
  {
    id: '58',
    image: '/images/volkswagen/tacqua/3/1.jpg',
    title: '探影 2021款 1.5L 自动 悦智联版',
    brand: 'Volkswagen',
    price: 69800,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 60000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 113,
      driveType: '2WD'
    },
    description: '极品 原版原漆 真实公里数 加了座椅加热 高配 液晶仪表 加 全景天窗 资料视频齐全',
    isFeatured: true
  },
  //大众探影 4
  {
    id: '59',
    image: '/images/volkswagen/tacqua/4/1.jpg',
    title: '探影 2021款 280TSI DSG 悦Pro智联版',
    brand: 'Volkswagen',
    price: 77500,
    location: 'XiNing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 80000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '这辆探影首次上牌是2021年5月，表显里程8万公里，白色车身搭配深色内饰，整体看起来非常协调',
    isFeatured: true
  },
  //大众探影 5
  {
    id: '60',
    image: '/images/volkswagen/tacqua/5/1.jpg',
    title: '探影 2021款 200TSI DSG R-Line智联版',
    brand: 'Volkswagen',
    price: 88800,
    location: 'FoShan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 40100,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: '这辆探影空间上，探影虽然车身小巧，但内部空间布局合理，相当宽敞，能满足日常家用和出行需求，比一些竞品车型更实用。而且它内饰精美，细节之处尽显品质，不像部分竞品那样粗糙。在配置方面，倒车影像、车联网、上坡辅助等实用功能一应俱全，在驾驶便利性和安全性上远超不少竞品',
    isFeatured: true
  },
  //大众探岳 1
  {
    id: '61',
    image: '/images/volkswagen/tayron/1/1.jpg',
    title: '探岳 2020款 380TSI 豪华智联版Pro 四驱',
    brand: 'Volkswagen',
    price: 115800,
    location: 'BeiJing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 75000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 220,
      driveType: '4WD'
    },
    description: '【外观情况】原漆 【车漆情况】原漆 【新旧程度】新 【发变情况】完美 【历史用途】家用',
    isFeatured: true
  },
  //大众探岳 2
  {
    id: '62',
    image: '/images/volkswagen/tayron/2/1.jpg',
    title: '探岳 2020款 380TSI 豪华智联版Pro 四驱',
    brand: 'Volkswagen',
    price: 102800,
    location: 'ChengDu',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 72000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 220,
      driveType: '4WD'
    },
    description: ' 这款探岳首次上牌时间是2020年10月19日，表显里程只有7.20万公里，里程数较低。车况极佳，原版原漆，内饰干净整洁，深色内饰显得既稳重又大气。2.0T的排量，动力强劲，能轻松应对各种路况。而且它还配备了车道偏离预警、上坡辅助、车联网等实用的配置，使用起来既安全又便捷。 ',
    isFeatured: true
  },
  //大众探岳 3
  {
    id: '63',
    image: '/images/volkswagen/tayron/3/1.jpg',
    title: '探岳 2020款 380TSI R-Line智联版 四驱',
    brand: 'Volkswagen',
    price: 105900,
    location: 'QingDao',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 79500,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 220,
      driveType: '4WD'
    },
    description: ' 无',
    isFeatured: true
  },
  //大众探岳 4
  {
    id: '64',
    image: '/images/volkswagen/tayron/4/1.jpg',
    title: '探岳 2023款 380TSI 四驱R-Line Pro智慧版',
    brand: 'Volkswagen',
    price: 183000,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 8000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 220,
      driveType: '4WD'
    },
    description: ' 无',
    isFeatured: true
  },
  //大众探岳 5
  {
    id: '65',
    image: '/images/volkswagen/tayron/5/1.jpg',
    title: '探岳 2019款 380TSI 四驱旗舰型 国V',
    brand: 'Volkswagen',
    price: 92800,
    location: 'HaiKou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 68000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 220,
      driveType: '4WD'
    },
    description: ' 2019款大众探岳380TSI四驱旗舰型国V。探岳搭载2.0T发动机，动力强劲，开起来超带感，而且探岳还有自适应巡航、语音识别控制、车道偏离预警，座椅通风加热，这些实用的高科技配置，很多竞品都没有这么丰富。这款车首次上牌时间是2018年10月23日，表显里程才6.80万公里，里程数较低。发动机变速箱运转良好，无漏油渗油情况，全程4S店保养，车况极佳，是原版一面补漆，漆面完好，外观崭新，就像一辆八成新的车。车内空间宽敞，内饰是深色的，精美又干净整洁，各项功能也都正常，极具性价比',
    isFeatured: true
  },
  //斯柯达 明锐 1
  {
    id: '66',
    image: '/images/skoda/octavia/1/1.jpg',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    brand: 'Skoda',
    price: 139800,
    location: 'ZhengZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 24000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: ' 七档干式双离合，涡轮增压，电动助力，通风盘式，ABS防抱死，车身稳定控制，胎压报警，ISOFIX儿童座椅接口，车道偏离预警，主动刹车，驾驶模式切换，发动机启停，前后驻车雷达，360影像，全速自适应巡航，倒车车侧预警，卫星导航，并线辅助，道路交通标识别，辅助泊车入位，运动套件，电动后备箱/记忆，遥控钥匙',
    isFeatured: true
  },
  //斯柯达 明锐 2
  {
    id: '67',
    image: '/images/skoda/octavia/2/1.jpg',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    brand: 'Skoda',
    price: 126000,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 35300,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: ' 七最新到店 明锐 配置丰富 多功能方向盘 全景天窗 一件启动 电动座椅 空间大 省油安全系数高 欢迎品鉴',
    isFeatured: true
  },
  //斯柯达 明锐 3
  {
    id: '68',
    image: '/images/skoda/octavia/3/1.jpg',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    brand: 'Skoda',
    price: 108800,
    location: 'FuZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 58000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: ' 1.4T7挡双离合，电动天窗，无钥匙进入，全液晶仪表，多功能方向盘，一键启动，抬头显示，座椅电动/加热/通风，运动/经济/舒适驾驶模式切换，车内氛围灯，电动后备箱，自动电子驻车，车道保持辅助，辅助泊车，主动刹车，前后驻车雷达，360环影，LED大灯，转向辅助，感应雨刷，后视镜加热/折叠……等等',
    isFeatured: true
  },
  //斯柯达 明锐 4
  {
    id: '69',
    image: '/images/skoda/octavia/4/1.jpg',
    title: '明锐 2021款 PRO TSI280 DSG旗舰版',
    brand: 'Skoda',
    price: 109800,
    location: 'XinXiang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 68000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '【车辆名称】明锐 2021款 PRO TSI280 DSG旗舰版 【驱动方式】2WD 【颜 色】灰色 【出厂时间】2021-09 【交强日期】 【行驶里程】68000km 【车辆排量】 1.4T 150马力 L4 最大功率(kW)110(150Ps) 【钥 匙】2把 【车 况】原漆',
    isFeatured: true
  },
  //斯柯达 明锐 5
  {
    id: '70',
    image: '/images/skoda/octavia/5/1.jpg',
    title: '明锐 2019款 TSI230 DSG智行豪华版 国V',
    brand: 'Skoda',
    price: 47800,
    location: 'ShangHai',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 135900,
      fuelType: 'Petrol',
      displacement: '1.2T',
      power: 116,
      driveType: '2WD'
    },
    description: '【外观情况】无刮擦 【新旧程度】车况精品 【发变情况】质保一年，不限公里数 【维修保养】全程4s店保养',
    isFeatured: true
  },
  //斯柯达 速派 1
  {
    id: '71',
    image: '/images/skoda/superb/1/1.jpg',
    title: '速派 2022款 TSI280 DSG尊享版',
    brand: 'Skoda',
    price: 139800,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 24400,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '原版原漆 门上一个崩点需要处理 挡风玻璃一个崩点。当地已过完户。全程4S店记录。',
    isFeatured: true
  },
  //斯柯达 速派 2
  {
    id: '72',
    image: '/images/skoda/superb/2/1.jpg',
    title: '速派 2022款 TSI280 DSG尊享版',
    brand: 'Skoda',
    price: 83800,
    location: 'HuaiAn',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 67000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '车况好 原车漆 空间大 省油好开 配置丰富 性价比超高 主流车型',
    isFeatured: true
  },
  //斯柯达 速派 2
  {
    id: '72',
    image: '/images/skoda/superb/2/1.jpg',
    title: '速派 2022款 TSI280 DSG尊享版',
    brand: 'Skoda',
    price: 83800,
    location: 'HuaiAn',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 67000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '车况好 原车漆 空间大 省油好开 配置丰富 性价比超高 主流车型',
    isFeatured: true
  },
  //斯柯达 速派 3
  {
    id: '73',
    image: '/images/skoda/superb/3/1.jpg',
    title: '速派 2021款 TSI280 DSG标准版',
    brand: 'Skoda',
    price: 75800,
    location: 'LuoYang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 85000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '本地车，实际一手，全车原版原漆，车况无可挑剔，内饰刚花2000多包的真皮座椅，超级省油，6个多油',
    isFeatured: true
  },
  //斯柯达 速派 4
  {
    id: '74',
    image: '/images/skoda/superb/4/1.jpg',
    title: '速派 2021款 TSI280 DSG标准版',
    brand: 'Skoda',
    price: 139800,
    location: 'MuDanJiang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 28000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '原版原漆，外观零划痕、精品车况',
    isFeatured: true
  },
  //斯柯达 速派 5
  {
    id: '75',
    image: '/images/skoda/superb/5/1.jpg',
    title: '速派 2022款 TSI330 DSG奢享版',
    brand: 'Skoda',
    price: 125800,
    location: 'MuDanJiang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 55000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '原版原漆，外观零划痕、精品车况',
    isFeatured: true
  },
  //斯柯达 柯迪亚克 1
  {
    id: '76',
    image: '/images/skoda/kodiaq/1/1.jpg',
    title: '柯迪亚克 2020款 TSI330 7座两驱豪华优享版',
    brand: 'Skoda',
    price: 82800,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 104800,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //斯柯达 柯迪亚克 2
  {
    id: '77',
    image: '/images/skoda/kodiaq/2/1.jpg',
    title: '柯迪亚克 2020款 TSI330 7座两驱豪华优享版',
    brand: 'Skoda',
    price: 103600,
    location: 'XiAn',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 22000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '实表2.2万公里 双电动座椅，多功能方向盘，全景大天窗 液晶仪表 更换左前门 左前叶子，右前叶子板，喷漆',
    isFeatured: true
  },
  //斯柯达 柯迪亚克 3
  {
    id: '78',
    image: '/images/skoda/kodiaq/3/1.jpg',
    title: '柯迪亚克 2022款 TSI330 5座两驱奢享版',
    brand: 'Skoda',
    price: 165800,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 10000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '原版原漆斯柯达柯迪亚克，1万公里实表，新款，零瑕疵，电动座椅，电动天窗',
    isFeatured: true
  },
  //斯柯达 柯迪亚克 4
  {
    id: '79',
    image: '/images/skoda/kodiaq/4/1.jpg',
    title: '柯迪亚克 2022款 TSI330 7座两驱奢享版',
    brand: 'Skoda',
    price: 166800,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 24000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '斯科达 柯迪亚克2022款TSI330 七座 两驱奢享版 上牌时间：2022年9月22日 公 里 数：2.4万公里 配 置：全景电动天窗 一键启动 大屏导航 倒车影像 倒车雷达 自动驻车 巡航定速 本市个人一手车，全车原版原漆，家庭用车公里数也非常小。',
    isFeatured: true
  },
  //斯柯达 柯迪亚克 5
  {
    id: '80',
    image: '/images/skoda/kodiaq/5/1.jpg',
    title: '柯迪亚克 2022款 TSI330 7座两驱奢享版',
    brand: 'Skoda',
    price: 172800,
    location: 'ZhengZhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 5000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '全车原版原漆，保实表，无拆卸无换件，现车随时过户',
    isFeatured: true
  },
  //奥迪 Q3 1
  {
    id: '81',
    image: '/images/audi/q3/1/1.jpg',
    title: '奥迪Q3 2021款 40 TFSI 时尚动感型',
    brand: 'Audi',
    price: 124300,
    location: 'NanJing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 52000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '21年Q340时尚动感，21年3月上牌，目前行驶5.2万公里，欢迎来电咨询',
    isFeatured: true
  },
  //奥迪 Q3 2
  {
    id: '82',
    image: '/images/audi/q3/2/1.jpg',
    title: '奥迪Q3 2021款 35 TFSI 进取动感型',
    brand: 'Audi',
    price: 105800,
    location: 'ShangHai',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 93000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 186,
      driveType: '2WD'
    },
    description: '这款车首次上牌时间是2021年5月，表显里程9.30万公里，白色车身搭配深色内饰，外观时尚大气，内饰沉稳耐脏。排量为1.4T，非营运车辆',
    isFeatured: true
  },
  //奥迪 Q3 3
  {
    id: '83',
    image: '/images/audi/q3/3/1.jpg',
    title: '奥迪Q3 2020款 35 TFSI 时尚动感型',
    brand: 'Audi',
    price: 106900,
    location: 'FoShan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 76000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '2020款奥迪Q3 35 TFSI时尚动感型。这车是2021年1月12日首次上牌的，表显里程才7.60万公里，非营运车辆，个人一手车。 从车况来说，它可以说是相当出色。没有漏油渗油的问题，底盘紧凑，发动机和变速箱运转良好，漆面也完好无损，而且全程都在4S店保养',
    isFeatured: true
  },
  //奥迪 Q3 4
  {
    id: '84',
    image: '/images/audi/q3/4/1.jpg',
    title: '奥迪Q3 2021款 35 TFSI 进享人生版',
    brand: 'Audi',
    price: 159800,
    location: 'NanNing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 22000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '原版原漆2021款奥迪Q3 35 TFSI进享人生版。和同级别竞品宝马X1、奔驰GLA相比，这款奥迪Q3在外观、性能和性价比上都不落下风。 先说说外观，红色车身相当惹眼，外观崭新，车身外观完好无明显划痕或凹陷，漆面完好无色差，颜值远超部分竞品。内饰是深色系，精美且做工精致，干净整洁，空间也很宽敞',
    isFeatured: true
  },
  //奥迪 Q3 5
  {
    id: '85',
    image: '/images/audi/q3/5/1.jpg',
    title: '奥迪Q3 2022款 35 TFSI 时尚致雅型',
    brand: 'Audi',
    price: 165800,
    location: 'ZhengZhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 40500,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '全车原版原漆，保实表，无拆卸无换件，现车随时过户',
    isFeatured: true
  },
  //奥迪Q3 Sportback 1
  {
    id: '86',
    image: '/images/audi/q3sportback/1/1.jpg',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    brand: 'Audi',
    price: 126800,
    location: 'WenZhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 46000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '保证无重大事故，无泡水，无火烧，支持第三方检测。原版原漆车况',
    isFeatured: true
  },
  //奥迪Q3 Sportback 2
  {
    id: '87',
    image: '/images/audi/q3sportback/2/1.jpg',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    brand: 'Audi',
    price: 108800,
    location: 'WuXi',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 90000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '21年5月上牌奥迪Q3 Sportback时尚版，行驶了9万公里，多功能方向盘带换挡拨片，定速巡航，一键启动，倒车影像，全景天窗，翻毛皮座椅，电动尾门，车况精品，优价出售！',
    isFeatured: true
  },
  //奥迪Q3 Sportback 3
  {
    id: '88',
    image: '/images/audi/q3sportback/3/1.jpg',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    brand: 'Audi',
    price: 136800,
    location: 'DongGuan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 68000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '2021年7月上牌的奥迪Q3 Sportback 2020款40 TFSI时尚型。白色车身搭配深色内饰，外观时尚动感，内饰精美且做工精致，干净整洁。 和同级别竞品相比，这款车优势明显。它搭载2.0T的发动机，动力强劲，在日常驾驶和高速行驶中都能轻松应对，而很多竞品车型在动力上表现就稍显逊色。表显里程仅6.8万公里，里程数较低，相比一些同年限但里程数高的竞品，后续使用起来更让人放心。',
    isFeatured: true
  },
  //奥迪Q3 Sportback 4
  {
    id: '89',
    image: '/images/audi/q3sportback/4/1.jpg',
    title: '奥迪Q3 Sportback 2020款 40 TFSI 时尚型',
    brand: 'Audi',
    price: 163800,
    location: 'ChangSha',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 25000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 186,
      driveType: '2WD'
    },
    description: '【外观情况】车子铁件原漆 公里数实表，喜欢的抓紧',
    isFeatured: true
  },
  //奥迪Q3 Sportback 5
  {
    id: '90',
    image: '/images/audi/q3sportback/5/1.jpg',
    title: '奥迪Q3 Sportback 2022款 35 TFSI 进取型',
    brand: 'Audi',
    price: 181800,
    location: 'NingBo',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 46000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '【车漆情况】原版原漆 实表 【新旧程度】99新',
    isFeatured: true
  },
  //沃尔沃XC60 1
  {
    id: '91',
    image: '/images/volvo/xc60/1/1.jpg',
    title: '沃尔沃XC60 2021款 T5 四驱智远豪华版',
    brand: 'Volvo',
    price: 164900,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 36700,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 250,
      driveType: '4WD'
    },
    description: '无',
    isFeatured: true
  },
  //沃尔沃XC60 2
  {
    id: '92',
    image: '/images/volvo/xc60/2/1.jpg',
    title: '沃尔沃XC60 2021款 T5 四驱智逸豪华版',
    brand: 'Volvo',
    price: 133800,
    location: 'TianJin',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 45000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 250,
      driveType: '4WD'
    },
    description: '【车漆情况】全车精品车况 【维修保养】全程店保',
    isFeatured: true
  },
  //沃尔沃XC60 3
  {
    id: '93',
    image: '/images/volvo/xc60/3/1.jpg',
    title: '沃尔沃XC60 2021款 T5 四驱智逸豪华版',
    brand: 'Volvo',
    price: 163800,
    location: 'ChengDu',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 70000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 250,
      driveType: '4WD'
    },
    description: '21年上户沃尔沃XC60 极品车况 已过第三方查博士检测 提供一年两2万公里质保',
    isFeatured: true
  },
  //沃尔沃XC60 4
  {
    id: '94',
    image: '/images/volvo/xc60/4/1.jpg',
    title: '沃尔沃XC60 2022款 B5 四驱智远豪华版',
    brand: 'Volvo',
    price: 172800,
    location: 'GuangZhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 37200,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 250,
      driveType: '4WD'
    },
    description: '车况精品，全车经过372项检测。本公司预承诺所销售车辆，保证无重大事故，无水泡，无火烧。还支持分期按揭方式付款购车。只要一张身份证即可，手续方面齐全，方便快捷。支持第三方车辆检测. 可以放心购买的。',
    isFeatured: true
  },
  //沃尔沃XC60 5
  {
    id: '95',
    image: '/images/volvo/xc60/5/1.jpg',
    title: '沃尔沃XC60 2022款 B5 四驱智远豪华版',
    brand: 'Volvo',
    price: 199000,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 29000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 250,
      driveType: '4WD'
    },
    description: '21年6月份出厂 出口标准 原版原漆 实表',
    isFeatured: true
  },
  //沃尔沃XC40 1
  {
    id: '96',
    image: '/images/volvo/xc40/1/1.jpg',
    title: '沃尔沃XC40 2021款 T4 四驱智远运动版',
    brand: 'Volvo',
    price: 119800,
    location: 'KunMing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 39000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 190,
      driveType: '4WD'
    },
    description: '这款车首次上牌时间是2020年12月10日，表显里程才3.90万公里，里程数相当低。它是2.0T的排量，动力强劲，驾驶起来游刃有余。白色车身搭配深色内饰，既时尚又耐脏。而且这是个人一手车，全程在4S店保养，无越野史，基本都是跑的全程高速。车辆空间宽敞，内饰精美，做工精致，干净整洁，各项功能也都正常。漆面完好，无色差，车身外观崭新，只有局部喷漆。发动机和变速箱运转良好，底盘紧凑，无漏油渗油情况，并且刚做完保养，车况极佳，极具性价比。',
    isFeatured: true
  },
  //沃尔沃XC40 2
  {
    id: '96',
    image: '/images/volvo/xc40/2/1.jpg',
    title: '沃尔沃XC40 2021款 T4 四驱智远运动版',
    brand: 'Volvo',
    price: 142800,
    location: 'QingDao',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 45000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 190,
      driveType: '4WD'
    },
    description: '个人一手车，原版原漆，4.5万公里实表，查博士三方（深度）检测，发变正常并提供一年三万公里质保。 天天好车标准：保实表（专检设备确保真实公里数），发动机变速箱悬架无拆修，所有真实车况全部录入合同，90天内发现车况不符原价回购，注意是原价回购！',
    isFeatured: true
  },
  //沃尔沃XC40 3
  {
    id: '97',
    image: '/images/volvo/xc40/3/1.jpg',
    title: '沃尔沃XC40 2021款 T4 四驱智远运动版',
    brand: 'Volvo',
    price: 139800,
    location: 'HeFei',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 50000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 190,
      driveType: '4WD'
    },
    description: '它是个人一手车，全程在4S店保养，车况非常好。内饰精美，采用深色内饰，看起来既大气又耐脏，而且车内功能正常。更值得一提的是，它还是原版原漆，外观崭新，发动机和变速箱运转良好，驾驶起来十分顺畅。 在配置方面，自动驻车、主动刹车、上坡辅助这些实用功能一应俱全，能为你的日常驾驶提供不少便利。',
    isFeatured: true
  },
  //沃尔沃XC40 4
  {
    id: '99',
    image: '/images/volvo/xc40/4/1.jpg',
    title: '沃尔沃XC40 2021款 T3 智行时尚版',
    brand: 'Volvo',
    price: 96800,
    location: 'ChengDu',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 72000,
      fuelType: 'Petrol',
      displacement: '1.5T',
      power: 163,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //沃尔沃XC40 5
  {
    id: '100',
    image: '/images/volvo/xc40/5/1.jpg',
    title: '沃尔沃XC40 2021款 T4 四驱智雅豪华版',
    brand: 'Volvo',
    price: 139800,
    location: 'FoShan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 33000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 190,
      driveType: '4WD'
    },
    description: '无',
    isFeatured: true
  },
  //宝马X3 xDrive28i M 1 
  {
    id: '101',
    image: '/images/bmw/x3/1/1.jpg',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    brand: 'BMW',
    price: 205800,
    location: 'ZhengZhou',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 36000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 224,
      driveType: '4WD'
    },
    description: '无',
    isFeatured: true
  },
  //宝马X3 xDrive28i M 2
  {
    id: '102',
    image: '/images/bmw/x3/1/2.jpg',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    brand: 'BMW',
    price: 189800,
    location: 'ChongQing',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 23400,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 224,
      driveType: '4WD'
    },
    description: '【外观情况】完美 【车漆情况】完美 【新旧程度】9.99成新 出有第三方检测报告公里数真实',
    isFeatured: true
  },
  //宝马X3 xDrive28i M 3
  {
    id: '103',
    image: '/images/bmw/x3/3/1.jpg',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    brand: 'BMW',
    price: 165800,
    location: 'WuXi',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 107000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 224,
      driveType: '4WD'
    },
    description: '【外观情况】完美 【车漆情况】完美 【新旧程度】9.99成新 出有第三方检测报告公里数真实',
    isFeatured: true
  },
  //宝马X3 xDrive28i M 4
  {
    id: '104',
    image: '/images/bmw/x3/4/1.jpg',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    brand: 'BMW',
    price: 206800,
    location: 'ShenZhen',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 30000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 224,
      driveType: '4WD'
    },
    description: '2021年5月 宝马X3 28i M运动套 ，美女一手车 仅3万Km 极品原版车况',
    isFeatured: true
  },
  //宝马X3 xDrive28i M 5
  {
    id: '105',
    image: '/images/bmw/x3/5/1.jpg',
    title: '宝马X3 2021款 xDrive28i M运动套装',
    brand: 'BMW',
    price: 163800,
    location: 'Foshan',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 117000,
      fuelType: 'Petrol',
      displacement: '2.0T',
      power: 224,
      driveType: '4WD'
    },
    description: '车辆是蓝色，贴了白色车衣。',
    isFeatured: true
  },
  //斯柯达 柯米克 1
  {
    id: '106',
    image: '/images/skoda/kamiq/1/1.jpg',
    title: '柯米克 2020款 1.5L 自动舒适版',
    brand: 'Skoda',
    price: 57900,
    location: 'ZaoZhuang',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 84100,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 112,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //斯柯达 柯米克 2
  {
    id: '107',
    image: '/images/skoda/kamiq/2/1.jpg',
    title: '柯米克 2021款 1.5L 自动舒适版',
    brand: 'Skoda',
    price: 99800,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 7200,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 112,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //斯柯达 柯米克 3
  {
    id: '108',
    image: '/images/skoda/kamiq/3/1.jpg',
    title: '柯米克 2020款 1.5L 自动舒适版',
    brand: 'Skoda',
    price: 58800,
    location: 'JinCheng',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 38000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 112,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //斯柯达 柯米克 4
  {
    id: '109',
    image: '/images/skoda/kamiq/4/1.jpg',
    title: '柯米克 2021款 1.5L 自动舒适版',
    brand: 'Skoda',
    price: 89800,
    location: 'WuHan',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 51000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 112,
      driveType: '2WD'
    },
    description: '原版原漆。出厂日期是2021年12月。实表5.1万公里。已经清洗整备好，到手不需要其他投资，视频已拍好。',
    isFeatured: true
  },
  //斯柯达 柯米克 5
  {
    id: '110',
    image: '/images/skoda/kamiq/5/1.jpg',
    title: '柯米克 2022款 1.5L 自动舒适版',
    brand: 'Skoda',
    price: 86800,
    location: 'ChangSha',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 51000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 112,
      driveType: '2WD'
    },
    description: '原版原漆！极品车况！资料齐全！欢迎咨询！',
    isFeatured: true
  },
  //斯柯达 柯珞克 1
  {
    id: '111',
    image: '/images/skoda/karoq/1/1.jpg',
    title: '柯珞克 2021款 TSI280 豪华版',
    brand: 'Skoda',
    price: 79800,
    location: 'SuZhou',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 50000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '极品车况整车原版1个面补漆，0出险理赔，一手0过户实表5万公里 外观内饰95新，全程带座椅套方向盘套使用，非常爱惜，到手无需整备投资',
    isFeatured: true
  },
  //斯柯达 柯珞克 2
  {
    id: '112',
    image: '/images/skoda/karoq/2/1.jpg',
    title: '柯珞克 2022款 TSI280 尊享版',
    brand: 'Skoda',
    price: 88000,
    location: 'ChongQing',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 53500,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '发动机变速箱运转良好，底盘紧凑，无漏油渗油情况，刚做完保养，车况极佳。里程数较低，全程4S店保养，无越野史，全程高速行驶，漆面完好无色差，车身外观也没有明显划痕或凹陷',
    isFeatured: true
  },
  //斯柯达 柯珞克 3
  {
    id: '113',
    image: '/images/skoda/karoq/3/1.jpg',
    title: '柯珞克 2022款 TSI280 尊享版',
    brand: 'Skoda',
    price: 124000,
    location: 'ChangSha',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 34000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '22年9月出厂 3.4万公里实表 原版原漆',
    isFeatured: true
  },
  //斯柯达 柯珞克 4
  {
    id: '114',
    image: '/images/skoda/karoq/4/1.jpg',
    title: '柯珞克 2022款 TSI280 奢享版',
    brand: 'Skoda',
    price: 129800,
    location: 'HeFei',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 35000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //斯柯达 柯珞克 5
  {
    id: '115',
    image: '/images/skoda/karoq/5/1.jpg',
    title: '柯珞克 2021款 TSI280 科技版',
    brand: 'Skoda',
    price: 99800,
    location: 'WeiFang',
    locationCountry: 'CN',
    vehicleType: 'Sedan',
    energyType: 'petrol',
    specs: {
      mileage: 38000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //起亚 傲跑 1
  {
    id: '116',
    image: '/images/kia/kx3/1/1.jpg',
    title: '傲跑 2021款 1.5L CVT全能版',
    brand: 'Kia',
    price: 103000,
    location: 'ShenYang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 37000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '全车原漆，360影响，辅助驾驶，定速巡航。液晶仪表',
    isFeatured: true
  },
  //起亚 傲跑 2
  {
    id: '117',
    image: '/images/kia/kx3/2/1.jpg',
    title: '傲跑 2020款 1.5L CVT潮流版',
    brand: 'Kia',
    price: 79900,
    location: 'HaErBin',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 66500,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //起亚 傲跑 3
  {
    id: '118',
    image: '/images/kia/kx3/3/1.jpg',
    title: '傲跑 2021款 1.5L CVT焕新版',
    brand: 'Kia',
    price: 99800,
    location: 'ChangSha',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 52000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '外观：漆面保养良好，车身结构无修复，无重大事故。 内饰：干净整洁。安全指示灯正常，气囊等被动安全项正常，车辆内电子器件使用良好， 车内静态动态设备完善。 驾驶：车辆点火、起步、提速、过弯、减速、制动均无问题，加速迅猛，动力输出平稳舒 适,无怠速抖动。 整体：整体车况一般。车体骨架结构无变形扭曲、无火烧泡水痕迹。车身有喷漆痕迹，整体漆面良好，排除大事故车辆。',
    isFeatured: true
  },
  //起亚 傲跑 4
  {
    id: '119',
    image: '/images/kia/kx3/4/1.jpg',
    title: '傲跑 2020款 1.5L CVT智慧版',
    brand: 'Kia',
    price: 86800,
    location: 'XinXiang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 34000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //起亚 傲跑 5
  {
    id: '120',
    image: '/images/kia/kx3/5/1.jpg',
    title: '傲跑 2021款 1.5L CVT风尚版',
    brand: 'Kia',
    price: 96800,
    location: 'XinXiang',
    locationCountry: 'CN',
    vehicleType: 'SUV',
    energyType: 'petrol',
    specs: {
      mileage: 38000,
      fuelType: 'Petrol',
      displacement: '1.5L',
      power: 115,
      driveType: '2WD'
    },
    description: '【外观情况】原版 【车漆情况】原漆 【新旧程度】原版原漆',
    isFeatured: true
  },
  //奥迪 A3 1
  {
    id: '121',
    image: '/images/audi/a3/1/1.jpg',
    title: '奥迪A3 2020款 改款 Limousine 35 TFSI 进取型',
    brand: 'Audi',
    price: 70800,
    location: 'FoShan',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 56000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
   //奥迪 A3 2
  {
    id: '122',
    image: '/images/audi/a3/2/1.jpg',
    title: '奥迪A3 2020款 改款 Limousine 35 TFSI 进取型',
    brand: 'Audi',
    price: 89800,
    location: 'HaiKou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 32000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
   //奥迪 A3 3
  {
    id: '123',
    image: '/images/audi/a3/3/1.jpg',
    title: '奥迪A3 2020款 改款 Limousine 35 TFSI 进取型',
    brand: 'Audi',
    price: 83000,
    location: 'XuZhou',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 28200,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //奥迪 A3 4
  {
    id: '124',
    image: '/images/audi/a3/4/1.jpg',
    title: '奥迪A3 2022款 Sportback 35 TFSI 时尚运动型',
    brand: 'Audi',
    price: 148000,
    location: 'ShiJiaZhuang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 29000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '无',
    isFeatured: true
  },
  //奥迪 A3 5
  {
    id: '125',
    image: '/images/audi/a3/5/1.jpg',
    title: '奥迪A3 2021款 Sportback 35 TFSI 时尚运动型',
    brand: 'Audi',
    price: 142000,
    location: 'MuDanJiang',
    locationCountry: 'CN',
    vehicleType: 'sedan',
    energyType: 'petrol',
    specs: {
      mileage: 44000,
      fuelType: 'Petrol',
      displacement: '1.4T',
      power: 150,
      driveType: '2WD'
    },
    description: '念初国际，保证车况，无火烧，无水泡，无事故，让你买的放心。',
    isFeatured: true
  },
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
  { brand: 'Toyota', model: '凯美瑞, 卡罗拉, RAV4, 亚洲龙, 雷凌' },
  { brand: 'Honda', model: '雅阁, 思域, CR-V' },
  { brand: 'Mazda', model: '阿特兹, CX-5, 昂克赛拉' },
  { brand: 'Hyundai', model: '伊兰特, 途胜, 索纳塔' },
  { brand: 'KIA', model: 'K5, 智跑, 狮跑, 起亚K5, 起亚K3' },
  { brand: 'Tucson', model: '途胜' },
  { brand: 'Volkswagen', model: '高尔夫, 探岳' },
  { brand: 'Skoda', model: '明锐, 速派, 柯迪亚克' },
  { brand: 'Audi', model: 'Q3, Q3 Sportback' },
  { brand: 'Volvo', model: 'XC60, XC40' }
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
          {/* <CarCount>{filteredCars.length} cars</CarCount> */}
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