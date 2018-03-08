import React, { Component } from 'react';
import './Followers.css';
class Followers extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			winner:props.winner
		};
	}
  render() {
    return(
        <div>
          
        <div className="col-3" key={this.winner.username}>
                    {console.log(this.winner)}
                    <h1>Winner</h1>
                    <a target="_blank" href={this.winner.profile}>
                        <img className="imgFollower" src={this.winner.profilePic} alt="winner image"/>
                    </a>
                    {this.winner.username}
                </div>
        </div>
        
      
      )
  }

}

export default Followers;
