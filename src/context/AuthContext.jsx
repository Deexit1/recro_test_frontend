import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthUser } from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: user, isLoading, isError } = useAuthUser();

    const [auth, setAuth] = useState({ user: null, loading: true });

    useEffect(() => {
        if (isLoading) {
            setAuth({ user: null, loading: true });
        } else if (user) {
            setAuth({ user, loading: false });
        } else if (isError) {
            setAuth({ user: null, loading: false });
        }
    }, [isLoading, user, isError]);

    const setUser = (user) => {
        setAuth({ user, loading: false });
    };
    return (
        <AuthContext.Provider value={{ ...auth, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
