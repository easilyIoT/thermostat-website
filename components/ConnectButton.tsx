import React, { FunctionComponent } from 'react'
import styled from 'styled-components';

import M from "./M"
import Text from "./Text"


const Button = styled.button`

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
        color: white;

        cursor: pointer;

        padding: 1em;
        border-radius: 30px;

        font-weight: 600;
        font-size: 1.2em;

        margin: auto;
`;


type Props = {
        onClick: (e: any) => void
}

const ConnectButton: FunctionComponent<Props> = ({ onClick }) => (
        <Button onClick={onClick}>
                <M right="0.8em">
                        <Text fontSize="1.5em">
                                <i className="fas fa-link"></i>
                        </Text>
                </M> Connect
        </Button>
)

export default ConnectButton;