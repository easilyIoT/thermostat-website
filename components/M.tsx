import styled from 'styled-components';

import { DirectionProps } from "../interfaces/components"


export default styled.div<DirectionProps>`

        ${props => `margin: ${props.all || `${props.top || 0} ${props.right || 0} ${props.bottom || 0} ${props.left || 0}`};`}
`;