import styled from 'styled-components';

import { ColorProp } from "../interfaces/components"

export default styled.a<ColorProp>`
        text-decoration: none;
        cursor: pointer;
        
        ${props => props.rgb && `color: rgb(${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b});`}

        &:hover {
                text-decoration: underline;
        }
`;