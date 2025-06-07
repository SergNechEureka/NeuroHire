import styled from 'styled-components';

export const MobileNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  padding: 8px 0;
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const MobileNavItem = styled.li`
  flex: 1;
  text-align: center;
`;

export const MobileNavButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#1976d2' : '#666')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #1976d2;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`; 