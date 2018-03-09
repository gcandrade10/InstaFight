import React, { Component } from "react";
import "./App.css";

var car = {score:20, user:"500"};

class Top extends Component 
{
	constructor(props)
	{
		super(props);
		this.state={
			top:[car]}
	}

	componentDidMount()
	{
		let me = this;
		//"http://localhost:3000/api/savescore"
		fetch("/api/findTopUsers")
			.then((res)=>{
					return res.json();
			})
			.then((json)=>{
				console.log(json);
				me.setState({top:json});
			})
	}

  render() {
    return (
				<div className="justify-content-center">
				    <h1>
				    	Top 
				    </h1> 
					<div className="container">
						<table class="table">
							<thead>
						      <tr>
						        <th>User</th>
						        <th>Count</th>
						      </tr>
						    </thead>
				    		<tbody>
				    	{this.state.top.map(
				    		(f)=>
				    		<tr key={f._id+f.user}>
					        <td>{f.user}</td>
					        <td>{f.count}</td>
					      </tr>	
				    		)
				    	}
				    		</tbody>
						</table>
				    </div>
		    	</div>
    );
  }
}

export default Top;
