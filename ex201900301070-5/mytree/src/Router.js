import React from "react";
import Login from "./pages/login/login";
import Registe from "./pages/registe/registe";
import Write from "./pages/write/write";
import Forget from "./pages/forget/forget";
import Index from "./pages/Index/index";
import { HashRouter, Route, Switch } from "react-router-dom";
const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route  path="/login" component={Login}></Route>
      <Route  path="/registe" component={Registe}></Route>
      <Route  path="/write" component={Write}></Route>
      <Route  path="/forget" component={Forget}></Route>
      <Route  exact path="/" component={Index}></Route>
    </Switch>
  </HashRouter>
);
export default BasicRoute;