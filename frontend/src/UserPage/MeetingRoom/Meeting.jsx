import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Meeting() {
  const { meetingId } = useParams();

  // ---------- STATE ----------
  const [isMuted, setIsMuted] = useState(false);
  const [isTwoCameraS, setisTwoCameras] = useState(false);
  const [remoteStream,setremoteStream] = useState(null)
  const [localStream, setLocalStream] = useState(null);
  const [togglecamera,settogglecamera] = useState(false)


  // ---------- REFS ----------sss
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenStreamRef = useRef(null);
  const videoSenderRef = useRef(null);

  

  // ---------- RTC CONFIG ----------
  const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // ---------- START ----------
  useEffect(() => {
    socketRef.current = io("https://zoomclone-v1fi.onrender.com");
    startMeeting();
    socketRef.current.on("user-joined", async () => {
      await createOffer();
    });
    socketRef.current.on("offer", async (offer) => {
      await createAnswer(offer);
    });
    socketRef.current.on("answer", async (answer) => {
      await peerConnectionRef.current.setRemoteDescription(answer);
    });
    socketRef.current.on("ice-candidate", async (candidate) => {
      if(candidate) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // useffect for remotevideo
  useEffect(() => {
  if (remoteVideoRef.current && remoteStream) {
    remoteVideoRef.current.srcObject = remoteStream;
  }
}, [remoteStream]);

//useffect for localvideo
useEffect(() => {
  if (localVideoRef.current && localStream) {
    localVideoRef.current.srcObject = localStream;
  }
}, [localStream]);


const sharescreen = async () => {
  try {
    if (!videoSenderRef.current) return;

    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    screenStreamRef.current = screenStream;
    const screenTrack = screenStream.getVideoTracks()[0];

    await videoSenderRef.current.replaceTrack(screenTrack);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = screenStream;
    }

    screenTrack.onended = stopScreenShare;
  } catch (err) {
    console.log("Screen share failed", err);
  }
};

  const stopScreenShare =async()=>{
    const cameraTrack = localStreamRef.current.getVideoTracks()[0]
    await videoSenderRef.current.replaceTrack(cameraTrack);
    if(localVideoRef.current){
        localVideoRef.current.srcObject = localStreamRef.current;
    }

  // cleanup
  screenStreamRef.current?.getTracks().forEach(t=>t.stop());
  screenStreamRef.current = null

  }

  // toggleCamera
  const toggleCamera = ()=>{
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if(!videoTrack) return;
    videoTrack.enabled=!videoTrack.enabled;
      settogglecamera(!videoTrack.enabled)
  };

  // ---------- GET CAMERA & JOIN ROOM ----------
  async function startMeeting() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStreamRef.current = stream;
    setLocalStream(stream);
    socketRef.current.emit("join-room", meetingId);
  }

  // ---------- CREATE PEER CONNECTION ----------
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(rtcConfig);
    peerConnectionRef.current = pc;

    // add local tracks  
    localStreamRef.current.getTracks().forEach((track) => {
      pc.addTrack(track, localStreamRef.current);
    });

    // receive remote tracks
    pc.ontrack = (event) => {    
      setremoteStream(event.streams[0])
      setisTwoCameras(true)
      }   
    
    // send ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          candidate: event.candidate,
          roomId: meetingId,
        });
      }
    };
  };
  // ---------- OFFER ----------
  const createOffer = async () => {
    createPeerConnection();
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socketRef.current.emit("offer", { offer, roomId: meetingId });
  };

  // ---------- ANSWER ----------
  const createAnswer = async (offer) => {
    createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(offer);
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socketRef.current.emit("answer", { answer, roomId: meetingId });
  };

  // ---------- MUTE / UNMUTE ----------
  const toggleMute = () => {
    const audioTrack = localStreamRef.current
      .getTracks()
      .find((track) => track.kind === "audio");
    if (!audioTrack) return;
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  // ---------- UI ----------
  return (
    <div className="h-screen bg-gradient-to-b from-[#06134b] via-[#153d8a] to-[#7f78d2] flex flex-col items-center justify-center gap-6">
      <h2 className="text-white text-xl">Meeting ID: {meetingId}</h2>
      <>
   <div className="flex justify-center items-center gap-6">
  {/* LOCAL VIDEO — MIRRORED */}
  <video
    ref={localVideoRef}
    autoPlay
    muted
    playsInline
    className={`${
      isTwoCameraS ? "w-80" : "w-96"
    } rounded-lg scale-x-[-1]`}
  />

  {/* REMOTE VIDEO — ALSO MIRRORED */}
  {isTwoCameraS && (
    <video
      ref={remoteVideoRef}
      autoPlay
      playsInline
      className="w-80 rounded-lg scale-x-[-1]"
    />
  )}
</div>


        {/* CONTROLS */}
        <div className="flex gap-4 mt-6">
          <button onClick={toggleMute} className="px-4 py-2 bg-white rounded cursor-pointer">
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button onClick={toggleCamera} className="px-4 py-2 bg-white rounded cursor-pointer">
            {togglecamera ? "Turn On": "Turn off"}
          </button>
          <button onClick={sharescreen} className="px-4 py-2 bg-white rounded cursor-pointer">
            Share screen
          </button>
        </div>
      </>
    </div>
  );
}
