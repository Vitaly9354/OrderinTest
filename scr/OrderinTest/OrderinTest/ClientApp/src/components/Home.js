import React, { Component } from 'react';
import { SearchBox } from './SearchBox';
import { CheckoutButton } from './CheckoutButton';

import './Home.css'

export class Home extends Component {
	static displayName = Home.name;
	static baseUrl = "api/data";

	constructor(props) {
		super(props);
		this.state = { loading: true, data: [], orderData: [] };

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onCheckoutClick = this.onCheckoutClick.bind(this);
	}

	componentDidMount() {
		//this.populateData();
	}

	onCheckoutClick() {
		alert("AJAX REQUEST!")
	}

	onSearchChange(text) {
		this.findByName(text);
	}

	onCheckboxChange(e, item) {
		const isChecked = e.target.checked;

		
		const { orderData } = this.state;

		if (isChecked) {
			this.setState({
				orderData: [...orderData, item]
			});
		}
		else {
			this.setState({
				orderData: [...orderData.filter(el => el.id !== item.id)]
			});
		}
		
	}

	renderData(data) {
		return (
			<div>
				<ul>
					{data.map(item =>
						<li key={item.id} className="restaurant">
							<span className="restaurant-name">{item.name} - {item.suburb} - rated # {item.rank} overall </span>
							{this.renderCategories(item.categories)}
						</li>)}
				</ul>
				<CheckoutButton orderData={this.state.orderData} onClick={this.onCheckoutClick} />
			</div>
		);
	}

	renderCategories(categories) {
		return (
			<ul>
				{categories.map(c =>
					<li key={c.name} className="category-name">{c.name}
						{this.renderMenuItems(c.menuItems)}
					</li>)}
			</ul>
		);
	}

	renderMenuItems(menuItems) {
		return (
			<ul>
				{menuItems.map(i =>
					<li key={i.id} className="menu-item">
						<div className="checkbox">
							<label>
								<input
									type="checkbox"
									value={`${i.name} - R${i.price}`}
									onChange={(e) => { this.onCheckboxChange(e, i) }}
								/>

								{`${i.name} - R${i.price}`}
							</label>
						</div>
					</li>)}
			</ul>
		);
	}

	render() {
		let dataContent = this.state.dataLoading
			? <p><em>Loading Data...</em></p>
			: this.renderData(this.state.data);

		return (
			<div>
				<h3>Hello World</h3>

				<SearchBox onChange={this.onSearchChange}/>

				{dataContent}
			</div>
		);
	}

	async populateData() {
		const response = await fetch(Home.baseUrl);
		const data = await response.json();
		this.setState({ data: data });
	}

	async findByName(searchText) {
		const response = await fetch(Home.baseUrl + "/" + searchText);
		const data = await response.json();
		this.setState({ data: data });
	}
}
