import styled from "styled-components";

type Props = {
        value: string
}

export default styled.div<Props>`
        height: 100%;
        width: ${props => props.value};
`;