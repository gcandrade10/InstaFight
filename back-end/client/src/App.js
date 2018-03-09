import React, { Component } from 'react';
import './App.css';
import Followers from "./Followers";
class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			f1:null,
			f2:null,
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

	renderWinner()
	{
		if (this.state.f1 && this.state.f2)
		{
		var winner = this.state.f1.count>this.state.f2.count?this.state.f1:this.state.f2
		var loser = this.state.f1.count>this.state.f2.count?this.state.f2:this.state.f1
		fetch("/api/registrar/"+winner.username+"/"+loser.username)
		fetch("/api/top/"+winner.username);
		fetch("/api/top/"+loser.username);
		return <Followers winner={winner} what="Wineeer"/>
		}
		else
		{
			return ""
		}
	}

	renderLoser()
	{
		if (this.state.f1 && this.state.f2)
		{
		var retorno = this.state.f1.count>this.state.f2.count?this.state.f2:this.state.f1
		return <Followers winner={retorno} what="Looseeer"/>
		}
		else
		{
			return ""
		}
	}


  render() {
    return (
      <div className="container">
    		<h1 className="row justify-content-center">Insta Fight</h1>

    		

    		
	    	<div className="row user-search-input justify-content-center">
  
		        <input className="col-4" placeholder="Username to search (hit enter)"  type='text' onKeyPress={(evento)=>{
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
							
							this.setState({f1:json});

							
						}).catch((err)=>alert("No Existe o es privado "+value))
		        	}
		        }}/>
		        <span> VS </span>
		        <input className="col-4" placeholder="Username to search (hit enter)"  type='text' onKeyPress={(evento)=>{
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
							this.setState({f2:json});
						})
		        	}
		        }}/>
		        
	    	</div>
	    	<div className="row justify-content-center ">

	    	{this.renderWinner()}
	    	{this.renderLoser()}
	    	</div>
	    	
      </div>
    );
  }

}

export default App;
