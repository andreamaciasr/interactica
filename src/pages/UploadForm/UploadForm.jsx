import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImageUrl(response.data.imageUrl);
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
      alert(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Photo</button>
      </form>
      {imageUrl && (
        <div>
          <img src={imageUrl} style={{ marginTop: '20px', maxWidth: '30vw' }} />
        </div>
      )}
    </div>
  );
}
