import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';


type Size = {
        size: number
}
type Rotate = {
        rotate: number
};


type LeftRight = {
        left?: boolean;
        right?: boolean;
};


type Edited = {
        edited: boolean;
}

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


const Wrapper = styled(_centerRadius)`
        & * {
                user-select: none;
        }
        position: absolute;

        background: #6D697F;
        box-shadow: inset 0px -6px 1px 2px rgba(0,0,0,0.35), 0px 7px 40px 11px rgba(84, 81, 97, 0.40);

        @media screen and (max-width: 400px) {
                width: 350px;
                height: 350px;
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                width: 400px;
                height: 400px;
        }     

        @media screen and (min-width: 900px) {
                width: 650px;
                height: 650px;
        }


`;



const Shadow = styled.div<Rotate & Edited>`
        position: absolute;
        
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%) ${props => props.rotate && `rotate(${-180 + props.rotate * 10}deg)`};

        width: 25px;
        height: 86%;

        text-align: center;

        transition: 0.7s ease;
        animation: ${shadowAnim} 1.4s ease - out both;

        ${props => props.edited && `animation: 0s ease 0s 1 normal none running none;`}

`;

const ShadowCube = styled.div`
        position: absolute;
        top: 0;
        width: 25px;
        height: 0px;
        box-shadow: 0 0 45px 13px rgba(255, 158, 35, 0.5);
`;


const Number = styled.div<Rotate>`
        position: absolute;

        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%)  ${props => props.rotate && `rotate(${-180 + props.rotate * 10}deg)`};

        width: 40px;
        height: 82%;

        text-align: center;
        transition: 0.5s ease;

        opacity: 0;

        ${Wrapper}:hover & {
                opacity: 1;
        }

        @media screen and (max-width: 400px) {
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
        }     

        @media screen and (min-width: 900px) {
                height: 90%;
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
        overflow: hidden;

        & span {
                font-weight: 800;

                position: absolute;
                bottom: 0px;
                
                text-align: center;
                text-transform: uppercase;
                
                font-size: 15px;
                
                color: #2e2c3a;
                
                z-index: 10;
        }

        
        @media screen and (max-width: 400px) {
                width: 306px;
                height: 306px;

                & span {
                        width: 306px;
                }
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                width: 356px;
                height: 356px;

                & span {
                        width: 356px;
                }
        }     

        @media screen and (min-width: 900px) {
                width: 606px;
                height: 606px;

                & span {
                        width: 606px;
                }
        }
`;

const InnerBar = styled.div`
        position: absolute;

        top: 50%;
        left: 50%;


        transform: translate(-50%, -50%);

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

        @media screen and (max-width: 400px) {
                width: 294px;
                height: 294px;
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                width: 344px;
                height: 344px;
        }     

        @media screen and (min-width: 900px) {
                width: 594px;
                height: 594px;
        }
`;


const Hold = styled.div`
        position: absolute;

        width: 100%;
        height: 100%;

        border-radius: 100%;
        background-color: #3a3749;

        @media screen and (max-width: 400px) {
                clip: rect(0px, 306px, 306px, 153px);
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                clip: rect(0px, 356px, 356px, 178px);
                
        }     

        @media screen and (min-width: 900px) {
                clip: rect(0px, 606px, 606px, 303px);
        }
`;

const HoldLeft = styled(Hold)`

`;

const HoldRight = styled(Hold)`
        z-index: 3;
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        transform: rotate(180deg);
`;


const Fill = styled.div<LeftRight>`
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        

        background: ${
        props => props.left
                ? "-webkit-linear-gradient(top, #FF4900 20%,#FF4900 100%)"
                : props.right
                        ? "-webkit-linear-gradient(top, #FF4900  40%,#FF9E23 100%)"
                        : "initial"
        };

        ${HoldLeft} & {
                z-index: 1;

                animation: ${leftAnim} 0.3s linear both;
                animation-delay: 1s;
                
                transform: rotate(10deg);
                
                transition: transform 0.6s;
                transition-delay: 1s;
        }

        ${HoldRight} & {
                z-index: 3;
               
                animation: ${rightAnim} 1s linear both;
               
                transform: rotate(180deg);
                transition: transform 0.6s;
        }

        @media screen and (max-width: 400px) {
                clip: rect(0px, 153px, 306px, 0px);
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                clip: rect(0px, 178px, 356px, 0px);
                
        }     

        @media screen and (min-width: 900px) {
                clip: rect(0px, 303px, 606px, 0px);
        }

`;

const Center = styled(_centerRadius)`
        position: absolute;
        background: #e3e4ed;
        animation: ${boundInAnim} 0.6s ease forwards;


        & span svg {
                position: absolute;
                color: #b9b6c8;
                font-size: 40px;
                font-weight: 500;
        }

        @media screen and (max-width: 400px) {
                width: 210px;
                height: 210px;

                & span svg {
                        height: 210px;
                }
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                width: 260px;
                height: 260px;

                & span svg {
                        height: 260px;
                }
        }     

        @media screen and (min-width: 900px) {
                width: 510px;
                height: 510px;

                & span svg {
                        height: 510px;
                }
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
        
        
        background: #F8F9FA;

        text-align: center;
        
        animation: ${boundInSmallAnim} 0.6s ease forwards;


        @media screen and (max-width: 400px) {
                width: 110px;
                height: 110px;
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                width: 150px;
                height: 150px;
        }     

        @media screen and (min-width: 900px) {
                width: 380px;
                height: 380px;
        }
`;

