import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.main<{ isSidebarExpanded: boolean }>`
  flex: 1;
  margin-left: ${({ isSidebarExpanded }) => (isSidebarExpanded ? '260px' : '64px')};
  transition: margin-left 0.3s ease;
  min-width: 0;
  background: #f7f8fa;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`; 