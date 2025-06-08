import { css } from '@emotion/react';

export const mainPageStyles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    @media (max-width: 768px) {
      padding: 0;
    }
  `,
  content: css`
    flex: 1;
    padding: 20px;
    overflow: auto;

    @media (max-width: 768px) {
      padding: 10px;
    }
  `,
}; 