//Array of quote-strings
const quotesList = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];


//EVENT LISTENERS
//Add eventlistener to each color button
for(element of document.querySelectorAll('#red, #green, #blue, #yellow'))
{
    document.getElementById(element.id).addEventListener('click', highlightWord);
}

//Add eventlistener to each word (span) and make them clickable
function makeWordsClickable() {
    for(element of document.querySelectorAll('#quote span')) {
        element.addEventListener('click', wordClicked);
    }
}

//Add eventlistener to new quote-button, call printQuote()
document.getElementById('refresh').addEventListener('click', printQuote);

//Add eventlistener to clear colors-button
document.getElementById('clear').addEventListener('click', function(){
    for(const element of document.querySelectorAll("#quote span")) {
        element.removeAttribute('class');
    }
    document.getElementById('typed-value').value = "";
    inputFieldFocus();
    document.getElementById('message').innerText = "Colors cleared";
    }  
)


//FUNCTIONS
//Behaviour when a word is clicked
function wordClicked(event){
    if(event.srcElement.classList.contains("selected")) { //Deselection behavior
        document.getElementById('typed-value').value = "";
        event.srcElement.classList.remove("selected");
        if(event.srcElement.className == ""){event.srcElement.removeAttribute('class');} //Remove class attribute entirely if it is empty after the "selected" class has been removed
        document.getElementById('message').innerHTML = "Deselected <i>" + event.srcElement.innerHTML.replace(/\,|\./, '') + "</i>";
        document.getElementById('typed-value').removeAttribute('readonly');
        inputFieldFocus();
    } else { //Selection behavior
        for(element of document.querySelectorAll('#quote span')) {
            element.classList.remove("selected");
        }
        event.srcElement.classList.add("selected");
        document.getElementById('typed-value').setAttribute('readonly', true);
        document.getElementById('typed-value').value = event.srcElement.innerText.replace(/\,|\./, '');
        inputFieldFocus();
        document.getElementById('message').innerHTML = "Selected <i>" + event.srcElement.innerText.replace(/\,|\./, '') + "</i>, now select a color...";
    }
}

//Checks the user agent, if it isn't mobile, sets focus (if input field is empty) 
//or selects value (if input field contains a value)
function inputFieldFocus(){
    if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) == false){
        if(document.getElementById('typed-value').value == "") {
            document.getElementById('typed-value').focus();
        }
        else { 
            document.getElementById('typed-value').select();
        }
    }
}

//Actual word coloring
function highlightWord(event){
    const hitWord = document.querySelector('#typed-value').value;
    for(const element in quoteWords) { //loop through array of words and color if match was found
        if(document.querySelector('#quote').children[element].innerText.replace(/\,|\./, '').toLowerCase() == hitWord.toLowerCase()) {
            document.querySelector('#quote').children[element].className = event.composedPath()[0].id;
            document.getElementById('message').innerHTML = `Made <i>${hitWord}</i> <span class="${event.composedPath()[0].id}">${event.composedPath()[0].id}</span>`;
            inputFieldFocus();
            var woordGevonden = true;
            document.getElementById('typed-value').removeAttribute('readonly');
        } else if(woordGevonden != true) {
            document.getElementById('message').innerText = "Word not found :(";
            inputFieldFocus();
        }
    }
}

//Returns a random string from passed array
function giveQuote(quoteArray) {
    const index = Math.floor((Math.random() * quoteArray.length));
    return quoteArray[index];
}

//Gets string from array of quotes, make array of separate words from quote-string, 
//add span element to each word, finally print the joined string to the document
function printQuote() {
    quoteWords = giveQuote(quotesList).split(" ").map(element => { return `<span>${element}</span>`});
    let quoteString = quoteWords.join('');
    document.getElementById('quote').innerHTML = quoteString;
    
    //refresh input field
    document.getElementById('typed-value').value = "";

    //set initial message
    document.getElementById('message').innerText = "Type or tap a word, then a color";
    
    makeWordsClickable();
    inputFieldFocus();
}


//INITIALIZE PAGE
let quoteWords = [];
printQuote();
inputFieldFocus();