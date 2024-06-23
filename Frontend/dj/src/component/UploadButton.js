// import React, { useRef } from "react";
// import {app} from "../config/configuration";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const UploadButton = () => {
//   const firebase = app;
//   const reference = useRef(null);

//   const handleUpload = async (event) => {
//     if (!firebase) return;

//     const uploadedFile = event?.target.files[0];
//     if (!uploadedFile) return;

//     const storage = getStorage(firebase);
//     const storageRef = ref(storage, uploadedFile.name);

//     try {
//       uploadBytes(storageRef, uploadedFile).then((snapshot) => {
//         console.log("Uploaded a blob or file!", snapshot);
//       });
//       alert("Successfully uploaded picture!");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         ref={ref}
//         onChange={handleUpload}
//         // hidden
//         accept=".mp3"
//       />
//     </div>
//   );
// };

// export default UploadButton;
