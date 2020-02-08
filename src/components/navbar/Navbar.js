import React from "react";
import { Link } from "react-router-dom"

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // logggedIn: false
    }
  }


  render() {

      return (
          <nav>
              <ul className="nav-bar">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/map">Map</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
              </ul>
          </nav>

      )
  }
}

export default Navbar
