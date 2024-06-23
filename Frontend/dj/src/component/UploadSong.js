import React,{useState} from "react";
import { getStorage,ref,uploadBytes } from "firebase/storage";
import { storageRef } from "../config/configuration";

const UploadSong = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadmessage, setUploadmessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([])
  const storage = getStorage()

  const handelFileChange = (event)=>{
    const files = event.target.files;
    const mp3Files = Array.from(files).filter((file)=>{
      return file.name.toLowerCase().endsWith('.mp3');
    })
    setSelectedFiles(mp3Files);
  }

  const handelFileUpload = async ()=>{
    if(selectedFiles.length ===0){
      setUploadmessage("Error: Please select audio file(s) before uploading.");
      setTimeout(()=>('',3000));
      return;
    }
    setUploading(true)

    try{
      const uploadPromises = Array.from(selectedFiles).map(async (file)=>{
        const filename = file.name;
        const fileRef = ref(storage,filename)
        await uploadBytes(fileRef,file);
      });
      await Promise.all(uploadPromises);
      setUploadmessage('upload Successful')
    }catch(error){
      console.error('Error uploading files:', error)
    }finally{
      setUploading(false);
    }
  }
  
  return (
    <div>
      <input type='file' multiple onChange={handelFileChange}/>
        <button onClick={handelFileUpload} disabled={!selectedFiles}>
          Upload
        </button>
        {uploading && <p>Uploading...</p>}
        {uploadmessage && <p stype={{color:"green"}}>{uploadmessage}</p>}
    </div>
  );
};
export default UploadSong;
