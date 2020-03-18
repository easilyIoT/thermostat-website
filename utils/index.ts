import { NextPageContext } from 'next';
import Router from "next/router"
import axios from "axios"
import { isUndefined } from 'util';

import { API_URL } from '../config';
import { User } from '../interfaces/api';

export const objectToURI = (object: { [key: string]: string | number | boolean }) =>
        Object.keys(object)
                .reduce((acc: string[], k: string) => {
                        acc.push(k + '=' + encodeURIComponent(object[k]));
                        return acc;
                }, []).join('&');


export const redirect = (path: string, ctx: NextPageContext, query = {}) => {
        if (ctx.res) {
                ctx.res.writeHead(302, {
                        Location: `${path}?${objectToURI(query)}`
                });

                ctx.res.end();
        } else {
                Router.push({
                        pathname: path,
                        query
                })
        }
}

export const validateToken = async (token: string): Promise<boolean> => {
        try {
                await axios.get(`${API_URL}/auth/user`, {
                        headers: { Authorization: token }
                });
                return true;
        } catch (e) {
                return false;
        }
}

export const getUserFromToken = async (token: string): Promise<User | null> => {
        try {
                const { data } = await axios.get<{ user: User }>(`${API_URL}/auth/user`, {
                        headers: { Authorization: token }
                });
                return data.user;
        } catch (e) {
                return null
        }
}

export const isValidUser = (user: User): boolean => {
        return !isUndefined(user.access_token) && !isUndefined(user.refresh_token);
}