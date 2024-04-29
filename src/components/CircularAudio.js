import { CircularProgress, CircularProgressLabel, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { useState } from "react";
import {ReactComponent as PlayIcon} from "../images/PlayIcon.svg"
import {ReactComponent as PauseIcon} from "../images/PauseIcon.svg"
import {ReactComponent as ExternalLinkIcon} from "../images/ExternalLinkIcon.svg"

//External link is fine for now
//import {ReactComponent as SpotifyIcon} from "../images/SpotifyIcon.svg"


const CircularAudio = ({ idnum, song, size, disabled, href }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);

  const playPause = () => {
    const audio = document.getElementById(`player-${idnum}`);
    if(isPlaying) {
      audio.pause();
      audio.currentTime = 0
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
        <LinkBox width={"fit-content"} height={"fit-content"} rounded={"25px"}>
          <LinkOverlay href={href} isExternal>
            <CircularProgress color="grey" size={size}>
              <CircularProgressLabel as="div" className="round-button-disabled" style={{width:"75%", height:"75%"}} >
                <ExternalLinkIcon id="play-button" className="play-disabled" fill="gray"/> 
              </CircularProgressLabel>
            </CircularProgress>
          </LinkOverlay>
        </LinkBox>
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