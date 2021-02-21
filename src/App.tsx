import { useEffect, useState, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Contact from './pages/contact/contact';

import { useWindowSize } from './utils';

import './App.css';

function App() {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const header = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLDivElement>(null);
  const screenSize = useWindowSize();

  useEffect(() => {
    if (screenSize.height !== windowHeight) {
      setWindowHeight(screenSize.height);
    }
  }, [screenSize, windowHeight])

  useEffect(() => {
    if (!!header?.current && !!footer?.current) {
        const headerRect = header.current.getBoundingClientRect();
        const footerRect = footer.current.getBoundingClientRect();
        setBodyHeight(screenSize.height - headerRect.height - footerRect.height);
    }
}, [header, footer, screenSize])
  
  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col bg-coolGray-50"
      style={{height: window.innerHeight}}
    >
      <div ref={header}>
        <Header />
      </div>
      <div className='flex-grow flex' style={{ height: bodyHeight }}>
        <Switch>
          <Route exact path='/contact' component={Contact} />
          <Route path='/:gallery?' component={Home} />
          <Redirect to='/' />
        </Switch>
      </div>
      <div ref={footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
