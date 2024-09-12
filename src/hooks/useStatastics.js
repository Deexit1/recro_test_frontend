import { axiosInstance } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';


// Hook to fetch statistics comparison (candidates, applications, etc.)
export const useStatisticsComparison = () => {
    return useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/dashboard/dashboard-cards');
            return data;
        },
        staleTime: 0, // 5 minutes cache
        retry: 2, // Retry failed requests up to 2 times
    });
};
