import { useState } from "react";
import VideoRecorder from "../src/components/CameraFeed";
import AudioRecorder from "../src/components/AudioLevel";

const App = () => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };
    return (
        <div className="">
            <h1 className="text-6xl font-serif text-center font-bold mt-10">React Media Recorder</h1>
            <div className="flex justify-center gap-20 border-2 border-white p-2 text-xl mt-10 ">
                <button className="hover:text-gray-400 " onClick={toggleRecordOption("video")}>
                  Record Video
                </button>
                <button className="hover:text-gray-400"  onClick={toggleRecordOption("audio")}>
                  Record Audio
                </button>
            </div>
            <div>
                {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
            </div>
        </div>
    );
};
export default App;

