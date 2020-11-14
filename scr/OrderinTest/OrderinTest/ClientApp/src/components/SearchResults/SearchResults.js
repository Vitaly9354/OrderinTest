import React, { Component } from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import { SearchResultsList } from '../SearchResultsList/SearchResultsList';

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
			this.findByNameAndCity(parsedQuery.searchKeyword, parsedQuery.city);

			this.setState({
				searchKeyword: parsedQuery.searchKeyword,
				city: parsedQuery.city
			});
		}
		else {
			this.setState({
				searchKeyword: "",
				city: "",
				data: []
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

	
	render() {
		const { data } = this.state;

		let dataContent = this.state.dataLoading 
			? <p><em>Loading Data...</em></p>
			: <SearchResultsList data={data}
				orderData={this.state.orderData}
				onCheckoutClick={this.onCheckoutClick}
				onCheckboxChange={this.onCheckboxChange}
				searchKeyword={this.state.searchKeyword}
				city={this.state.city}
				isSearchQueryValid={this.isSearchQueryValid()}/> 

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

	async findByNameAndCity(searchKeyword, city) {		
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
