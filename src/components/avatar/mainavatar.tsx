import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface mainavatarprops {
    src: string;
    alt: string;
    fallback: string;
}

function MainAvatar({src, alt, fallback}: mainavatarprops) {
    return (
        <Avatar className="h-10 w-10">
            <AvatarImage
                className="object-cover"
                src={src}
                alt={alt}
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}

export default MainAvatar