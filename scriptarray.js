//make array of separate words from quote in html, add span element to each word, array to strying
const quoteWords = document.getElementById('quote').innerHTML.split(" ").map(element => { return `<span>${element}</span>`});
let quoteString = quoteWords.join('');
document.getElementById('quote').innerHTML = quoteString;

//add event listener to each button
for(element of document.querySelectorAll('#rood, #groen, #blauw, #geel'))
{
    document.getElementById(element.id).addEventListener('click', highlightWord);
}

document.getElementById('typed-value').focus();

function highlightWord(event){
    const hitWord = document.querySelector('#typed-value').value;
    for(const element in quoteWords) {
        if(document.querySelector('#quote').children[element].innerText.replace(/\,|\./, '') == hitWord) {
            document.querySelector('#quote').children[element].className = event.composedPath()[0].id;
            document.getElementById('typed-value').classList.remove('rood');
            document.getElementById('message').innerHTML = `Woord <i>${hitWord}</i> is <span class="${event.composedPath()[0].id}">${event.composedPath()[0].id}</span> gemaakt!`;
            document.getElementById('typed-value').select();
            var woordGevonden = true;
        } else if(woordGevonden != true) {
            document.getElementById('typed-value').classList.add('rood');
            document.getElementById('message').innerText = " Woord niet gevonden :(";
            document.getElementById('typed-value').select();
        }
    }
}

//.replace(/\,|\./, '')