import React from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { targetUserId } = useParams();

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">{/**Display messages */}</div>
      <div className="p-5 border-t border-grey-600 flex gap-2 items-center">
        <input className="flex-1 border border-grey-500 text-white p-5rounded"></input>
        <button className="btn btn-secondary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
