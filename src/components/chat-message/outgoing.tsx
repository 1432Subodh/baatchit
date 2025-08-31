import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from '../ui/card'
import { Message } from '../../../interface/message'



function Outgoing(msgData: Message) {
    const {src, alt, fallback, message, time, status} = msgData;

    return (
        <div className="flex items-end gap-1 justify-end mb-1">
            <div className="max-w-xs">
                <Card className="rounded-xl rounded-tr-none px-3 py-2 bg-primary">
                    <p className="text-sm text-primary-foreground">{message}</p>
                </Card>
                <div className="flex justify-end items-center gap-1 mt-1 px-2">
                    <p className="text-xs text-muted-foreground text-right">{time}</p>
                    <span className="text-xs text-blue-500 font-medium">{status}</span>
                </div>
            </div>
            <Avatar className="h-6 w-6">
                <AvatarImage
                    className="object-cover"
                    src={src}
                    alt={alt}
                />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Outgoing