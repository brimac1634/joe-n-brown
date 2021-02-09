import { useState } from 'react';

export interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | undefined;
    alt: string;
}
 
const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    if (!src) return <div className='h-full max-w-full'/>
    return ( 
        <img 
            src={src}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            className={`
                h-full max-w-full object-contain transition-opacity duration-500 
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            {...props}
        />
     );
}
 
export default CustomImage;