import React from 'react';
import {StyledText, StyledView} from '../styled/components';

function getCapitalizeFirstLetter(name: string) {
  return name
    .split(' ')
    .map(val => val.charAt(0).toUpperCase())
    .join('');
}

export function Avatar({name,size=74}: {name: string,size?:number}) {
  return (
    <StyledView
     
      backgroundColor={'darkSnowGray'}
      width={size}
      height={size}
   
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={15}>
      <StyledText    textAlign={'center'} color="lightBlack" fontSize={20} fontWeight="bold">
        {getCapitalizeFirstLetter(name)}
      </StyledText>
    </StyledView>
  );
}
