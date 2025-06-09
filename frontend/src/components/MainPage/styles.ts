import { css } from '@emotion/react';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 24px;
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: 600px) {
      gap: 16px;
    }
  `,
  welcome: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  `,
  title: css`
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    
    @media (max-width: 600px) {
      font-size: 20px;
    }
  `,
  description: css`
    font-size: 16px;
    color: #666;
    
    @media (max-width: 600px) {
      font-size: 14px;
    }
  `
}; 