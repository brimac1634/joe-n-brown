import { useEffect, useState } from 'react';

export interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | undefined;
    overlay?: string | undefined;
    alt: string;
    objectFit?: 'object-contain' | 'object-cover';
    onLoad?: () => void;
    onOverlayLoad?: () => void;
}
 
const CustomImage: React.FC<CustomImageProps> = ({ src, overlay, alt, objectFit = 'object-contain', onLoad, onOverlayLoad, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [overlayLoaded, setOverlayLoaded] = useState<boolean>(false);

    useEffect(() => {
        setImageLoaded(false);
    }, [src])

    return ( 
        <div className='w-full h-full relative'>
            <img 
                src={src}
                alt={alt}
                onLoad={() => {
                    setImageLoaded(true);
                    if (!!onLoad) {
                        onLoad();
                    }
                }}
                className={`
                    transition-opacity duration-500 mx-auto
                    ${!src && 'hidden'}
                    ${(imageLoaded || overlay) && 'opacity-100'}
                    ${!imageLoaded && !overlay && 'opacity-0'}
                    ${objectFit === 'object-contain' && 'object-contain h-full max-w-full'}
                    ${objectFit === 'object-cover' && 'object-cover min-h-full min-w-full'}
                `}
                key={src}
                {...props}
            />
            {
                overlay &&
                <img 
                    src={overlay}
                    alt={alt}
                    onLoad={() => {
                        setOverlayLoaded(true);
                        if (!!onOverlayLoad) {
                            onOverlayLoad();
                        }
                    }}
                    className={`
                        absolute top-0 bottom-0 left-1/2
                        transform -translate-x-2/4
                        transition-opacity duration-1000
                        ${(imageLoaded || !overlayLoaded) ? 'opacity-0' : 'opacity-100'}
                        ${objectFit === 'object-contain' && 'object-contain h-full max-w-full'}
                        ${objectFit === 'object-cover' && 'object-cover min-h-full min-w-full'}
                    `}
                    style={{
                        filter: 'blur(2px)',
                        clipPath: 'inset(-0)'
                    }}
                    key={overlay}
                    {...props}
                />
            }
        </div>
     );
}
 
export default CustomImage;