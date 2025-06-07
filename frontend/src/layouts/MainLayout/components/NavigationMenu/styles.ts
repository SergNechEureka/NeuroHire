import styled from 'styled-components';

export const MenuContainer = styled.nav`
  padding: 16px 0;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li<{ isExpanded: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const MenuButton = styled.button<{ isExpanded: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${({ isExpanded }) => (isExpanded ? '12px 16px' : '12px')};
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  text-align: left;
  
  &:hover {
    color: #000;
  }
`;

export const IconWrapper = styled.div<{ isExpanded: boolean }>`
  min-width: ${({ isExpanded }) => (isExpanded ? '40px' : '24px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span<{ isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`; 