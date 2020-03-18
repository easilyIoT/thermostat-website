import styled from 'styled-components';


import { ColorProp, GradientProp } from '../interfaces/components';


export default styled.div<ColorProp & GradientProp>`
        width: 100%;
        height: 100%;

        background: ${props => props.rgb && `rgb(${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b})` || (props.gradient || "initial")};

`;