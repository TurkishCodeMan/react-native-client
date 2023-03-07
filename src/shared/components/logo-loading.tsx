import React from "react";
import { StyledImage, StyledView } from "../styled/components";
const imageSrc = require('../../../public/logo-loading.png');


export function LogoLoading(){
    return (
        <StyledView>
        <StyledImage source={imageSrc} width={80} height={80}/>
      </StyledView>
    )
}

