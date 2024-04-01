// VideoBackground.js
import React from 'react';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop>
        <source src="https://download-video.akamaized.net/v3-1/playback/bd85bdd9-b711-46c6-b627-2ff559f71910/40c6921d-640e2380?__token__=st=1711937269~exp=1711951669~acl=%2Fv3-1%2Fplayback%2Fbd85bdd9-b711-46c6-b627-2ff559f71910%2F40c6921d-640e2380%2A~hmac=e69e7b78f2519b68d50908b77e2dc0a5938acee34d8fbb18d812b8de32a30643&r=dXMtd2VzdDE%3D" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;