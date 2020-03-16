import styled from "styled-components"

import { FlexProps } from "../interfaces/components"


export default styled.div<FlexProps>`
        display: flex;
        flex-direction: ${props => props.direction};
        
        justify-content: ${props => props.justify};
        align-items: ${props => props.align};

        width: 100%;
        height: 100%;

        
`;
