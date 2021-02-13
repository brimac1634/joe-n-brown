import { Link } from 'react-router-dom';

export interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( 
        <header className='w-screen text-center py-1 flex-none'>
            <div className='flex items-center flex-col'>
                <Link to='/' className='text-xl lg:text-2xl font-semibold py-1 md:py-2'>Joe N. Brown</Link>
                <div className='w-3/5 px-24 max-w-lg h-0.5 bg-black'/>
            </div>
        </header>
     );
}
 
export default Header;