const emailForm = document.getElementById("mainForm");
const formattedFormData = new FormData(emailForm);

const userName = document.querySelector("#name");
const email = document.querySelector("#email-right");
const message = document.getElementById("message");
const sendBtn = document.getElementById("send");
const checkBox = document.querySelector(".checkbox");
const popupForm = document.querySelector(".popup-form");
const fieldSet = document.querySelector(".form__fieldset");
const inputs = [userName, email, message, checkBox];
const wavingInputs = [userName, email, message];

email.addEventListener("blur", (e) => {
	checkMail();

	if (e.target.value === " ") {
		const formBox = e.target.parentElement;
		formBox.classList.remove("error");
		labelsDown(e);
	}
});

userName.addEventListener("blur", (e) => {
	checkMinLength(userName, 3);
	checkMaxLength(userName, 40);

	if (e.target.value.length > 2 && e.target.value.length < 40) {
		const formBox = e.target.parentElement;
		formBox.classList.remove("error");
	} else if (e.target.value === " ") {
		const formBox = e.target.parentElement;
		formBox.classList.remove("error");
		labelsDown(e);
	}
});

message.addEventListener("keyup", (e) => {
	checkMinLength(message, 30);
	checkMaxLength(message, 500);
	const formBox = e.target.parentElement;

	if (e.target.value.length > 40 && e.target.value.length < 500) {
		formBox.classList.remove("error");
	} else if (e.target.value === "") {
		formBox.classList.remove("error");
	}
});

checkBox.addEventListener("click", (e) => {
	handleCheckBox();
	const formBox = checkBox.closest(".form__item");
	if (checkBox.checked == true) {
		formBox.classList.remove("error");
	}
});

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");
	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkMinLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.textContent.slice(
				0,
				-1
			)} too few letters (min ${min}).`
		);
	}
};

const checkMaxLength = (input, max) => {
	if (input.value.length > max) {
		showError(
			input,
			`${input.previousElementSibling.textContent.slice(
				0,
				-1
			)} too much content (max ${max} letters).`
		);
	}
};

const checkMail = () => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "correct e-mail address is needed");
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll(".form__item");
	let errorCount = 0;

	allInputs.forEach((input) => {
		if (input.classList.contains("error")) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popupForm.classList.add("show-popup");
		fieldSet.classList.add("close-fieldset");
		sendEmail();
	}
};
const handleCheckBox = () => {
	const formBox = checkBox.closest(".form__item");

	if (checkBox.checked == true) {
		formBox.classList.remove("error");
		return;
	} else {
		formBox.classList.add("error");
	}
};

function sendEmail() {
	const preparedData = new FormData(emailForm);
	sendData(preparedData);
}

async function sendData(preparedData) {
	try {
		const response = await fetch("e-mail.php", {
			method: "POST",
			body: preparedData,
		});

		const data = await response.text();
	} catch (error) {
		console.log("an error occure");
	}
}

sendBtn.addEventListener("click", (e) => {
	e.preventDefault();

	checkForm(inputs);
	checkMinLength(userName, 3);
	checkMaxLength(userName, 40);
	checkMaxLength(message, 500);
	checkMinLength(message, 30);
	checkMail(email);
	handleCheckBox();
	checkErrors();
});
