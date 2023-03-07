import React, {PropsWithChildren} from 'react';
import {theme} from 'src/shared/constants/theme';
import {ThemeProvider} from 'styled-components';

export function  WithStyled({children}:PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};


