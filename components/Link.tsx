import styled from 'styled-components';

import { ColorProp } from "../interfaces/components"

export default styled.a<ColorProp>`
        text-decoration: none;
        cursor: pointer;
        color: rgb(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b},` || "0,0,0"});

        &:hover {
                text-decoration: underline;
        }
`;