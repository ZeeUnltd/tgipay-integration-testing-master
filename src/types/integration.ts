
export interface InitiatePaymentResponseData {
    id: number;
    accessCode: string;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    transactionReference: string;
    url: string;
    callBackUrl: string;
    amount: number;
    currency: string;
}export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
export interface InitiatePaymentData {
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    amount: number;
    transactionReference: string;
    currency: string;
}

