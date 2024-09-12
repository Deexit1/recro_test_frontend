import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';

// Fetch all applications
export const useApplications = () => {
    return useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/applications');
            return data;
        }
    });
};

// Fetch a single application by ID
export const useApplication = (id) => {
    return useQuery(['application', id], async () => {
        const { data } = await axiosInstance.get(`/applications/${id}`);
        return data;
    }, {
        enabled: !!id,
    });
};

// Add a new application
export const useAddApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(async (newApplication) => {
        const { data } = await axiosInstance.post('/applications', newApplication);
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
        const { data } = await axiosInstance.put(`/applications/${id}`, updatedApplication);
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
        await axiosInstance.delete(`/applications/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['applications']);
        },
    });
};
