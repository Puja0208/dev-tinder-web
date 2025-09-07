import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      //   console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return <h1>No connection found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>

      {connections.map((connection, index) => {
        const { firstName, photoUrl, lastName, about, age, _id } = connection;
        return (
          <div
            key={_id}
            className="m-4 p-4  rounded-lg bg-base-300 flex w-1/2 mx-auto"
          >
            <div>
              {photoUrl && (
                <img
                  className="w-20 h-20 rounded-b-full "
                  alt="photo"
                  src={photoUrl}
                />
              )}
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName}</h2>
              {age && gender && <p>{age + "," + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
