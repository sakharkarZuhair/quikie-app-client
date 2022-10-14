import "./styles.css";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { getSavedData, removeData } from "../../actions/index";
import { Link } from "react-router-dom";
import numeral from "numeral";
import Modal from "./Modal/Modal";

const SavedDataScreen = () => {
  const [savedData, setSavedData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("");
  // console.log(id);
  useEffect(() => {
    getSavedData(setSavedData);
  }, []);
  // val.name.toUpperCase().includes(searchInput.toUpperCase()) &&

  return (
    <div className="savedDataBigContainer">
      <div className="savedDataContainer">
        <div className="savedDataTableContainer relative">
          {modalShow && <Modal id={id} setModalShow={setModalShow} />}
          <div className="savedDataAllContainer">
            {savedData.length > 0 ? (
              <table className="savedDataTable table-fixed border">
                <thead className="savedDataSecondTableHead">
                  <tr className="savedDataTabCont">
                    <th className="savedDataTabHead"></th>
                    <th className="savedDataTabHead"></th>
                    <th className="savedDataTabHead">Saved Data Table</th>
                    <th></th>
                    <th className="savedDataTabHead"></th>
                  </tr>
                </thead>
                <tbody>
                  {savedData.map((val, i) => {
                    return (
                      <tr
                        style={{
                          textAlign: "center",
                          borderBottom: "1px solid #d9d5ec",
                        }}
                        className="tableRow"
                        key={i}
                      >
                        <td
                          style={{ color: "black" }}
                          className="font-semibold"
                        >
                          {val.name}
                        </td>
                        <td>
                          <div
                            style={{
                              marginLeft: "110px",
                              color: "#4A4AFF",
                              fontWeight: "bold",
                            }}
                            className="savedDataSymbol flex items-center w-20 text-center justify-center"
                          >
                            <div>
                              <BsDot size={26} />
                            </div>
                            <p>{val.symbol}</p>
                          </div>
                        </td>
                        <td
                          className="maxSupplySavedData"
                          style={{ color: "#6E6893" }}
                        >
                          ${numeral(val.max_supply).format("0a")}
                        </td>
                        <td className="buttonOnSavedData">
                          <Link
                            to={`/remove/${val._id}`}
                            onClick={() => {
                              setId(val._id);
                            }}
                          >
                            <button className="savedDataDeleteButton text-white">
                              Delete
                            </button>
                          </Link>
                        </td>
                        <td className="priceSavedData">
                          <p className="font-semibold">${val.price}</p>
                          <p style={{ color: "#6E6893" }}>USD</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h6
                style={{ width: "100%", textAlign: "center", padding: "50px" }}
              >
                Please Save! No Data Provided!
              </h6>
            )}
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#F4F2FF",
                textAlign: "center",
                padding: "10px 0px",
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/">
                <button className="savedDataBackButton">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedDataScreen;
