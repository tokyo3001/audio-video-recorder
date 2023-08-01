import { useState, useRef } from "react";
import DataUploader from "./DataUploader";

const mimeType = "audio/webm";

const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      };

      const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
          //creates a blob file from the audiochunks data
           const audioBlob = new Blob(audioChunks, { type: mimeType });
          //creates a playable URL from the blob file.
           const audioUrl = URL.createObjectURL(audioBlob);
           setAudio(audioUrl);
           setAudioChunks([]);
        };
      };

    return (
        <div className="text-center mt-12 text-xl">
            <h2 className="text-3xl">Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button className="mt-4 border-2 border-white p-4 rounded-lg" onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                        ) : null}
                        {permission && recordingStatus === "inactive" ? (
                        <button className="mt-4 border-2 border-white p-2 rounded-lg" onClick={startRecording} type="button">
                            Start Recording
                        </button>
                        ) : null}
                        {recordingStatus === "recording" ? (
                        <button className="mt-4 border-2 border-white p-2 rounded-lg" onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
                {audio ? (
                <div className="mt-8 flex justify-center gap-10">
                    <audio src={audio} controls></audio>
                </div>
                ) : null}
            </main>
                <a download href={audio}>
                    Download Recording
                </a>
            <DataUploader audioData={audio}/>
        </div>
    );
};
export default AudioRecorder;