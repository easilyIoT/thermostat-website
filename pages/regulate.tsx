import React from "react"
import styled, { keyframes } from "styled-components"

import Layout from '../components/Layout'

const shadowAnim = keyframes`
        0% {
                transform: translate(-50%, -50%) rotate(-190deg);
        }

        100% {
                transform: translate(-50%, -50%) rotate(10deg);
        }
`;

const leftAnim = keyframes`
        0% {
                transform:rotate(0deg);
        }
        
        100% {
                transform:rotate(10deg);
        }
`;

const rightAnim = keyframes`
        0% {
                transform: rotate(0deg);
        }
        100% {
                transform: rotate(180deg);
        }
`;

const boundInAnim = keyframes`
        10% {
                box-shadow: 0px 7px 30px 5px rgba(96, 93, 111,0.25);
                transform: translate(-50%, -50%) scale(0.8);
        }
        
        80% {
                ransform: translate(-50%, -50%) scale(1.03);
        }

        100% {
                box-shadow: 0px 15px 35px 11px rgba(46, 44, 58,0.60);
                transform: translate(-50%, -50%) scale(1);
        }
`;

const boundInSmallAnim = keyframes`
        0% {
                box-shadow: 0px 5px 10px 5px rgba(96, 93, 111,0.19);
                transform: translate(-50%, -50%) scale(0.8);
        }

        80% {
                transform: translate(-50%, -50%) scale(1.03);
        }

        100% {
                box-shadow: 0px 15px 35px 5px rgba(96, 93, 111,0.30);
                transform: translate(-50%, -50%) scale(1);
        }
`;

const arrowLeftAnim = keyframes`
        0% {
                left: 45px;
                opacity: 0;
        }

        100% {
                left: 10px;
                opacity: 1;
        }
`;

const arrowRightAnim = keyframes`
        0% {
                right: 75px;
                opacity: 0;
        }
        
        100% {
                right: 45px;
                opacity: 1;
        }
`;

const _centerRadius = styled.div`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
`;


const Thermostat = styled(_centerRadius)`
        & * {
                user-select: none;
        }
        position: absolute;

        width: 400px;
        height: 400px;
        background: #6D697F;
        box-shadow: inset 0px -6px 1px 2px rgba(0,0,0,0.35), 0px 7px 40px 11px rgba(84, 81, 97, 0.40);


`;

const Shadow = styled.div`
        position: absolute;
        
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%) rotateZ(10deg);

        width: 25px;
        height: 86%;

        text-align: center;

        transition: 0.7s ease;
        animation: ${shadowAnim} 1.4s ease-out both;

`;

const ShadowCube = styled.div`
        position: absolute;
        top: 0;
        width: 25px;
        height: 0px;
        box-shadow: 0 0 45px 13px rgba(255, 158, 35, 0.5);
`;

const Number = styled.div`
        position: absolute;

        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%) rotateZ(10deg);

        width: 40px;
        height: 82%;

        text-align: center;
        transition: 0.7s ease;

        opacity: 0;

        ${Thermostat}:hover & {
                opacity: 1;
        }
`;

const Ext = styled.span`
        font-size: 16px;
        color: white;
        font-weight: 1000;
        text-shadow: 1px 3px 3px #302e38;
`;

const Bar = styled(_centerRadius)`
        position: absolute;
        
        width: 356px;
        height: 356px;

        & span {
                width: 356px;
                font-weight: 800;

                position: absolute;
                bottom: 0px;
                
                text-align: center;
                text-transform: uppercase;
                
                font-size: 15px;
                
                color: #2e2c3a;
                
                z-index: 10;
        }
`;

const InnerBar = styled.div`
        position: absolute;

        top: 50%;
        left: 50%;

        width: 344px;
        height: 344px;

        margin-left: -172px;
        margin-top: -172px;

        border-radius: 100%;

        background-color: #6D697F;
        z-index: 4;

        &::after {
                content: '';
                display: block;
                position: absolute;
                width: 0;
                height: 0;
                border-top: 70px solid transparent;
                border-left: 70px solid transparent;
                border-right: 70px solid transparent;
                border-bottom: 150px solid #6D697F;
                bottom: -7px;
                left: 50%;
                transform: translatex(-50%);
        }
`;


