import styled from 'styled-components';

import { fullViewPort } from "../utils/styles"

export default styled.div`
        height: 100vh;
        width: 100%;

        overflow: hidden;
        
        @media screen and (max-width: 600px) {
        	height: calc(${fullViewPort} - ${props => props.theme.navSize}em);
        }
`
