"use client";

import { Suspense } from "react";
import FullscreenLoader from "@/components/fullscreen-loader";
import PaymentSuccess from "@/components/payment-success";

const CallbackPage = () => {
  return (
    <Suspense fallback={<FullscreenLoader />}>
        <PaymentSuccess />
    </Suspense>
  );
};

export default CallbackPage;
