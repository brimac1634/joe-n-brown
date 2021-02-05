import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Carousel from '../../components/carousel/carousel';

type TParams = { gallery: string };

// export interface GalleryProps {
//     match: match<Params>
// }
 
const Gallery = ({ match, history }: RouteComponentProps<TParams>) => {
    const [selectedImage, setSelectedImage] = useState<string>('https://images.squarespace-cdn.com/content/v1/584598e2893fc0759872af85/1583919855360-YFVKQRZREHYC0ETO16CI/ke17ZwdGBToddI8pDm48kHEIaJSpY6T3rNsVDHK0CJB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue1CgAhz9dz8zTQADr5cXrA6PZchenow9CxqkbDzVSfBm7cT0R_dexc_UL_zbpz6JQ/image-asset.png?format=500w');
    const gallery = match.params.gallery;

    useEffect(() => {
        if (!gallery) {
            history.replace('/');
        }
    }, [gallery]);

    return ( 
        <div className='w-screen h-full flex flex-col'>
            <div className='flex-grow p-4'>
                <div 
                    className='w-full h-full bg-no-repeat bg-center bg-contain' 
                    style={{backgroundImage: `url(${selectedImage})`}}
                />
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
 
export default Gallery;