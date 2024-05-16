import React, {useState, useRef} from 'react'

import DefaultImage from "../assets/upload-photo-here.png";
import EditIcon from "../assets/edit.svg";
import UploadingAnimation from "../assets/uploading.gif";

export default function ImageUpload() {

  const [avatar, setAvatar] = useState(DefaultImage);

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    // current property of the fileUploadRef object, which is likely a reference to an HTML input element
    // click() method programmatically triggers a click event on the file input element
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    // first element of the files array will get us that information
    const uploadedFile = fileUploadRef.current.files[0];
    // Next, we use the URL.createObjectURL to get the cached path of the uploaded file.
    const cachedURL = URL.createObjectURL(uploadedFile);
    setAvatar(cachedURL);
  }

  return (
    <div className="relative h-96 w-96 m-8">
      <img 
        src={avatar} 
        alt="Avatar" 
        className="h-96 w-96 rounded-full" />
      
      {/* Encoding Type {multipart/form-data} is of file form includes file uploads*/}
      <form id="form" encType="multipart/form-data">
        <button
          type="submit"
          onClick={handleImageUpload}
          className="flex-center absolute bottom-12 right-14 h-9 w-9 rounded-full">
          <img 
            src={EditIcon} 
            alt="Edit" 
            className="object-cover" />
        </button>
        <input 
          type="file" 
          id="file" 
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden />
      </form>  
    </div>
  )
}
