import { useState, useEffect } from "react";

function useConnectSocket(io) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIO = io("http://localhost:8001", {
      transports: ["websocket"],
    });
    setSocket(socketIO);
    return () => socketIO.close();
  }, [io]);

  return socket;
}

export default useConnectSocket;
