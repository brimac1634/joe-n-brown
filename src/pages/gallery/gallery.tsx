import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type TParams = { gallery: string };

// export interface GalleryProps {
//     match: match<Params>
// }
 
const Gallery = ({ match, history }: RouteComponentProps<TParams>) => {
    const gallery = match.params.gallery;

    useEffect(() => {
        if (!gallery) {
            history.replace('/');
        }
    }, [gallery]);

    return ( 
        <span>{gallery}</span>
     );
}
 
export default Gallery;