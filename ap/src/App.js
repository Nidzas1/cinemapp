import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './comps/Login';
import Accounts from './comps/Accounts'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
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
