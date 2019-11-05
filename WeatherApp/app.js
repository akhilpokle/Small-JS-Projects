window.addEventListener('load',()=>{
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature'); 
	const temperatureSpan = document.querySelector('.temperature span');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/174eff408f9502b98041913f7fdda8ac/${lat},${long}`;
			
		fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data => {
				console.log(data);
				const {temperature,summary,icon}= data.currently;
				//set DOM elements from the api
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				//formula for celicus
				let celicus = (temperature - 32)* (5/9);
				//set icons
				setIcons(icon,document.querySelector(".icon"));

				//change temperature to celcius/ferhentie
				temperatureSection.addEventListener('click',()=>{
					if(temperatureSpan.textContent === "F"){
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celicus);
					}else{
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperature;
					}
				});
			});
		});	
	}

	function setIcons(icon,iconID){
		const skycons = new Skycons({color:"white"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID,Skycons[currentIcon]);
	}
});