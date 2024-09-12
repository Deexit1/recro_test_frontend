import { axiosInstance } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

// Fetch all candidates
export const useCandidates = () => {
    return useQuery({
        queryKey: ['candidates'], queryFn: async () => {
            const { data } = await axiosInstance.get('/candidates', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            return data;
        }
    });
};

// Fetch a single candidate by ID
export const useCandidate = (id) => {
    return useQuery({
        queryKey: ['candidate', id], queryFn: async () => {
            const { data } = await axiosInstance.get(`/candidates/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            return data;
        },
        enabled: !!id,  // Query only runs if `id` is provided
    });
};

// Add a new candidate
export const useAddCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCandidate) => {
            const { data } = await axiosInstance.post('/candidates', newCandidate, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['candidates']);
        }
    });
};

// Update a candidate
export const useUpdateCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updatedCandidate }) => {
            const { data } = await axiosInstance.put(`/candidates/${id}`, updatedCandidate, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['candidates']);
        },
    });

};

// Delete a candidate
export const useDeleteCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation(async (id) => {
        await axiosInstance.delete(`/candidates/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['candidates']);
        },
    });
};
