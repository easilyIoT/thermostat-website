import { useState, useEffect } from "react"
import axios from "axios"
import { load } from 'react-cookies';

import { User } from "../interfaces/api"
import { API_URL } from '../config/index';

export default (): [User | undefined, () => Promise<void>] => {
        const [user, setUser] = useState<User>();
        const token = load("token");
        
        
        const fetchUser = async () => {
                try {
                        const { data } = await axios.get<{ user: User }>(`${API_URL}/auth/user`, {
                                headers: { Authorization: token }
                        });

                        setUser(data.user);
                } catch (e) {
                        console.error(e.response.data);  
                }
        }

        
        useEffect(() => {
                if (!user)
                        fetchUser();
        }, []);


        return [user, fetchUser];
}