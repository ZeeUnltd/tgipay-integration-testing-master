"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from 'next-themes'
import { queryClient } from "@/adapters/api/queryClient";
import { ApiAdapterProvider } from "@/adapters/api/ApiAdapterContext";
import {  createAxiosApiAdapter } from "@/adapters/api/IntegrationAdapter";

const apiAdapter = createAxiosApiAdapter();

function Providers({ children }: Readonly<React.PropsWithChildren>): React.JSX.Element {

    return (
        <QueryClientProvider client={queryClient}>
            <ApiAdapterProvider adapter={apiAdapter}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </ApiAdapterProvider>
        </QueryClientProvider>
    );
}

export default Providers;