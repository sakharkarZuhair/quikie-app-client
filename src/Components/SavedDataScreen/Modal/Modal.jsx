import { removeData } from "../../../actions/index";
import { useParams, useNavigate } from "react-router-dom";

const Modal = ({ setModalShow }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#F4F2FF",
        boxShadow: "2px 2px 10px 5px #e8e8e8",
        height: "40%",
        width: "100%",
        marginTop: "20px",
      }}
      className="modal text-center py-10 absolute w-[100%] h-[100%] rounded"
    >
      <h4>Delete Rmove this Crypto?</h4>
      <div className="buttonModal mt-4 py-4">
        <button
          style={{ color: "white", marginRight: "10px", cursor: "pointer" }}
          className="homeSaveDataButton"
          onClick={() => setModalShow(false)}
        >
          Cancel
        </button>
        <button
          onClick={() => removeData(id, navigate)}
          style={{ cursor: "pointer" }}
          className="savedDataDeleteButton"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
