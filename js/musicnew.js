const wrapper = document.querySelector('.wrapper'),
	imageMusic = document.querySelector('.wrapper-img img'),
	musicImg = document.querySelector('.profile-img img'),
	musicName = document.querySelector('.profile-name a'),
	musicArtist = document.querySelector('.profile-name p'),
	mainAudio = document.querySelector('.main-audio-primary'),
	playPauseBtn = document.querySelector('.play-pause-btn'),
	nextBtn = document.querySelector('#next'),
	prevBtn = document.querySelector('#prev'),
	progressBar = document.querySelector('.progress-bar-fill'),
	progressArea = document.querySelector('.progress-bar'),
	shuffleBtn = document.querySelector('#shuffle'),
	centerPlayPause = document.querySelector('.center .play-pause'),
	topFull = document.querySelector('.top .play-pause .full'),
	topMini = document.querySelector('.top .play-pause .mini-play'),
	lyricsMusic = document.querySelector('.lyrics-content');


// navbar bottom

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);
isMusicPaused = true;

window.addEventListener('load', () => {
	loadMusic(musicIndex);
	playingSong();
});



function loadMusic(indexNumb) {
	musicName.innerText = allMusic[indexNumb - 1].name;
	musicArtist.innerText = allMusic[indexNumb - 1].artist;
	imageMusic.src = `images/${allMusic[indexNumb - 1].src}.webp`;
	musicImg.src = `images/${allMusic[indexNumb - 1].src}.webp`;
	mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
	lyricsMusic.innerText = allMusic[indexNumb - 1].lyrics;
}


