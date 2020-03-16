import styled from "styled-components"

import { white } from "colors.css/js/colors"

export default styled.div`
        display: block;
        
        
        padding: 4em;
        border-radius: 30px;

        background: white;
        box-shadow: 0px 0px 33px -17px rgba(0,0,0,0.75);

        @media screen and (max-width: 500px) {
                padding: 2em;
        }
`;


export const CardTitle = styled.span`
        display: block;

        font-weight: 600;
        font-size: 1.7em;

        margin-bottom: 1em;
`;

export const CardBody = styled.div`
        display: block;

        font-size: 1.2em;
`;