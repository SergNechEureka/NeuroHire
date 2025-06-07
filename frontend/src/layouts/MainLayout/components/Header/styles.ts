import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 1100;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
  color: #222;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #1976d2;
  }
`; 