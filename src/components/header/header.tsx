export interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( 
        <header className='w-screen h-16 text-center px-5 py-2 flex items-center justify-center flex-none'>
            <h1 className='text-xl lg:text-2xl font-semibold'>Joe N. Brown</h1>
        </header>
     );
}
 
export default Header;