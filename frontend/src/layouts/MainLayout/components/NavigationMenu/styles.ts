import styled from '@emotion/styled';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

interface MenuContainerProps {
  isExpanded: boolean;
}

export const MenuContainer = styled(List)<MenuContainerProps>`
  padding: 8px;
  width: 100%;
`;

export const MenuItem = styled(ListItem)<{ level?: number }>`
  border-radius: 8px;
  margin-bottom: 4px;
  padding-left: ${({ level = 0 }) => level * 16 + 8}px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const MenuItemIcon = styled(ListItemIcon)`
  min-width: 40px;
  color: #666;
  transition: transform 0.2s ease;
`;

export const MenuItemText = styled(ListItemText)`
  opacity: ${({ isExpanded }: { isExpanded: boolean }) => (isExpanded ? 1 : 0)};
  transition: opacity 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;
`;

export const NestedList = styled(Collapse)`
  margin-left: 8px;
`;

export const ExpandIcon = styled.span<{ isExpanded: boolean }>`
  transform: rotate(${({ isExpanded }) => (isExpanded ? 90 : 0)}deg);
  transition: transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`; 