import React, { useEffect, useState, useRef, useMemo} from 'react';

import { ReactComponent as RightArrow } from '../../assets/icons/right-arrow.svg';

import { useWindowSize } from '../../utils';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactChild[];
    gallery: string | undefined;
}
 
const Carousel: React.FC<CarouselProps> = ({ children, gallery }) => {
    const [index, setIndex] = useState<number>(0);
	const [translation, setTranslation] = useState(0);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const galleryWrapper = useRef<HTMLDivElement>(null);
    const screenSize = useWindowSize();
    
    useEffect(() => {
        setIndex(0);
    }, [gallery])
    
    useEffect(() => {
        if (!!galleryWrapper && !!galleryWrapper.current) {
            const rect = galleryWrapper.current.getBoundingClientRect();
            setRect(rect);
        }
    }, [galleryWrapper, screenSize])

    useEffect(() => {
        if (!!rect) {
            setTranslation(-index * rect.width);
        }
    }, [index, rect]);

    const childrenBlocks: Array<Array<React.ReactChild>> | undefined = useMemo(() => {
        if (!!rect && children.length >= 1) {
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
    }, [rect, children]);
    
    return ( 
        <div className='w-full h-full relative overflow-hidden' ref={galleryWrapper}> 
			<div 
				className='h-full w-full transition duration-700 ease-in-out flex'
	          	style={{
					transform: `translate(${translation}px, 0)`,
					WebkitTransform: `translate(${translation}px, 0)`
	            }}
	         >
	            {
                    !!childrenBlocks && !!rect &&
                    childrenBlocks?.map((block, i) => (
                        <div 
                            className='flex justify-center flex-shrink-0 w-full'
                            style={{width: rect.width }}
                            key={i}
                        >
                            {block}
                        </div>
                    ))
                }
	        </div>
            {
                childrenBlocks &&
                <div 
                    className={`absolute left-0 top-0 bottom-0 px-2 flex items-center transition duration-300 ${index <= 0 ? 'opacity-0 pointer-events-none' : 'opacity-1'}`}
                >
                    <div 
                        className='rounded-full w-12 h-12 bg-gray-100 flex justify-center items-center hover:shadow-md cursor-pointer transition-shadow duration-300' 
                        onClick={() => setIndex(index - 1)}
                    >
                        <RightArrow className='w-2/4 h-2/4 transform -rotate-180' />
                    </div>
                </div>
            }
            {
                childrenBlocks &&
                <div 
                    className={`absolute right-0 top-0 bottom-0 px-2 flex items-center transition duration-300 ${index >= childrenBlocks.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-1'}`}
                >
                    <div 
                        className='rounded-full w-12 h-12 bg-gray-100 flex justify-center items-center hover:shadow-md cursor-pointer transition-shadow duration-300' 
                        onClick={() => setIndex(index + 1)}
                    >
                        <RightArrow className='w-2/4 h-2/4' />
                    </div>
                </div>
            }
		</div>
     );
}
 
export default Carousel;