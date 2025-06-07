import { css } from '@emotion/react';

export const layoutStyles = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-primary);
`;

export const contentStyles = css`
  display: flex;
  flex: 1;
  position: relative;
`;

export const sidebarStyles = css`
  position: sticky;
  top: 0;
  height: calc(100vh - var(--header-height));
  transition: width var(--transition-duration) ease;
`;

export const mainStyles = css`
  flex: 1;
  padding: var(--spacing-lg);
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`;

export const mobileSidebarHidden = css`
  @media (max-width: 768px) {
    display: none;
  }
`; 