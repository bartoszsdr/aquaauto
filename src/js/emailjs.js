const contactForm = document.getElementById('contact-form');
const messageBox = document.querySelector('.message-alert');
const messageErrorBox = document.querySelector('.message-error-alert');

window.onload = function () {
	contactForm.addEventListener('submit', function (event) {
		event.preventDefault();
		this.contact_number.value = (Math.random() * 100000) | 0;
		emailjs.sendForm('service_2jv2bpq', 'aqua-auto-form', this).then(
			function () {
				// console.log('sent');
				showMessageSentAlert();
				contactForm.reset();
			},
			function (error) {
				// console.log(error);
				showMessageErrorAlert();
				contactForm.reset();
			}
		);
	});
};

const showMessageSentAlert = () => {
	messageBox.classList.remove('hidden-message');
	// messageBox.classList.add('show-message');
};

const showMessageErrorAlert = () => {
	messageErrorBox.classList.remove('hidden-message-error');
	// messageBox.classList.add('show-message');
};
