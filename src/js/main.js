let logo,
	burgerBtn,
	navbar,
	menu,
	menuItems,
	menuLinks,
	footerYear,
	scrollSpySections,
	contactSection,
	cookieBox,
	cookieBtn,
	messageBtn,
	messageErrBtn,
	scrollBtn;

const prepareDOMElements = () => {
	logo = document.querySelector('.navbar__logo');
	navbar = document.querySelector('.navbar');
	burgerBtn = document.querySelector('.navbar__burger-btn');
	menu = document.querySelector('.navbar__list');
	menuItems = document.querySelectorAll('.navbar__item');
	menuLinks = document.querySelectorAll('.navbar__item a');
	footerYear = document.querySelector('.footer__year');
	contactSection = document.querySelector('.navbar__item:nth-last-child(1)');
	scrollSpySections = document.querySelectorAll('.scrollspy');
	cookieBox = document.querySelector('.cookie-alert');
	cookieBtn = document.querySelector('.cookie-btn');
	messageBtn = document.querySelector('.message-btn');
	messageErrBtn = document.querySelector('.message-error-btn');
	scrollBtn = document.querySelector('.footer__scroll');
};

const prepareDOMEvents = () => {
	logo.addEventListener('click', closeMenu);
	burgerBtn.addEventListener('click', showMenu);
	window.addEventListener('resize', deleteClassOnDesktop);
	window.addEventListener('scroll', handleScrollSpy);
	menuItems.forEach(item => item.addEventListener('click', closeMenu));
	menuLinks.forEach(link => link.addEventListener('click', handleActiveClass));
	cookieBtn.addEventListener('click', hideCookieBox);
	messageBtn.addEventListener('click', hideMessageBox);
	messageErrBtn.addEventListener('click', hideMessageErrorBox);
	scrollBtn.addEventListener('click', scrollToTop);
};

const deleteClassOnDesktop = () => {
	window.innerWidth > 992 && (menu.classList.remove('show-menu'), burgerBtn.classList.remove('is-active'));
};

const showMenu = () => {
	menu.classList.toggle('show-menu');
	burgerBtn.classList.toggle('is-active');
	document.body.classList.toggle('fixed-body');
};

const closeMenu = () => {
	burgerBtn.classList.remove('is-active');
	menu.classList.remove('show-menu');
	document.body.classList.remove('fixed-body');
};

const handleActiveClass = e => {
	menuItems.forEach(menuItem => menuItem.classList.remove('navbar__item--active'));
	e.target.parentElement.classList.add('navbar__item--active');
};

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.textContent = year;
};

const showCookieBox = () => {
	const cookies = localStorage.getItem('cookie');
	if (cookies) {
		cookieBox.classList.add('hidden-cookies');
	}
};

const hideCookieBox = () => {
	localStorage.setItem('cookie', 'true');
	cookieBox.classList.add('hidden-cookies');
};

const hideMessageBox = () => {
	messageBox.classList.add('hidden-message');
};

const hideMessageErrorBox = () => {
	messageErrorBox.classList.add('hidden-message-error');
};

const scrollToTop = () => {
	window.scrollTo({ top: 0 });
};

// SCROLLSPY

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		document.body.style.height = 'auto';
		const sections = [];

		scrollSpySections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 100) {
				const currentSection = document.getElementById(section.id);

				sections.push(currentSection);
				const activeSection = document.querySelector(`[href*="#${sections[0].id}"]`);

				menuItems.forEach(menuItem => menuItem.classList.remove('navbar__item--active'));

				if (activeSection != null) {
					activeSection.parentElement.classList.add('navbar__item--active');
				}
			}
		});

		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
			menuItems.forEach(menuItem => menuItem.classList.remove('navbar__item--active'));
			contactSection.classList.add('navbar__item--active');
		}
	}
};

///.portfolio__box images OBSERVER

const portfolioSectionImg = document.querySelectorAll('.portfolio__box');

const observerOne = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			entry.target.classList.toggle('animation-one', entry.isIntersecting);
			if (entry.isIntersecting) observerOne.unobserve(entry.target);
		});
	},
	{
		threshold: 0.1,
	}
);
portfolioSectionImg.forEach(section => {
	observerOne.observe(section);
});

///

///.gallery images OBSERVER

const gallerySection = document.querySelectorAll('.gallery__box img');

const observerThree = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			entry.target.classList.toggle('animation-three', entry.isIntersecting);
			if (entry.isIntersecting) observerThree.unobserve(entry.target);
		});
	},
	{
		threshold: 0.1,
	}
);
gallerySection.forEach(section => {
	observerThree.observe(section);
});

///

/// START

prepareDOMElements();
prepareDOMEvents();
handleCurrentYear();
showCookieBox();
