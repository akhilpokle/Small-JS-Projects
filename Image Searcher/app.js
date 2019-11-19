async function showPics(param){
	const response = await fetch(`https://api.unsplash.com/search/photos?query=${param}&orientation=squarish&per_page=9&client_id=00c848f3595056ad922d5e4ff52b5381f14af7081811869aa65f9e2719a4dfdd`);
	const data = await response.json();
	console.log(data);
	if(data.results.length == 0){
		document.querySelector("#output").innerHTML = `<h1> Couldn't find Image</h1>`;
	}else{
		let counter = 0;
		let result = document.getElementById('result');					
		for(let i=0;i<3;i++){
			let parent = document.createElement("div");
			parent.classList.add("row");
			let output = [];
			for(let i=0;i<3;i++){
				output.push(`<div class="col-sm"><img style="max-height: 300px; max-width: 300px;"  src=${data.results[counter].urls.small} class="img-thumbnail"></div>`);
				counter++;
			}
			parent.innerHTML = output.join('');
			result.appendChild(parent);
		}
	}
/*	img.src = data[0].urls.full;
	document.getElementById('body').appendChild(img);*/

// return fetch('https://api.unsplash.com/photos/?client_id=00c848f3595056ad922d5e4ff52b5381f14af7081811869aa65f9e2719a4dfdd')
// 		.then(response => response.json())
// 		.then(data => data[0]);
// }
}



let arr = [];

let res = document.getElementById("submit");
res.addEventListener("click",function(e){
	let element = document.getElementById("search").value;
	showPics(element);	
	e.preventDefault();
});



//console.log(element);



//e();