import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import "node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player'
export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [emailPosition, setEmailPosition] = useState({ x: 0, y: 0, directionX: 1, directionY: 1 });
  const videoRef = useRef(null);
  console.log(emailPosition)
  useEffect(() => {
    let timeoutId;
    if (isPlaying) {
      const updateEmailPosition = () => {
        const videoRect = videoRef?.current?.getBoundingClientRect();
        console.log(videoRect)
        const x = emailPosition.x + emailPosition.directionX;
        const y = emailPosition.y + emailPosition.directionY;
        if (x + videoRect.width >= videoRect.right || x <= videoRect.left) {
          setEmailPosition({
            x: 20,
            y,
            directionX: -emailPosition.directionX,
            directionY: emailPosition.directionY,
          });
        }
        if (y + videoRect.height >= videoRect.bottom || y <= videoRect.top) {
          setEmailPosition({
            x,
            y: 20,
            directionX: emailPosition.directionX,
            directionY: -emailPosition.directionY,
          });
        } if (emailPosition.x + 80 > videoRect.width || emailPosition.x + 80 > videoRect.height) {
          console.log(true)
          setEmailPosition({
            x: -10,
            y,
            directionX: emailPosition.directionX,
            directionY: -emailPosition.directionY,
          });
        } else {
          setEmailPosition({ x: emailPosition.x + 40, y: emailPosition.x + 40, directionX: emailPosition.directionX, directionY: emailPosition.directionY });
        }
      };
      timeoutId = setInterval(updateEmailPosition, 1400);
    } else {
      clearInterval(timeoutId);
    }

    return () => {
      clearInterval(timeoutId);
    };
  }, [isPlaying, emailPosition]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "900px",
        height: "600px",
      }}>

        <video ref={videoRef} style={{
          position: "relative",
          zIndex: 1,

        }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)} controls className="abp-video abp-video--fluid" preload="metadata" width="1920" height="1080">
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4" type="video/mp4" />

        </video>
        {isPlaying && (
          <p
            style={{
              position: "absolute",
              top: `${videoRef.current.offsetTop + emailPosition.y + 10}px`,
              left: `${videoRef.current.offsetLeft + emailPosition.x + 10}px`,
              color: "red",
              padding: "10px",
              zIndex: 3,
            }}
          >
            Email: info@example.com
          </p>
        )}
      </div>
      <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

    </>
  )
}
