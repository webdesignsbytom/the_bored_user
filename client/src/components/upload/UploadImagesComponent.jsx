import React, { useState } from 'react';
import client from '../../api/client';

function UploadImagesComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    client
      .post(`/upload-image`, formData)
      .then((res) => {
        console.log(res.data.data.result);
        console.log('Image uploaded successfully');
      })
      .catch((err) => {
        console.error('Error uploading image', err);
      });
  };

  return (
    <div className='grid outline outline-1 outline-black rounded p-2'>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default UploadImagesComponent;
