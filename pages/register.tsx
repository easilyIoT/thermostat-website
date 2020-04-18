import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next';
import NextLink from 'next/link';
import { useRouter } from "next/router"
import { red, orange } from "colors.css/js/colors"
import { useFormik, FormikHelpers } from "formik"
import * as Yup from "yup"
import axios from "axios"
import cookies from "react-cookies"
import nextCookies from 'next-cookies';

import { redirect, getUserFromToken, isValidUser } from "../utils"

import Flex from "../components/Flex"
import FullPage from "../components/FullPage"
import Bg from "../components/Bg"
import Card, { CardTitle } from "../components/Card"
import Form, { FormInput, FormButton, FormInputGroup } from "../components/Form"
import Title from "../components/Title"
import M from "../components/M"
import Link from "../components/Link"

import { API_URL } from "../config"

import { hexToRgb } from "../utils/styles"


type Props = {

}

type FormValues = {
        email: string,
        password: string
};

type TokenResponse = {
        token: string,
}

const Register: NextPage<Props> = () => {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const router = useRouter();

        const handleRegister = async ({ email, password }: FormValues, actions: FormikHelpers<FormValues>) => {

                try {
                        setIsLoading(true);

                        const { data } = await axios.post<TokenResponse>(`${API_URL}/auth/register`, {
                                email,
                                password
                        });

                        console.log(data);

                        cookies.save("token", data.token, {
                                path: "/"
                        });

                        router.push("/complete_registration");

                } catch (e) {
                        console.error(e.response);
                } finally {
                        setIsLoading(false);
                }

                actions.setSubmitting(false);
                actions.resetForm({
                        values: {
                                email,
                                password: "",
                        }
                });;
        }

        const { errors, touched, handleChange, values, handleSubmit } = useFormik<FormValues>({
                initialValues: {
                        email: "",
                        password: ""
                },
                onSubmit: handleRegister,
                validationSchema: Yup.object().shape<FormValues>({
                        email: Yup.string().email(),
                        password: Yup.string().min(6).max(20)
                }),

        });
        return (
                <FullPage>
                        <Bg rgb={hexToRgb(red)}>
                                <Flex align="center" justify="center" direction="column">
                                        <Card>
                                                <Form onSubmit={handleSubmit }>
                                                        <CardTitle>
                                                                <Title rgb={hexToRgb(orange)}>Easily Thermostat</Title>
								Register
							</CardTitle>

                                                        <FormInputGroup rgb={hexToRgb(orange)}>
                                                                <i className="fas fa-envelope fa-2x" />
                                                                <FormInput
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        value={values.email}
                                                                        onChange={handleChange}
                                                                />
                                                        </FormInputGroup>


                                                        <FormInputGroup rgb={hexToRgb(orange)}>
                                                                <i className="fas fa-lock fa-2x" />
                                                                <FormInput
                                                                        type="password"
                                                                        name="password"
                                                                        placeholder="Password"
                                                                        value={values.password}
                                                                        onChange={handleChange}
                                                                />
                                                        </FormInputGroup>

                                                        <FormButton onSubmit={handleSubmit as any}>{
                                                                !isLoading
                                                                        ? "Submit"
                                                                        : <div><i className="fas fa-spinner fa-spin"></i></div>
                                                        }</FormButton>
                                                        <M top="1em">
                                                                Already have an account? <NextLink href="/login"><Link rgb={hexToRgb(red)}>Login</Link></NextLink>
                                                        </M>
                                                </Form>
                                        </Card>
                                </Flex>
                        </Bg>
                </FullPage>
        )
}
Register.getInitialProps = async (ctx: NextPageContext) => {
        const { token } = nextCookies(ctx);


        if (!token) {
                return {};
        }

        let user;

        if (user = await getUserFromToken(token))
                if (isValidUser(user)) {
                        redirect("/dashboard", ctx);
                        return {};
                }

        return {};
}

export default Register
