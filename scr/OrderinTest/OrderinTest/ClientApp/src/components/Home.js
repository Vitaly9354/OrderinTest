import React, { Component } from 'react';
import { SearchBox } from './SearchBox';
import { CheckoutButton } from './CheckoutButton';

import './Home.css'

export class Home extends Component {
	static displayName = Home.name;
	static baseUrl = "api/data";	

	constructor(props) {
		super(props);
		this.state = { dataLoading: true, data: [], orderData: [], searchQuery: "", isValidFormat: false };

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onCheckoutClick = this.onCheckoutClick.bind(this);	
	}

	componentDidMount() {
	}

	onCheckoutClick() {
		alert("AJAX REQUEST!")
	}

	onSearchChange(text) {
		text = text.trim();
		
		const regexp = RegExp('^[a-zA-Z]* in [a-zA-Z]*$');
		//making sure that format is "<Search keyword> in <Loaction>
		if (regexp.test(text)) {
			this.setState({ searchQuery: text, isValidFormat: true });
			const textSegments = text.split(' ');
			const searchKeyword = textSegments[0];
			const city = textSegments[2];

			this.findByName(searchKeyword, city);
		}
		else {
			this.setState({ searchQuery: text, isValidFormat: false });
		}
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
						<li key={item.id} className="restaurant-container">
							<div className="img-and-name">
								<img src={item.logoPath} alt="logo" className="restaurant-image" />
								<span className="restaurant-name">{item.name} - {item.suburb} - rated # {item.rank} overall </span>
							</div>
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

		let dataContent = this.renderData(this.state.data);

		return (
			<div>
				
				<SearchBox onChange={this.onSearchChange}/>
			

				{dataContent}
			</div>
		);
	}

	async findByName(searchKeyword, city) {		
		const response = await fetch(`${Home.baseUrl}/${city}/${searchKeyword}`);
		const data = await response.json();
		this.setState({ data: data });
	}
}
