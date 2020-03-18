import styled from 'styled-components';

import { DirectionProps } from "../interfaces/components"


export default styled.div<DirectionProps>`
        width: 100%;
        height: 100%;


        ${props => `padding: ${props.all || `${props.top} ${props.right} ${props.bottom} ${props.left}`};`}
`;