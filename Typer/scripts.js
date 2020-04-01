/* eslint-disable */
function wait(ms = 0){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function getRandomBetween(min=20,max=150,randomNumber = Math.random() ){
    return Math.floor(randomNumber*(max - min)+min);
}

async function draw(el){
    console.log(el);
    const text = el.textContent;
    let soFar = '';
    for(const letter of text){
        //console.log(letter);
        soFar += letter;
        console.log(soFar);
        el.textContent = soFar;
        const {typeMin,typeMax} = el.dataset;
        const amountOfTime = getRandomBetween(typeMin,typeMax);
        await wait(amountOfTime);
    }
}

document.querySelectorAll('[data-type]').forEach(draw);