import React from 'react';

export const CheckoutButton = ({ orderData, onClick }) => {	
	const total = orderData.map(i => i.price).reduce((a, b) => a + b, 0.0);

	const totalContent = total > 0.0 ? `- R${total}` : '';

	return (
		<button onClick={onClick} className="checkout-button">
			Order {totalContent}
		</button>
	)
}