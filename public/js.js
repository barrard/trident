

feather.replace();

const controls = document.querySelector('.controls');
const cameraOptions = document.querySelector('.video-options>select');
const micOptions = document.querySelector('.audio-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
const buttons = [...controls.querySelectorAll('button')];
let streamStarted = false;

const [play, pause, screenshot] = buttons;

const constraints = {
  audio:true,
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
  }
};

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const audioDevices = devices.filter(device => device.kind === 'audioinput');
  const video_options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = video_options.join('');


  const audio_options = audioDevices.map(audioDevice => {
    return `<option value="${audioDevice.deviceId}">${audioDevice.label}</option>`;
  });
  micOptions.innerHTML = audio_options.join('');

};

play.onclick = () => {
  if (streamStarted) {
    video.play();
    play.classList.add('d-none');
    pause.classList.remove('d-none');
    return;
  }
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    const updatedConstraints = {
      ...constraints,
      deviceId: {
        exact: cameraOptions.value
      }
    };
    startStream(updatedConstraints);
  }
};

const startStream = async (constraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

const handleStream = (stream) => {
  video.srcObject = stream;
  console.log(stream)
  play.classList.add('d-none');
  pause.classList.remove('d-none');
  screenshot.classList.remove('d-none');
  streamStarted = true;
};

getCameraSelection();



cameraOptions.onchange = () => {
  const updatedConstraints = {
    ...constraints,
    deviceId: {
      exact: cameraOptions.value
    }
  };
  startStream(updatedConstraints);
};

const pauseStream = () => {
  video.pause();
  play.classList.remove('d-none');
  pause.classList.add('d-none');
};

const doScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL('image/webp');
  screenshotImage.classList.remove('d-none');
};

pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;





// console.log("hi");

// function check_availability() {
//   if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
//     console.log("Let's get this party started");
//     return true;
//   }
//   return false;
// }

// /* Onload */

// window.onload = () => {
//   startApp();
// };

// function startApp() {
//   console.log("start app");
//   if (!check_availability()) {
//     /* Handle no video */
//     console.log("No video available");
//   } else {
//     setupUI();
//   }
// }

// function setupUI() {
//   enumerateDevices()
//   getUserMedia();
// }

// async function enumerateDevices(){
//   const devices = await navigator.mediaDevices.enumerateDevices();
//   console.log({devices})
//   devices.map((device)=> console.log(device.kind))

// }

// const constraints = {
//   video: {
//     facingMode: "user",
//     width: 1280/5, height: 720/5
//   },
//     audio: true
// };
// async function getUserMedia() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     console.log({ stream });
//   } catch (err) {
//     console.log({ err });
//   }
// }
