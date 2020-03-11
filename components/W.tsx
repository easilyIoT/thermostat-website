import styled from "styled-components";

type Props = {
        value: string
}
export default styled.div<Props>`
        width: ${props => props.value};
`;