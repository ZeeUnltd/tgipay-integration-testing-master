import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIntegrationService } from '@/services/integration';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useInitiatePayment } from './useInitiatepayment';

jest.mock('@/services/integration');
jest.mock('next/navigation');

describe('useInitiatePayment', () => {
    let mockReplace: jest.Mock;
    let mockInitiatePayment: jest.Mock;

    // Initialize mocks before each test
    beforeEach(() => {
        mockReplace = jest.fn();
        mockInitiatePayment = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
        (useIntegrationService as jest.Mock).mockReturnValue({ initiatePayment: mockInitiatePayment });
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // Create a QueryClient for the test environment
    const createQueryClient = () => new QueryClient();

    // Wrapper to include QueryClientProvider in the test environment
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
    );

    it('should initialize with default states', () => {
        const { result } = renderHook(() => useInitiatePayment(), { wrapper });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.showPaymentModal).toBe(false);
        expect(result.current.response).toBeUndefined();
        expect(result.current.error).toBeNull();
    });

    it('should handle successful payment initiation', async () => {
        // Set up the mock response
        const mockResponse = {
            status: true,
            data: {
                url: 'https://example.com/payment/123',
            },
        };
    
        // Mock the initiatePayment method to return the mock response
        mockInitiatePayment.mockResolvedValueOnce(mockResponse);
    
        // Render the hook with the QueryClientProvider
        const { result } = renderHook(() => useInitiatePayment(), { wrapper });
    
        // Trigger the mutation
        await act(async () => {
             result.current.mutate({
                customerFirstName: 'John',
                customerLastName: 'Doe',
                customerEmail: 'john.doe@example.com',
                amount: 1000,
                transactionReference: 'txn123',
                currency: 'USD',
            });
        });        
    
        // Ensure the initiatePayment method was called with the correct data
        expect(mockInitiatePayment).toHaveBeenCalledWith({
            customerFirstName: 'John',
            customerLastName: 'Doe',
            customerEmail: 'john.doe@example.com',
            amount: 1000,
            transactionReference: 'txn123',
            currency: 'USD',
        });
    
        // Ensure the router replace was called with the correct URL
        expect(mockReplace).toHaveBeenCalledWith('https://example.com/payment/123');
    
        // Ensure the hook's data is set correctly
        await waitFor(() => {
            expect(result.current.response).toEqual(mockResponse);
        });    
        // Ensure loading state is correctly updated
        expect(result.current.isLoading).toBe(false);
    });
    
    

    it('should handle error in payment initiation', async () => {
        const mockError = new AxiosError('Failed to initiate payment');

        mockInitiatePayment.mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useInitiatePayment(), { wrapper });

        await act(async () => {
            result.current.mutate({
                customerFirstName: '',
                customerLastName: '',
                customerEmail: '',
                amount: 0,
                transactionReference: '',
                currency: '',
            });
        });

        expect(mockInitiatePayment).toHaveBeenCalledWith({
            customerFirstName: '',
            customerLastName: '',
            customerEmail: '',
            amount: 0,
            transactionReference: '',
            currency: '',
        });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(mockError);
    });

    it('should handle show and close payment modal', () => {
        const { result } = renderHook(() => useInitiatePayment(), { wrapper });

        act(() => {
            result.current.closePaymentModal();
        });

        expect(result.current.showPaymentModal).toBe(false);

        act(() => {
            result.current.showPaymentModal = true;
        });

        expect(result.current.showPaymentModal).toBe(true);
    });

    it('should handle unexpected response format', async () => {
        // Set up the mock response with unexpected format
        const mockResponse = {
            status: true,
            data: {},
        };
        
        // Mock the initiatePayment method to return the mock response
        mockInitiatePayment.mockResolvedValueOnce(mockResponse);
        
        // Render the hook with the QueryClientProvider
        const { result } = renderHook(() => useInitiatePayment(), { wrapper });
        
        // Trigger the mutation
        await act(async () => {
            result.current.mutate({
                customerFirstName: 'John',
                customerLastName: 'Doe',
                customerEmail: 'john.doe@example.com',
                amount: 1000,
                transactionReference: 'txn123',
                currency: 'USD',
            });
        });
        
        // Ensure the router replace was not called
        expect(mockReplace).not.toHaveBeenCalled();
        
        // Ensure the console.error was called for unexpected response
        // You might need to spy on console.error to assert this
        expect(console.error).toHaveBeenCalledWith("Unexpected response format:", mockResponse);
    });
    
});
