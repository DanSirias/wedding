import React, { useState } from "react";
import axios from "axios";

export const Images = () => {
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = async () => {
        // Calculate new dimensions while maintaining aspect ratio
        const aspectRatio = img.width / img.height;
        const newHeight = 600;
        const newWidth = newHeight * aspectRatio;

        // Create an off-screen canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image on the canvas with new dimensions
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert canvas to base64
        const resizedBase64 = canvas.toDataURL('image/jpeg').split(',')[1];

        // Prepare the JSON payload
        const payload = {
          fileName: file.name,
          fileExtension: file.name.split('.').pop(),  // Get the file extension
          fileData: resizedBase64,  // Send only the resized base64 string
          userType: "YourUserType", // Replace with actual userType from your state or context
          photoType: "profile", // Example: 'passport' or 'profile'
        };

        try {
          // Send the payload to your API Gateway using Axios
          const response = await axios.post('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images', payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          setResponseMessage(`Success: ${response.data}`);
        } catch (error) {
          console.error('Error uploading image:', error);
          setResponseMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {responseMessage && <div>{responseMessage}</div>}
    </div>
  );
};
