import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Meeting() {
  const { meetingId } = useParams();

  // ---------- STATE ----------
  const [isMuted, setIsMuted] = useState(false);
  const [isTwoCameraS, setisTwoCameras] = useState(false);
  const [remoteStream, setremoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [togglecamera, settogglecamera] = useState(false);

  // ---------- REFS ----------
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

  // ---------- SOCKET + SIGNALING ----------
  useEffect(() => {
    socketRef.current = io("https://zoomclone-v1fi.onrender.com");

    startMeeting();

    socketRef.current.on("user-joined", async () => {
      await createOffer();
    });

    socketRef.current.on("offer", async ({ offer }) => {
      await createAnswer(offer);
    });

    socketRef.current.on("answer", async ({ answer }) => {
      await peerConnectionRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // ---------- VIDEO EFFECTS ----------
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // ---------- GET USER MEDIA ----------
  async function startMeeting() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    setLocalStream(stream);

    socketRef.current.emit("join-room", meetingId);
  }

  // ---------- CREATE PEER CONNECTION (ONLY ONCE) ----------
  const createPeerConnection = () => {
    if (peerConnectionRef.current) return;

    const pc = new RTCPeerConnection(rtcConfig);
    peerConnectionRef.current = pc;

    // Add local tracks + CAPTURE VIDEO SENDER
    localStreamRef.current.getTracks().forEach((track) => {
      const sender = pc.addTrack(track, localStreamRef.current);

      if (track.kind === "video") {
        videoSenderRef.current = sender; // 🔥 REQUIRED FOR SCREEN SHARE
      }
    });

    // Receive remote tracks
    pc.ontrack = (event) => {
      setremoteStream(event.streams[0]);
      setisTwoCameras(true);
    };

    // ICE candidates
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

  // ---------- SCREEN SHARE ----------
  const sharescreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      screenStreamRef.current = screenStream;
      const screenTrack = screenStream.getVideoTracks()[0];

      // Replace camera with screen
      await videoSenderRef.current.replaceTrack(screenTrack);

      // Local preview
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      // Restore camera when user stops sharing
      screenTrack.onended = stopScreenShare;
    } catch (err) {
      console.error("Screen share failed", err);
    }
  };

  const stopScreenShare = async () => {
    const cameraTrack = localStreamRef.current.getVideoTracks()[0];

    await videoSenderRef.current.replaceTrack(cameraTrack);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }

    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
  };

  // ---------- TOGGLES ----------
  const toggleCamera = () => {
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    settogglecamera(!videoTrack.enabled);
  };

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

      <div className="flex justify-center items-center gap-6">
        {/* LOCAL VIDEO */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={`${
            isTwoCameraS ? "w-80" : "w-96"
          } rounded-lg scale-x-[-1]`}
        />

        {/* REMOTE VIDEO */}
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
        <button onClick={toggleMute} className="px-4 py-2 bg-white rounded">
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button onClick={toggleCamera} className="px-4 py-2 bg-white rounded">
          {togglecamera ? "Turn On" : "Turn Off"}
        </button>

        <button onClick={sharescreen} className="px-4 py-2 bg-white rounded">
          Share Screen
        </button>
      </div>
    </div>
  );
}
