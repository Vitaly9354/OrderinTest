import React, { Component } from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'

import './SearchResults.css'

export class SearchResults extends Component {
	static displayName = SearchResults.name;
	static baseUrl = "api/search";	

	constructor(props) {
		super(props);
		this.state = {
			dataLoading: false,
			data: [],
			orderData: [],
			searchKeyword: "",
			city: ""
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onCheckoutClick = this.onCheckoutClick.bind(this);	
	}

	componentDidMount() {
	}

	async onCheckoutClick() {
		const response = await this.submitOrder(this.state.orderData);
		if (response.message) {
			alert(response.message);
		}
	}

	isSearchQueryValid() {
		return this.state.city.length && this.state.searchKeyword.length;
	}

	parseSearchQuery(text) {
		const textSegments = text.toLowerCase().split(' in ');
		if (textSegments.length === 2) {
			return {
				searchKeyword: textSegments[0].trim(),
				city: textSegments[1].trim()
			}
		}
		else
			return null;
	}

	onSearchChange(text) {
		//make sure that format is "<Search keyword> in <Loaction>"
		const parsedQuery = this.parseSearchQuery(text.trim());

		if (parsedQuery !== null) {
			this.findByName(parsedQuery.searchKeyword, parsedQuery.city);

			this.setState({
				searchKeyword: parsedQuery.searchKeyword,
				city: parsedQuery.city
			});
		}
		else {
			this.setState({
				searchKeyword: "",
				city: ""
			});
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
		let resultSummaryContent;
		
		if (data.length) {
			//show found resutls
			resultSummaryContent = <span><em><b>{this.state.searchKeyword}</b></em> restaurants in <em><b>{this.state.city}</b></em> we found for you:</span>
		}		
		else if (this.isSearchQueryValid() && data.length === 0) {
			//looks that nothing found by the query
			resultSummaryContent = <span><em><b>{this.state.searchKeyword} </b></em> was not found in <em><b>{this.state.city}</b></em></span>
		}

		return (
			<div>
				<div className="results-summary">
					{resultSummaryContent}
				</div>

				<ul className="restaurant-list">
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
				{categories.map(c => {
					const showCategory = c.name.toLowerCase().indexOf(this.state.searchKeyword.toLowerCase()) === -1;

					return (<li key={c.name} className="category" title={c.name}>
						{!showCategory ? <span className="category-name">{c.name}</span> : ""}
						{this.renderMenuItems(c.menuItems)}
					</li>)
				})
				}
			</ul>
		);
	}

	renderMenuItems(menuItems) {
		return (
			<ul className="menu-item-list">
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
			:  this.renderData(this.state.data);

		return (
			<div className="content">				
				<SearchBox onChange={this.onSearchChange} />
				{dataContent}
			</div>
		);
	}

	async submitOrder(orderData) {
		const response = await fetch(`${SearchResults.baseUrl}/submitorder`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(orderData)
		});
		const data = await response.json();
		return data;
	}

	async findByName(searchKeyword, city) {		
		this.setState({ dataLoading: true });

		const response = await fetch(`${SearchResults.baseUrl}/${city}/${searchKeyword}`);
		const data = await response.json();

		this.setState({
			data: data,
			dataLoading: false,
			orderData: []
		});
	}
}
