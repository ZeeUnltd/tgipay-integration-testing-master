import { InitiatePaymentData, ApiResponse, InitiatePaymentResponseData } from '@/types/integration';
import { useIntegrationRepository } from './IntegrationRepository';
import { useApiAdapter } from '../api/ApiAdapterContext';

jest.mock('../api/ApiAdapterContext'); // Mock the useApiAdapter hook

describe('Integration Repository', () => {
    const mockApiAdapter = {
        post: jest.fn(), // Mock the post method
    };

    // Mock the useApiAdapter hook to return the mocked apiAdapter
    (useApiAdapter as jest.Mock).mockReturnValue(mockApiAdapter);

    const integrationRepository = useIntegrationRepository();

    const paymentData: InitiatePaymentData = {
        customerFirstName: 'John',
        customerLastName: 'Doe',
        customerEmail: 'john.doe@mail.com',
        amount: 1000,
        transactionReference: 'txn123',
        currency: 'NGN',
    };

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

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock history between tests
    });

    it('should call apiAdapter.post with correct parameters', async () => {
        // Mock the apiAdapter.post method to return a resolved promise
        mockApiAdapter.post.mockResolvedValueOnce(mockResponse);

        // Call the initiatePayment function from the repository
        const result = await integrationRepository.initiatePayment(paymentData);

        // Check that apiAdapter.post was called with the correct URL and data
        expect(mockApiAdapter.post).toHaveBeenCalledWith(
            '/api/v1/payment/initiate', // URL
            paymentData // Data
        );

        // Ensure the result matches the mock response
        expect(result).toEqual(mockResponse);
    });

    it('should handle errors from apiAdapter.post', async () => {
        const mockError = new Error('API request failed');

        // Mock the apiAdapter.post method to return a rejected promise (error)
        mockApiAdapter.post.mockRejectedValueOnce(mockError);

        // Use try-catch block to catch the error and assert
        try {
            await integrationRepository.initiatePayment(paymentData);
        } catch (error) {
            // Ensure the error is correctly thrown and handled
            expect(error).toBe(mockError);
        }

        // Ensure apiAdapter.post was called with the correct URL and data
        expect(mockApiAdapter.post).toHaveBeenCalledWith(
            '/api/v1/payment/initiate',
            paymentData
        );
    });
});
