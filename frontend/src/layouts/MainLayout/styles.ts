export const layoutStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: '100vh',
  height: '100vh',
  background: 'var(--color-bg-primary, #fff)',
};

export const contentStyles = {
  display: 'flex',
  flex: 1,
  minHeight: 0,
  position: 'relative' as const,
};

export const sidebarStyles = {
  position: 'sticky' as const,
  top: 0,
  height: 'calc(100vh - var(--header-height, 64px))',
  transition: 'width 0.3s',
};

export const mainStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: 0,
  height: '100%',
  paddingTop: '24px',
  paddingBottom: '24px',
  overflowX: 'hidden' as const,
};

export const mobileSidebarHidden = {
  '@media (max-width: 768px)': {
    display: 'none',
  },
}; 