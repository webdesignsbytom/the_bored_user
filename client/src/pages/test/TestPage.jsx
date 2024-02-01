import React, { useEffect, useState, useRef } from 'react';

function TestPage() {
  const videoUrl = 'http://localhost:4000/assets/cotd/cotd.mp4';

  return (
    <div>
      <h1>Video Stream</h1>
      <video width='750' height='500' controls>
        <source src={videoUrl} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default TestPage;
