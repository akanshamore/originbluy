
import React from 'react';
import { useStorageState } from './useStorageState';
import { URL } from './helpers/urls';


const AuthContext = React.createContext<{
    signIn: ({ email, password }: { email: string; password: string; }) => Promise<any> | null,
    register: ({ email, password }: { email: string; password: string; }) => Promise<any> | null
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    register: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: async ({ email, password }: { email: string, password: string }) => {

                    // Perform sign-in logic here

                    try {
                        const response = await fetch(URL.LOGIN_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email, password })
                        })
                        const result = await response.json()
                        if (result.error) {
                            throw new Error(result.error)
                        }

                        setSession(result.token);
                        return { success: true, token: result.token }

                    } catch (error) {


                        return { success: false, message: error.message }

                    }


                },
                register: async ({ email, password }: { email: string, password: string }) => {

                    // Perform sign-in logic here

                    try {
                        const response = await fetch(URL.REGISTER_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email, password })
                        })
                        const result = await response.json()
                        if (result.error) {
                            throw new Error(result.error)
                        }

                        setSession(result.token);
                        return { success: true, token: result.token }

                    } catch (error) {

                        console.log('error', error)
                        return { success: false, message: error.message }

                    }


                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
