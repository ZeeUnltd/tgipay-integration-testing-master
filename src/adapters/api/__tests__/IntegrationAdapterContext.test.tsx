import { render, screen } from '@testing-library/react';
import { ApiAdapterProvider, useApiAdapter } from '@/adapters/api/ApiAdapterContext';
import { ApiAdapter } from '@/types/api';
import React from 'react';

// Mock implementation of ApiAdapter
const mockApiAdapter: ApiAdapter = {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(), // Mock the put method
    delete: jest.fn(), // Mock the delete method
};

const TestComponent: React.FC = () => {
    const apiAdapter = useApiAdapter();
    return (
        <div>
            <span data-testid="api-adapter">
                {apiAdapter ? 'Context is provided' : 'Context is not provided'}
            </span>
        </div>
    );
};

describe('ApiAdapterProvider', () => {
    it('should provide the ApiAdapter context to its children', () => {
        render(
            <ApiAdapterProvider adapter={mockApiAdapter}>
                <TestComponent />
            </ApiAdapterProvider>
        );

        expect(screen.getByTestId('api-adapter').textContent).toBe('Context is provided');
    });

    it('should throw an error if useApiAdapter is used outside of ApiAdapterProvider', () => {
        const TestComponentOutsideProvider: React.FC = () => {
            try {
                useApiAdapter();
                return <div>No error</div>;
            } catch (error) {
                return <div>{(error as Error).message}</div>;
            }
        };

        render(<TestComponentOutsideProvider />);
        expect(screen.getByText('useApiAdapter must be used within an ApiAdapterProvider')).toBeInTheDocument();
    });
});
