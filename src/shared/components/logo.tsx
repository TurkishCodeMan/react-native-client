import React from "react";
import { StyledImage, StyledView } from "../styled/components";
const imageSrc = require('../../../public/logo.jpeg');


export function Logo(){
    return (
        <StyledView>
        <StyledImage source={imageSrc} width={80} height={80}/>
      </StyledView>
    )
}

