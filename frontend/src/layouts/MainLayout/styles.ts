export const layoutStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: 0,
  height: '100%',
  width: '100%',
  background: 'var(--color-bg-primary, #fff)',
};

export const contentStyles = {
  display: 'flex',
  flexDirection: 'row' as const,
  height: '100%',
  minHeight: 0,
  width: '100%',
  overflow: 'hidden',
};

export const sidebarStyles = {
  height: 'calc(100vh - 80px)',
  width: '15%',
  minHeight: 0,
  flexShrink: 1,
  position: 'sticky' as const,
  top: 0,
  padding: 0,
  transition: 'width 0.3s',
};

export const mainStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: 0,
  width: '85%',
  height: 'calc(100vh - 80px)',
  overflow: 'hidden',
  padding: 0,
};

export const mobileSidebarHidden = {
  '@media (max-width: 768px)': {
    display: 'none',
  },
}; 