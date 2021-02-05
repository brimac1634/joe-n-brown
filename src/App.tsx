import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import ErrorBoundary from './components/error-boundary/error-boundary'
import Home from './pages/home/home';
import Gallery from './pages/gallery/gallery';
import Contact from './pages/contact/contact';

import './App.css';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-coolGray-50">
      <Header />
      <div className='flex-grow'>
        <ErrorBoundary>
          <Suspense fallback={<span>loading</span>}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/gallery/:gallery' component={Gallery} />
              <Route exact path='/contact' component={Contact} />
              <Redirect to='/' />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export default App;
