import React from 'react';


import { GalleryItem } from '../../firebase.utils';
import CustomImage from '../custom-image/custom-image';

export interface ImageGridProps extends React.HTMLAttributes<HTMLDivElement> {
    galleryItems: GalleryItem[];
}
 
const ImageGrid: React.FC<ImageGridProps> = ({ galleryItems }) => {
    
    return ( 
        <div className='w-full grid grid-cols-4 gap-2'> 
            {
                galleryItems.map((item, i) => (
                    <div 
                        key={i}
                        className={`
                            w-full h-full border-2 border-black transition duration-500 overflow-hidden cursor-pointer
                        `}
                        // onClick={()=>setIndex(i)}
                    >
                        <CustomImage 
                            src={item.thumbnailUrl} 
                            alt={item.alt || item.image}
                            objectFit='object-cover'
                        />
                    </div>
                ))
            }
		</div>
     );
}
 
export default ImageGrid;