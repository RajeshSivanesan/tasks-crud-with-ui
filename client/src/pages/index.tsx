import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import { ProtectedRoute } from "./ProtectedRoute";

class Index extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" Component={Signup} />
            <Route path="/login" Component={Login} />
            <Route Component={ProtectedRoute}>
              <Route path="/tasks" Component={Dashboard} />
            </Route>
            <Route path="/" Component={Home} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Index;