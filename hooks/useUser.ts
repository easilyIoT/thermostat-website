import { useState, useEffect } from "react"
import axios from "axios"
import { load } from 'react-cookies';

import { User, useMeQuery } from "../graphql/types";
import { API_URL, OAUTH_API_URL } from '../config/index';

export default (): [User | undefined, Function, Function, Function] => {
        const { data, loading, error, fetchMore } = useMeQuery();
        const [user, setUser] = useState<User>();
        

        useEffect(() => {
                setUser(data?.me);
        }, [data]);

        useEffect(() => {
                if (error) console.error(error);
        }, [error]);
        

        const validateToken = async () => {
                if (!user) return;

                try {
                        await axios.post(`${OAUTH_API_URL}/auth/verify`, {}, {
                                headers: {
                                        Authorization: user.access_token
                                }
                        });
                } catch (e) {
                        regenToken();
                }
        }

        const regenToken = async () => {
                const token = load("token");

                try {
                        await axios.post(`${API_URL}/auth/regenToken`, {}, {
                                headers: {
                                        Authorization: token
                                }
                        });

                        fetchMore({} as any);
                } catch (e) {
                        console.error(e.response || e);
                }
        }
        return [user, fetchMore, validateToken, regenToken];
}