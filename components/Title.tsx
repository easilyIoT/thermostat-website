import styled from 'styled-components';
import { red } from "colors.css/js/colors"

import { ColorProp } from "../interfaces/components"

export default styled.div<ColorProp>`
        
        font-size: 1.7em;
        font-weight: 700;

        color: rgb(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}` || "0,0,0"});

        margin-bottom: 0.7em;
`
