//make array of separate words from quote in html
quoteString = document.getElementById('quote').innerHTML;
quote = document.getElementById('quote').innerText.split(" ");
quoteWordList = [];

//strip quote from comma's and dots
for(const element in quote) {
    quoteWordList.push(quote[element].replace(/\,|\./, ''));
};
// console.log(quote);
// console.log(quoteWordList);

document.querySelector('#rood').addEventListener('click', highlightWord);
document.querySelector('#groen').addEventListener('click', highlightWord);
document.querySelector('#blauw').addEventListener('click', highlightWord);
document.querySelector('#geel').addEventListener('click', highlightWord);

function highlightWord(event){
    const hitWord = document.querySelector('#typed-value').value;
    if(quoteWordList.includes(hitWord)) {
        document.getElementById('quote').innerHTML = quoteString.replaceAll(hitWord, `<span class="${event.path[0].id}">${hitWord}</span>`);
        quoteString = document.getElementById('quote').innerHTML;
        document.getElementById('typed-value').classList.remove('rood');
        document.getElementById('message').innerHTML = ` Woord <i>${hitWord}</i> is <span class="${event.path[0].id}">${event.path[0].id}</span> gemaakt!`;
    }
    else {
        document.getElementById('typed-value').classList.add('rood');
        document.getElementById('message').innerText = " Woord niet gevonden :(";
    }
}

