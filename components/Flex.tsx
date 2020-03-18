import styled from "styled-components"

import { FlexProps } from "../interfaces/components"


export default styled.div<FlexProps>`
        display: flex;
        flex-direction: ${props => props.direction};
        
        justify-content: ${props => props.justify};
        align-items: ${props => props.align};

        width: 100%;
        height: 100%;

        @media screen and (max-width: ${props => props.rowToCol || props.colToRow || 0}px) {
                flex-direction: ${props => (props.rowToCol && "column") || (props.colToRow && "row") || "initial"};
        }

        & > * {
                flex: 1 1 auto;
        }

`;
