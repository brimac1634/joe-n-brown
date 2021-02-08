import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';


import Carousel from '../../components/carousel/carousel';

type TParams = { gallery: string };

enum Gallery {
    illustrations = 'illustrations',
    concepts = 'concepts',
    sketches = 'sketches'
}

export interface HomeProps {
    
}
 
const Home = ({ match, history }: RouteComponentProps<TParams>) => {
    const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(false);
    const [loadingMenuIsComplete, setLoadingMenuIsComplete] = useState<boolean>(true);

    const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w');

    const gallery = match.params.gallery;


    useEffect(() => {
        if (loadingMenuIsComplete && !!gallery) {
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
            console.log({selectedGallery});
            if (!!selectedGallery) {
                setCurrentGallery(selectedGallery);
            }
        }
    }, [loadingMenuIsComplete, gallery]);

    return ( 
        <div className='w-screen h-full flex flex-col'>
            <div className='flex-grow p-4 md:px-8 lg:px-12'>
                <div className='w-full grid grid-cols-3 gap-4 lg:gap-12 h-full'>
                    <Link to='/illustrations' className="flex flex-col">
                        <span className='text-lg lg:text-xl font-semibold'>Illustrations</span>
                        <div className='flex-grow w-full h-full bg-illustrations bg-cover'></div>
                    </Link>
                    <Link to='/concepts' className="flex flex-col">
                        <span className='text-lg lg:text-xl font-semibold'>Concepts</span>
                        <div className='flex-grow w-full h-full bg-illustrations bg-cover'></div>
                    </Link>
                    <Link to='/sketches' className="flex flex-col">
                        <span className='text-lg lg:text-xl font-semibold'>Sketches</span>
                        <div className='flex-grow w-full h-full bg-illustrations bg-cover'></div>
                    </Link>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-8/12 h-28 bg-red-500 mx-auto'>
                    <Carousel>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
                            <div 
                                className='h-full w-full bg-no-repeat bg-center bg-cover bg-blue-200' 
                                // style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w)'}}
                            /> 
                        </div>
                        <div className='p-2 w-28 h-28 flex-shrink-0'>
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