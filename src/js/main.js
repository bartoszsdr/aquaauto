let logo, burgerBtn, navbar, menu, menuItems, menuLinks, footerYear, scrollSpySections, contactSection;

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
};

const prepareDOMEvents = () => {
	logo.addEventListener('click', closeMenu);
	burgerBtn.addEventListener('click', showMenu);
	menuItems.forEach(item => item.addEventListener('click', closeMenu));
	menuLinks.forEach(link => link.addEventListener('click', handleActiveClass));
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

const portfolioSectionImg = document.querySelectorAll('.portfolio__box img');

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

///.portfolio__box text OBSERVER

const portfolioSectionText = document.querySelectorAll('.portfolio__box div');

const observerTwo = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			entry.target.classList.toggle('animation-two', entry.isIntersecting);
			if (entry.isIntersecting) observerTwo.unobserve(entry.target);
		});
	},
	{
		threshold: 0.1,
	}
);
portfolioSectionText.forEach(section => {
	observerTwo.observe(section);
});

///

/// START

window.addEventListener('scroll', handleScrollSpy);

prepareDOMElements();
prepareDOMEvents();
handleCurrentYear();
