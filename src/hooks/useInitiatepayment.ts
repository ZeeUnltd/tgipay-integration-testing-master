import { useIntegrationService } from "@/services/integration";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useInitiatePayment = () => {
    const router = useRouter();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const service = useIntegrationService();

    const closePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const { mutate, data: response, error, isPending } = useMutation({
        mutationFn: service.initiatePayment,
        onSuccess: (response) => {

            if (response?.status && response.data.url) {
                router.replace(response.data.url);
            } else {
                console.error("Unexpected response format:", response);
            }
        },
        onError: (error: AxiosError) => {          
            console.log(error);
        },
    });

    const isLoading = isPending;
    return { mutate, response, error, isLoading, showPaymentModal, closePaymentModal };
};

export { useInitiatePayment };
