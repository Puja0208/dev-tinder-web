import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about, photoUrl, _id } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      {photoUrl && (
        <figure>
          <img src={photoUrl} alt="photo-profile" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title flex-grow-0">{firstName + " " + lastName}</h2>
        {age && gender && <p className="flex-grow-0">{age + ", " + gender}</p>}
        <p className="flex-grow-0">{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
