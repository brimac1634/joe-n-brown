import { Link } from 'react-router-dom';

export interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return ( 
        <div className='w-screen h-full flex items-center'>
            <div className='w-full p-4 md:px-8 lg:px-12 grid grid-cols-3 gap-4 lg:gap-12 h-4/5'>
                <Link to='/gallery/illustrations'>
                    <div className='flex-grow w-full h-full bg-illustrations bg-cover'></div>
                </Link>
                <Link to='/gallery/concepts'>
                    <div className='flex-grow w-full h-full bg-illustrations bg-cover'></div>
                </Link>
                <Link to='/gallery/sketches'>
                    <div className='flex-grow w-full h-full bg-illustrations bg-cover'></div>
                </Link>
            </div>
        </div>
     );
}
 
export default Home;