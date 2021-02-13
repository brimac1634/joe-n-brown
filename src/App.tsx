import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
// import ErrorBoundary from './components/error-boundary/error-boundary'
import Home from './pages/home/home';
import Contact from './pages/contact/contact';

import { useWindowSize } from './utils';

import './App.css';

function App() {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const screenSize = useWindowSize();

  useEffect(() => {
    if (screenSize.height !== windowHeight) {
      setWindowHeight(screenSize.height);
    }
  }, [screenSize, windowHeight])
  
  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col bg-coolGray-50"
      style={{height: window.innerHeight}}
    >
      <Header />
      <div className='flex-grow flex'>
        {/* <ErrorBoundary>
          <Suspense fallback={<span>loading</span>}> */}
            <Switch>
              <Route exact path='/contact' component={Contact} />
              <Route path='/:gallery?' component={Home} />
              <Redirect to='/' />
            </Switch>
          {/* </Suspense>
        </ErrorBoundary> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
