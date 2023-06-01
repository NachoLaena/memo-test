const gridEl = document.querySelector(".grilla");
const btns = document.querySelectorAll(".btn-dif");
const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const positions = [...Array(10).keys()];
const CardsToCompare = [];
const startBtn = document.querySelector("#start-game");
const newGameBtn = document.querySelector("#new-game");
const winEl = document.querySelector(".winner");
const failsEl = document.querySelector(".fails");
let points = 0;
let cards;
let fails;
let difficulty;

startBtn.addEventListener("click", startGame);

newGameBtn.addEventListener("click", () => {
	if (difficulty === "easy") {
		activateMode(easyMode);
	}

	if (difficulty === "medium") {
		activateMode(mediumMode);
	}

	if (difficulty === "hard") {
		activateMode(hardMode);
	}
});

btns.forEach((button) => {
	button.addEventListener("click", () => {
		removeActive();
		switch (button.textContent) {
			case "Easy":
				activateMode(easyMode);
				break;

			case "Medium":
				activateMode(mediumMode);
				break;

			case "Hard":
				activateMode(hardMode);
				break;
		}
	});
});

winEl.addEventListener("click", () => {
	winEl.style.animationName = "fadeOut";
	setTimeout(() => {
		winEl.style.display = "none";
	}, 900);
});

function clearBoard() {
	gridEl.innerHTML = "";
}

function compareCards() {
	if (CardsToCompare.length === 2) {
		if (CardsToCompare[0].textContent === CardsToCompare[1].textContent) {
			CardsToCompare.forEach((card) => {
				card.firstElementChild.style.backgroundColor = "var(--correct-color)";
			});
			points++;
		} else {
			CardsToCompare.forEach((card) => {
				setTimeout(() => {
					card.classList.toggle("flipped");
					card.style.pointerEvents = "auto";
				}, 500);
			});
			failsEl.textContent = `fails: ${++fails}`;
		}
		CardsToCompare.splice(0, 2);
		if (points * 2 === cards.length) {
			winEl.style.animationName = "fadeIn";
			winEl.style.display = "flex";
		}
	}
}

function chargeCards() {
	cards = document.querySelectorAll(".card");
	cards.forEach((card) => {
		card.style.pointerEvents = "none";
		card.addEventListener("click", () => {
			card.classList.toggle("flipped");
			card.style.pointerEvents = "none";
			CardsToCompare.push(card);
			compareCards();
		});
	});
}

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

function addCards(array, item) {
	for (let i = 0; i < 2; i++) {
		array.push(
			`<div class="card">
			<div class="front">${item}</div>
			<div class="back"><span>?</span></div>
		</div>`
		);
	}
}

function createCards(num) {
	const newCards = [];
	shuffle(positions);
	for (let i = 0; i < num / 2; i++) {
		let pos = positions[i];
		let item = items[pos];
		addCards(newCards, item);
	}
	shuffle(newCards);
	gridEl.innerHTML = newCards.join(" ");
	chargeCards();
}

function removeActive() {
	btns.forEach((btn) => {
		btn.classList.remove("active");
		btn.disabled = false;
	});
}

function easyMode() {
	btns[0].classList.add("active");
	btns[0].disabled = true;
	gridEl.style.gridTemplateColumns = "repeat(4, 1fr)";
	gridEl.style.gridTemplateRows = "repeat(2, 1fr)";
	clearBoard();
	createCards(8);
	difficulty = "easy";
}

function mediumMode() {
	btns[1].classList.add("active");
	btns[1].disabled = true;
	gridEl.style.gridTemplateColumns = "repeat(4, 1fr)";
	gridEl.style.gridTemplateRows = "repeat(3, 1fr)";
	clearBoard();
	createCards(12);
	difficulty = "medium";
}

function hardMode() {
	btns[2].classList.add("active");
	btns[2].disabled = true;
	gridEl.style.gridTemplateColumns = "repeat(5, 1fr)";
	gridEl.style.gridTemplateRows = "repeat(4, 1fr)";
	clearBoard();
	createCards(20);
	difficulty = "hard";
}

function activateMode(mode) {
	points = 0;
	fails = 0;
	failsEl.textContent = `fails: ${fails}`;
	mode();
	startBtn.style.pointerEvents = "auto";
}

function startGame() {
	cards.forEach((card) => {
		card.classList.toggle("flipped");
		setTimeout(() => {
			card.classList.toggle("flipped");
			card.style.pointerEvents = "auto";
		}, 1000);
	});
	startBtn.style.pointerEvents = "none";
}

activateMode(easyMode);