import React, { Component } from 'react';

export class Home extends Component {
	static displayName = Home.name;

	constructor(props) {
		super(props);
		this.state = { loading: true, simpleData: [] };
	}

	componentDidMount() {
		this.populateSimpleData();
	}

	static renderSimpleData(simpleData) {
		return (
			<ul>
				{simpleData.map(item =>
					<li key={item.id}>{item.name}, {item.city}, {item.suburb}</li>)}
			</ul>
		);
	}

	render() {
		let simpleDataContent = this.state.simpleDataLoading
			? <p><em>Loading Simple Data...</em></p>
			: Home.renderSimpleData(this.state.simpleData);

		return (
			<div>
				<h3>Hello World</h3>

				{simpleDataContent}
			</div>
		);
	}

	async populateSimpleData() {
		const response = await fetch('simpledata');
		const data = await response.json();
		this.setState({ simpleData: data });
	}
}
