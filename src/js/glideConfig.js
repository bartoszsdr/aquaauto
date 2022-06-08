const configReviews = {
	type: 'carousel',
	perView: 3,
	autoplay: 3000,
	gap: 30,
	breakpoints: {
		768: {
			perView: 1,
		},
		992: {
			perView: 2,
		},
		1400: {
			perView: 3,
		},
	},
};

new Glide('.glide-reviews', configReviews).mount();
