import React, { useCallback, useEffect, useState, useRef, useMemo} from 'react';

import { useWindowSize } from '../../utils';

export interface CarouselProps {
    children: React.ReactChild[]
}
 
const Carousel: React.FC<CarouselProps> = ({ children }) => {
	const [translation, setTranslation] = useState(0);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const galleryWrapper = useRef<HTMLDivElement>(null);
    const screenSize = useWindowSize();
    
    useEffect(() => {
        if (!!galleryWrapper && !!galleryWrapper.current && !rect) {
            const rect = galleryWrapper.current.getBoundingClientRect();
            setRect(rect);
        }
    }, [galleryWrapper, screenSize])

	const nextImage = useCallback(() => {
	    if (!!rect) {
            setTranslation(translation - rect?.width);
        }
    }, [translation, rect])
    
	const previousImage = useCallback(() => {
	    if (!!rect) {
            setTranslation(translation + rect?.width);
        }
    }, [translation, rect])
    
    if (!!rect) {
        console.log();
    }

    const childrenBlocks: Array<Array<React.ReactChild>> | undefined = useMemo(() => {
        if (!!rect && children.length > 1) {
            const childrenPerBlock = Math.floor((rect.width - 128) / rect.height);
            const blockArray: Array<Array<React.ReactChild>> = [];

            let currentBlock: Array<React.ReactChild> = [];

            children.forEach((child, i) => {
                const fraction = i / childrenPerBlock;
                if (fraction < blockArray.length + 1) {
                    currentBlock.push(child);
                } else {
                    blockArray.push(currentBlock);
                    currentBlock = [child];
                }
            })

            if (currentBlock.length >= 1) {
                blockArray.push(currentBlock);
            }

            return blockArray;
        }
    }, [rect, children])

    console.log(childrenBlocks);
    
    return ( 
        <div className='w-full h-full relative overflow-hidden' ref={galleryWrapper}> 
			<div 
				className='h-full w-full transition duration-700 ease-in-out flex overflow-x-hidden'
	          	style={{
					transform: `translate(${translation}px, 0)`,
					WebkitTransform: `translate(${translation}px, 0)`
	            }}
	         >
	            {
                    children
                }
	        </div>
            <div 
                className='absolute left-0 top-0 bottom-0 px-2 flex items-center'
                
            >
                <div className='rounded-full w-12 h-12 bg-purple-300' onClick={previousImage} />
            </div>
            <div 
                className='absolute right-0 top-0 bottom-0 px-2 flex items-center'
                
            >
                <div className='rounded-full w-12 h-12 bg-purple-300' onClick={nextImage} />
            </div>
		</div>
     );
}
 
export default Carousel;