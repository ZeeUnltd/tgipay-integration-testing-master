import { ApiAdapter } from '@/types/api';
import { createContext, useContext } from 'react';

const ApiAdapterContext = createContext<ApiAdapter | undefined>(undefined);

export const useApiAdapter = () => {
    const context = useContext(ApiAdapterContext);
    if (!context) {
        throw new Error('useApiAdapter must be used within an ApiAdapterProvider');
    }
    return context;
};

export const ApiAdapterProvider: React.FC<{ adapter: ApiAdapter; children: React.ReactNode }> = ({ adapter, children }) => (
    <ApiAdapterContext.Provider value={adapter}>
        {children}
    </ApiAdapterContext.Provider>
);
