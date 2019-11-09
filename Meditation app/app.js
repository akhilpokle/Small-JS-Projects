const app = function(){
	const song = document.querySelector(".song");
	const play = document.querySelector(".play");
	const outline = document.querySelector(".moving-outline circle");
	const video = document.querySelector(".vid-container video");
	const timeSelect = document.querySelectorAll(".time-select button");
	//sounds
	const sounds = document.querySelectorAll('.sound-picker button');

	//time
	const timeDisplay = document.querySelector('.time-display');

	//get the length of outline
	const outlineLength = outline.getTotalLength();

	//pick differnt sounds
	sounds.forEach(sound =>{
		sound.addEventListener('click',function(){
			song.src = this.getAttribute('data-sound');
			video.src = this.getAttribute('data-video');
			checkPlaying(song);
		});
	});

	//durations
	let fakeDuration = 600;
	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;


	//play sound
	play.addEventListener('click',() =>{
		checkPlaying(song);
	});

	//different duration
	timeSelect.forEach(option =>{
		option.addEventListener('click',function(){
			fakeDuration = this.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
		});
	});

	//create a function for stop and play sounds 
	const checkPlaying = song => {
		if(song.paused){
			song.play();
			video.play();
			play.src ='./svg/pause.svg';
		}else{
			video.pause();
			song.pause();
			play.src="./svg/play.svg";
		}
	};

	//animate teh circle and chekc time
	song.ontimeupdate = function(){
		let currentTime = song.currentTime;
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60);
		let minutes = Math.floor(elapsed / 60);

		//animtate the progress
		let progress = outlineLength - (currentTime/fakeDuration)*outlineLength;
		outline.style.strokeDashoffset = progress;

		//animate the text 
		timeDisplay.textContent = `${minutes}:${seconds}`;

		if(currentTime >= fakeDuration){
			song.pause();
			song.currentTime = 0;
			play.src = './svg/play.svg';
			video.pause();
		}
	};
};	
	
app();