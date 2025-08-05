import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Tabs, Rate } from 'antd';
import { CheckOutlined, 
  PhoneOutlined, MessageOutlined, EnvironmentOutlined, CarOutlined, 
  CheckCircleOutlined, 
   EyeOutlined } from '@ant-design/icons';

// 主容器
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  font-family: 'Roboto', sans-serif;
`;

// 面包屑导航
const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0;
  font-size: 14px;
`;

// 主内容区域
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// 左侧列
const LeftColumn = styled.div``;

// 右侧列
const RightColumn = styled.div``;

// 车辆标题区域
const TitleSection = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #242d3d;
`;

const SubtitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: #5d636f;
`;





// 图片区域
const ImageSection = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 比例
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const MainImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

const ImageControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

const ImageButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: white;
  }
`;

const ThumbnailStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 8px;
`;

const Thumbnail = styled.div.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})<{ active?: boolean }>`
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.7};
  border: ${props => props.active ? '2px solid #0277bd' : 'none'};
  
  &:hover {
    opacity: 1;
  }
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 价格区域
const PriceCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

const PriceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Price = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #242d3d;
`;


const PriceSubtext = styled.div`
  font-size: 14px;
  color: #5d636f;
  margin-bottom: 16px;
`;



const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  font-weight: 600;
`;

const SecondaryButton = styled(Button)`
  height: 48px;
  font-size: 16px;
`;

// 联系信息卡片
const ContactCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const DealerInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const DealerLogo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 4px;
  object-fit: cover;
`;

const DealerDetails = styled.div``;

const DealerName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #242d3d;
  margin-bottom: 4px;
`;

const DealerLocation = styled.div`
  font-size: 14px;
  color: #5d636f;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const DealerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #5d636f;
`;

// 详细信息部分
const DetailSection = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #242d3d;
  margin-bottom: 16px;
`;

// 规格信息网格
const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
`;

const SpecLabel = styled.div`
  color: #5d636f;
`;

const SpecValue = styled.div`
  color: #242d3d;
  font-weight: 500;
`;

// 特性列表
const FeaturesSection = styled.div`
  margin-bottom: 32px;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`;

const FeatureText = styled.div`
  color: #242d3d;
`;



// 检测报告部分
const InspectionSection = styled.div`
  margin-bottom: 32px;
`;

const InspectionCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const InspectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const InspectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f5f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InspectionInfo = styled.div`
  flex: 1;
`;

const InspectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #242d3d;
  margin-bottom: 4px;
`;

const InspectionSubtitle = styled.div`
  font-size: 14px;
  color: #5d636f;
`;

const InspectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const InspectionContent = styled.div``;

const InspectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const InspectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
`;




const InspectionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const InspectionDate = styled.div`
  font-size: 14px;
  color: #5d636f;
`;

const InspectionButton = styled.div``;



// 免责声明部分
const DisclaimerSection = styled.div`
  font-size: 12px;
  color: #5d636f;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

