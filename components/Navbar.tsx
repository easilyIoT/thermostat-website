import React from "react"
import NextLink from "next/link"
import styled from "styled-components"

import W from "./W"

const Nav = styled.nav`
        position: fixed;
        left: 0;

        z-index: 10000;
        
        @media screen and (min-width: 600px) {
                top: 0;
                height: 100vh;
                width: ${props => props.theme.navSize}rem;
                        
                &:hover {
                        width: 16rem;
                }
        }

        @media screen and (max-width: 600px) {
                bottom: 0;
                width: 100vw;
                height: ${props => props.theme.navSize}rem; 
        }
        

        background: ${props => props.theme.bgPrimary};


        transition: width 200ms ease;
        

       
`;

const Pages = styled.ul`
        padding: 0;
        margin: 0;

        list-style: none;
        display: flex;
        align-items: center;

        height: 100%;

        @media screen and (min-width: 600px) {
                flex-direction: column; 
        }

        @media screen and (max-width: 600px) {
                flex-direction: row;
        }

`;

const Logo = styled.li`
        width: 100%;

        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 1rem;

        text-align: center;
        color: ${props => props.theme.textSecondary};
        background: ${props => props.theme.bgSecondary};

        @media screen and (max-width: 600px) {
                display: none;
        }
`;

const Page = styled.li`
        width: 100%;

        color: ${props => props.theme.textPrimary};
        filter: grayscale(100%) opacity(0.7);
        transition: ${props => props.theme.transitionSpeed};

        &:hover {
                background: ${props => props.theme.bgSecondary};
                color: ${props => props.theme.textSecondary};
                
                filter: grayscale(0%) opacity(1);
                
                cursor: pointer;
        }

        &:last-child {
                margin-top: auto;
        }
`;

const Link = styled.a`
        display: flex;
        
        align-items: center;

        height: ${props => props.theme.navSize}rem;
        color: ${props => props.theme.textPrimary};

        text-decoration: none;


        & svg {
                max-width: 2rem;

                margin: 0 1.5rem;
                color: ${props => props.theme.iconColor};
        }

        @media screen and (max-width: 600px) {
                justify-content: center;
                
        }


`;

const LinkText = styled.span`
        display: none;
        margin-left: 1rem;
        
        @media screen and (min-width: 600px) {
                
                ${Nav}:hover & {
                        display: inline;
                        transition: opacity ${props => props.theme.transitionSpeed}
                }


        }
        
`;


type Props = {

}

const Navbar: React.FunctionComponent<Props> = () => {

        return (
                <Nav>
                        <Pages>
                                <Logo>
                                        <Link>
                                                <LinkText>Easily Thermostat</LinkText>
                                                <i className="fas fa-thermometer-half fa-2x fa-fw"></i>
                                        </Link>
                                </Logo>
                                <Page>
                                        <NextLink href="/dashboard/regulate">
                                                <Link>

                                                        <i className="fas fa-sliders-h fa-3x fa-fw"></i>
                                                        <LinkText>Regulate</LinkText>
                                                </Link>
                                        </NextLink>
                                </Page>
                                <Page>
                                        <NextLink href="/dashboard/tasks">
                                                <Link>
                                                        <i className="fas fa-clipboard fa-3x fa-fw"></i>
                                                        <LinkText>Schedule</LinkText>
                                                </Link>
                                        </NextLink>
                                </Page>
                                <Page>
                                        <NextLink href="/dashboard/settings">
                                                <Link>
                                                        <i className="fas fa-cogs fa-3x fa-fw"></i>

                                                        <LinkText>Settings</LinkText>
                                                </Link>
                                        </NextLink>
                                </Page>
                        </Pages>
                </Nav>
        )
}

export default Navbar;