// This Music List of all music in the array
const ulTag = wrapper.querySelector('.music-list-container ol');
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
	//let's pass the song name, artist from the array
	let liTag = `<li class="cepat" li-index="${i + 1}" id="main-${i + 1}">
                    <div class="hover-play">
                        <img src="images/${allMusic[i].src}.webp" alt="" width="40px">
                        <div class="middle">
                            <div class="play-pause">
                                <i class="material-icons-sharp play">play_arrow</i>
                            </div>
                        </div>
                    </div>
                    <span class="text">
                        <p class="name">${allMusic[i].name}</p>
                        <p class="artist">${allMusic[i].artist}</p>
                    </span>
                    <span id="${allMusic[i].src}" class="audio-duration">0:00</span>
					<span class="material-icons-outlined more"> more_vert </span>
					<audio  class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                </li>`;
	ulTag.insertAdjacentHTML('beforeend', liTag); //inserting the li inside ul tag
	
	  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
		let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
		liAudioTag.addEventListener('loadeddata', () => {
			let duration = liAudioTag.duration;
			let totalMin = Math.floor(duration / 60);
			let totalSec = Math.floor(duration % 60);
			if (totalSec < 10) {
				//if sec is less than 10 then add 0 before it
				totalSec = `0${totalSec}`;
			}
			liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
			liAudioDuartionTag.setAttribute('t-duration', `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
		});
}

// proses error
// var LoadMusic = document.querySelector(`main-${i + 1}`);
// LoadMusic.addEventListener('loaddedata', () => { 
// 	playMusic();
// 	loadMusic(index);
// });


// if click li play music
//play particular song from the list onclick of li tag
function playingSong() {
	const allLiTag = ulTag.querySelectorAll('li');

	for (let j = 0; j < allLiTag.length; j++) {
		let audioTag = allLiTag[j].querySelector('.audio-duration');
		let paused = allLiTag[j].querySelector('.play');
		let Bright = allLiTag[j].querySelector('.middle');
		let imagePlay = allLiTag[j].querySelector('.hover-play img');


		if (allLiTag[j].classList.contains('playing')) {
			allLiTag[j].classList.remove('playing');
			paused.innerText = 'play_arrow';
			Bright.style.opacity = '0';
			let adDuration = audioTag.getAttribute('t-duration');
			audioTag.innerText = adDuration;
			imagePlay.style.opacity = '1';
		}

		//if the li tag index is equal to the musicIndex then add playing class in it
		if (allLiTag[j].getAttribute('li-index') == musicIndex) {
			allLiTag[j].classList.add('playing');
			audioTag.innerText = 'Playing';
			paused.innerText = 'pause';
			Bright.style.opacity = "1";
			imagePlay.style.opacity = "0.5";
		}


		allLiTag[j].setAttribute('onclick', 'clicked(this)');
	}
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}





// play pause music

// script play pause area
// play music function
function playMusic() {
	wrapper.classList.add('paused');
	playPauseBtn.querySelector('i').innerText = 'pause';
	centerPlayPause.querySelector('i').innerText = 'pause';
	mainAudio.play();
}

//pause music function
function pauseMusic() {
	wrapper.classList.remove('paused');
	playPauseBtn.querySelector('i').innerText = 'play_arrow';
	centerPlayPause.querySelector('i').innerText = 'play_arrow';
	mainAudio.pause();
}

// play or pause button event onclick function
playPauseBtn.addEventListener('click', function () {
	isMusicPlay = wrapper.classList.contains('paused');
	isMusicPlay ? pauseMusic() : playMusic();
	playingSong();
});

imageMusic.addEventListener('click', function () {
	isMusicPlay = wrapper.classList.contains('paused');
	isMusicPlay ? pauseMusic() : playMusic();
});

centerPlayPause.addEventListener('click', function () {
	isMusicPlay = wrapper.classList.contains('paused');
	isMusicPlay ? pauseMusic() : playMusic();
	
});
// next prev button area 
// next prev music area
//prev music function
function prevMusic() {
	musicIndex--; //decrement of musicIndex by 1
	//if musicIndex is less than 1 then musicIndex will be the array length so the last music play
	musicIndex < 1
		? (musicIndex = allMusic.length)
		: (musicIndex = musicIndex);
	loadMusic(musicIndex);
	playMusic();
	playingSong();
}

//next music function
function nextMusic() {
	musicIndex++; //increment of musicIndex by 1
	//if musicIndex is greater than array length then musicIndex will be 1 so the first music play
	musicIndex > allMusic.length
		? (musicIndex = 1)
		: (musicIndex = musicIndex);
	loadMusic(musicIndex);
	playMusic();
	playingSong();
}

//prev music button event
prevBtn.addEventListener('click', () => {
	prevMusic();
});

//next music button event
nextBtn.addEventListener('click', () => {
	nextMusic();
});




// more play pause

var isPlaying = false;

function PlayPauseNow() {
	isPlaying ? mainAudio.pause() : mainAudio.play();
}

mainAudio.onplaying = function () {
	isPlaying = true;
};
mainAudio.onpause = function () {
	isPlaying = false;
};

// imageMusic.addEventListener('click', () => { 
// 	PlayPauseNow();
// });
// Proggress bar update by audio timeupdate event
mainAudio.addEventListener('timeupdate', (e) => {
	const currentTimes = e.target.currentTime;
	const duration = e.target.duration;
	let progressWidth = (currentTimes / duration) * 100;
	progressBar.style.width = `${progressWidth}%`;

	let musicCurrentTime = document.querySelector('.current-time'),
		musicDuartion = document.querySelector('.max-duration');
	mainAudio.addEventListener('loadeddata', () => {
		// update song total duration
		let mainAdDuration = mainAudio.duration;
		let totalMin = Math.floor(mainAdDuration / 60);
		let totalSec = Math.floor(mainAdDuration % 60);
		if (totalSec < 10) {
			//if sec is less than 10 then add 0 before it
			totalSec = `0${totalSec}`;
		}
		musicDuartion.innerText = `${totalMin}:${totalSec}`;
	});
	// update playing song current time
	let currentMin = Math.floor(currentTimes / 60);
	let currentSec = Math.floor(currentTimes % 60);
	if (currentSec < 10) {
		//if sec is less than 10 then add 0 before it
		currentSec = `0${currentSec}`;
	}
	musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener('click', (e) => {
	let progressWidth = progressArea.clientWidth; //getting width of progress bar
	let clickedOffsetX = e.offsetX; //getting offset x value
	let songDuration = mainAudio.duration; //getting song total duration

	mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
	playMusic(); //calling playMusic function
	playingSong();
});

// repeat music btn change
const repeatBtn = document.querySelector('#repeat');
repeatBtn.addEventListener('click', () => {
	let getText = repeatBtn.innerText;
	switch (getText) {
		case 'repeat':
			repeatBtn.innerText = 'repeat_one';
			repeatBtn.setAttribute('title', 'Repeat one');
			break;
		case 'repeat_one':
			repeatBtn.innerText = 'repeat';
			repeatBtn.setAttribute('title', 'Repeat');
			break;
	}
});
// ended repeat listener
mainAudio.addEventListener('ended', () => {
	let getText = repeatBtn.innerText;
	switch (getText) {
		case 'repeat':
			nextMusic(); //calling nextMusic function
			break;
		case 'repeat_one':
			mainAudio.currentTime = 0; //setting audio current time to 0
			loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
			playMusic(); //calling playMusic function
			break;
	}
});
// shuffleBtn change
shuffleBtn.addEventListener('click', () => {
	let randIndex = Math.floor(Math.random() * allMusic.length + 1); //genereting random index/numb with max range of array length
	do {
		randIndex = Math.floor(Math.random() * allMusic.length + 1);
	} while (musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
	musicIndex = randIndex; //passing randomIndex to musicIndex
	loadMusic(musicIndex);
	playMusic();
	playingSong();
});


// volume change button and add listener
const volumeBtn = document.querySelector('#repeat-plist');
volumeBtn.addEventListener('click', () => {
	let getText = volumeBtn.innerText; //getting this tag innerText
	switch (getText) {
		case 'volume_up':
			volumeBtn.innerText = 'volume_down';
			volumeBtn.setAttribute('title', 'Volume 50%');
			mainAudio.volume = 0.7;
			break;
		case 'volume_mute':
			volumeBtn.innerText = 'volume_off';
			volumeBtn.setAttribute('title', 'Muted');
			mainAudio.volume = 0;
			break;
		case 'volume_down':
			volumeBtn.innerText = 'volume_mute';
			volumeBtn.setAttribute('title', 'volume 0%');
			// mainAudio.muted = true;
			mainAudio.volume = 0.3;
			break;
		case 'volume_off':
			volumeBtn.innerText = 'volume_up';
			volumeBtn.setAttribute('title', 'Volume 100%');
			mainAudio.volume = 1;
			break;
	}
});


// show search box and hidden link
var showSrc = document.querySelector('.hidden-input');
showSrc.addEventListener('click', () => {
	var hide = document.getElementById('input');
	if (hide.style.display === 'flex') {
		hide.style.display = 'none';
	} else {
		hide.style.display = 'none';
	}
	var link = document.getElementById('link');
	if (link.style.display === 'none') {
		link.style.display = 'flex';
	} else {
		link.style.display = 'flex';
	}
});

// show search link and hidden box
var hiddenSrc = document.querySelector('.open-input');
hiddenSrc.addEventListener('click', () => {
	var hide = document.getElementById('input');
	if (hide.style.display === 'none') {
		hide.style.display = 'flex';
	} else {
		hide.style.display = 'flex';
	}
	var link = document.getElementById('link');
	if (link.style.display === 'flex') {
		link.style.display = 'none';
	} else {
		link.style.display = 'none';
	}
});

// hidden show logo
var logo1 = document.querySelector('#logo-1');
var logo2 = document.querySelector('#logo-2');
logo1.addEventListener(
	'click',
	() => {
		logo1.style.display = 'none';
		logo2.style.display = 'block';
	},
	2000
);
logo2.addEventListener(
	'click',
	() => {
		logo1.style.display = 'block';
		logo2.style.display = 'none';
	},
	2000
);

// navbar border scroll  var prevScrollpos = window.pageYOffset;
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.getElementById('navbar').style.borderBottom = 'none';
	} else {
		document.getElementById('navbar').style.borderBottom =
			'0.5px solid rgb(41, 39, 39)';
	}
	prevScrollpos = currentScrollPos;
};



topFull.addEventListener('click', () => {
	if (imageMusic.requestFullscreen) {
		imageMusic.requestFullscreen();
	} else if (imageMusic.webkitRequestFullscreen) {
		/* Safari */
		imageMusic.webkitRequestFullscreen();
	} else if (imageMusic.msRequestFullscreen) {
		/* IE11 */
		imageMusic.msRequestFullscreen();
	}
});

topMini.addEventListener('click', () => {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	} else {
		if (document.pictureInPictureEnabled) {
			imageMusic.requestPictureInPicture();
		}
	}
});

// Jquery Tab / Slide 
$(document).ready(function () {
	$('.music-link a').click(function () {
		$('.music-link a').removeClass('active');
		$(this).addClass('active');
		var id = $(this).data('id');
		$('.tab-content').hide();
		$(`[data-content=${id}]`).fadeIn(200);
	});
});