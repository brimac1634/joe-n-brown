import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Carousel from '../../components/carousel/carousel';

import './home.scss';

type TParams = { gallery: string };

enum Gallery {
    illustrations = 'illustrations',
    concepts = 'concepts',
    sketches = 'sketches'
}

const galleryImages: {[key: string]: string[]} = {
    illustrations: ['https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1572254318257-BX3ERAV4MOOSTGG2W5IX/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/Druid+-+FINAL+-+HQ.png?format=1500w'],
    concepts: ['https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1607423533474-X8LMKR3HPNA1G4YRWAC3/ke17ZwdGBToddI8pDm48kLPswmMOqQZ9-Q6KHLjvbpZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UTcpTqfU-ZEsztPyQLxhSSK-PhJjRDDFQG0l3_ZnmWi1QjT9byXZM3ISxo3y1NRptg/hiding+halflings+2.jpg?format=1500w'],
    sketches: ['https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w']
}

export interface HomeProps {
    
}
 
const Home = ({ match }: RouteComponentProps<TParams>) => {
    const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(false);
    const [galleryImagesLoaded, setGalleryImagesLoaded] = useState<Set<Gallery>>(new Set());
    const [selectedImageIsLoaded, setSelectedImageIsLoaded] = useState<boolean>(false);
    const [showSelectedImage, setShowSelectedImage] = useState<boolean>(false);

    const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>('https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w');

    const gallery = match.params.gallery;


    useEffect(() => {
        if (galleryImagesLoaded.size === 3) {
            let selectedGallery: Gallery | null = null;
            switch(gallery) {
                case Gallery.illustrations:
                    selectedGallery = Gallery.illustrations;
                    break;
                case Gallery.concepts:
                    selectedGallery = Gallery.concepts;
                    break;
                case Gallery.sketches:
                    selectedGallery = Gallery.sketches;
                    break;
                
            }

            setCurrentGallery(selectedGallery);
            setSelectedImageIsLoaded(false);

            if(!!!selectedGallery) {
                setSelectedImage(null);
            } else {
                setSelectedImage(galleryImages[selectedGallery][0]);

                if (selectedGallery === Gallery.illustrations || selectedGallery === Gallery.sketches) {
                    setTimeout(() => {
                        setShowSelectedImage(true);
                    }, 1100);
                } else {
                    setShowSelectedImage(true);
                }
            }
            
            
        }
    }, [galleryImagesLoaded, gallery]);

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
                            pt-7 min-h-full max-h-full max-w-full object-contain transform transition duration-400 
                            ${(!!selectedImage && selectedImageIsLoaded && showSelectedImage) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                        `}
                    />
                </div>
                <div className='w-full grid grid-cols-3 h-full z-1'>
                    {
                        Object.keys(galleryImages).map((gallery, i) => (
                            <Link 
                                key={gallery}
                                to={`/${gallery}`}
                                className={`flex flex-col`}
                            >
                                <span className={`text-center text-lg lg:text-xl font-semibold capitalize ${currentGallery === gallery ? 'opacity-100' : 'opacity-30'}`}>{gallery}</span>
                                <div 
                                    className={`
                                        px-2 lg:px-6 flex-grow w-full h-full flex justify-center items-center overflow-hidden
                                        ${!currentGallery && galleryImagesLoaded.size === 3 && 'opacity-100'}
                                        ${((!!currentGallery && currentGallery !== gallery) || galleryImagesLoaded.size !== 3) && 'opacity-0'}
                                        ${!!currentGallery && currentGallery === gallery && i === 0 && 'slide-right opacity-100'}
                                        ${!!currentGallery && currentGallery === gallery && i === 2 && 'slide-left opacity-100'}
                                    `}
                                >
                                    <img 
                                        src={galleryImages[gallery][0]}
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