import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router";
import routes from './config/routes';
var hashHistory = require('react-router').hashHistory;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById("app")
);