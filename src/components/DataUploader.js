import React from 'react';

const DataUploader = ({ cameraData, audioData }) => {
  const sendDataToServer = () => {
    // Implement code to send cameraData and audioData to the server
    const data = {
      cameraData: cameraData,
      audioData: audioData,
    };

    fetch('http://demo4786776.mockable.io/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
  };

  return (
    <div>
      <button className='mt-4 border-2 border-white p-2 rounded-lg' onClick={sendDataToServer}>Upload</button>
    </div>
  );
};

export default DataUploader;
