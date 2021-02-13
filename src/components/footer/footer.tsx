import { Link } from 'react-router-dom';

import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as ArtStation } from '../../assets/icons/artstation.svg';
import { ReactComponent as Youtube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Twitch } from '../../assets/icons/twitch.svg';

export interface FooterProps {
    
}
 
const Footer: React.FC<FooterProps> = () => {
    return ( 
        <footer className='w-full py-2 flex-shrink-0 flex flex-col items-center text-lg'>
            <div className='flex justify-center'>
                <a 
                    href='https://www.instagram.com/joenbrown' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <Instagram className='w-5 h-5 mx-2 my-1' />
                </a>
                {/* <a 
                    href='' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <Facebook className='w-5 h-5 mx-2 my-1' />
                </a> */}
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
            <Link to='/contact' className='my-1'>Contact</Link>
        </footer>
     );
}
 
export default Footer;