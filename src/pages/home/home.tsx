import { useEffect, useMemo, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Carousel from '../../components/carousel/carousel';
import CustomImage from '../../components/custom-image/custom-image';

import { getGalleries, GalleryGroup, GalleryItem, Gallery } from '../../firebase.utils';

type TParams = { gallery: string };

enum GalleryEnum {
    illustrations = 'illustrations',
    characters = 'characters',
    concepts = 'concepts',
}

export interface HomeProps {
    
}
 
const Home = ({ match }: RouteComponentProps<TParams>) => {
    const [galleryGroup, setGalleryGroup] = useState<GalleryGroup | null>(null);
    const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(false);
    const [galleryImagesLoaded, setGalleryImagesLoaded] = useState<Set<GalleryEnum>>(new Set());

    const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | undefined>(undefined);

    const gallery = match.params.gallery;

    async function fetchGalleries(): Promise<void> {
        setIsLoadingGallery(true);
        try {
            const galleryGroup = await getGalleries();
            setGalleryGroup(galleryGroup);
        } catch(err) {
            console.log(err);
            // show error if nothing loads
        } finally {
            setIsLoadingGallery(false);
        }
    }

    useEffect(() => {
        fetchGalleries();
    }, [])

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
                setSelectedImage(undefined);
            } else if (!!galleryGroup) {
                setCurrentGallery(galleryGroup[selectedGallery]);
                setSelectedImage(galleryGroup[selectedGallery].items[0]);
            }
        }
    }, [galleryImagesLoaded, gallery, galleryGroup]);

    function updateGalleryImagesLoaded(image: GalleryEnum) {
        const gallery = new Set(galleryImagesLoaded).add(image);
        setGalleryImagesLoaded(gallery);
    }

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
                            ${galleryImagesLoaded.size === 3 ? 'bg-transparent' : 'bg-gray-300 animate-pulse'}
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
                                    src={galleryGroup[item]?.items[0]?.imageUrl || ''}
                                    alt={item}
                                    onLoad={()=>updateGalleryImagesLoaded(item as GalleryEnum)}
                                    objectFit='object-cover'
                                />
                            }
                        </div>
                    </div>
                </Link>
            );
        }
        return items;
    }, [galleryGroup, GalleryEnum, currentGallery, galleryImagesLoaded, updateGalleryImagesLoaded]);
    
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
                        ${selectedImage?.id === item.id ? 'border-opacity-100' : 'border-opacity-0'}
                    `}
                    onClick={()=>setSelectedImage(item)}
                >
                    <CustomImage 
                        src={item.thumbnailUrl} 
                        alt={item.image}
                        objectFit='object-cover'
                    />
                </div>
            </div>
        ))
        
        return items;
    }, [currentGallery, selectedImage]);

    return ( 
        <div className='w-full flex'>
            <div className='w-full max-w-6xl flex flex-col mx-auto'>
                <div className='h-full flex flex-col py-1 px-3 md:px-8 lg:px-12 relative'>
                    <div className='w-full grid grid-cols-3 gap-3 md:gap-8 lg:gap-12'>
                        {menuButtons}
                    </div>
                    <div className='w-full grid grid-cols-3 flex-1 z-1 gap-3 md:gap-8 lg:gap-12'>
                        {menuItems}
                    </div>
                    <div className={`
                        w-full h-full absolute top-0 left-0 flex justify-center p-1 pt-12 md:px-8 lg:px-12 border-2 border-transparent
                        pointer-events-none transition-opacity duration-500
                        ${currentGallery ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <CustomImage 
                            src={selectedImage?.imageUrl}
                            alt={selectedImage?.image || 'main photo'}
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <div className={`
                        px-2 w-full max-w-xl h-24 mx-auto transition-opacity duration-500
                        ${!!currentGallery ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <Carousel gallery={currentGallery?.name}>
                            {carouselItems}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Home;