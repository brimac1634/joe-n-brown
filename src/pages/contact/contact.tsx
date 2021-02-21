export interface ContactProps {
    
}
 
const Contact: React.FC<ContactProps> = () => {
    return ( 
        <div className='w-full max-h-full overflow-y-scroll'>
            <div className='w-full max-w-xl px-3 py-4 mx-auto'>
                <span className='text-center text-base md:text-lg lg:text-xl font-semibold block mb-6'>Contact</span>
                <span className='text-base md:text-lg lg:text-xl font-semibold block mb-3'>About:</span>
                <p className='text-base md:text-lg'>
                    I’m a freelance artist based in Hong Kong. Though my personal focus is on fantasy and science fiction illustrations and concept art, I am more than happy to create a portrait of you, your family, friends and pets. I would be even happier to put them in costumes and alongside their favourite characters or universes. Maybe you’ve had an idea of a character or world you’d be interested in bringing to life through concept sketches. If you’re interested, take a look at the price list below, and contact me for further inquiries.
                </p>
                <a 
                    href='https://firebasestorage.googleapis.com/v0/b/joenbrown-cc8e7.appspot.com/o/JoeNBrownArtPriceList.pdf?alt=media&token=2ff89764-759b-45b1-ac42-15b032dcac6c' 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='block text-center font-semibold my-7'
                >
                    [Price Sheet.]
                </a>
                <span className='text-base md:text-lg lg:text-xl font-semibold block mb-3'>Inquiries:</span>
                <a 
                    className='block text-base md:text-lg'
                    href='mailto:joenbrownart@gmail.com?subject=Joe%20N.%20Brown%20Art%20Inquiry&body=Tell%20me%20what%20you%20are%20looking%20to%20create.' 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    joenbrownart@gmail.com
                </a>
            </div>
        </div>
     );
}
 
export default Contact;