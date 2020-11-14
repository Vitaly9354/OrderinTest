import React from 'react';

export const CheckoutButton = ({ orderData, onClick }) => {	
	if (orderData.length) {
		const total = orderData.map(i => i.price).reduce((a, b) => a + b, 0.0);

		return (
			<button onClick={onClick} className="checkout-button">
				Order - R{total}
			</button>
		)
	}

	return (
		<button className="checkout-button" disabled="disabled">
			Order
		</button>
	)
}