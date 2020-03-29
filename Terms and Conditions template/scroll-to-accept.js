console.log('IT WORKS!');
const watch = document.querySelector('.watch');
const button = document.querySelector('.accept');
function scrollToAccept(){
    const terms = document.querySelector('.terms-and-conditions');
    
    function obCallback(payload){
        if(payload[0].intersectionRatio == 1){
            button.disabled = false;
            ob.unobserve(terms.lastElementChild);
        }
    }
    const ob = new IntersectionObserver(obCallback,{
        root:terms,
        threshold:1
    });

    ob.observe(terms.lastElementChild);

    if(!terms){
        return;
    }

    terms.addEventListener('scroll',function(e){
        //console.log(e.currentTarget);
    });

}

scrollToAccept();