interface CarDetailPageProps {
  car: {
    id: string;
    title: string;
    price: number;
    monthlyPayment: number;
    images: string[];
    condition: 'new' | 'used';
    special?: boolean;
    mileage: string;
    exteriorColor: string;
    interiorColor: string;
    fuelEconomy: string;
    fuelType: string;
    transmission: string;
    engine: string;
    drivetrain: string;
    vin: string;
    seats: string;
    hoursePower: string;
    enginecapacity: string;
    stockNumber: string;
    year: number;
    make: string;
    model: string;
    trim: string;
    bodyStyle: string;
    features: string[];
    dealerInfo: {
      name: string;
      location: string;
      distance: string;
      rating: number;
      reviews: number;
      logo: string;
    };
    history: {
      title: string;
      description: string;
      icon: string;
    }[];
    similarCars: {
      id: string;
      title: string;
      price: number;
      mileage: string;
      image: string;
    }[];
  };
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ car }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container>
      <StyledBreadcrumb>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/used">二手车</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/used/${car.make.toLowerCase()}`}>{car.make}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/used/${car.make.toLowerCase()}/${car.model.toLowerCase()}`}>{car.model}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{car.year} {car.make} {car.model}</Breadcrumb.Item>
      </StyledBreadcrumb>

      <MainContent>
        <LeftColumn>
          <TitleSection>
            <Title>{car.year} {car.make} {car.model} {car.trim}</Title>
            <SubtitleRow>
              <Subtitle>{car.mileage} · {car.dealerInfo.location}</Subtitle>
            </SubtitleRow>

          </TitleSection>

          <ImageSection>
            <MainImageWrapper>
              <MainImage src={car.images[activeImageIndex]} alt={car.title} />
              <ImageCounter>{activeImageIndex + 1} / {car.images.length}</ImageCounter>
            </MainImageWrapper>
            <ImageControls>
              <ImageButton onClick={handlePrevImage}>
                {'<'}
              </ImageButton>
              <ImageButton onClick={handleNextImage}>
                {'>'}
              </ImageButton>
            </ImageControls>
            <ThumbnailStrip>
              {car.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  active={index === activeImageIndex}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <ThumbnailImage src={image} alt={`${car.title} - 图片 ${index + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailStrip>
          </ImageSection>

          <DetailSection>
            <Tabs 
              defaultActiveKey="overview" 
              items={[
                {
                  key: 'overview',
                  label: '概览',
                  children: (
                    <>
                      <SectionTitle>车辆规格</SectionTitle>
                      <SpecsGrid>
                        <SpecItem>
                          <SpecLabel>年份</SpecLabel>
                          <SpecValue>{car.year}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>品牌</SpecLabel>
                          <SpecValue>{car.make}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>型号</SpecLabel>
                          <SpecValue>{car.model}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>配置</SpecLabel>
                          <SpecValue>{car.trim}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>动力类型</SpecLabel>
                          <SpecValue>{car.bodyStyle}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>排量</SpecLabel>
                          <SpecValue>{car.enginecapacity}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>里程</SpecLabel>
                          <SpecValue>{car.mileage}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>外观颜色</SpecLabel>
                          <SpecValue>{car.exteriorColor}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>内饰颜色</SpecLabel>
                          <SpecValue>{car.interiorColor}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>座位数</SpecLabel>
                          <SpecValue>{car.seats}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>马力</SpecLabel>
                          <SpecValue>{car.hoursePower}</SpecValue>
                        </SpecItem>
                      </SpecsGrid>

                      <FeaturesSection>
                        <SectionTitle>车辆配置</SectionTitle>
                        <FeaturesList>
                          {car.features.map((feature, index) => (
                            <FeatureItem key={index}>
                              <CheckOutlined style={{ color: '#4caf50' }} />
                              <FeatureText>{feature}</FeatureText>
                            </FeatureItem>
                          ))}
                        </FeaturesList>
                      </FeaturesSection>

                      <InspectionSection>
                        <SectionTitle>检测报告</SectionTitle>
                        <InspectionCard>
                          <InspectionHeader>
                            <InspectionIcon>
                              <CheckCircleOutlined style={{ fontSize: '24px', color: '#0277bd' }} />
                            </InspectionIcon>
                            <InspectionInfo>
                              <InspectionTitle>车辆检测</InspectionTitle>
                              <InspectionSubtitle>非事故车 · 链车认证 · 非火烧 · 非水泡</InspectionSubtitle>
                            </InspectionInfo>
                            <InspectionStatus>
                              <CheckCircleOutlined style={{ color: '#4caf50', fontSize: '20px' }} />
                              <span style={{ color: '#4caf50', fontWeight: '500' }}>已通过</span>
                            </InspectionStatus>
                          </InspectionHeader>
                          <InspectionContent>
                            <div style={{ marginBottom: '20px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ background: '#f0f2f5', padding: '8px 16px', borderRadius: '4px', flex: 1, marginRight: '8px', textAlign: 'center' }}>
                                  <div style={{ fontWeight: 'bold' }}>事故排查 (38项)</div>
                                </div>
                                <div style={{ background: '#e6f7ff', padding: '8px 16px', borderRadius: '4px', flex: 1, marginRight: '8px', textAlign: 'center' }}>
                                  <div style={{ fontWeight: 'bold' }}>外观 (9项)</div>
                                </div>
                                <div style={{ background: '#f6ffed', padding: '8px 16px', borderRadius: '4px', flex: 1, textAlign: 'center' }}>
                                  <div style={{ fontWeight: 'bold' }}>内饰 (9项)</div>
                                </div>
                              </div>
                            </div>
                            
                            <div style={{ marginBottom: '16px' }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                                <span>事故检测排查</span>
                                <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '8px' }} />
                                <span style={{ color: '#52c41a', marginLeft: '4px' }}>21项通过</span>
                                <span style={{ color: '#fa8c16', marginLeft: '8px' }}>1项瑕疵</span>
                              </div>
                              <InspectionGrid>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左前减震器座</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右前减震器座</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>防火墙</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>水箱框架</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左车顶边梁</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右车顶边梁</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左前纵梁</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右前纵梁</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左后纵梁</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右后纵梁</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左A柱封边</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右A柱封边</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左B柱封边</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右B柱封边</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左C柱封边</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右C柱封边</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>左前翼子板内衬</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>右前翼子板内衬</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <span style={{ color: '#fa8c16' }}>⚠</span>
                                  <span style={{ marginLeft: '8px' }}>后围板</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>后备箱底板</span>
                                </InspectionItem>
                              </InspectionGrid>
                            </div>
                            
                            <div style={{ marginBottom: '16px' }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                                <span>泡水检测</span>
                                <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '8px' }} />
                                <span style={{ color: '#52c41a', marginLeft: '4px' }}>9项通过</span>
                              </div>
                              <InspectionGrid>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>仪表台</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>座椅</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>主驾座椅滑轨</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>副驾座椅滑轨</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>车内线束</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>保险丝</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>安全带</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>点烟器座</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>顶棚</span>
                                </InspectionItem>
                              </InspectionGrid>
                            </div>
                            
                            <div>
                              <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                                <span>火烧检测</span>
                                <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '8px' }} />
                                <span style={{ color: '#52c41a', marginLeft: '4px' }}>7项通过</span>
                              </div>
                              <InspectionGrid>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>防火墙隔热棉</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>仪表台及附件</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>发动机舱塑料件</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>发动机舱橡胶</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>驾驶舱内线束及附接件</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>减震器周边胶体</span>
                                </InspectionItem>
                                <InspectionItem>
                                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                  <span>蓄电池及附件</span>
                                </InspectionItem>
                              </InspectionGrid>
                            </div>
                            <InspectionFooter>
                              <InspectionDate>检测日期：2024年1月15日</InspectionDate>
                              <InspectionButton>
                                <Button type="link" icon={<EyeOutlined />}>查看详细报告</Button>
                              </InspectionButton>
                            </InspectionFooter>
                          </InspectionContent>
                        </InspectionCard>
                      </InspectionSection>
                    </>
                  )
                },

              ]}
            />
          </DetailSection>
        </LeftColumn>

        <RightColumn>
          <PriceCard>
            <PriceHeader>
              <Price>¥{car.price.toLocaleString()}</Price>
            </PriceHeader>
            <PriceSubtext>含税价 · 不含上牌费用</PriceSubtext>

            <ButtonGroup>
              <PrimaryButton type="primary" icon={<PhoneOutlined />} block>
                联系销售
              </PrimaryButton>
              <SecondaryButton icon={<MessageOutlined />} block>
                在线咨询
              </SecondaryButton>
            </ButtonGroup>
          </PriceCard>

          <ContactCard>
            <DealerInfo>
              <DealerLogo src={car.dealerInfo.logo} alt={car.dealerInfo.name} />
              <DealerDetails>
                <DealerName>{car.dealerInfo.name}</DealerName>
                <DealerLocation>
                  <EnvironmentOutlined /> {car.dealerInfo.location} ({car.dealerInfo.distance})
                </DealerLocation>
                <DealerRating>
                  <Rate disabled defaultValue={car.dealerInfo.rating} />
                  <span>({car.dealerInfo.reviews}条评价)</span>
                </DealerRating>
              </DealerDetails>
            </DealerInfo>
            
            <ButtonGroup>
              <SecondaryButton block icon={<CarOutlined />}>
                查看商家全部车辆
              </SecondaryButton>
            </ButtonGroup>
          </ContactCard>
        </RightColumn>
      </MainContent>

      <DisclaimerSection>
        <p>免责声明：本页面所示车辆信息仅供参考，实际车况以商家为准。价格、配置和可用性可能随时变更，请联系经销商确认最新信息。</p>
      </DisclaimerSection>
    </Container>
  );
};

export default CarDetailPage;