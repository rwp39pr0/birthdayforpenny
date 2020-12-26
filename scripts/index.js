var SkySpace = document.getElementById('Sky');
var width = SkySpace.offsetWidth;
var height = SkySpace.offsetHeight;

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

document.getElementById('PrayBoard').addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.id != 'PrayBoard'){
        return;
    }
    hiddenPray();
    
  });

// 執行 流星
setInterval(()=>{
    var star = new ShootingStar();
    star.Run();
},200);

//讀信
var content = new Letter([
    "生日快樂",
    "聽說只要對流星許願",
    "願望都會實現",
    "希望你對流星許的願望 都會實現",
    "你一定覺得奇怪",
    "為什麼是流星雨",
    "因為有首歌 是這麼唱的",
    "Penny去看流星雨落在這地球上~",
    "好啦 不鬧",
    "再說你又要嫌我白目了",
    "生日快樂"
]).Read();

//流星
function ShootingStar(){
    //property
    let Star = create();

    //public function
    this.Run = function(){
        fall();
        setTimeout(()=>{
            disappear();
        },2000);
    }

    //private function
    function create(){
        //init property
        let x = Math.random() * width;
        let y = Math.random() * height / 2;

        //create star
        let star = document.createElement('i');
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.className = 'star';
        SkySpace.appendChild(star);

        return star;
    }

    function fall(){
        Star.classList.add('falling');
    }

    function disappear(){
        Star.remove();
    }
}

function Letter( letter ){
    //property
    const content = letter;

    let index = 0;

    let letterDiv = document.getElementById('Letter');

    let interval;

    // public function
    this.Read = function(){
        interval = 
        setInterval(() => {
            if(isEnd()){
                clearAll();
                return;
            }

            newLine();

        }, 5000);
    }


    //private function
    function isEnd(){
        return index >= content.length;
    }

    function newLine(){
        if(isEnd()){
            return;
        }

        let line = document.createElement('p');
        line.className = 'fade-in';
        line.innerText = content[index++];

        letterDiv.appendChild(line);

        setTimeout(() => {
            line.classList.add('fade-out');
            setTimeout(()=> {line.remove()},1000);
        }, 3000);
    }


    function clearAll(){
        clearInterval(interval);
        while (letterDiv.firstChild) {
            letterDiv.removeChild(letterDiv.firstChild);
        }
    }
}

function ShowPray(){
    var wish = document.getElementById('WishContent');
    wish.value = '';

    var board = document.getElementById('PrayBoard');
    board.style.visibility = 'visible';
}

function hiddenPray(){
    var board = document.getElementById('PrayBoard');
    board.style.visibility = 'hidden';
}

function Send(){
    var wish = document.getElementById('WishContent').value;
    console.log('願望是:'+wish);

    gtag('event', 'wish', {'event_category': 'click', 'event_label': 'birth', 'value': wish });
    gtag('event', wish, {'event_category': 'click', 'event_label': 'birth', 'value': wish });

    var board = document.getElementById('PrayBoard');
    board.style.visibility = 'hidden';
}