import { useState, useEffect } from "react";

function useConnectSocket(io) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIO = io("https://vagabond-api.vercel.app", {
      transports: ["websocket"],
      secure: true,
    });
    setSocket(socketIO);
    // return () => socketIO.close();
  }, [io]);

  return socket;
}

export default useConnectSocket;
