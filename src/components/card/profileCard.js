import { useContext } from "react";
import { EditContext } from "./../../context/contextProvider";

const ProfileCard = ({ data }) => {
  const { name, sector, checkbox } = data;
  const { editName, setEditName, setSectorName } = useContext(EditContext);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-left">
        <h2 className="card-title">Profile Info</h2>
        <p>Name: {name}</p>
        <p>Sector: {sector}</p>
        <p>Agreed: {checkbox ? "Yes" : "No"}</p>
        <div className="card-actions justify-start">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditName(name);
              setSectorName(sector);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
