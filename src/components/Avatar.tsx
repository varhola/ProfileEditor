interface AvatarProps {
    src: string,
    alt: string,
}

export const Avatar = ({ src, alt }: AvatarProps) => {
    return (
        <img
            className="p-2 rounded-full object-cover h-28 w-28"
            src={src}
            alt={alt}
        />
    )
}
