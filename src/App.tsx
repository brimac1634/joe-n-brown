import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Contact from './pages/contact/contact';
import Home from './pages/home/home';


import './App.css';

function App() {
  return (
    <div className="w-full overflow-hidden bg-coolGray-50">
      <Header />
      <Switch>
        <Route exact path='/contact' component={Contact} />
        <Route path='/:gallery?' component={Home} />
        <Redirect to='/' />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
