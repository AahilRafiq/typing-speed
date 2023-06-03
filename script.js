// Word base start
var word_base=["hello","world","the","of","and","to","in","is","a","that","it","you","for","on","with","be","by","at","this","are","from","but","not","which","or","had","as","when","one","were","all","can","they","their","what","so","up","out","if","about","into","time","two","may","first","me","shoot","been","said","would","could","there","very","some","then","no","make","like","over","know","people","see","any","just","new","way","after","much","these","then","her","him","its","our","were","them","your","than","those","did","don","won","tony","damn","apple","cat","hello","code","java","project","bye","hello","world","computer","science","programming","language","model","artificial","intelligence","machine","learning",];
var txt_lineup = [];
var curr_word_num = 0;
var letter_num = 0;
var tmp = "ini";
var numOfChars=0;
var timeCnt = 0;
var totalCharNum = 0;
var tmpMistakes = 0;
var isStart = false;

//Start function
document.getElementById("start-button").addEventListener("mouseup",function(event){
    if(event.button===0 && !(event.code === 'Space' || event.code === 'Enter')){
        timeCnt=0;
        numOfChars=0;
        this.textContent="Reset";
        const time_var = document.getElementById("timer");
        time_var.textContent="Time : 0";
        document.getElementById("text-displayer").innerHTML = '';
        txt_lineup=[];
        generate_words();
        letter_num=0;
        curr_word_num=0;
        totalCharNum=0;
        tmpMistakes=0;
        tmp = "";
        document.getElementById("heading").textContent= "Typing Speed Test";
        document.getElementById(curr_word_num).classList.add("current-word");
        isStart = false;
    }
});

setInterval(updateTimer,1000);
//Timer

// Generate random words first
generate_words();
tmp = "";
document.getElementById(curr_word_num).classList.add("current-word");

//Check each word press
document.addEventListener("keydown", function (event) {

    if(isStart==false){
        timeCnt=0;
        numOfChars=0;
        this.textContent="Reset";
        const time_var = document.getElementById("timer");
        time_var.textContent="Time : 0";
        time_var.style.visibility = "visible";
        isStart=true;
        document.getElementById("start-button").textContent="Reset!";
        document.getElementById("start-button").style.visibility = "visible";
    }

    //if user is trying to clear the current word  
    if (event.ctrlKey && event.key == "Backspace") {
    document.getElementById("type-box").textContent=",";
    numOfChars = numOfChars - tmp.length + tmpMistakes;
    tmpMistakes=0;
    tmp = "";
    letter_num=0;
    document.getElementById(curr_word_num).classList.remove("correct-word");
    document.getElementById(curr_word_num).classList.remove("wrong-word");
    document.getElementById(curr_word_num).classList.add("current-word");
}

//if space bar pressed
if (event.key == " ") {

    numOfChars++;
    totalCharNum++;
    if(curr_word_num==49){
        calculateWPM();
        document.getElementById("timer").style.visibility = "hidden";
        curr_word_num++;
        return;
    }

    if (tmp.length != txt_lineup[curr_word_num].length) {
        document.getElementById(curr_word_num).classList.add("wrong-word");
    } else if (tmp.length == txt_lineup[curr_word_num].length) {
        if (tmp == txt_lineup[curr_word_num]) {
            document.getElementById(curr_word_num).classList.add("correct-word");
        } else {
            document.getElementById(curr_word_num).classList.add("wrong-word");
        }
    }
    curr_word_num++;
    tmp = "";
    document.getElementById("type-box").textContent=",";
    letter_num = 0;
    document.getElementById(curr_word_num).classList.add("current-word");
    return;
}
//if BACKSPACE pressed
else if (event.key == "Backspace") {
    if (letter_num != 0) {
        if(tmp[tmp.length-1]==txt_lineup[curr_word_num][letter_num-1]) numOfChars--;
        totalCharNum--;
        tmp = tmp.substring(0, tmp.length - 1);
        letter_num--;
        console.log(tmp + "," + txt_lineup[curr_word_num]);
        document.getElementById(curr_word_num).classList.remove("wrong-word");
        document.getElementById(curr_word_num).classList.add("current-word");
    }
} else if(!event.ctrlKey){

    tmp += event.key;
    numOfChars++;
    totalCharNum++;
    if (tmp[letter_num] != txt_lineup[curr_word_num][letter_num]) {
        const ele = document.getElementById(curr_word_num);
        ele.classList.remove(...ele.classList);
        document.getElementById(curr_word_num).classList.add("wrong-word");
        tmpMistakes++;
        numOfChars--;
    }
    letter_num++;
}
document.getElementById("type-box").textContent=tmp;
document.getElementById("test-numc").textContent=curr_word_num+1 + "/50";
});

function updateTimer(){
    timeCnt++;
    document.getElementById("timer").textContent="Time : " + timeCnt ;
}

function calculateWPM(){
    const wpm = (((numOfChars/5)/timeCnt)*60);
    const accuracy = Math.ceil((numOfChars/totalCharNum)*100 - 5);
    if(totalCharNum < 80){
        document.getElementById("heading").textContent="Please type more for accurate readings!";
    }
    else document.getElementById("heading").textContent="Average WPM : " + Math.floor(wpm) + ", Accuracy : " + accuracy + "%";
}

function generate_words() {
  for (i = 0; i < 50; i++) {
    const index = Math.floor(100 * Math.random());
    txt_lineup.push(word_base[index]);
    var word = document.createElement("span");
    word.textContent = txt_lineup[i];
    word.id = i;
    document.getElementById("text-displayer").appendChild(word);
  }
}
