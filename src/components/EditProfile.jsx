import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const EditProfile = (props) => {
  const dispatch = useDispatch();
  const user = props.user;
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div>
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit profile</h2>
              <div>
                <fieldset className="fieldset mt-4">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Lastname</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo Url</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset mt-4">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset mt-4">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset mt-4">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="card-actions justify-center p-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
