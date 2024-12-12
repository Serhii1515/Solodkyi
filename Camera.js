const init = async () => {
  let blobs;
  let rec;
  let stream;
  let preferredDevice = 0;
  let devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => device.kind == "videoinput"
  );

  let getStream = async () => {
    const videoConstraint = {
      width: 1280,
      height: 720,
      deviceId: devices[preferredDevice % devices.length].deviceId,
    };
    return await navigator.mediaDevices.getUserMedia({
      video: videoConstraint,
      audio: true,
    });
  };

  captureBtn.onclick = async () => {
    stream = await getStream();
    videoElement.srcObject = stream;

    blobs = [];
    download.style.display = "none";

    rec = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9,opus",
    });
    rec.ondataavailable = (e) => blobs.push(e.data);
    rec.onstop = async () => {
      let blob = new Blob(blobs, { type: "video/webm" });
      let url = window.URL.createObjectURL(blob);
      download.href = url;
      download.download = "test.webm";
      download.style.display = "block";
    };

    startBtn.disabled = false;
    captureBtn.disabled = true;
  };

  toggleBtn.onclick = async () => {
    preferredDevice++;
    stream = await getStream();
    videoElement.srcObject = stream;
  };

  startBtn.onclick = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    rec.start();
  };

  stopBtn.onclick = () => {
    captureBtn.disabled = false;
    startBtn.disabled = true;
    stopBtn.disabled = true;

    rec.stop();
    stream.getTracks().forEach((s) => s.stop());
    videoElement.srcObject = null;
    stream = null;
  };
};

window.addEventListener("load", init);
