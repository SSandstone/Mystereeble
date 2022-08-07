const wordsFive= 'about above abuse actor acute admit adopt adult after again agent agree ahead alarm album alert alike alive allow alone along alter among anger Angle angry apart apple apply arena argue arise array aside asset audio audit avoid award aware badly baker bases basic basis beach began begin begun being below bench billy birth black blame blind block blood board boost booth bound brain brand bread break breed brief bring broad broke brown build built buyer cable calif carry catch cause chain chair chart chase cheap check chest chief child china chose civil claim class clean clear click clock close coach coast could count court cover craft crash cream crime cross crowd crown curve cycle daily dance dated dealt death debut delay depth doing doubt dozen draft drama drawn dream dress drill drink drive drove dying eager early earth eight elite empty enemy enjoy enter entry equal error event every exact exist extra faith false fault fiber field fifth fifty fight final first fixed flash fleet floor fluid focus force forth forty forum found frame frank fraud fresh front fruit fully funny giant given glass globe going grace grade grand grant grass great green gross group grown guard guess guest guide happy harry heart heavy hence henry horse hotel house human ideal image index inner input issue japan jimmy joint jones judge known label large laser later laugh layer learn lease least leave legal level lewis light limit links lives local logic loose lower lucky lunch lying magic major maker march maria match maybe mayor meant media metal might minor minus mixed model money month moral motor mount mouse mouth movie music needs never newly night noise north noted novel nurse occur ocean offer often order other ought paint panel paper party peace peter phase phone photo piece pilot pitch place plain plane plant plate point pound power press price pride prime print prior prize proof proud prove queen quick quiet quite radio raise range rapid ratio reach ready refer right rival river robin roger roman rough round route royal rural scale scene scope score sense serve seven shall shape share sharp sheet shelf shell shift shirt shock shoot short shown sight since sixth sixty sized skill sleep slide small smart smile smith smoke solid solve sorry sound south space spare speak speed spend spent split spoke sport staff stage stake stand start state steam steel stick still stock stone stood store storm story strip stuck study stuff style sugar suite super sweet table taken taste taxes teach teeth terry texas thank theft their theme there these thick thing think third those three threw throw tight times tired title today topic total touch tough tower track trade train treat trend trial tried tries truck truly trust truth twice under undue union unity until upper upset urban usage usual valid value video virus visit vital voice waste watch water wheel where which while white whole whose woman women world worry worse worst worth would wound write wrong wrote yield young youth';
const acceptedWords=[...wordsFive];
//save these for later!
//`helpme please ohgod theyare watching usall`;
//
//
//
//
const dictFive=wordsFive.toUpperCase().split(' ');
const wordGrid=document.getElementById('words');
const guessGrid=document.getElementById('guess');
const letterCell=document.createElement('div');
const guessCell=document.createElement('input');
const guessesLeft=document.createElement('h4');
const submitBtn=document.getElementById('guessSubmit');
const guesses=document.querySelectorAll('.letterGuessed');
const resetBtn=document.getElementById('resetBtn');
const letter=document.querySelectorAll(`.currentRow`);
const mainTitle=document.querySelector('.mainTitle');
const msgBox=document.querySelector('.msgBox');
const h4=document.createElement('h4');
const firstInput=document.getElementById(`input0`);

let startingWord=`${dictFive[Math.floor(Math.random()*(dictFive.length-1))]}`;
let lastWord='';
let wordLength=startingWord.length;
let letters=startingWord.split('');
let tempList=[...letters];
let guessList=[];
let correctList=[];
let numofGuesses=0;
let rowCounter=1;
let myRow=1;
let myCell=0;

/*
future ideas.. 
- add a lot of words, make some deliberate ones into a message.
use IDs or values to keep track of unique ones found
have a box where they can enter the clue and big msg if they get it right
- create dictionaries with different length words and let users choose word length
- add alphabet between grid and guess div and show the color of them
- make them have to use an acceptable word to guess
- add a virtual keyboard but also let typing keyboard input
*/

//console.log(startingWord);
//console.log(letters)

function createRow(){
    //console.log(wordLength);
    wordGrid.style.gridTemplateColumns=`repeat(${wordLength},1fr)`;
    for(let i=0;i<wordLength*wordLength;i++){
        if(myCell===wordLength){
            myRow++;
            myCell=1;
            createCell();
        } else {
            myCell++;
            createCell();
        }
    };
};

function createCell(){
    const letterCell=document.createElement('div');
    letterCell.classList.add('letter');
    letterCell.setAttribute('id',`row${myRow-1}`)
    wordGrid.appendChild(letterCell);
};

function changeRowClass(){
    const cellRowRemove=document.querySelectorAll('.letter');
    cellRowRemove.forEach(cell => cell.classList.remove('currentRow'));

    const cellRowAdd=document.querySelectorAll(`#row${rowCounter-1}`);
    cellRowAdd.forEach(cell => cell.classList.add('currentRow'));
};

