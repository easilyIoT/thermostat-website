import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
        display: flex;

        
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        
        border-radius: 30px;
        padding: 0.5em;
        
`;

const TextArea = styled.input<any>`
        padding-right: 0.3em;
        width: 100%;

        
        ${props => !props.isVisible && `user-select: none;`}
`;

type Props = {
        hidden?: boolean,
        children: string
}

const Hidden: FunctionComponent<Props> = ({ hidden, children }) => {
        const [isHidden, setIsHidden] = useState<boolean>(!!hidden);

        const handleHide = () => {
                setIsHidden(!isHidden);
        }


        return (
                <Wrapper>
                        <TextArea isVisible={!isHidden} value={isHidden ? children.split("").map(e => "*").join("") : children} />
                        <div style={{ cursor: "pointer" }} onClick={handleHide}><i className="fas fa-eye"/></div>
                </Wrapper>
        );
}


export default Hidden;