import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './comps/Login';
import Accounts from './comps/Accounts'
import Register from './comps/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route path='/accounts'>
            <Accounts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
