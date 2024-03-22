import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useState } from "react";
import {ReactComponent as PlayIcon} from "../images/PlayIcon.svg"
import {ReactComponent as PauseIcon} from "../images/PauseIcon.svg"


const CircularAudio = ({ idnum, song, size, disabled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);

  const playPause = () => {
    const audio = document.getElementById(`player-${idnum}`);
    if(isPlaying) {
      audio.pause();
    } else{
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  const getCurrentProgress = () => {
    const audio = document.getElementById(`player-${idnum}`)
    let calc = ((100*audio.currentTime) / audio.duration)
    setCurrentDuration(calc)
  }


  return (
    <>
      { disabled ?
        <CircularProgress color="grey" size={size}>
          <CircularProgressLabel as="div" className="round-button-disabled" style={{width:"75%", height:"75%"}} >

            <PauseIcon id="play-button" className="play-disabled" fill="grey"/> 
            <div className="strikethrough"></div>  

          </CircularProgressLabel>
        </CircularProgress>
        :
        <>
          <audio id={`player-${idnum}`} src={song} onTimeUpdate={getCurrentProgress}></audio>
          <CircularProgress value={currentDuration} color="orange" size={size}>
            <CircularProgressLabel as="div" className="round-button" style={{width:"75%", height:"75%"}} onClick={playPause}>
      
              {isPlaying ? 
                <PauseIcon id="pause-button"  className="play" fill="orange"/> 
                : 
                <PlayIcon id="play-button" className="play" fill="orange"/> 
              }   
            
            </CircularProgressLabel>
          </CircularProgress>
        </>
      }
    </>
  );
}
 
export default CircularAudio;