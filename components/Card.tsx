import styled from "styled-components"

import { white } from "colors.css/js/colors"


type SizeProps = {
        w?: boolean,
        h?: boolean
}

export default styled.div<SizeProps>`
        display: block;
        
        ${props => props.w && `width: 100%;`}
        ${props => props.h && `height: 100%;`}

        padding: 4em;
        border-radius: 30px;

        background: white;
        box-shadow: 0px 0px 33px -17px rgba(0,0,0,0.75);

        @media screen and (max-width: 600px) {
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