function guessInputArea(){
    guessGrid.style.gridTemplateColumns=`repeat(${wordLength},1fr)`;

    for(let i=0;i<wordLength;i++){
        const guessCell=document.createElement('input');
        guessCell.type='text';
        guessCell.name='letterGuessed'
        guessCell.required='true';
        guessCell.minLength='1';
        guessCell.maxLength='1';
        guessCell.size='1';
        guessCell.classList.add('letterGuessed');
        guessCell.setAttribute('id',`input${i}`);
        guessGrid.appendChild(guessCell);
    };
};

function submitGuess(){
    //console.log('user has guessed');
    //console.log(guessList);
    const guesses=document.querySelectorAll('.letterGuessed');

    guesses.forEach(guess =>{
            let text=guess.value.toUpperCase();
            guessList.push(text);   
    });

    let guessString = guessList.toString();
    const h5=document.createElement('h5');
    if(acceptedWords.includes(guessString)){
        //console.log(guessList);
        checkGuess();
        checkAlmost();
        assignColors();
        numofGuesses++;
        guessNum--;
        rowCounter++;
        remGuesses();
        setRowValues();
        clearGuess();
        gameOver();
        changeRowClass();
        h5.textContent='';
    } else {
        h5.textContent='';
        h5.textContent='Please enter a better word';
        msgBox.appendChild(h5);
        clearGuess();
    };
};

function checkGuess(){

    const letter=document.querySelectorAll(`.currentRow`);
    let index=0;
    tempList=[...letters];
    //console.log(tempList);

    guessList.forEach(item =>{
            if(guessList[index]===letters[index]){
                letter[index].classList.add('correct');
                tempList[index]='';
                tempList.filter(word => word.length>0);
            } else {
                letter[index].classList.add('incorrect');
            };
            index++;
        });
        //console.log(guessList);
        //console.log(tempList);
};

function checkAlmost(){
    const letter=document.querySelectorAll(`.currentRow`);
    let index=0;
    //let tempList=[...letters];
    //console.log(tempList);

    guessList.forEach(item =>{
        if(tempList.includes(guessList[index])){
             letter[index].classList.remove('incorrect');
             letter[index].classList.add('almost');
        };
    });
};

function assignColors(){
    document.querySelectorAll('.correct').forEach((x)=>x.style.background='green');
    document.querySelectorAll('.almost').forEach((x)=>x.style.background='yellow')
    document.querySelectorAll('.incorrect').forEach((x)=>x.style.background='red')
};

function setRowValues(){
    //console.log(guessList);
    let index=0;
    const letter=document.querySelectorAll(`.currentRow`);

    letter.forEach(item =>{
        letter[index].textContent=guessList[index];
        index++;
        }); 
};

function clearGuess(){
    guessList=[];
    const guesses=document.querySelectorAll('.letterGuessed');
    guesses.forEach(guess => guess.value='');
};

function gameOver(){
    const letter=document.querySelectorAll(`.currentRow`);
    const correct=document.querySelectorAll(`.correct.currentRow`);
    //ways to end game
    //number of guesses exceeds length of word
    //all letters are correct && guesses < length of word
    //should be checked at end, after each time guess is submitted
    //console.log(letter.length);
    //console.log(correct.length);    
    if(letter.length==correct.length){
        h4.textContent='';
        winMessage();
        disable();
    } else if (numofGuesses>=wordLength) {
        h4.textContent='';
        loseMessage();
        disable();
    } else {
        //do nothing;
    };
};

function getNewWord(){
    let newWord=`${dictFive[Math.floor(Math.random()*(dictFive.length-1))]}`;
    startingWord=newWord;
    wordLength=startingWord.length;
    letters=startingWord.split('');
}

function remGuesses(){
    guessesLeft.textContent=`You have ${guessNum} guesses left`
    guessesLeft.classList.add('guesses');
    mainTitle.appendChild(guessesLeft);
}

function startUp(){
    submitBtn.hidden=false;
    wordGrid.innerHTML='';
    guessGrid.innerHTML='';
    h4.textContent='';
    guessList=[];
    numofGuesses=0;
    rowCounter=0;
    myRow=0;
    myCell=0;
    getNewWord();
    createRow();    
    guessNum=wordLength;
    guessInputArea();
    remGuesses();
    changeRowClass();
    //autoSelectInput(wordLength);
    const firstInput=document.getElementById(`input0`);
    firstInput.focus();
    firstInput.select();
    console.log(startingWord);
}

function winMessage(){
    h4.textContent=
    `You won in ${guessNum} guesses! 
    Select 'New Game' if you'd like to play again.`;
    msgBox.appendChild(h4);
}

function loseMessage(){
    lastWord=startingWord;
    h4.textContent=
    `You didn't win this time!
    this round\'s solution was: ${lastWord}`;
    msgBox.appendChild(h4);
}

function disable(){
    submitBtn.hidden=true;
};

/*
//I'd like it to move to next input automatically
function autoSelectInput(length){
    const guesses=document.querySelectorAll('.letterGuessed');
    guesses.forEach(guess=>{
        guess.addEventListener('keydown', ()=>{
        const currentInput=document.getElementById(`input${i}`);
        currentInput.focus();
        currentInput.select();
        });
    });
};
*/

document.onload=startUp();
submitBtn.addEventListener('click',submitGuess);
resetBtn.addEventListener('click',startUp);


    
    
    

