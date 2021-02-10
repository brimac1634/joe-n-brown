import { Link } from 'react-router-dom';

export interface FooterProps {
    
}
 
const Footer: React.FC<FooterProps> = () => {
    return ( 
        <footer className='w-full h-12 flex-shrink-0 flex justify-center items-center text-lg'>
            <Link to='/contact'>Contact</Link>
        </footer>
     );
}
 
export default Footer;