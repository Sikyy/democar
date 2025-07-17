import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


// 更新为2025.07.17

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 320px;
  position: sticky;
  top: 24px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #212121;
`;

const ResetButton = styled.button`
  color: #FF5722;
  font-size: 0.85rem;
  font-weight: 500;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const CollapsibleHeader = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.isOpen ? '#F0F0F0' : 'transparent'};
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const CollapsibleContent = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  transition: max-height 0.3s ease-in-out;
  opacity: ${props => props.isOpen ? '1' : '0'};
  padding-top: ${props => props.isOpen ? '12px' : '0'};
`;



const RangeContainer = styled.div`
  margin-top: 12px;
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const RangeInput = styled.div`
  flex: 1;
  position: relative;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #757575;
  font-size: 0.9rem;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 32px 10px 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #FF5722;
    box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
  }
`;

const RangeSliderContainer = styled.div`
  padding: 10px 0;
  cursor: pointer;
  position: relative;
`;

const RangeSlider = styled.div`
  position: relative;
  height: 4px;
  background-color: #EEEEEE;
  border-radius: 2px;
  margin: 0 8px;
`;

const RangeProgress = styled.div`
  position: absolute;
  height: 100%;
  background-color: #FF5722;
  border-radius: 2px;
`;

const RangeHandle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  border: 2px solid #FF5722;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  z-index: 2;
  
  &:hover, &:active {
    box-shadow: 0 0 0 5px rgba(255, 87, 34, 0.1);
  }
  
  &.dragging {
    box-shadow: 0 0 0 5px rgba(255, 87, 34, 0.2);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.8rem;
  color: #757575;
`;

const RangeHistogram = styled.div`
  display: flex;
  align-items: flex-end;
  height: 40px;
  gap: 2px;
  margin-top: 16px;
  padding: 0 8px;
`;

const HistogramBar = styled.div<{ height: number, active: boolean }>`
  flex: 1;
  height: ${props => props.height}%;
  min-height: 1px;
  background-color: ${props => props.active ? '#FFD0C1' : '#EEEEEE'};
  border-radius: 1px;
  transition: background-color 0.2s ease;
`;

const FilterCheckboxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterCheckbox = styled.label<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${props => props.isActive ? '#FFF0EB' : '#F5F5F5'};
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.isActive ? '#FFCCBC' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.isActive ? '#FFE0D6' : '#EEEEEE'};
  }
  
  input {
    display: none;
  }
`;

const CheckboxLabel = styled.span`
  font-size: 0.9rem;
`;

const CheckboxTick = styled.div<{ isActive: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid ${props => props.isActive ? '#FF5722' : '#BDBDBD'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: ${props => props.isActive ? '#FF5722' : 'transparent'};
  
  svg {
    opacity: ${props => props.isActive ? 1 : 0};
    transform: scale(${props => props.isActive ? 1 : 0.5});
    transition: all 0.2s ease;
  }
`;

const ApplyFiltersButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #FF5722;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #E64A19;
  }
`;


// Mock data for histogram
const histogramData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));

// Brand data with counts
// const allBrands = [
//   { name: 'Mercedes-Benz', count: 125 },
//   { name: 'BMW', count: 98 },
//   { name: 'Lexus', count: 47 },
//   { name: 'Audi', count: 76 },
//   { name: 'Toyota', count: 112 },
//   { name: 'Honda', count: 65 },
//   { name: 'Ford', count: 82 },
//   { name: 'Volkswagen', count: 94 },
//   { name: 'Porsche', count: 28 },
//   { name: 'Volvo', count: 41 },
// ];

interface EnhancedFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  brands: string[];
  priceRange: { min: string; max: string };
  transmissions: string[];
  mileage?: { min: string; max: string };
  year?: { min: string; max: string };
  fuelTypes?: string[];
  driveTypes?: string[];
}

