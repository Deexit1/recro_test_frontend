import { useAuth } from '@/context/AuthContext';
import { axiosInstance } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Hook to fetch current user session (after login)
export const useAuthUser = () => {
    return useQuery({
        queryKey: ['authUser'], queryFn: async () => {
            const { data } = await axiosInstance.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            return data;
        },
        retry: false,
        staleTime: 0,
    });
};

// Hook to handle login
export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: async (loginData) => {
            const { data } = await axiosInstance.post('/auth/login', loginData);
            return data;
        },
        onSuccess: (data) => {
            // Invalidate and refetch the authenticated user
            setUser(data);
            Cookies.set('token', data.token);
            queryClient.invalidateQueries(['authUser']);
            navigate('/dashboard');
        },
    });
};

// Hook to handle registration
export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (registerData) => {
            const { data } = await axiosInstance.post('/auth/register', registerData);
            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch the authenticated user
            queryClient.invalidateQueries(['authUser']);
        },
    });
};
