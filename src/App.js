import { Route } from "wouter";
import Character from "./Character";
import Loadouts from "./Loadouts";

function App() {
  return (
    <>
      <Route path="/">
        <Character />
      </Route>
      <Route path="/loadouts">
        <Loadouts />
      </Route>
    </>
  );
}

export default App;
