import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// import "../public/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
