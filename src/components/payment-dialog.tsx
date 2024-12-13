import React, { FC } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from './ui/button'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    url: string | undefined;
}

const PaymentDialog: FC<Props> = ({ isOpen, onClose, url }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Payment Gateway</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <iframe
                        src={url}
                        className="w-full h-[500px]"
                        title="Payment Gateway"
                        allowFullScreen
                    ></iframe>
                </DialogDescription>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentDialog;
