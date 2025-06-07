import styled from '@emotion/styled';

interface SidebarContainerProps {
  isExpanded: boolean;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
  width: ${({ isExpanded }) => (isExpanded ? '260px' : '64px')};
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  
  &:hover {
    color: #000;
  }
`; 