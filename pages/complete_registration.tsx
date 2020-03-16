import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import axios from "axios"
import { MetroSpinner } from "react-spinners-kit"
import cookies from "react-cookies"
import { blue, green } from "colors.css/js/colors"

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

import { hexToRgb } from "../utils/colors"

import { User } from "../interfaces/api"

import { API_URL } from "../config"

type Props = {

}

const CompleteRegistration: NextPage<Props> = () => {
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
                if (user === null) {
                        fetchUser();
                }
        }, [user]);

        const fetchUser = async () => {

                if (!isLoading) setIsLoading(true);

                try {
                        const token = cookies.load("token");

                        const { data } = await axios.get<{ user: User }>(`${API_URL}/auth/user`, {
                                headers: { Authorization: token }
                        })

                        setUser(data.user);
                } catch (e) {
                        console.log(e.response.data);
                } finally {
                        setIsLoading(false);
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
                                                                                        <M bottom="1em">
                                                                                                You have to connect this account with <Link href="https://webiste.arcanediver.now.sh" target="_blank"><Text fontSize="1.1em" fontWeight={600} rgb={hexToRgb(green)}>Easily IoT</Text></Link>
                                                                                        </M>
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

export default CompleteRegistration;