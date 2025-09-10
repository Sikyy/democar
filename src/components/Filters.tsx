import React, { useState } from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const ResetButton = styled.button`
  color: #FF5722;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BrandSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BrandItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  
  &:hover {
    border-color: #999;
  }
`;

const BrandLogo = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.span`
  flex: 1;
`;

const RemoveButton = styled.button`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #EEEEEE;
  
  &:hover {
    background-color: #DDDDDD;
  }
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const AddModelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #F5F5F5;
  border-radius: 8px;
  font-weight: 500;
  color: #333;
  gap: 8px;
  
  &:hover {
    background-color: #EEEEEE;
  }
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
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #999;
  }
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
  background-color: #000;
  border-radius: 2px;
`;

const RangeHandle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #000;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const RangeHistogram = styled.div`
  display: flex;
  align-items: flex-end;
  height: 40px;
  gap: 2px;
  margin-top: 24px;
`;

const HistogramBar = styled.div<{ height: number }>`
  flex: 1;
  height: ${props => props.height}%;
  min-height: 1px;
  background-color: #DDDDDD;
  border-radius: 1px;
`;

const FilterCheckboxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #F5F5F5;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #EEEEEE;
  }
  
  input {
    display: none;
  }
  
  input:checked + span {
    color: white;
  }
  
  input:checked + span + div {
    background-color: var(--primary-color);
  }
`;

const CheckboxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: -1;
  background-color: transparent;
  transition: background-color 0.2s ease;
`;

const CheckboxLabel = styled.span`
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;
`;

const YearSelector = styled.div`
  display: flex;
  gap: 12px;
`;

const YearInput = styled.div`
  flex: 1;
  position: relative;
  
  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-align: center;
  }
`;

const ResetAllButton = styled.button`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-weight: 500;
  width: 100%;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

// Mock data for histogram
const histogramData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));

