export const FONT_SIZES = {
  fontSize12: 12,
  fontSize14: 14,
  fontSize16: 16,
  fontSize20: 20,
  fontSize24: 24,
  fontSize32: 32,
};

export const SPACES = {
  spaces12: 12,
  spaces14: 14,
  spaces16: 16,
  spaces20: 20,
  spaces24: 24,
  spaces32: 32,
};

export const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const FONT_WEIGHTS=[100, 200, 300, 400, 500, 600, 700, 800, 900]

export const COLORS = {
  white: '#fff',
  snowGray: '#fafafa',
  darkSnowGray: '#f0f0f0',
  lightBlue: '#1376fb',
  lightBlack:'#262753',
  mutedTextColor:'#707070',
  blue:'#2474FF',
  newBg:'#F6F7FB'
};


const theme = {
  colors: COLORS,
  fontSizes:FONT_SIZES,
  spaces:SPACES,
  fontWeights: FONT_WEIGHTS

};
const darkTheme = {};

export {theme, darkTheme};