const EnhancedFilters: React.FC<EnhancedFiltersProps> = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState<string>('8 000');
  const [maxPrice, setMaxPrice] = useState<string>('58 000');
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [minMileage, setMinMileage] = useState<string>('0');
  const [maxMileage, setMaxMileage] = useState<string>('30 000');
  const [minYear, setMinYear] = useState<string>('2013');
  const [maxYear, setMaxYear] = useState<string>('2024');
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [driveTypes, setDriveTypes] = useState<string[]>([]);
  const [sections, setSections] = useState<{ [key: string]: boolean }>({
    price: true,
    mileage: false,
    year: false,
    fuel: false,
    transmission: false,
    drive: false
  });
  
  // 添加滑块拖动状态
  const [isDraggingMinPrice, setIsDraggingMinPrice] = useState<boolean>(false);
  const [isDraggingMaxPrice, setIsDraggingMaxPrice] = useState<boolean>(false);
  const [isDraggingMinMileage, setIsDraggingMinMileage] = useState<boolean>(false);
  const [isDraggingMaxMileage, setIsDraggingMaxMileage] = useState<boolean>(false);
  const [isDraggingMinYear, setIsDraggingMinYear] = useState<boolean>(false);
  const [isDraggingMaxYear, setIsDraggingMaxYear] = useState<boolean>(false);
  const [pricePercentages, setPricePercentages] = useState({ min: 20, max: 70 });
  const [mileagePercentages, setMileagePercentages] = useState({ min: 0, max: 30 });
  const [yearPercentages, setYearPercentages] = useState({ min: 30, max: 100 });
  
  // 引用滑块容器
  const priceSliderRef = useRef<HTMLDivElement>(null);
  const mileageSliderRef = useRef<HTMLDivElement>(null);
  const yearSliderRef = useRef<HTMLDivElement>(null);

  // 价格范围常量
  const MIN_PRICE = 0;
  const MAX_PRICE = 200000;
  const MIN_MILEAGE = 0;
  const MAX_MILEAGE = 100000;
  const MIN_YEAR = 2000;
  const MAX_YEAR = 2024;

  // 处理价格滑块拖动
  const handlePriceSliderMouseDown = (isMin: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    if (isMin) {
      setIsDraggingMinPrice(true);
    } else {
      setIsDraggingMaxPrice(true);
    }
  };
  
  // 处理里程滑块拖动
  const handleMileageSliderMouseDown = (isMin: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    if (isMin) {
      setIsDraggingMinMileage(true);
    } else {
      setIsDraggingMaxMileage(true);
    }
  };

  // 处理年份滑块拖动
  const handleYearSliderMouseDown = (isMin: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    if (isMin) {
      setIsDraggingMinYear(true);
    } else {
      setIsDraggingMaxYear(true);
    }
  };

  // 处理鼠标移动和释放
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 处理价格滑块
      if ((isDraggingMinPrice || isDraggingMaxPrice) && priceSliderRef.current) {
        const rect = priceSliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const offsetX = e.clientX - rect.left;
        const percentage = Math.min(Math.max(offsetX / width * 100, 0), 100);
        
        if (isDraggingMinPrice) {
          if (percentage < pricePercentages.max - 5) {
            setPricePercentages(prev => ({ ...prev, min: percentage }));
            const newMinPrice = Math.round((MIN_PRICE + (percentage / 100) * (MAX_PRICE - MIN_PRICE)) / 1000) * 1000;
            setMinPrice(newMinPrice.toString());
          }
        } else if (isDraggingMaxPrice) {
          if (percentage > pricePercentages.min + 5) {
            setPricePercentages(prev => ({ ...prev, max: percentage }));
            const newMaxPrice = Math.round((MIN_PRICE + (percentage / 100) * (MAX_PRICE - MIN_PRICE)) / 1000) * 1000;
            setMaxPrice(newMaxPrice.toString());
          }
        }
      }
      
      // 处理里程滑块
      if ((isDraggingMinMileage || isDraggingMaxMileage) && mileageSliderRef.current) {
        const rect = mileageSliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const offsetX = e.clientX - rect.left;
        const percentage = Math.min(Math.max(offsetX / width * 100, 0), 100);
        
        if (isDraggingMinMileage) {
          if (percentage < mileagePercentages.max - 5) {
            setMileagePercentages(prev => ({ ...prev, min: percentage }));
            const newMinMileage = Math.round((MIN_MILEAGE + (percentage / 100) * (MAX_MILEAGE - MIN_MILEAGE)) / 1000) * 1000;
            setMinMileage(newMinMileage.toString());
          }
        } else if (isDraggingMaxMileage) {
          if (percentage > mileagePercentages.min + 5) {
            setMileagePercentages(prev => ({ ...prev, max: percentage }));
            const newMaxMileage = Math.round((MIN_MILEAGE + (percentage / 100) * (MAX_MILEAGE - MIN_MILEAGE)) / 1000) * 1000;
            setMaxMileage(newMaxMileage.toString());
          }
        }
      }

      // 处理年份滑块
      if ((isDraggingMinYear || isDraggingMaxYear) && yearSliderRef.current) {
        const rect = yearSliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const offsetX = e.clientX - rect.left;
        const percentage = Math.min(Math.max(offsetX / width * 100, 0), 100);
        
        if (isDraggingMinYear) {
          if (percentage < yearPercentages.max - 5) {
            setYearPercentages(prev => ({ ...prev, min: percentage }));
            const newMinYear = Math.round(MIN_YEAR + (percentage / 100) * (MAX_YEAR - MIN_YEAR));
            setMinYear(newMinYear.toString());
          }
        } else if (isDraggingMaxYear) {
          if (percentage > yearPercentages.min + 5) {
            setYearPercentages(prev => ({ ...prev, max: percentage }));
            const newMaxYear = Math.round(MIN_YEAR + (percentage / 100) * (MAX_YEAR - MIN_YEAR));
            setMaxYear(newMaxYear.toString());
          }
        }
      }
    };

    const handleMouseUp = () => {
      if (isDraggingMinPrice || isDraggingMaxPrice || isDraggingMinMileage || isDraggingMaxMileage || isDraggingMinYear || isDraggingMaxYear) {
        setIsDraggingMinPrice(false);
        setIsDraggingMaxPrice(false);
        setIsDraggingMinMileage(false);
        setIsDraggingMaxMileage(false);
        setIsDraggingMinYear(false);
        setIsDraggingMaxYear(false);
        
        // 应用过滤器
        if (onFilterChange) {
          const filterState: FilterState = {
            brands: [],
            priceRange: { min: minPrice, max: maxPrice },
            transmissions,
            mileage: { min: minMileage, max: maxMileage },
            year: { min: minYear, max: maxYear },
            fuelTypes,
            driveTypes
          };
          onFilterChange(filterState);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDraggingMinPrice, isDraggingMaxPrice, pricePercentages,
    isDraggingMinMileage, isDraggingMaxMileage, mileagePercentages,
    isDraggingMinYear, isDraggingMaxYear, yearPercentages,
    onFilterChange, minPrice, maxPrice, transmissions, 
    minMileage, maxMileage, minYear, maxYear, fuelTypes, driveTypes,
    MIN_PRICE, MAX_PRICE, MIN_MILEAGE, MAX_MILEAGE, MIN_YEAR, MAX_YEAR
  ]);

  // 同步输入框和滑块值
  useEffect(() => {
    const minPriceValue = parseFloat(minPrice.replace(/\s/g, ''));
    const maxPriceValue = parseFloat(maxPrice.replace(/\s/g, ''));
    
    if (!isNaN(minPriceValue)) {
      const percentage = ((minPriceValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
      setPricePercentages(prev => ({ ...prev, min: percentage }));
    }
    
    if (!isNaN(maxPriceValue)) {
      const percentage = ((maxPriceValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
      setPricePercentages(prev => ({ ...prev, max: percentage }));
    }
  }, [minPrice, maxPrice, MIN_PRICE, MAX_PRICE]);
  
  useEffect(() => {
    const minMileageValue = parseFloat(minMileage.replace(/\s/g, ''));
    const maxMileageValue = parseFloat(maxMileage.replace(/\s/g, ''));
    
    if (!isNaN(minMileageValue)) {
      const percentage = ((minMileageValue - MIN_MILEAGE) / (MAX_MILEAGE - MIN_MILEAGE)) * 100;
      setMileagePercentages(prev => ({ ...prev, min: percentage }));
    }
    
    if (!isNaN(maxMileageValue)) {
      const percentage = ((maxMileageValue - MIN_MILEAGE) / (MAX_MILEAGE - MIN_MILEAGE)) * 100;
      setMileagePercentages(prev => ({ ...prev, max: percentage }));
    }
  }, [minMileage, maxMileage, MIN_MILEAGE, MAX_MILEAGE]);

  useEffect(() => {
    const minYearValue = parseFloat(minYear);
    const maxYearValue = parseFloat(maxYear);
    
    if (!isNaN(minYearValue)) {
      const percentage = ((minYearValue - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
      setYearPercentages(prev => ({ ...prev, min: percentage }));
    }
    
    if (!isNaN(maxYearValue)) {
      const percentage = ((maxYearValue - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
      setYearPercentages(prev => ({ ...prev, max: percentage }));
    }
  }, [minYear, maxYear, MIN_YEAR, MAX_YEAR]);

  // Update filters whenever any filter changes
  useEffect(() => {
    if (onFilterChange) {
      const filterState: FilterState = {
        brands: [],
        priceRange: { min: minPrice, max: maxPrice },
        transmissions,
        mileage: { min: minMileage, max: maxMileage },
        year: { min: minYear, max: maxYear },
        fuelTypes,
        driveTypes
      };
      onFilterChange(filterState);
    }
  }, [minPrice, maxPrice, transmissions, minMileage, maxMileage, minYear, maxYear, fuelTypes, driveTypes, onFilterChange]);
  
  const handleToggleTransmission = (transmission: string) => {
    if (transmissions.includes(transmission)) {
      setTransmissions(transmissions.filter(t => t !== transmission));
    } else {
      setTransmissions([...transmissions, transmission]);
    }
  };

  const handleToggleFuelType = (fuel: string) => {
    if (fuelTypes.includes(fuel)) {
      setFuelTypes(fuelTypes.filter(f => f !== fuel));
    } else {
      setFuelTypes([...fuelTypes, fuel]);
    }
  };

  const handleToggleDriveType = (drive: string) => {
    if (driveTypes.includes(drive)) {
      setDriveTypes(driveTypes.filter(d => d !== drive));
    } else {
      setDriveTypes([...driveTypes, drive]);
    }
  };
  
  const handleToggleSection = (section: string) => {
    setSections({
      ...sections,
      [section]: !sections[section]
    });
  };

  const resetPriceFilter = () => {
    setMinPrice('0');
    setMaxPrice('200 000');
    setPricePercentages({ min: 0, max: 100 });
  };

  const resetMileageFilter = () => {
    setMinMileage('0');
    setMaxMileage('100 000');
    setMileagePercentages({ min: 0, max: 100 });
  };

  const resetYearFilter = () => {
    setMinYear('2000');
    setMaxYear('2024');
  };

  const applyFilters = () => {
    if (onFilterChange) {
      const filterState: FilterState = {
        brands: [],
        priceRange: { min: minPrice, max: maxPrice },
        transmissions,
        mileage: { min: minMileage, max: maxMileage },
        year: { min: minYear, max: maxYear },
        fuelTypes,
        driveTypes
      };
      onFilterChange(filterState);
    }
  };

  return (
    <FiltersContainer>
      <FilterSection>
        <CollapsibleHeader 
          isOpen={sections.price} 
          onClick={() => handleToggleSection('price')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <FilterTitle>Price</FilterTitle>
            <ResetButton onClick={(e) => { e.stopPropagation(); resetPriceFilter(); }}>Reset</ResetButton>
          </div>
        </CollapsibleHeader>
        
        <CollapsibleContent isOpen={sections.price}>
          <RangeContainer>
            <RangeInputs>
              <RangeInput>
                <Input 
                  type="text" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(e.target.value)} 
                  onBlur={applyFilters}
                />
                <CurrencySymbol>€</CurrencySymbol>
              </RangeInput>
              <RangeInput>
                <Input 
                  type="text" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(e.target.value)} 
                  onBlur={applyFilters}
                />
                <CurrencySymbol>€</CurrencySymbol>
              </RangeInput>
            </RangeInputs>
            
            <RangeSliderContainer ref={priceSliderRef}>
              <RangeSlider>
                <RangeProgress style={{ left: `${pricePercentages.min}%`, right: `${100-pricePercentages.max}%` }} />
                <RangeHandle 
                  className={isDraggingMinPrice ? 'dragging' : ''}
                  style={{ left: `${pricePercentages.min}%` }} 
                  onMouseDown={(e) => handlePriceSliderMouseDown(true, e)}
                />
                <RangeHandle 
                  className={isDraggingMaxPrice ? 'dragging' : ''} 
                  style={{ left: `${pricePercentages.max}%` }} 
                  onMouseDown={(e) => handlePriceSliderMouseDown(false, e)}
                />
              </RangeSlider>
              
              <RangeLabels>
                <span>0 €</span>
                <span>200 000 €</span>
              </RangeLabels>
            </RangeSliderContainer>
            
            <RangeHistogram>
              {histogramData.map((height, index) => (
                <HistogramBar 
                  key={index} 
                  height={height} 
                  active={index >= (pricePercentages.min / 100 * 30) && index <= (pricePercentages.max / 100 * 30)}
                />
              ))}
            </RangeHistogram>
          </RangeContainer>
        </CollapsibleContent>
      </FilterSection>
      
      <FilterSection>
        <CollapsibleHeader 
          isOpen={sections.mileage} 
          onClick={() => handleToggleSection('mileage')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <FilterTitle>Mileage</FilterTitle>
            <ResetButton onClick={(e) => { e.stopPropagation(); resetMileageFilter(); }}>Reset</ResetButton>
          </div>
        </CollapsibleHeader>
        
        <CollapsibleContent isOpen={sections.mileage}>
          <RangeContainer>
            <RangeInputs>
              <RangeInput>
                <Input 
                  type="text" 
                  value={minMileage} 
                  onChange={(e) => setMinMileage(e.target.value)} 
                  onBlur={applyFilters}
                />
                <CurrencySymbol>km</CurrencySymbol>
              </RangeInput>
              <RangeInput>
                <Input 
                  type="text" 
                  value={maxMileage} 
                  onChange={(e) => setMaxMileage(e.target.value)} 
                  onBlur={applyFilters}
                />
                <CurrencySymbol>km</CurrencySymbol>
              </RangeInput>
            </RangeInputs>
            
            <RangeSliderContainer ref={mileageSliderRef}>
              <RangeSlider>
                <RangeProgress style={{ left: `${mileagePercentages.min}%`, right: `${100-mileagePercentages.max}%` }} />
                <RangeHandle 
                  className={isDraggingMinMileage ? 'dragging' : ''}
                  style={{ left: `${mileagePercentages.min}%` }} 
                  onMouseDown={(e) => handleMileageSliderMouseDown(true, e)}
                />
                <RangeHandle 
                  className={isDraggingMaxMileage ? 'dragging' : ''} 
                  style={{ left: `${mileagePercentages.max}%` }} 
                  onMouseDown={(e) => handleMileageSliderMouseDown(false, e)}
                />
              </RangeSlider>
              
              <RangeLabels>
                <span>0 km</span>
                <span>100 000 km</span>
              </RangeLabels>
            </RangeSliderContainer>
            
            <RangeHistogram>
              {histogramData.map((height, index) => (
                <HistogramBar 
                  key={index} 
                  height={height} 
                  active={index >= (mileagePercentages.min / 100 * 30) && index <= (mileagePercentages.max / 100 * 30)}
                />
              ))}
            </RangeHistogram>
          </RangeContainer>
        </CollapsibleContent>
      </FilterSection>

      <FilterSection>
        <CollapsibleHeader 
          isOpen={sections.year} 
          onClick={() => handleToggleSection('year')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <FilterTitle>Year</FilterTitle>
            <ResetButton onClick={(e) => { e.stopPropagation(); resetYearFilter(); }}>Reset</ResetButton>
          </div>
        </CollapsibleHeader>
        
        <CollapsibleContent isOpen={sections.year}>
          <RangeContainer>
            <RangeInputs>
              <RangeInput>
                <Input 
                  type="text" 
                  value={minYear} 
                  onChange={(e) => setMinYear(e.target.value)} 
                  onBlur={applyFilters}
                />
              </RangeInput>
              <RangeInput>
                <Input 
                  type="text" 
                  value={maxYear} 
                  onChange={(e) => setMaxYear(e.target.value)} 
                  onBlur={applyFilters}
                />
              </RangeInput>
            </RangeInputs>
            
            <RangeSliderContainer ref={yearSliderRef}>
              <RangeSlider>
                <RangeProgress style={{ left: `${yearPercentages.min}%`, right: `${100-yearPercentages.max}%` }} />
                <RangeHandle 
                  className={isDraggingMinYear ? 'dragging' : ''}
                  style={{ left: `${yearPercentages.min}%` }} 
                  onMouseDown={(e) => handleYearSliderMouseDown(true, e)}
                />
                <RangeHandle 
                  className={isDraggingMaxYear ? 'dragging' : ''} 
                  style={{ left: `${yearPercentages.max}%` }} 
                  onMouseDown={(e) => handleYearSliderMouseDown(false, e)}
                />
              </RangeSlider>
              
              <RangeLabels>
                <span>2000</span>
                <span>2024</span>
              </RangeLabels>
            </RangeSliderContainer>
          </RangeContainer>
        </CollapsibleContent>
      </FilterSection>

      <FilterSection>
        <CollapsibleHeader 
          isOpen={sections.transmission} 
          onClick={() => handleToggleSection('transmission')}
        >
          <FilterTitle>Transmission</FilterTitle>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CollapsibleHeader>
        
        <CollapsibleContent isOpen={sections.transmission}>
          <FilterCheckboxes>
            <FilterCheckbox isActive={transmissions.includes('Automatic')}>
              <CheckboxTick isActive={transmissions.includes('Automatic')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="transmission-automatic" 
                checked={transmissions.includes('Automatic')} 
                onChange={() => handleToggleTransmission('Automatic')}
              />
              <CheckboxLabel>Automatic</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={transmissions.includes('Mechanical')}>
              <CheckboxTick isActive={transmissions.includes('Mechanical')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="transmission-mechanical" 
                checked={transmissions.includes('Mechanical')} 
                onChange={() => handleToggleTransmission('Mechanical')}
              />
              <CheckboxLabel>Mechanical</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={transmissions.includes('Variator')}>
              <CheckboxTick isActive={transmissions.includes('Variator')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="transmission-variator" 
                checked={transmissions.includes('Variator')} 
                onChange={() => handleToggleTransmission('Variator')}
              />
              <CheckboxLabel>Variator</CheckboxLabel>
            </FilterCheckbox>
          </FilterCheckboxes>
        </CollapsibleContent>
      </FilterSection>

      <FilterSection>
        <CollapsibleHeader 
          isOpen={sections.fuel} 
          onClick={() => handleToggleSection('fuel')}
        >
          <FilterTitle>Fuel Type</FilterTitle>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CollapsibleHeader>
        
        <CollapsibleContent isOpen={sections.fuel}>
          <FilterCheckboxes>
            <FilterCheckbox isActive={fuelTypes.includes('Petrol')}>
              <CheckboxTick isActive={fuelTypes.includes('Petrol')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="fuel-petrol" 
                checked={fuelTypes.includes('Petrol')} 
                onChange={() => handleToggleFuelType('Petrol')}
              />
              <CheckboxLabel>Petrol</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={fuelTypes.includes('Diesel')}>
              <CheckboxTick isActive={fuelTypes.includes('Diesel')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="fuel-diesel" 
                checked={fuelTypes.includes('Diesel')} 
                onChange={() => handleToggleFuelType('Diesel')}
              />
              <CheckboxLabel>Diesel</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={fuelTypes.includes('Hybrid')}>
              <CheckboxTick isActive={fuelTypes.includes('Hybrid')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="fuel-hybrid" 
                checked={fuelTypes.includes('Hybrid')} 
                onChange={() => handleToggleFuelType('Hybrid')}
              />
              <CheckboxLabel>Hybrid</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={fuelTypes.includes('Electric')}>
              <CheckboxTick isActive={fuelTypes.includes('Electric')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="fuel-electric" 
                checked={fuelTypes.includes('Electric')} 
                onChange={() => handleToggleFuelType('Electric')}
              />
              <CheckboxLabel>Electric</CheckboxLabel>
            </FilterCheckbox>
          </FilterCheckboxes>
        </CollapsibleContent>
      </FilterSection>

      <FilterSection>
        <CollapsibleHeader 
          isOpen={sections.drive} 
          onClick={() => handleToggleSection('drive')}
        >
          <FilterTitle>Drive Type</FilterTitle>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CollapsibleHeader>
        
        <CollapsibleContent isOpen={sections.drive}>
          <FilterCheckboxes>
            <FilterCheckbox isActive={driveTypes.includes('4WD')}>
              <CheckboxTick isActive={driveTypes.includes('4WD')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="drive-4wd" 
                checked={driveTypes.includes('4WD')} 
                onChange={() => handleToggleDriveType('4WD')}
              />
              <CheckboxLabel>4WD</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={driveTypes.includes('AWD')}>
              <CheckboxTick isActive={driveTypes.includes('AWD')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="drive-awd" 
                checked={driveTypes.includes('AWD')} 
                onChange={() => handleToggleDriveType('AWD')}
              />
              <CheckboxLabel>AWD</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={driveTypes.includes('FWD')}>
              <CheckboxTick isActive={driveTypes.includes('FWD')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="drive-fwd" 
                checked={driveTypes.includes('FWD')} 
                onChange={() => handleToggleDriveType('FWD')}
              />
              <CheckboxLabel>FWD</CheckboxLabel>
            </FilterCheckbox>
            
            <FilterCheckbox isActive={driveTypes.includes('RWD')}>
              <CheckboxTick isActive={driveTypes.includes('RWD')}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CheckboxTick>
              <input 
                type="checkbox" 
                id="drive-rwd" 
                checked={driveTypes.includes('RWD')} 
                onChange={() => handleToggleDriveType('RWD')}
              />
              <CheckboxLabel>RWD</CheckboxLabel>
            </FilterCheckbox>
          </FilterCheckboxes>
        </CollapsibleContent>
      </FilterSection>
      
      <ApplyFiltersButton onClick={applyFilters}>
        Apply filters
      </ApplyFiltersButton>
    </FiltersContainer>
  );
};

export default EnhancedFilters; 