const Heat = styled.span`
        color: #57545f;
        font-weight: 300;

        &:after {
                content: '°';
                display: block;
                position: absolute;
                font-size: 50px;
                top: -20px;
        }

        @media screen and (max-width: 400px) {
                line-height: 100px;
                font-size: 45px;
        
                &:after {
                        right: 18px;
                        font-size: 40px;
                }
        }  

        @media screen and (max-width: 900px) and (min-width: 400px) {
                line-height: 150px;
                font-size: 59px;

                &:after {
                        right: 20px;
                }
        }     

        @media screen and (min-width: 900px) {
                line-height: 375px;
                font-size: 128px;

                &:after {
                        right: 60px;
                        font-size: 70px;
                }
        }
`;



type Transforms = {
        left: {
                rotation: number;
                delay: number;
        }
        right: {
                rotation: number;
                delay: number;
        }
}


type Props = {
        handleChange: (newValue: number) => void,
        value: number
};

const Thermostat: React.FunctionComponent<Props> = ({ handleChange, value }) => {

        const [gradi, setGradi] = useState<number>(19);
        const [isModified, setIsModified] = useState<boolean>(false);
        const [transforms, setTransforms] = useState<Transforms>({
                left: {
                        rotation: 10,
                        delay: 0
                },
                right: {
                        rotation: 180,
                        delay: 0
                }
        });

        useEffect(() => {
                setGradi(value);
                
                if (value == 18) {
                        setTransforms({
                                left: {
                                        rotation: 0,
                                        delay: 0
                                },
                                right: {
                                        rotation: 180,
                                        delay: 0
                                }
                        })
                } else if (value < 18) {
                        setTransforms({
                                left: {
                                        rotation: 0,
                                        delay: 0
                                },
                                right: {
                                        rotation: value * 10,
                                        delay: 0
                                }
                        });
                } else {
                        setTransforms({
                                left: {
                                        rotation: (value - 18) * 10,
                                        delay: 0
                                },
                                right: {
                                        rotation: 180,
                                        delay: 0
                                }
                        })
                }
        }, [value]);


        const handleDecrease = () => {
                const newGradi = gradi - 1;
                setGradi(newGradi);
                handleChange(newGradi);
                
                setIsModified(true);
                
                
                if (newGradi >= 18) {
                        setTransforms({
                                ...transforms,
                                left: {
                                        rotation: (newGradi - 18) * 10,
                                        delay: 0
                                }
                        });
                } else if (newGradi === 17) {
                        setTransforms({
                                ...transforms,
                                right: {
                                        rotation: newGradi * 10,
                                        delay: 0.5
                                }
                        })
                } else {
                        setTransforms({
                                ...transforms,
                                right: {
                                        rotation: newGradi * 10,
                                        delay: 0
                                }
                        })
                }

                
        }

        const handleIncrease = () => {
                const newGradi = gradi + 1;
                setGradi(newGradi);
                handleChange(newGradi);

                setIsModified(true);

                if (newGradi > 19)
                        setTransforms({
                                ...transforms,
                                left: {
                                        rotation: (newGradi - 18) * 10,
                                        delay: 0
                                }
                        })
                else if (newGradi === 19)
                        setTransforms({
                                ...transforms,
                                left: {
                                        rotation: (newGradi - 18) * 10,
                                        delay: 1
                                }
                        })
                else
                        setTransforms({
                                ...transforms,
                                right: {
                                        rotation: newGradi * 10,
                                        delay: 0
                                }
                        })
                
        
        };

        return (
                        <Wrapper>
                                <Bar>
                                        <InnerBar />
                                        <HoldLeft>
                                                <Fill left style={{
                                                        transform: `rotate(${transforms.left.rotation}deg)`,
                                                        transitionDelay: `${transforms.left.delay}s`,
                                                        animation : isModified ? `none` : "initial" 
                                                }} />
                                        </HoldLeft>
                                        <HoldRight>
                                                <Fill right  style={{
                                                        transform: `rotate(${transforms.right.rotation}deg)`,
                                                        transitionDelay: `${transforms.right.delay}s`,
                                                        animation : isModified ? `none` : "initial" 
                                                }}/>
                                        </HoldRight>
                                        <span>Heating</span>
                                </Bar>
                                <Shadow rotate={gradi} edited={isModified}>
                                        <ShadowCube />
                                </Shadow>
                                <Number rotate={gradi} >
                                        <Ext>{gradi}</Ext>
                                </Number>
                                <Center >
                                        <Minus onClick={handleDecrease} ><i className="fas fa-chevron-left"></i></Minus>
                                        <Plus onClick={handleIncrease} ><i className="fas fa-chevron-right"></i></Plus>
                                        <Small >
                                                <Heat className="heat">{gradi}</Heat>
                                        </Small>
                                </Center>
                        </Wrapper>
        )
}

export default Thermostat