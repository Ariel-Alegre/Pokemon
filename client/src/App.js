import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import { BrowserRouter, Route} from "react-router-dom";
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';


function App() {
  return (     
     <BrowserRouter>
      <Route exact path='/' component={LandingPage}/> 
      <Route exact path='/home' component={Home}/> 
      <Route exact path='/details/:id' component={PokemonDetail}/> 
      <Route exact path='/create' component={CreatePokemon}/> 
    </BrowserRouter>
  );
}

export default App;
