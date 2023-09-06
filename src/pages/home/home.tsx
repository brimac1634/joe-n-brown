import { useEffect, useMemo, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getGalleries, GalleryGroup, Gallery } from '../../firebase.utils';
import ImageGrid from '../../components/image-grid/image-grid';

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
    const [error, setError] = useState<string | undefined>(undefined);

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

    const currentGallery = useMemo<Gallery | null>(() => {
        if (!galleryGroup) return null;
        switch(gallery) {
            case GalleryEnum.concepts:
                return galleryGroup[GalleryEnum.concepts];
            case GalleryEnum.characters:
                return galleryGroup[GalleryEnum.characters];
            case GalleryEnum.illustrations:
            default:
                return galleryGroup[GalleryEnum.illustrations];
        }
    }, [gallery, galleryGroup])


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

   

    if (error) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span className='font-bold'>{error}</span>
            </div>
        )
    }

    return ( 
        <div className='w-full select-none'>
            <div className='w-full max-w-6xl mx-auto'>
                <div className='py-1 px-3 md:px-8 lg:px-12 relative'>
                    <div className='w-full grid grid-cols-3 gap-3 md:gap-8 lg:gap-12'>
                        {menuButtons}
                    </div>
                    {/* <div className={`
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
                    </div> */}
                </div>
                <div className={`
                    px-2 w-full max-w-4xl mx-auto transition-opacity duration-500
                    ${!!currentGallery ? 'opacity-100' : 'opacity-0'}
                `}>
                    <ImageGrid galleryItems={currentGallery?.items || []} />
                </div>
            </div>
        </div>
     );
}
 
export default Home;