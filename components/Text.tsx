import styled from 'styled-components';

import { FontProps, ColorProp } from "../interfaces/components"

export default styled.div<FontProps & ColorProp>`
        ${props => props.fontSize && `font-size: ${props.fontSize};`};
        ${props => props.fontWeight && `font-weight: ${props.fontWeight};`};

        ${props => props.rgb && `color: rgb(${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b});`}

        width: 100%;
        word-break: break-all;
`;