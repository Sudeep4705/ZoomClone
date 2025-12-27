import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"; // Correct import

export default function Meeting() {
  const { meetingId } = useParams();

  // ---------- STATE ----------
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false); // Renamed for clarity
  const [isScreenSharing, setIsScreenSharing] = useState(false); // New state for layout
  const [isTwoCameras, setIsTwoCameras] = useState(false); // Fixed typo setisTwoCameras
  
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  // ---------- REFS ----------
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenStreamRef = useRef(null);
  const videoSenderRef = useRef(null); // CRITICAL REF

  // ---------- RTC CONFIG ----------
  const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // ---------- SOCKET & INITIALIZATION ----------
  useEffect(() => {
    // Ensure this matches your backend URL
    socketRef.current = io("https://zoomclone-v1fi.onrender.com");
    
    startMeeting();

    socketRef.current.on("user-joined", async () => {
      console.log("User joined, creating offer...");
      await createOffer();
    });

    socketRef.current.on("offer", async (offer) => {
      await createAnswer(offer);
    });

    socketRef.current.on("answer", async (answer) => {
      await peerConnectionRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on("ice-candidate", async (candidate) => {
      if (candidate) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sync Remote Stream to Video Element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Sync Local Stream to Video Element
useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    // ADD 'isTwoCameras' here so it updates when the UI layout changes
  }, [localStream, isTwoCameras]);


  // ---------- CORE WEBRTC FUNCTIONS ----------

  async function startMeeting() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      socketRef.current.emit("join-room", meetingId);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  }

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(rtcConfig);
    peerConnectionRef.current = pc;

    // --- CRITICAL FIX START ---
    // Add local tracks and SAVE THE VIDEO SENDER so we can replace it later
    localStreamRef.current.getTracks().forEach((track) => {
      const sender = pc.addTrack(track, localStreamRef.current);
      if (track.kind === 'video') {
        videoSenderRef.current = sender; 
      }
    });
    // --- CRITICAL FIX END ---

    // Handle incoming tracks
    pc.ontrack = (event) => {
      console.log("Track received:", event.streams[0]);
      setRemoteStream(event.streams[0]);
      setIsTwoCameras(true);
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          candidate: event.candidate,
          roomId: meetingId,
        });
      }
    };
  };

  const createOffer = async () => {
    createPeerConnection();
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socketRef.current.emit("offer", { offer, roomId: meetingId });
  };

  const createAnswer = async (offer) => {
    createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(offer);
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socketRef.current.emit("answer", { answer, roomId: meetingId });
  };


  // ---------- FEATURES (SCREEN SHARE, MUTE, CAMERA) ----------

  const sharescreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // You can add cursor: "always" here if you want
      });
      screenStreamRef.current = screenStream;
      const screenTrack = screenStream.getVideoTracks()[0];

      // Replace the track sent to the peer
      if (videoSenderRef.current) {
        await videoSenderRef.current.replaceTrack(screenTrack);
      }

      // Update local view and State
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
      setIsScreenSharing(true);

      // Handle "Stop Sharing" from browser UI
      screenTrack.onended = () => {
        stopScreenShare();
      };

    } catch (err) {
      console.log("Screen share failed", err);
    }
  };

  const stopScreenShare = async () => {
    try {
      // Switch back to camera track
      const cameraTrack = localStreamRef.current.getVideoTracks()[0];
      
      if (videoSenderRef.current) {
        await videoSenderRef.current.replaceTrack(cameraTrack);
      }

      // Update local view
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }

      // Stop the screen share stream tracks
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }

      setIsScreenSharing(false);
    } catch (err) {
      console.error("Error stopping screen share:", err);
    }
  };

  const toggleMute = () => {
    const audioTrack = localStreamRef.current
      ?.getTracks()
      .find((track) => track.kind === "audio");
    if (!audioTrack) return;
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack = localStreamRef.current
      ?.getVideoTracks()[0];
    if (!videoTrack) return;
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOff(!videoTrack.enabled);
  };


  // ---------- UI RENDER ----------
// ---------- UI RENDER ----------
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="h-16 flex items-center justify-center bg-gray-800 shrink-0 z-50 shadow-md">
        <h2 className="text-white font-bold">Meeting ID: {meetingId}</h2>
      </div>

      {/* 2. THE VIDEO STAGE - BRUTE FORCED SIZE */}
      {/* We use flex-grow to take all remaining space, and relative to act as an anchor */}
      <div className="flex-grow relative bg-black w-full overflow-hidden">
        
        {/* LOCAL VIDEO (Your Stream) */}
   <video
          ref={remoteVideoRef} // CHANGED: This is now the Remote Ref
          autoPlay
          playsInline
          // IMPORTANT: Removed 'muted' so you can hear the other person!
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: isScreenSharing ? "contain" : "cover",
            transform: "scaleX(1)" // CHANGED: Don't mirror the other person
          }}
        />

        {/* REMOTE VIDEO (Peer Stream) - Picture in Picture */}
     <div style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "250px",
            height: "150px",
            zIndex: 20,
            borderRadius: "10px",
            overflow: "hidden",
            border: "2px solid white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
        }}>
            <video
                ref={localVideoRef} // CHANGED: This is now the Local Ref
                autoPlay
                muted // IMPORTANT: Always mute your local video to avoid feedback loops!
                playsInline
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)" // CHANGED: Mirror your own face
                }}
            />
        </div>
      </div>

      {/* 3. CONTROLS (Footer) */}
      <div className="h-20 bg-gray-800 shrink-0 flex justify-center items-center gap-4 z-50">
        <button onClick={toggleMute} className="px-6 py-2 bg-white rounded font-bold">
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button onClick={toggleCamera} className="px-6 py-2 bg-white rounded font-bold">
          {isCameraOff ? "Turn On" : "Turn Off"}
        </button>
        <button 
          onClick={isScreenSharing ? stopScreenShare : sharescreen} 
          className={`px-6 py-2 rounded font-bold text-white ${
            isScreenSharing ? "bg-red-500" : "bg-blue-600"
          }`}
        >
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
      </div>

    </div>
  );
}