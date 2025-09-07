import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

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

  const handleReviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {}
  };

  if (!requests) return;

  if (requests.length === 0) {
    return <h1 className="flex justify-center my-10">No request found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>

      {requests.map((request, index) => {
        const { firstName, photoUrl, lastName, about, age, _id, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="m-4 p-4 items-center rounded-lg bg-base-300 flex w-2/3 mx-auto justify-between"
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
            <div className="flex gap-2 justify-center align-middle">
              <button
                className="btn btn-primary"
                onClick={() => handleReviewRequest("rejected", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleReviewRequest("accepted",_id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
