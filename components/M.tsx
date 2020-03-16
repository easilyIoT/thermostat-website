import styled from 'styled-components';

import { DirectionProps } from "../interfaces/components"


export default styled.div<DirectionProps>`
        width: 100%;
        height: 100%;


        margin: ${props => props.top || 0} ${props => props.right || 0} ${props => props.bottom || 0} ${props => props.left || 0};
`;