interface LeftRightProp {
        left?: boolean;
        right?: boolean;
};

const Hold = styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        clip: rect(0px, 356px, 356px, 178px);
        border-radius: 100%;
        background-color: #3a3749;

`;

const Left = styled(Hold)`

`;

const Right = styled(Hold)`
        z-index: 3;
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        transform: rotate(180deg);
`;


const Fill = styled.div<LeftRightProp>`
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        clip: rect(0px, 178px, 356px, 0px);

        background: ${
        props => props.left
                ? "-webkit-linear-gradient(top, #FF4900 20%,#FF4900 100%)"
                : props.right
                        ? "-webkit-linear-gradient(top, #FF4900  40%,#FF9E23 100%)"
                        : "initial"
        };

        ${Left} & {
                z-index: 1;

                animation: ${leftAnim} 0.3s linear both;
                animation-delay: 1s;
                
                transform: rotate(10deg);
                
                transition: transform 0.6s;
                transition-delay: 1s;
        }

        ${Right} & {
                z-index: 3;
               
                animation: ${rightAnim} 1s linear both;
               
                transform: rotate(180deg);
                transition: transform 0.6s;
        }

`;

const Center = styled(_centerRadius)`
        position: absolute;
        width: 260px;
        height: 260px;
        background: #e3e4ed;
        animation: ${boundInAnim} 0.6s ease forwards;


        & span svg {
                position: absolute;
                color: #b9b6c8;
                font-size: 40px;
                font-weight: 500;
                height: 260px;
        }
`;

const Arrow = styled.span`
        opacity: 0;
        transition: opacity 0.3s;
        cursor: pointer;

        ${Center}:hover & {
                opacity: 1;
                transition: opacity 0.3s;
        }
`;

const Minus = styled(Arrow)`
        position: absolute;
        animation: ${arrowLeftAnim} 1s forwards;

        ${Center}:hover & {
                left: 10px;
                transition: left 0.3s ease-out;
        }
`;

const Plus = styled(Arrow)`
        position: absolute;
        animation: ${arrowRightAnim} 1s forwards;

        ${Center}:hover & {
                right: 45px;
                transition: right 0.3s ease-out;
        }
`;

const Small = styled(_centerRadius)`
        position: absolute;
        
        width: 150px;
        height: 150px;
        
        background: #F8F9FA;

        text-align: center;
        
        animation: ${boundInSmallAnim} 0.6s ease forwards;
`;

const Heat = styled.span`
        line-height: 150px;
        font-size: 59px;
        color: #57545f;
        font-weight: 300;

        &:after {
                content: '°';
                display: block;
                position: absolute;
                font-size: 40px;
                top: -20px;
                right: 30px;
        }
`;


Bar.displayName = "Bar";

Hold.displayName = "Hold";

Left.displayName = "Left";
Right.displayName = "Right";

Fill.displayName = "Fill";

Shadow.displayName = "Shadow";
Number.displayName = "Number";

Center.displayName = "Center";

type Props = {

}

const Regulate: React.FunctionComponent<Props> = () => {

        const handleDecrease = () => {

        }

        const handleIncrease = () => {

        };

        return (
                <Layout title="Regulate">
                        <Thermostat>
                                <Bar>
                                        <InnerBar id="inner" />
                                        <Left>
                                                <Fill left />
                                        </Left>
                                        <Right>
                                                <Fill right />
                                        </Right>
                                        <span>Heating</span>
                                </Bar>
                                <Shadow>
                                        <ShadowCube />
                                </Shadow>
                                <Number>
                                        <Ext>19</Ext>
                                </Number>
                                <Center>
                                        <Minus><i className="fas fa-chevron-left"></i></Minus>
                                        <Plus><i className="fas fa-chevron-right"></i></Plus>
                                        <Small>
                                                <Heat className="heat">19</Heat>
                                        </Small>
                                </Center>
                        </Thermostat>
                </Layout>
        )
}

export default Regulate