const contactForm = document.getElementById('contact-form');
const messageBox = document.querySelector('.message-alert');

window.onload = function () {
	contactForm.addEventListener('submit', function (event) {
		event.preventDefault();
		this.contact_number.value = (Math.random() * 100000) | 0;
		emailjs.sendForm('service_2jv2bpq', 'aqua-auto-form', this).then(
			function () {
				console.log('Wysłano!');
				showMessageAlert();
				contactForm.reset();
			},
			function (error) {
				console.log('ERROR', error);
			}
		);
	});
};

const showMessageAlert = () => {
	messageBox.classList.remove('hidden-message');
	messageBox.classList.add('show-message');
};
