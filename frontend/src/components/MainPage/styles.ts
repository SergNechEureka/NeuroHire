export const container = {
  display: 'flex',
  flexDirection: 'column' as const,
  height: '100%',
  flex: 1,
  minHeight: 0,
};

export const content = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: 0,
};

export const welcome = {
  margin: 'auto',
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  gap: '16px',
};

export const title = {
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '1rem',
};

export const description = {
  fontSize: '1.1rem',
  color: '#666',
};

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0,
    width: '100%',
    height: '100%',
  },
  welcome: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: '16px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  description: {
    fontSize: '1.1rem',
    color: 'text.secondary',
    maxWidth: '600px',
  },
}; 