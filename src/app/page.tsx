"use client";
import { products, randomFirstNames, randomLastNames } from "@/lib/data";
import { v4 as uuidv4 } from "uuid";
import FullscreenLoader from "@/components/fullscreen-loader";
import Product from "@/components/product/Product";
import { InitiatePaymentData } from '@/types/integration';
import { useInitiatePayment } from "@/hooks/useInitiatepayment";

export default function IndexPage() {
    const { mutate, isLoading } = useInitiatePayment();

    const openGateway = (productId: number, price: number) => {
        const customerFirstName = randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)];
        const customerLastName = randomLastNames[Math.floor(Math.random() * randomLastNames.length)];

        const paymentData: InitiatePaymentData = {
            customerFirstName,
            customerLastName,
            customerEmail: `${customerFirstName.toLowerCase()}.${customerLastName.toLowerCase()}+${productId}@mailcrop.cc`,
            amount: price,
            transactionReference: uuidv4(),
            currency: "NGN",
        };

        mutate(paymentData);
    };

    return (
        <section className="container mx-auto grid justify-center pb-8 pt-6 md:py-10" data-cy="index-page">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[980px]" data-cy="product-grid">
                {products.map((product) => (
                    <Product product={product} key={product.id} openGateway={openGateway} />
                ))}
            </div>

            <FullscreenLoader show={isLoading} data-cy="fullscreen-loader" />
        </section>
    );
}
