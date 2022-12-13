// const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

// let passwordsCharLength = 12
// let isAlive = false
// let pass1El = document.getElementById("pass1-el")
// let pass2El = document.getElementById("pass2-el")

// function passwordRender() {
//     isAlive = true
//     pass1El.textContent = generateRandomPassword()
//     pass2El.textContent = generateRandomPassword()
// }

// function getRandomcharacter() {
//     let randomChar = Math.floor(Math.random() * characters.length)
//     return characters[randomChar]
// }

// function generateRandomPassword() {
//     isAlive = true
//     let randomPassword = ""
//     for(let i = 0; i < passwordsCharLength ; i++ ){
//         randomPassword += getRandomcharacter()
//     }
//     return randomPassword
// 

// this is one way of doing it if we want our passowrd generator app very simple like only 12 characters and no choice between choosing symbols or numbers || not an elegant solution 

// elegant solution 

//genertors for different functionality  https://www.net-comber.com/charset.html -- for charset and elegant one line solution 

let pass1El = document.getElementById("pass1-el");
let pass2El = document.getElementById("pass2-el");
let numbersEl = document.getElementById("numbers");
let symbolsEl = document.getElementById("symbols");
let uppercaseEl = document.getElementById('uppercase');
let lowercaseEl = document.getElementById('lowercase');
let generateEl = document.getElementById("generate");
let lengthEl = document.getElementById("length");


let randomFunc = {                  // an object of all the diffeent functions 
    number: getRandomNumber,
    symbol: getRandomSymbol,
    lower: getRandomLower,
	upper: getRandomUpper,
    
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasSymbols = symbolsEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;

    pass1El.innerText = generatePassword(hasLower,hasUpper, hasSymbols, hasNumbers, length);
    pass2El.innerText = generatePassword(hasLower, hasUpper, hasSymbols, hasNumbers, length);
});

pass1El.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
	const password = pass1El.innerText;
	
	if(!password) {
        return; 
    }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard'); 
});

pass2El.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
	const password = pass2El.innerText;
	
	if(!password) {
        return; 
    }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});


//genrate password function 
function generatePassword(lower, upper, symbol, number, length) {
    // 1. Initalise pasword variable 
    // 2. Filter out unchecked types 
    // 3. Loop over length and call generator functons according to checked unchecked of each type
    // 4. add final password to the password variable and return 

    let generatedPassword = "";
    const typesCount = lower + upper + symbol + number ;
    // can create an if-else llop to include/ not include the checked boxes' functions the elegent or one way is given down as follows 
    // create an array of the types and remove/filter the uncheck from it 
    //pass the types as objects 

    const typesArr = [{lower}, {upper}, {symbol}, {number}].filter(
        item => Object.values(item)[0]
    );

    if(typesCount === 0) {
        return "";
    }
    
    for(let i = 0; i < length; i++) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log("funcName: ", funcName);
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10 + 48));
}

function getRandomSymbol() {
    let symbols = "~`!@#$%^&*()_-+={[}],|:;<>.?/" ;
    return symbols[Math.floor(Math.random() * symbols.length)];
}

















