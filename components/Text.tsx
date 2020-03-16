import styled from 'styled-components';

import { FontProps, ColorProp } from "../interfaces/components"

export default styled.p<FontProps & ColorProp>`
        font-size: ${props => props.fontSize};
        font-weight: ${props => props.fontWeight || "normal"};

        color: rgb(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}` || "0,0,0"});
`;