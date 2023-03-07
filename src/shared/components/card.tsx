import {PropsWithChildren} from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';

export function Card({
  children,
  style,
}: PropsWithChildren<{style?: StyleProp<ViewStyle>}>) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 10,
        ...(style as ViewStyle),
      }}>
      {children}
    </View>
  );
}
