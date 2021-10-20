import NavBar from 'components/NavBar/NavBar';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import NotFound from 'components/NotFound/NotFound';
import HomePage from 'pages/HomePage/HomePage';
import CategoryPage from 'pages/CategoryPage/CategoryPage';
import './App.scss';

function App() {
  return (

    <BrowserRouter>
      <NavBar />

      <div className = "container">

        <Switch>
        <Route exact path='/' component = {HomePage} />
        <Route exact path='/category' component = {CategoryPage} />
        <Route component={NotFound} />
      </Switch>
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;
