import { Link } from 'react-router-dom';

export interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( 
        <header className='w-screen h-16 text-center py-2 flex-none'>
            <div className='flex items-center justify-center '>
                <Link to='/' className='text-xl lg:text-2xl font-semibold'>Joe N. Brown</Link>
            </div>
            <div className='w-full p-4 md:px-8 lg:px-12 grid grid-cols-3 gap-4 lg:gap-12'>
                <Link to='/gallery/illustrations' className="text-lg lg:text-xl font-semibold text-center">
                    Illustrations
                </Link>
                <Link to='/gallery/concepts' className="text-lg lg:text-xl font-semibold text-center">
                    Concepts
                </Link>
                <Link to='/gallery/sketches' className="text-lg lg:text-xl font-semibold text-center">
                    Sketches
                </Link>
            </div>
        </header>
     );
}
 
export default Header;