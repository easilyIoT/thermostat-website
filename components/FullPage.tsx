import styled from 'styled-components';


export default styled.div`
        height: 100vh;
        width: 100%;

        overflow: hidden;
        
        @media screen and (max-width: 600px) {
        	height: calc(100vh - ${props => props.theme.navSize}em);
        }
`
