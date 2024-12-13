import { useIntegrationRepository } from '@/adapters/repositories/IntegrationRepository';
import { InitiatePaymentData, ApiResponse, InitiatePaymentResponseData } from '@/types/integration';

export const useIntegrationService = () => {
    const repository = useIntegrationRepository();

    const initiatePayment = (data: InitiatePaymentData): Promise<ApiResponse<InitiatePaymentResponseData>> => {
        return repository.initiatePayment(data);
    };

    return { initiatePayment };
};
