const galleryItems = [
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
		description: "Hokkaido Flower",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
		description: "Container Haulage Freight",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
		description: "Aerial Beach View",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
		description: "Flower Blooms",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
		description: "Alpine Mountains",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
		description: "Mountain Lake Sailing",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
		description: "Alpine Spring Meadows",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
		description: "Nature Landscape",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
		description: "Lighthouse Coast Sea",
	},
];
const imageEl = document.querySelector(".js-gallery");
const openModal = document.querySelector(".js-lightbox");
const backdropClose = document.querySelector(".lightbox__overlay");
const imageRef = document.querySelector(".lightbox__image");

const closeBtn = document.querySelector('[data-action="close-lightbox"]');

const imagesMarkup = createImagesList(galleryItems);
imageEl.insertAdjacentHTML("beforeend", imagesMarkup);

imageEl.addEventListener("click", onImageClick);
closeBtn.addEventListener("click", onCloseBtn);
backdropClose.addEventListener("click", onBackdropClick);
document.addEventListener("keydown", onLeftRigthClick);

function createImagesList(galleryItems) {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `<li class = 'gallery__item'>
	        <a class = 'gallery__link' href = '${original}' >
            <img class = 'gallery__image' src = '${preview}'data-source = '${original}' alt = '${description}'/></a></li>`;
		})
		.join("");
}

function onImageClick(e) {
	e.preventDefault();

	if (!e.target.classList.contains("gallery__image")) {
		return;
	}
	openModal.classList.add("is-open");
	imageRef.src = e.target.dataset.source;
	window.addEventListener("keydown", onEscBtnPress);
}

function onCloseBtn() {
	openModal.classList.remove("is-open");
	imageRef.src = "";
	window.removeEventListener("keydown", onEscBtnPress);
}
function onBackdropClick(e) {
	if (e.currentTarget === e.target) {
		onCloseBtn();
	}
}
function onEscBtnPress(e) {
	if (e.code === "Escape") {
		onCloseBtn();
	}
}

function onLeftRigthClick(e) {
	const dataSource = galleryItems.map(({ original }) => original);
	let currentIndex = dataSource.indexOf(imageRef.src);
	if (e.key === "ArrowLeft") {
		leftClick(currentIndex);
	} else if (e.key === "ArrowRight") {
		rightClick(currentIndex);
	}

	function leftClick(currentIndex) {
		let nextIndex = currentIndex - 1;
		if (nextIndex === -1) {
			nextIndex = dataSource.length - 1;
		}
		imageRef.src = dataSource[nextIndex];
	}

	function rightClick(currentIndex) {
		let nextIndex = currentIndex + 1;
		if (nextIndex === dataSource.length) {
			nextIndex = 0;
		}
		imageRef.src = dataSource[nextIndex];
	}
}
