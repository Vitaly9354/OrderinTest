import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import './../SearchBox/SearchBox.css';

export const SearchBox = ({ onChange }) => {
	const debouncedOnChange = AwesomeDebouncePromise(onChange, 1200)

	return (
		<div className="search-box">
			<input placeholder="<Search keyword> in <location>" type="text" width="240" onChange={e => debouncedOnChange(e.target.value)}/>
		</div>)
}