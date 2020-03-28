const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
const width = canvas.width;
const height = canvas.height;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
console.log(width,height);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();   

function draw({key}){
    //console.log(key);
    hue = hue + 10;
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    ctx.moveTo(x,y);
    // x = x-MOVE_AMOUNT;
    // y = y-MOVE_AMOUNT;

    switch(key){
        case "ArrowUp":
            y = y - MOVE_AMOUNT;
            break;
        case "ArrowDown":
            y = y + MOVE_AMOUNT;
            break;
        case "ArrowLeft":
            x = x - MOVE_AMOUNT;
            break;
        case "ArrowRight":
            x = x + MOVE_AMOUNT;
            break;        
    }

    ctx.lineTo(x,y);
    ctx.moveTo(x,y);
    ctx.stroke();
}

function handleKey(e){
    //
    if(e.key.includes('Arrow')){
        draw({key:e.key});
       // console.log('handling');
        e.preventDefault();
    }
}

function clearCanvas(){
    canvas.classList.add('shake');
    ctx.clearRect(0,0,width,height);
    canvas.addEventListener('animationend',function(){
        canvas.classList.remove('shake');
    },{once:true});

}

window.addEventListener('keydown',handleKey);
shakebutton.addEventListener('click',clearCanvas);