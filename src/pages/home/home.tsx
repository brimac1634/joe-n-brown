import { useEffect, useMemo, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Carousel from '../../components/carousel/carousel';
import CustomImage from '../../components/custom-image/custom-image';

import { getGalleries, GalleryGroup, Gallery } from '../../firebase.utils';

type TParams = { gallery: string };

enum GalleryEnum {
    illustrations = 'illustrations',
    characters = 'characters',
    concepts = 'concepts',
}

export interface HomeProps {
    
}
 
const Home = ({ match }: RouteComponentProps<TParams>) => {
    const [index, setIndex] = useState<number>(0);
    const [galleryGroup, setGalleryGroup] = useState<GalleryGroup | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const [galleryImagesLoaded, setGalleryImagesLoaded] = useState<Set<GalleryEnum>>(new Set());

    const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);

    const gallery = match.params.gallery;

    async function fetchGalleries(): Promise<void> {
        try {
            const galleryGroup = await getGalleries();
            setGalleryGroup(galleryGroup);
        } catch(err) {
            setError('Uh oh, we failed to fetch the gallery. Please try again soon.')
        }
    }

    useEffect(() => {
        fetchGalleries();
    }, [])

    // useEffect(() => {
    //     if (currentGallery) {
    //         setSelectedImage(currentGallery.items[index]);
    //     }
    // }, [currentGallery,setSelectedImage, index])

    useEffect(() => {
        if (galleryImagesLoaded.size === 3) {
            let selectedGallery: GalleryEnum | null = null;
            switch(gallery) {
                case GalleryEnum.illustrations:
                    selectedGallery = GalleryEnum.illustrations;
                    break;
                case GalleryEnum.characters:
                    selectedGallery = GalleryEnum.characters;
                    break;
                case GalleryEnum.concepts:
                    selectedGallery = GalleryEnum.concepts;
                    break;
            }

            if(!!!selectedGallery) {
                setCurrentGallery(null);
            } else if (!!galleryGroup) {
                setCurrentGallery(galleryGroup[selectedGallery]);
                setIndex(0);
            }
        }
    }, [galleryImagesLoaded, gallery, galleryGroup]);



    const menuButtons: React.ReactElement[] = useMemo(() => {
        const items: React.ReactElement[] = [];
        for (let item in GalleryEnum) {
            items.push(
                <Link 
                    key={item}
                    to={`/${item}`} 
                    className='flex justify-center mb-3 md:mb-4 md:mt-2'
                >
                    <span className={`
                        text-center text-sm md:text-lg lg:text-xl font-semibold px-2 capitalize border-2 border-black transition duration-500 
                        ${currentGallery?.name === item ? 'border-opacity-100' : 'border-opacity-0'}
                        ${(!currentGallery || currentGallery.name === item) ? 'text-opacity-100' : 'text-opacity-30'}
                    `}>
                        {item}
                    </span>
                </Link>
            );
        }
        return items;
    }, [currentGallery]);

    const menuItems: React.ReactElement[] = useMemo(() => {

        function updateGalleryImagesLoaded(image: GalleryEnum) {
            const gallery = new Set(galleryImagesLoaded).add(image);
            setGalleryImagesLoaded(gallery);
        }

        const items: React.ReactElement[] = [];
        for (let item in GalleryEnum) {
            items.push(
                <Link 
                    key={item}
                    to={`/${item}`}
                    className={`flex ${currentGallery ? 'pointer-events-none' : ''}`}
                >
                    <div 
                        className={`
                            border-2 border-black w-full 
                            overflow-hidden transition-opacity duration-500
                            ${!currentGallery ? 'opacity-100' : 'opacity-0 pointer-events-none cursor-default'}
                            ${galleryImagesLoaded.size === 3 ? '' : 'animate-pulse'}
                        `}
                    >
                        <div 
                            className={`w-full h-full transition-opacity duration-500 hover:scale-110 
                            transform transition-transform duration-1000 origin-center overflow-hidden
                            ${galleryImagesLoaded.size === 3 ? 'opacity-100' : 'opacity-0'}
                        `}>
                            {
                                !!galleryGroup &&
                                <CustomImage 
                                    src={require(`../../assets/images/${item}.jpg`).default}
                                    overlay={require(`../../assets/images/${item}-thumbnail.jpg`).default}
                                    alt={item}
                                    onOverlayLoad={()=>updateGalleryImagesLoaded(item as GalleryEnum)}
                                    objectFit='object-cover'
                                />
                            }
                        </div>
                    </div>
                </Link>
            );
        }
        return items;
    }, [galleryGroup, currentGallery, galleryImagesLoaded]);
    
    const carouselItems: React.ReactElement[] = useMemo(() => {
        if (!currentGallery) return [];

        const items: React.ReactElement[] = currentGallery.items.map((item, i) => (
            <div 
                className={`
                    p-2 w-24 h-24 flex-shrink-0 
                `} 
                key={i}
            >
                <div 
                    className={`
                        w-full h-full border-2 border-black transition duration-500 overflow-hidden cursor-pointer
                        ${index === i ? 'border-opacity-100' : 'border-opacity-0'}
                    `}
                    onClick={()=>setIndex(i)}
                >
                    <CustomImage 
                        src={item.thumbnailUrl} 
                        alt={item.alt || item.image}
                        objectFit='object-cover'
                    />
                </div>
            </div>
        ))
        
        return items;
    }, [currentGallery, index]);

    return ( 
        <div className='w-full flex select-none'>
            {
                error
                ?   <div className='w-full h-full flex justify-center items-center'>
                        <span className='font-bold'>{error}</span>
                    </div>
                :   <div className='w-full max-w-6xl flex flex-col mx-auto'>
                <div className='h-full flex flex-col py-1 px-3 md:px-8 lg:px-12 relative'>
                    <div className='w-full grid grid-cols-3 gap-3 md:gap-8 lg:gap-12'>
                        {menuButtons}
                    </div>
                    <div className='w-full grid grid-cols-3 flex-1 gap-3 md:gap-8 lg:gap-12'>
                        {menuItems}
                    </div>
                    <div className={`
                        w-full h-full absolute top-0 left-0 flex justify-center p-1 pt-12 md:px-8 lg:px-12 border-2 border-transparent
                        transition-opacity duration-500 pointer-events-none
                        ${currentGallery ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className='pointer-events-auto'>
                            <CustomImage 
                                src={currentGallery?.items[index].imageUrl}
                                overlay={currentGallery?.items[index].thumbnailUrl}
                                alt={currentGallery?.items[index].image || 'main photo'}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className={`
                        px-2 w-full max-w-4xl h-24 mx-auto transition-opacity duration-500
                        ${!!currentGallery ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <Carousel 
                            index={index}
                            gallery={currentGallery?.name}
                            onIndexChange={(index) => setIndex(index)}
                        >
                            {carouselItems}
                        </Carousel>
                    </div>
                </div>
            </div>
            }
        </div>
     );
}
 
export default Home;