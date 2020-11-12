import React from 'react';

export const SearchBox = ({ onChange }) => {
	return (
		<div className="search-box">
			<input placeholder="Type your request.." type="text" width="240" onChange={e => onChange(e.target.value)}/>
		</div>)
}