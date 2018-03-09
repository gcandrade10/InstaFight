import React, { Component } from "react";
import "./App.css";

class History extends Component 
{
	constructor(props)
	{
		super(props);
		this.state={
			top:[]}
	}

	componentDidMount()
	{
		let me = this;
		//"http://localhost:3000/api/savescore"
		fetch("/api/find")
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
						<table className="table">
							<thead>
						      <tr>
						        <th>Date</th>
						        <th>Winner</th>
						        <th>Loser</th>
						      </tr>
						    </thead>
				    		<tbody>
				    	{this.state.top.map(
				    		(f)=>
				    		<tr key={f._id+f.date}>
				    		<td>{f.date}</td>
					        <td>{f.winner}</td>
					        <td>{f.loser}</td>
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

export default History;
