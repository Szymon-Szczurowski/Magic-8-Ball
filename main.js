const input = document.querySelector('.input')
const ballImg = document.querySelector('.img')
const answer = document.querySelector('.answer')
const error = document.querySelector('.error')

// const answersArr = ['Tak!', 'Nie.', 'Może.', 'Ciężko powiedzieć...', 'Nie chcesz znać odpowiedzi na to pytanie... :/']
// DODAĆ API!

const shakeBall = () => {
	ballImg.classList.add('shake-animation')
	setTimeout(checkInput, 1000)
}

const checkInput = () => {
	const text = input.value
	

	if (text === '') {
		error.textContent = 'You have to ask the question!'
		answer.textContent = ''
	} else if (text.length < 10) {
		error.textContent = 'Your question should have a minimum of 10 characters'
		answer.textContent = ''
	} else if (!text.endsWith('?')) {
		// else if (text.slice(-1) !== '?)
		error.textContent = 'The question must end with a "?"'
		answer.textContent = ''
	} else {
		error.textContent = ''
		// generateAnswer()
		generateApiAnswer(text)
	}
	ballImg.classList.remove('shake-animation')
}

const generateApiAnswer = input => {

	const options = {
	  method: 'GET',
	  url: 'https://magic-8-ball1.p.rapidapi.com/my_answer/',
	  params: {question: `${input}`},
	  headers: {
	    'X-RapidAPI-Key': '138f7b131emshae28ee3e133cdc2p178a3djsn25b317e33ff6',
	    'X-RapidAPI-Host': 'magic-8-ball1.p.rapidapi.com'
	  }
	};
	axios.request(options).then(function (response) {
		answer.innerHTML = `<span>Answer:</span> ${response.data.answer}`
		console.log(response);
	}).catch(function (error) {
		console.error(error);
	});
}

const enterKeyCheck = (e) => {
	if(e.key === 'Enter'){
		shakeBall()
	}
}
input.addEventListener('keyup', enterKeyCheck)
ballImg.addEventListener('click', shakeBall)


// const generateAnswer = () => {
// 	const radnomNumber = Math.floor(Math.random() * answersArr.length)
// 	// answer.textContent = answersArr[radnomNumber]
// 	answer.innerHTML = `<span>Odpowiedź:</span> ${answersArr[radnomNumber]}`
// }


// const checkInput = () => {
//     if (input.value !== '' && input.value.slice(-1) === '?') {
//         generateAnswer();
//         error.textContent = '';
//     } else if (input.value !== '' && input.value.slice(-1) !== '?') {
//         error.textContent = 'Pytanie musi być zakończone znakiem "?".';
//         answer.textContent = ''
//     } else {
//         error.textContent = 'Musisz zadać jakieś pytanie!';
//         answer.textContent = ''
//     }

//     ball.classList.remove('shake-animaton');
// }
