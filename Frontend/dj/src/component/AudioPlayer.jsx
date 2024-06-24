import React,{useState,useEffect} from 'react';
import { storageRef,storage } from "../config/configuration";
import { getStorage, ref, list, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';


const AudioPlayer =()=>{
  const storage = getStorage();
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const toggleSongSelection = (index) =>{
    const isSelected = selectedSongs.includes(index);
    if(isSelected){
      setSelectedSongs(selectedSongs.filter((selectedIndex)=>selectedIndex!=index))
    }else{
      setSelectedSongs([...selectedSongs, index]);
    }
  }
  
  const fetchSong = async ()=>{
      const filename = 'audio/mpeg';
      const spaceRef= ref(storage);
      console.log("ref",spaceRef)
      const songsList = await list(spaceRef, { maxResults: 100 });

      console.log("items",songsList)
      const songArray = await Promise.all(
        songsList.items.map(async (item)=>{
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      )
      console.log("array",songArray)
      setSongs(songArray)
  
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
    <div className='musicplayer-container'>
      <div className='columns'>
      <table>
        <thead>
          <tr>
            <th>Song List</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul className='song-list'>
                {songs.map((song,index)=>(
                  <li key={index}>
                    <input
                      type='checkbox'
                      checked={selectedSongs.includes(index)}
                      onChange={()=>toggleSongSelection(index)}
                    />
                    <audio controls >
                      <source src={song.url} type="audio/mp3" />
                    Your browser does not support the audio element.
                    </audio>
                    <p>{song.name}</p>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
  )
}

export default AudioPlayer;