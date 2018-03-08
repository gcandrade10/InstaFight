import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Followers from "./Followers";
class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			winner:null,
			loser:null
		};
	}

	sortFollowers() {
		var temp=this.state.followers;
		temp.sort(function (a, b) {
    		return a.login.localeCompare(b.login);
		});
		this.setState({followers:temp});
	}


  render() {
    return (
      <div className="container">
    		<h1 className="row justify-content-center">Insta Fight</h1>
	    	<div className="row user-search-input justify-content-center">
	    		
		        <input className="col-4" placeholder="Username to search"  type='text' onKeyPress={(evento)=>{
		        	const keyCode = evento.keyCode || evento.which;
		        	if(keyCode===13)
		        	{
			        	const value = evento.currentTarget.value;
			        	console.log(value);
			        	fetch("/api/user/"+value)
			        	.then((res)=>{
						return res.json();
						})
						.then((json)=>{
							console.log("State A: "+JSON.stringify(this.state));

							console.log("json A: "+JSON.stringify(json));
							if(this.state.winner===null)
							{
							this.setState({winner:json});

							}
							else if(json.count>this.state.winner.count)
							{
							this.setState({loser:this.state.winner});
							this.setState({winner:json});
							}
							else
							{
								this.setState({loser:json});
							}
							console.log("State A: "+JSON.stringify(this.state));
							
						})
		        	}
		        }}/>
		        <input className="col-4" placeholder="Username to search"  type='text' onKeyPress={(evento)=>{
		        	const keyCode = evento.keyCode || evento.which;
		        	if(keyCode===13)
		        	{
			        	const value = evento.currentTarget.value;
			        	console.log(value);
			        	fetch("/api/user/"+value)
			        	.then((res)=>{
						return res.json();
						})
						.then((json)=>{
							console.log("json B: "+JSON.stringify(json));
							if(this.state.winner===null)
							{
							this.setState({winner:json});
							}
							else if(json.count>this.state.winner.count)
							{
							this.setState({loser:this.state.winner});
							this.setState({winner:json});
							}
							else
							{
								this.setState({loser:json});
							}
							console.log("State A: "+JSON.stringify(this.state));
						})
		        	}
		        }}/>
		        <span className="input-group-addon col-1 justify-content-center">
	                            <i className="fa fa-search form-control-feedback"/>
	            </span>
	    	</div>
	    	<div className="row justify-content-center ">
	            <button onClick={this.sortFollowers.bind(this)} type="button" className="btn-info">Sort</button>
	    	</div>
	    	{/*console.log("this.state: "+this.state.followers.length)

	    	*/
	    	}
	    	{
	    		this.state.winner?<Followers followers={this.state.winner}/>
	    	}
	    	
	    	
      </div>
    );
  }

}

export default App;
