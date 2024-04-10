let slider = document.querySelectorAll('.slide');
let startX;
let endX;
let slideActive;
let move = false;
let moveZ = true;
const zList = [];
// "Граница" перемещения
const BORDER = 300;
// Скорость анимации
const SPEED_ANIM = 0.5;

start();
renderRestart();

// Обработчик "зажатия" мыши
slider.forEach(slide => {
	slide.addEventListener('mousedown', function (e) {
		slideActive = slide;

		slider.forEach(slide => {
			slide.style.transform = 'scale(0.8)';
			slide.style.transition = ``;
		});
		slideActive.style.transform = 'scale(1)';

		startX = e.clientX;
		endX = 0;
		move = true;
	});
});

// Обработчик перемещения мыши
document.addEventListener('mousemove', function (e) {
	if (move) {
		// Получаем разницу в координатах
		endX = e.clientX - startX;
		// Перемещаем обьект
		slideActive.style.left = `${endX}px`;
	}
});

// Обработчик "отпускания" мыши
document.addEventListener('mouseup', () => {
	move = false;
	moveZ = true;

	slideActive.style.left = '0px';
	slider.forEach(slide => (slide.style.transition = `all ${SPEED_ANIM}s ease`));

	if (Math.abs(endX) > BORDER) {
		renderRestart(1);
		slider.forEach(slide => {
			slide.style.transform = 'scale(1)';
			slideActive.style.transform = 'scale(0.8)';
		});
	}
});

function start() {
	for (let index = slider.length; index > 0; index--) {
		zList.push(index);
		slider[index - 1].style.top = `-${(index - 1) * 400}px`;
	}
}

function renderRestart(move) {
	console.log('Вызов renderRestart()');

	if (move) {
		console.log('zList до: ' + zList);
		let moveId = zList.pop();
		zList.unshift(moveId);
		console.log('zList после: ' + zList);
	}

	slider.forEach((slide, index) => {
		slide.style.zIndex = `${zList[index]}`;
	});
}
