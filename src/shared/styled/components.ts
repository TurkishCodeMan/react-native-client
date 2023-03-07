import styled from 'styled-components/native';
import {
  ColorProps,
  SpaceProps,
  LayoutProps,
  PositionProps,
  FlexboxProps,
  BorderProps,
  TypographyProps,
  system,
  variant,
} from 'styled-system';
import {
  color,
  compose,
  layout,
  space,
  position,
  flexbox,
  border,
  typography,
} from 'styled-system';

type StyledProps = ColorProps &
  SpaceProps &
  LayoutProps &
  PositionProps &
  FlexboxProps &
  BorderProps &
  TypographyProps;

export const SafeAreaView = styled.SafeAreaView<StyledProps>(
  compose(color, layout, space, position, flexbox, border, typography),
);
export const StyledView = styled.View<StyledProps>(
  compose(color, layout, space, position, flexbox, border, typography),
);

export const StyledText = styled.Text<StyledProps>(
  compose(
    color,
    layout,
    space,
    position,
    flexbox,
    border,
    typography,
    variant({
      prop: 'size',
      variants: {
        heading: {
          fontSize: 'fontSize30',
          color: 'lightBlack',
          fontWeight: '700',
        },
        title: {
          fontSize: 'fontSize24',
          color: 'lightBlack',
          fontWeight: '600',
        },
        buttonPrimary: {
          color: 'white',
          fontWeight: '500',
          fontSize: 'fontSize18',
        },
        buttonSecondary: {
          color: 'lightBlue',
          fontWeight: '500',
          fontSize: 'fontSize16',
        },
      },
    }),
  ),
);
export const StyledButton = styled.TouchableOpacity<
  StyledProps & {variant: string}
>(
  compose(
    color,
    layout,
    space,
    position,
    flexbox,
    border,
    typography,
    variant({
      variants: {
        primary: {
          backgroundColor: 'lightBlue',
          color: 'white',
          paddingX: 4,
          paddingY: 3,
          borderRadius: 10,
        },
        secondary: {
          backgroundColor: 'white',
          color: 'lightBlue',
          paddingX: 4,
          paddingY: 3,
          borderRadius: 10,
          border: '1px solid',
          borderColor: 'lightBlue',
        },
      },
    }),
  ),
);

export const StyledTextInput = styled.TextInput<
  StyledProps & {variant: string}
>(
  compose(
    color,
    layout,
    space,
    position,
    flexbox,
    border,
    typography,
    variant({
      variants: {
        primary: {
          paddingX: 4,
          paddingY: 2,
          borderRadius: 10,
          color: 'mutedTextColor',
          border: '1px solid',
          borderColor: 'lightBlue',
        },
        secondary: {
          paddingX: 4,
          paddingY: 3,
          borderRadius: 10,
          color: 'mutedTextColor',
          backgroundColor: 'white',
        },
      },
    }),
   
  ),
);

export const StyledImage = styled.Image<StyledProps>(
  compose(color, layout, space, position, flexbox, border, typography),
);
export const StyledTouchOpacity = styled.TouchableOpacity<StyledProps>(
  compose(color, layout, space, position, flexbox, border, typography),
);


export const SHADOW= {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}