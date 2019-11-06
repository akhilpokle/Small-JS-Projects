//inserting into the input field
console.log("loaded");
function insert(value){
    let exp = document.getElementById("result");
  console.log("loaded res");
  if((exp.value)){
    exp = exp.value;
  }else{
    exp = "";
  }
    document.getElementById("result").value = exp+value;
  console.log(value);
  console.log("loaded resf");
}
//cleaning the screen
function clean(){
  let exp = document.getElementById("result");
  console.log(exp);
  console.log("loadedclean");
  exp.value = "";
}
//evalutaion
function output(){
  let exp = document.getElementById("result");

  if(exp.value.indexOf("%")>-1){
       let num = exp.value.split("%");
        let [num1,num2] = [...num];
        console.log(num1,num2);
        exp.value = Math.floor((num1/100)*num2);
    console.log("loaded%");
  }else
  { console.log(exp.value);
   console.log("loadednorm");
   console.log(eval(exp.value));
    exp.value = Math.floor(eval(exp.value));}
}

function back(){
  let exp = document.getElementById("result");
  console.log(exp.value);
  console.log("loadedback");
 exp.value = exp.value.substr(0,exp.value.length-1);
}