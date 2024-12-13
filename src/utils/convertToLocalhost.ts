
export const convertToLocalhost = (originalUrl: string) => {
    const paymentId = originalUrl.split('/').pop();
    const localUrl = `http://localhost:3000/pay-now/${paymentId}`;
    return localUrl
}
