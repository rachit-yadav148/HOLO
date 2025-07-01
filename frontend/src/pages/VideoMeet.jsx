import React, { useEffect, useRef, useState } from 'react';
import "../styles/videoComponent.css";
import { TextField, Button } from '@mui/material';

const server_url = "http://localhost:8000"; // use when you add socket.io or signaling
var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoref = useRef();

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [screenAvailable, setScreenAvailable] = useState(false);

  const [screen, setScreen] = useState();
  const [showModal, setModal] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(3);
  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState("");

  const videoRef = useRef([]);
  const [videos, setVideos] = useState([]);


  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) {
        setVideoAvailable(true);
        console.log("Video permission granted");
      } else {
        setVideoAvailable(false);
        console.log("Video permission denied");
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) {
        setAudioAvailable(true);
        console.log("Audio permission granted");
      } else {
        setAudioAvailable(false);
        console.log("Audio permission denied");
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });

        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log("Error getting permissions:", error);
    }
  };

  useEffect(() => {
    console.log("VideoMeetComponent mounted");
    getPermissions();
  }, []);

  const connect = () => {
    console.log("Connect clicked. Username:", username);
    if (username.trim() !== "") {
      setAskForUsername(false);
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <div className="video-container">
      {askForUsername ? (
        <div className="lobby">
          <h2>Enter into Lobby</h2>
          <TextField
            id="outlined-basic"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" onClick={connect} sx={{ marginLeft: "10px", marginTop: "10px" }}>
            Connect
          </Button>
          <div style={{ marginTop: "20px" }}>
            <video ref={localVideoref} autoPlay muted width="400" height="300" />
          </div>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <video ref={localVideoref} autoPlay muted width="400" height="300" />
          {}
        </div>
      )}
    </div>
  );
}
