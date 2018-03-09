import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
		
      <header>
	    <nav>
	      <ul>
	        <li><Link to='/'>InstaFigth</Link></li>
	        <li><Link to='/history'>History</Link></li>
	        <li><Link to='/viewtop'>Top</Link></li>
	        {
	        	/*

	        	*/
	        }
	      </ul>
	    </nav>
  	</header>
    );
  }
}

export default Header;