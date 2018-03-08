import React, { Component } from 'react';
import './Followers.css';
class Followers extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			winner:props.winner,
      what:props.what
		}
	}
  render() {

    {console.log("json"+JSON.stringify(this.state))}
    return(
  
        <div className="col-5" key={this.props.winner.username}>
        
                    <h1>{this.props.what}</h1>
                    <a target="_blank" href={this.props.winner.profile}>
                        <img className="imgFollower" src={this.props.winner.profilePic} alt="winner image"/>
                    </a>
                    <h2>
                      {this.props.winner.username}
                    </h2>
                    <h2>
                      
                    {this.props.winner.fullName}
                    </h2>
                    <h2>
                    {this.props.winner.count} Votes
                    </h2>
                </div>
      
      )
  }

}

export default Followers;
