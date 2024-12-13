// adapters/repositories/IntegrationRepository.ts
import { ApiResponse, InitiatePaymentData, InitiatePaymentResponseData } from '@/types/integration';
import { useApiAdapter } from '../api/ApiAdapterContext';

export const useIntegrationRepository = () => {
    const apiAdapter = useApiAdapter();

    const initiatePayment = async (data: InitiatePaymentData): Promise<ApiResponse<InitiatePaymentResponseData>> => {
        return await apiAdapter.post<InitiatePaymentData, ApiResponse<InitiatePaymentResponseData>>('/api/v1/payment/initiate', data);
    };

    return { initiatePayment };
};
