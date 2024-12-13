import { useIntegrationService } from '@/services/integration';
import { useIntegrationRepository } from '@/adapters/repositories/IntegrationRepository';
import { ApiResponse, InitiatePaymentData, InitiatePaymentResponseData } from '@/types/integration';
import { renderHook } from '@testing-library/react';

jest.mock('@/adapters/repositories/IntegrationRepository');

describe('useIntegrationService', () => {
    const mockInitiatePayment = jest.fn();

    beforeEach(() => {
        (useIntegrationRepository as jest.Mock).mockReturnValue({ initiatePayment: mockInitiatePayment });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call initiatePayment on the repository with correct data', async () => {
        const mockResponse: ApiResponse<InitiatePaymentResponseData> = {
            status: true,
            data: {
                id: 123,
                accessCode: 'access_code_123',
                url: 'https://example.com/payment/123',
                amount: 1000,
                currency: 'NGN',
                transactionReference: 'txn123',
                callBackUrl: 'https://example.com/payment/123/callback',
                customerEmail: 'john.doe@mail.com',
                customerFirstName: 'John',
                customerLastName: 'Doe',
            },
            message: '',
        };

        mockInitiatePayment.mockResolvedValueOnce(mockResponse);
        const { result } = renderHook(() => useIntegrationService());

        const paymentData: InitiatePaymentData = {
            customerFirstName: 'John',
            customerLastName: 'Doe',
            customerEmail: 'john.doe@mail.com',
            amount: 1000,
            transactionReference: 'txn123',
            currency: 'NGN',
        };

        const response = await result.current.initiatePayment(paymentData);

        expect(mockInitiatePayment).toHaveBeenCalledWith(paymentData);
        expect(response).toEqual(mockResponse);
    });
});
