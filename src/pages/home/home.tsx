import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Carousel from '../../components/carousel/carousel';

import { getGalleries, GalleryGroup } from '../../firebase.utils';

import './home.scss';

type TParams = { gallery: string };

enum Gallery {
    illustrations = 'illustrations',
    concepts = 'concepts',
    sketches = 'sketches'
}

export interface HomeProps {
    
}
 
const Home = ({ match }: RouteComponentProps<TParams>) => {
    const [galleryGroup, setGalleryGroup] = useState<GalleryGroup | null>(null);
    const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(false);
    const [galleryImagesLoaded, setGalleryImagesLoaded] = useState<Set<Gallery>>(new Set());
    const [selectedImageIsLoaded, setSelectedImageIsLoaded] = useState<boolean>(false);
    const [showSelectedImage, setShowSelectedImage] = useState<boolean>(false);

    const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    // useEffect(() => {
    //     if (galleryImagesLoaded.size === 3) {
    //         let selectedGallery: Gallery | null = null;
    //         switch(gallery) {
    //             case Gallery.illustrations:
    //                 selectedGallery = Gallery.illustrations;
    //                 break;
    //             case Gallery.concepts:
    //                 selectedGallery = Gallery.concepts;
    //                 break;
    //             case Gallery.sketches:
    //                 selectedGallery = Gallery.sketches;
    //                 break;
                
    //         }

    //         setCurrentGallery(selectedGallery);
    //         setSelectedImageIsLoaded(false);

    //         if(!!!selectedGallery) {
    //             setSelectedImage(null);
    //         } else {
    //             setSelectedImage(galleryImages[selectedGallery][0]);

    //             if (selectedGallery === Gallery.illustrations || selectedGallery === Gallery.sketches) {
    //                 setTimeout(() => {
    //                     setShowSelectedImage(true);
    //                 }, 1100);
    //             } else {
    //                 setShowSelectedImage(true);
    //             }
    //         }
            
            
    //     }
    // }, [galleryImagesLoaded, gallery]);

    function updateGalleryImagesLoaded(image: Gallery) {
        const gallery = new Set(galleryImagesLoaded).add(image);
        setGalleryImagesLoaded(gallery);
    }

    return ( 
        <div className='w-screen h-full flex flex-col'>
            <div className='flex-grow p-2 md:px-8 lg:px-12 relative'>
                <div className='w-full h-full absolute top-0 left-0 flex justify-center p-2 md:px-8 lg:px-12 -z-1'>
                    
                    <img 
                        src={selectedImage || ''}
                        onLoad={() => setSelectedImageIsLoaded(true)}
                        alt='something'
                        className={`
                            pt-7 min-h-full max-h-full max-w-full object-contain transform transition duration-500 
                            ${(!!selectedImage && selectedImageIsLoaded && showSelectedImage) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                        `}
                    />
                </div>
                <div className='w-full grid grid-cols-3 h-full z-1'>
                    {
                        !!galleryGroup &&
                        Object.keys(galleryGroup).map((gallery, i) => (
                            <Link 
                                key={gallery}
                                to={`/${gallery}`}
                                className={`flex flex-col`}
                            >
                                <span className={`text-center text-lg lg:text-xl font-semibold capitalize ${currentGallery === gallery ? 'opacity-100' : 'opacity-30'}`}>{gallery}</span>
                                <div 
                                    className={`
                                        px-2 lg:px-6 flex-grow w-full h-full flex justify-center items-center overflow-hidden transition-opacity duration-600
                                        ${!currentGallery && galleryImagesLoaded.size === 3 && 'opacity-100'}
                                        ${((!!currentGallery && currentGallery !== gallery) || galleryImagesLoaded.size !== 3) && 'opacity-0'}
                                        ${currentGallery === gallery && i === 0 && 'slide-right opacity-100'}
                                        ${currentGallery === gallery && i === 2 && 'slide-left opacity-100'}
                                    `}
                                >
                                    {console.log(galleryGroup[gallery].items[0].imageUrl)}
                                    <img 
                                        src={galleryGroup[gallery].items[0].imageUrl}
                                        alt={gallery}
                                        onLoad={()=>updateGalleryImagesLoaded(gallery as Gallery)}
                                        className='object-cover min-w-full min-h-full h-full'
                                    />
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className='w-full'>
                <div className='w-8/12 h-24 mx-auto'>
                    <Carousel>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-24 h-24 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
     );
}
 
export default Home;