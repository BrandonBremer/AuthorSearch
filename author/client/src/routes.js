import Library from './library.js'
import App from './App.js'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
function Routes()
{
    return (      
          <div>
          <BrowserRouter>
         <header>
            <nav >
           <li> <Link to= "/">Home</Link></li>
           <li> <Link to="/library">Your Library</Link></li>
           <Switch>
            <Route  path="/library">
              <Library/>
              </Route>
              <Route  path="/">
              <App/>
              </Route>
            </Switch>
            </nav></header></BrowserRouter></div>
      );
}
export default Routes