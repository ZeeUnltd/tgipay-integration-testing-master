
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const eventData = await req.json();

        // Process the webhook payload here (e.g., update order status in your database)
        console.log('Received webhook event:', eventData);

        // Respond with a status of 200 to acknowledge receipt
        return NextResponse.json({ status: 'success', message: 'Webhook received' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}
