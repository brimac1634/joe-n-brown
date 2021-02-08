import { Link } from 'react-router-dom';

export interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( 
        <header className='w-screen text-center py-2 flex-none'>
            <div className='flex items-center justify-center '>
                <Link to='/' className='text-xl lg:text-2xl font-semibold'>Joe N. Brown</Link>
            </div>
        </header>
     );
}
 
export default Header;