import { useEffect, useState } from 'react';

import { usePrevious } from '../../utils';

export interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | undefined;
    alt: string;
    objectFit?: 'object-contain' | 'object-cover';
    onLoad?: () => void;
}
 
const CustomImage: React.FC<CustomImageProps> = ({ src, alt, objectFit = 'object-contain', onLoad, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const previousSrc = usePrevious<string>(src);

    useEffect(() => {
        if (previousSrc !== src) {
            setImageLoaded(false);
        }
    }, [previousSrc, src])

    return ( 
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
                transition-opacity duration-500 
                ${!src && 'hidden'}
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                ${objectFit === 'object-contain' && 'object-contain h-full max-w-full'}
                ${objectFit === 'object-cover' && 'object-cover min-h-full min-w-full'}
            `}
            {...props}
        />
     );
}
 
export default CustomImage;