import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HammingCodes from './HammingCodes';
import Simulator from "./Simulator";
import imagePlay from "./imagePlay";
import Particle from "./Particle";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/imagePlay" component={imagePlay} />
          <Route path="/particle" component={Particle} />
          <Route exact path="/simulator" component={Simulator} />
          <Route path="/" component={HammingCodes} />
        </Switch>
    </Router>
  );
}