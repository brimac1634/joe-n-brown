import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as ArtStation } from '../../assets/icons/artstation.svg';
import { ReactComponent as Youtube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Twitch } from '../../assets/icons/twitch.svg';

export interface FooterProps {
    
}
 
const Footer: React.FC<FooterProps> = () => {
    const location = useLocation();
    
    return ( 
        <footer className='w-full py-2 flex-shrink-0 flex flex-col items-center text-lg relative'>
            <div className='flex justify-center'>
                <a 
                    href='https://www.instagram.com/joenbrown' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <Instagram className='w-5 h-5 mx-2 my-1' />
                </a>
                <a 
                    href='https://www.facebook.com/Joe-N-Brown-Art-100221205449960' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <Facebook className='w-5 h-5 mx-2 my-1' />
                </a>
                <a 
                    href='https://www.artstation.com/joenbrown' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <ArtStation className='w-5 h-5 mx-2 my-1' />
                </a>
                <a 
                    href='https://www.youtube.com/channel/UCuIst_X7MTYewGyLEU_0H1Q' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <Youtube className='w-5 h-5 mx-2 my-1' />
                </a>
                <a 
                    href='https://m.twitch.tv/joenbrown/profile' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <Twitch className='w-5 h-5 mx-2 my-1' />
                </a>
            </div>
            {
                location.pathname.slice(1, location.pathname.length) === 'contact'
                ?   <Link to='/' className='my-1'>Gallery</Link>
                :   <Link to='/contact' className='my-1'>Contact</Link>
            }
            <a 
                href='https://bmacpherson.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='bottom-0 right-0 absolute block text-right text-xs font-thin px-1'
            >
                built by bmacpherson.com
            </a>
        </footer>
     );
}
 
export default Footer;