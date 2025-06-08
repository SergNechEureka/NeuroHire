import React, { type ReactNode, useState } from 'react';
import { type NavigationItems } from '../../types/navigation';
import { Sidebar } from './components/Sidebar';
import { css } from '@emotion/react';
import { type SidebarMode } from './components/Sidebar/types';

interface MainLayoutProps {
  children: ReactNode;
  navigationItems: NavigationItems;
}

const styles = {
  container: css`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  `,
  content: css`
    flex: 1;
    overflow: auto;
  `,
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children, navigationItems }) => {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('normal');

  return (
    <div css={styles.container}>
      <Sidebar mode={sidebarMode} onModeChange={setSidebarMode}>
        {/* Add navigation menu here */}
      </Sidebar>
      <main css={styles.content}>{children}</main>
    </div>
  );
};
