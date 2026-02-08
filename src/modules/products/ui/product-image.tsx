import Image from 'next/image';

interface ProductImageProps {
    imgUrl?: string;
    alt: string;
}

export function ProductImage({ imgUrl, alt }: ProductImageProps) {
    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5]">
                {imgUrl ? (
                    <Image
                        src={imgUrl}
                        alt={alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
                        Image Not Available
                    </div>
                )}
            </div>
        </div>
    );
}
