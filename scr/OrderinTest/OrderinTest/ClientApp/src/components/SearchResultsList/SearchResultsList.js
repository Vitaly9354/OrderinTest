import React, { Component } from 'react';
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'

import './SearchResultsList.css'

export const SearchResultsList = (props) => {
	const {
		data,
		orderData,
		onCheckoutClick,
		onCheckboxChange,
		searchKeyword,
		city,
		isSearchQueryValid
	} = props;
	
	function renderCategories(categories) {
		return (
			<ul>
				{categories.map(c => {
					const showCategory = c.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) === -1;

					return (<li key={c.name} className="category" title={c.name}>
								{!showCategory ? <span className="category-name">{c.name}</span> : ""}
								{renderMenuItems(c.menuItems)}
							</li>)
					})
				}
			</ul>
		);
	}

	function renderMenuItems(menuItems) {
		return (
			<ul className="menu-item-list">
				{menuItems.map(i =>
					<li key={i.id} className="menu-item">
						<div className="checkbox">
							<label>
								<input
									type="checkbox"
									value={`${i.name} - R${i.price}`}
									onChange={(e) => { onCheckboxChange(e, i) }}
								/>
								{`${i.name} - R${i.price}`}
							</label>
						</div>
					</li>)}
			</ul>
		);
	}

	let resultSummaryContent;
	if (data.length) {
		//show found resutls
		resultSummaryContent = <span><em><b>{searchKeyword}</b></em> restaurants in <em><b>{city}</b></em> we found for you:</span>
	}
	else if (isSearchQueryValid && data.length === 0) {
		//looks that nothing found by the query
		resultSummaryContent = <span><em><b>{searchKeyword} </b></em> was not found in <em><b>{city}</b></em></span>
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
						{renderCategories(item.categories)}
					</li>)}
			</ul>

			<CheckoutButton orderData={orderData} onClick={onCheckoutClick} />
		</div>
	);
}	

