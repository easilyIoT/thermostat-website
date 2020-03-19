import styled from 'styled-components';


export default styled.select`
        height: 50px;
        width: 100%;

        padding: 0.7em;

        border-radius: 30px;


        border: none;
        outline: none;

        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.17);

        & > select:nth-last-child() {
                border-radius: 0 0 30px 30px;
        }
`;