import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Tooltip, message, Tabs, Tag, Rate } from 'antd';
import { HeartOutlined, HeartFilled, ShareAltOutlined, CheckOutlined, 
  PhoneOutlined, MessageOutlined, EnvironmentOutlined, CarOutlined, 
  InfoCircleOutlined, HistoryOutlined, FileTextOutlined } from '@ant-design/icons';

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

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #5d636f;
  font-size: 16px;
  
  &:hover {
    color: #0277bd;
  }
`;

// 标签区域
const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const StyledTag = styled(Tag)`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
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

const Thumbnail = styled.div<{ active?: boolean }>`
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

const PriceBadge = styled.div`
  font-size: 14px;
  color: #0277bd;
  font-weight: 500;
`;

const PriceSubtext = styled.div`
  font-size: 14px;
  color: #5d636f;
  margin-bottom: 16px;
`;

const EstimatedPayment = styled.div`
  background: #f5f9fc;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const PaymentTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #242d3d;
  margin-bottom: 8px;
`;

const PaymentAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #242d3d;
  margin-bottom: 4px;
`;

const PaymentSubtext = styled.div`
  font-size: 14px;
  color: #5d636f;
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

// 车辆历史部分
const HistorySection = styled.div`
  margin-bottom: 32px;
`;

const HistoryItem = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const HistoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0277bd;
`;

const HistoryContent = styled.div``;

const HistoryTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #242d3d;
  margin-bottom: 4px;
`;

const HistoryDescription = styled.div`
  font-size: 14px;
  color: #5d636f;
`;

// 相似车辆部分
const SimilarSection = styled.div`
  margin-bottom: 32px;
`;

const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

const SimilarCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SimilarImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const SimilarContent = styled.div`
  padding: 12px;
`;

const SimilarTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #242d3d;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SimilarPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #242d3d;
  margin-bottom: 4px;
`;

const SimilarDetails = styled.div`
  font-size: 14px;
  color: #5d636f;
`;

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
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    message.success(isFavorite ? '已从收藏夹移除' : '已添加到收藏夹');
  };

  const handleShare = () => {
    message.info('分享功能开发中');
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
              <ActionButtons>
                <Tooltip title={isFavorite ? '取消收藏' : '添加收藏'}>
                  <IconButton onClick={handleFavoriteClick}>
                    {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    {isFavorite ? ' 已收藏' : ' 收藏'}
                  </IconButton>
                </Tooltip>
                <Tooltip title="分享">
                  <IconButton onClick={handleShare}>
                    <ShareAltOutlined /> 分享
                  </IconButton>
                </Tooltip>
              </ActionButtons>
            </SubtitleRow>
            <TagsRow>
              {car.special && (
                <StyledTag color="blue">特惠价格</StyledTag>
              )}
              <StyledTag color="green">在线购买</StyledTag>
              <StyledTag color="orange">可送货上门</StyledTag>
              <StyledTag color="purple">7天退换保证</StyledTag>
            </TagsRow>
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
                          <SpecLabel>车身类型</SpecLabel>
                          <SpecValue>{car.bodyStyle}</SpecValue>
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
                          <SpecLabel>燃油经济性</SpecLabel>
                          <SpecValue>{car.fuelEconomy}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>燃料类型</SpecLabel>
                          <SpecValue>{car.fuelType}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>变速箱</SpecLabel>
                          <SpecValue>{car.transmission}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>发动机</SpecLabel>
                          <SpecValue>{car.engine}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>驱动方式</SpecLabel>
                          <SpecValue>{car.drivetrain}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>VIN码</SpecLabel>
                          <SpecValue>{car.vin}</SpecValue>
                        </SpecItem>
                        <SpecItem>
                          <SpecLabel>库存编号</SpecLabel>
                          <SpecValue>{car.stockNumber}</SpecValue>
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
                    </>
                  )
                },
                {
                  key: 'history',
                  label: '车辆历史',
                  children: (
                    <HistorySection>
                      {car.history.map((item, index) => (
                        <HistoryItem key={index}>
                          <HistoryIcon>
                            {item.icon === 'history' && <HistoryOutlined />}
                            {item.icon === 'info' && <InfoCircleOutlined />}
                            {item.icon === 'file' && <FileTextOutlined />}
                          </HistoryIcon>
                          <HistoryContent>
                            <HistoryTitle>{item.title}</HistoryTitle>
                            <HistoryDescription>{item.description}</HistoryDescription>
                          </HistoryContent>
                        </HistoryItem>
                      ))}
                    </HistorySection>
                  )
                },
                {
                  key: 'similar',
                  label: '相似车辆',
                  children: (
                    <SimilarSection>
                      <SimilarGrid>
                        {car.similarCars.map((similarCar, index) => (
                          <SimilarCard key={index}>
                            <SimilarImage src={similarCar.image} alt={similarCar.title} />
                            <SimilarContent>
                              <SimilarTitle>{similarCar.title}</SimilarTitle>
                              <SimilarPrice>¥{similarCar.price.toLocaleString()}</SimilarPrice>
                              <SimilarDetails>{similarCar.mileage}</SimilarDetails>
                            </SimilarContent>
                          </SimilarCard>
                        ))}
                      </SimilarGrid>
                    </SimilarSection>
                  )
                }
              ]}
            />
          </DetailSection>
        </LeftColumn>

        <RightColumn>
          <PriceCard>
            <PriceHeader>
              <Price>¥{car.price.toLocaleString()}</Price>
              <PriceBadge>优惠价格</PriceBadge>
            </PriceHeader>
            <PriceSubtext>含税价 · 不含上牌费用</PriceSubtext>
            
            <EstimatedPayment>
              <PaymentTitle>预计月供</PaymentTitle>
              <PaymentAmount>¥{car.monthlyPayment.toLocaleString()}/月</PaymentAmount>
              <PaymentSubtext>基于首付30%，贷款期限60个月，年利率4.5%</PaymentSubtext>
            </EstimatedPayment>

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