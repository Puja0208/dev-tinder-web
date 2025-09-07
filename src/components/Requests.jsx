import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.connectionRequests));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return <h1>No request found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>

      {requests.map((request, index) => {
        const { firstName, photoUrl, lastName, about, age, _id } =
          request.fromUserId;
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

export default Requests;
