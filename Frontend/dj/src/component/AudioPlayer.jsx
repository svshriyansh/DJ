import React,{useState,useEffect} from 'react';
import { storageRef,storage } from "../config/configuration";
import { getStorage, ref, list, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';


const AudioPlayer =()=>{
  const storage = getStorage();
  const [songs, setSongs] = useState(null);
  // console.log("storage",ref(storage,"gs://disk-jokey-6b5e4.appspot.com"));
  const fetchSong = async ()=>{
    const filename = 'O Sajni Re(PagalWorld.com.sb).mp3';
    const spaceRef= ref(storage,filename);
    getDownloadURL(spaceRef).then((url)=>{
       setSongs(url)
    })

  }

  useEffect(()=>{
    fetchSong();
  },[])

  if(!songs){
    return(<div>
      Loading
    </div>)
  }
  return(
    <div>
      {console.log("--->",songs)}
      {
      <audio controls>
        <source src={songs} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      }
      
    </div>
  )
}

export default AudioPlayer;