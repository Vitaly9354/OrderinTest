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

	renderSimpleData(simpleData) {
		return (
			<ul>
				{simpleData.map(item =>
					<li key={item.id}>
						{item.name} - {item.suburb} {item.rank}
						{this.renderCategories(item.categories)}
					</li>)}
			</ul>
		);
	}

	renderCategories(categories) {
		return (
			<ul>
				{categories.map(c =>
					<li>{c.name}
						{this.renderMenuItems(c.menuItems)}
					</li>)}
			</ul>
		);
	}

	renderMenuItems(menuItems) {
		return (
			<ul>
				{menuItems.map(i =>
				<li key={i.id}>{i.name}
					{i.price}
				</li>)}
			</ul>
		);
	}

	render() {
		let simpleDataContent = this.state.simpleDataLoading
			? <p><em>Loading Simple Data...</em></p>
			: this.renderSimpleData(this.state.simpleData);

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
