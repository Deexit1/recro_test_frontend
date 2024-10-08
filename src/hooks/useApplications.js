import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';

// Fetch all applications
export const useApplications = () => {
    return useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/applications', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            return data;
        }
    });
};

// Fetch a single application by ID
export const useApplication = (id) => {
    return useQuery(['application', id], async () => {
        const { data } = await axiosInstance.get(`/applications/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
        return data;
    }, {
        enabled: !!id,
    });
};

// Add a new application
export const useAddApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(async (newApplication) => {
        const { data } = await axiosInstance.post('/applications', newApplication, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
        return data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['applications']);
        },
    });
};

// Update an application
export const useUpdateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({ id, updatedApplication }) => {
        const { data } = await axiosInstance.put(`/applications/${id}`, updatedApplication, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
        return data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['applications']);
            queryClient.invalidateQueries(['application']);
        },
    });
};

// Delete an application
export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(async (id) => {
        await axiosInstance.delete(`/applications/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['applications']);
        },
    });
};