const Filters: React.FC = () => {
  const [minPrice, setMinPrice] = useState<string>('8 000');
  const [maxPrice, setMaxPrice] = useState<string>('58 000');
  const [brands, setBrands] = useState<string[]>(['Mercedes-Benz', 'BMW', 'Lexus']);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [minYear, setMinYear] = useState<string>('2013');
  const [maxYear, setMaxYear] = useState<string>('2024');
  
  const handleRemoveBrand = (brand: string) => {
    setBrands(brands.filter(b => b !== brand));
  };
  
  const handleToggleTransmission = (transmission: string) => {
    if (transmissions.includes(transmission)) {
      setTransmissions(transmissions.filter(t => t !== transmission));
    } else {
      setTransmissions([...transmissions, transmission]);
    }
  };
  
  return (
    <FiltersContainer>
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Make and model</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <BrandSelector>
          {brands.map(brand => (
            <BrandItem key={brand}>
              <BrandLogo>
                {brand === 'Mercedes-Benz' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                    <path d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="black" strokeWidth="1.5" />
                  </svg>
                )}
                {brand === 'BMW' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                    <path d="M12 12H22M12 12V22M12 12H2M12 12V2" stroke="black" strokeWidth="1.5" />
                  </svg>
                )}
                {brand === 'Lexus' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" />
                    <path d="M8 8L16 16" stroke="black" strokeWidth="2" />
                    <path d="M16 8L8 16" stroke="black" strokeWidth="2" />
                  </svg>
                )}
              </BrandLogo>
              <BrandName>{brand}</BrandName>
              <RemoveButton onClick={() => handleRemoveBrand(brand)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3L3 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 3L9 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </RemoveButton>
            </BrandItem>
          ))}
          
          <AddModelButton>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13 8L3 8" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add model
          </AddModelButton>
        </BrandSelector>
      </FilterSection>
      
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Price</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <RangeContainer>
          <RangeInputs>
            <RangeInput>
              <Input 
                type="text" 
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)} 
              />
              <CurrencySymbol>¥</CurrencySymbol>
            </RangeInput>
            <RangeInput>
              <Input 
                type="text" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)} 
              />
              <CurrencySymbol>¥</CurrencySymbol>
            </RangeInput>
          </RangeInputs>
          
          <RangeSlider>
            <RangeProgress style={{ left: '20%', right: '30%' }} />
            <RangeHandle style={{ left: '20%' }} />
            <RangeHandle style={{ left: '70%' }} />
          </RangeSlider>
          
          <RangeHistogram>
            {histogramData.map((height, index) => (
              <HistogramBar key={index} height={height} />
            ))}
          </RangeHistogram>
        </RangeContainer>
      </FilterSection>
      
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Mileage, km</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <RangeContainer>
          <RangeInputs>
            <RangeInput>
              <Input type="text" placeholder="0" />
            </RangeInput>
            <RangeInput>
              <Input type="text" placeholder="30 000" />
            </RangeInput>
          </RangeInputs>
          
          <RangeSlider>
            <RangeProgress style={{ left: '0%', right: '70%' }} />
            <RangeHandle style={{ left: '0%' }} />
            <RangeHandle style={{ left: '30%' }} />
          </RangeSlider>
          
          <RangeHistogram>
            {histogramData.map((height, index) => (
              <HistogramBar key={index} height={height} />
            ))}
          </RangeHistogram>
        </RangeContainer>
      </FilterSection>
      
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Fuel</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <FilterCheckboxes>
          <FilterCheckbox>
            <input type="checkbox" id="fuel-electric" />
            <CheckboxLabel>Electric</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="fuel-petrol" />
            <CheckboxLabel>Petrol</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="fuel-diesel" />
            <CheckboxLabel>Diesel</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="fuel-hybrid" />
            <CheckboxLabel>Hybrid</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
        </FilterCheckboxes>
      </FilterSection>
      
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Transmission</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <FilterCheckboxes>
          <FilterCheckbox>
            <input 
              type="checkbox" 
              id="transmission-automatic" 
              checked={transmissions.includes('Automatic')} 
              onChange={() => handleToggleTransmission('Automatic')}
            />
            <CheckboxLabel>Automatic</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input 
              type="checkbox" 
              id="transmission-mechanical" 
              checked={transmissions.includes('Mechanical')} 
              onChange={() => handleToggleTransmission('Mechanical')}
            />
            <CheckboxLabel>Mechanical</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input 
              type="checkbox" 
              id="transmission-variator" 
              checked={transmissions.includes('Variator')} 
              onChange={() => handleToggleTransmission('Variator')}
            />
            <CheckboxLabel>Variator</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
        </FilterCheckboxes>
      </FilterSection>
      
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Drive</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <FilterCheckboxes>
          <FilterCheckbox>
            <input type="checkbox" id="drive-all" />
            <CheckboxLabel>All</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="drive-4wd" />
            <CheckboxLabel>4WD</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="drive-awd" />
            <CheckboxLabel>AWD</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="drive-fwd" />
            <CheckboxLabel>FWD</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
          <FilterCheckbox>
            <input type="checkbox" id="drive-rwd" />
            <CheckboxLabel>RWD</CheckboxLabel>
            <CheckboxBackground />
          </FilterCheckbox>
        </FilterCheckboxes>
      </FilterSection>
      
      <FilterSection>
        <FilterHeader>
          <FilterTitle>Vehicle year</FilterTitle>
          <ResetButton>Reset</ResetButton>
        </FilterHeader>
        
        <YearSelector>
          <YearInput>
            <Input 
              type="text" 
              value={minYear} 
              onChange={(e) => setMinYear(e.target.value)} 
            />
          </YearInput>
          <YearInput>
            <Input 
              type="text" 
              value={maxYear} 
              onChange={(e) => setMaxYear(e.target.value)} 
            />
          </YearInput>
        </YearSelector>
      </FilterSection>
      
      <ResetAllButton>Reset all</ResetAllButton>
    </FiltersContainer>
  );
};

export default Filters; 