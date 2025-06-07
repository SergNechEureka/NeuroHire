import '@emotion/react';
import { SerializedStyles } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      primary: {
        main: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
    breakpoints: {
      up: (key: string) => string;
    };
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    css?: SerializedStyles | SerializedStyles[];
  }
} 