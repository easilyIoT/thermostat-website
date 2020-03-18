import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import { useRouter } from "next/router"
import axios from "axios"
import { MetroSpinner } from "react-spinners-kit"
import cookies from "react-cookies"
import { blue, green } from "colors.css/js/colors"
import nextCookies from "next-cookies"

import FullPage from "../components/FullPage"
import Card, { CardTitle, CardBody } from "../components/Card"
import Bg from "../components/Bg"
import Flex from "../components/Flex"
import TextCenter from "../components/TextCenter"
import Title from "../components/Title"
import W from "../components/W"
import M from "../components/M"
import Text from "../components/Text"
import Link from "../components/Link"
import ConnectButton from "../components/ConnectButton"


import { hexToRgb } from "../utils/colors"
import { objectToURI, redirect, validateToken, isValidUser, getUserFromToken } from "../utils"

import { User } from "../interfaces/api"

import { OAUTH_API_URL, API_URL, CLIENT_ID } from "../config"

type Props = {
        user: User
}

const CompleteRegistration: NextPage<Props> = ({ user:  _ }) => {
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [user, setUser] = useState<User | null>(null);
        const router = useRouter();


        useEffect(() => {
                if (user === null) {
                        fetchUser();
                }
        }, [user]);

        const fetchUser = async () => {

                const token = cookies.load("token");

                if (!isLoading) setIsLoading(true);

                try {

                        const { data } = await axios.get<{ user: User }>(`${API_URL}/auth/user`, {
                                headers: { Authorization: token }
                        })
                
                        console.log(data.user)
                
                        if (data.user.refresh_token && data.user.access_token)
                                router.push("/");
                
                        setUser(data.user);
                } catch (e) {
                        console.log(e.response.data);
                } finally {
                        setIsLoading(false);
                }
        }

        const redirectHandler = async () => {
                const token = cookies.load("token");

                try {
                        const { data } = await axios.post<{ state: string }>(`${API_URL}/auth/generateState`, {}, {
                                headers: { Authorization: token }
                        });


                        window.location.href = `${OAUTH_API_URL}/oauth/auth?${objectToURI({
                                client_id: CLIENT_ID,
                                redirect_uri: `${API_URL}/auth/callback`,
                                state: data.state
                        })}`;

                } catch (e) {
                        console.error(e.response);
                }
                
        }

        return (
                <FullPage>
                        <Bg gradient="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)">
                                <Flex direction="column" justify="center" align="center">
                                        <Card>
                                                {
                                                        (!isLoading && user)
                                                                ? <React.Fragment>
                                                                        <TextCenter>
                                                                                <CardTitle>
                                                                                        <Title rgb={hexToRgb(blue)}>Complete registration</Title>

                                                                                </CardTitle>
                                                                                <CardBody>
                                                                                        <M bottom="1em">
                                                                                                <W value="100%">
                                                                                                        <Text fontSize="1.2em" fontWeight={600} >
                                                                                                                Welcome <br /> {user.email}
                                                                                                        </Text>
                                                                                                </W>
                                                                                        </M>
                                                                                        <M bottom="2em">
                                                                                                You have to connect this account with
                                                                                                <Link href="https://webiste.arcanediver.now.sh" target="_blank" rgb={hexToRgb(green)}>
                                                                                                        <Text fontSize="1.1em" fontWeight={600} rgb={hexToRgb(green)}>Easily IoT</Text>
                                                                                                </Link>
                                                                                        </M>
                                                                                        <ConnectButton onClick={redirectHandler}/>
                                                                                </CardBody>
                                                                        </TextCenter>
                                                                </React.Fragment>
                                                                : <div>
                                                                        <MetroSpinner loading color="#27cffe" size={300} sizeUnit="px" />
                                                                        <div style={{
                                                                                position: "absolute",
                                                                                top: "50%",
                                                                                left: "50%",
                                                                                transform: "translate(-50%, -50%)",
                                                                                fontSize: "2em"
                                                                        }}>Loading...</div>
                                                                </div>

                                                }
                                        </Card>
                                </Flex>
                        </Bg>
                </FullPage>
        )
}

CompleteRegistration.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
        const { token } = nextCookies(ctx);

        console.log(token);

        if (!token) {
                return redirect("/login", ctx);
        }

        let user: User | null;

        if (user = await getUserFromToken(token)) {
                if (isValidUser(user)) {
                        return redirect("/dashboard", ctx);
                }

                return {
                        user
                };
        } else
                return redirect("/login", ctx);
        
        
}

export default CompleteRegistration;