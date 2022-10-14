import "./styles.css";
// import Pagination from "./Pagination/Pagination";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { getListData, getRateData, saveData } from "../../actions/index";
import { mockList, mockLive } from "../../demoData/data";
import axios from "axios";

const HomeScreen = () => {
  const [listData, setListData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [homeSavedData, setHomeSavedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [savedDataSymbol, setSavedDataSymbol] = useState([]);
  const [buttonHandler, setButtonHandler] = useState({
    state: false,
    name: "",
  });

  // console.log(searchInput);
  const getSavedData = async () => {
    try {
      let { data } = await axios.get(
        "https://crypto-server-node.herokuapp.com/crypto/getData"
      );
      setSavedData(data);
    } catch (error) {}
  };

  const data = [];
  for (let i = 0; i < Object.values(mockList).length; i++) {
    const a = Object.keys(mockList)[i];
    for (let index = 0; index < Object.keys(mockLive.rates).length; index++) {
      if (Object.keys(mockList)[i] === Object.keys(mockLive.rates)[i]) {
        // data.push({[Object.keys(mockList)[i]]: {}})
        data[Object.keys(mockList)[i]] = {
          ...Object.values(mockList)[i],
          price: Object.values(mockLive.rates)[i],
        };
      }
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalData = Object.values(data);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;
  const currentData = Object.values(data).slice(
    indexOfFirstPage,
    indexOfLastPage
  );
  const nextPage = () => {
    let num = currentPage + 1;
    setCurrentPage(num);
  };
  const prevPage = () => {
    let num = currentPage - 1;
    setCurrentPage(num);
  };

  useEffect(() => {
    getListData(setListData);
    getRateData(setRateData);
    getSavedData();
  }, []);

  useEffect(() => {
    // console.log(savedData);
    let arr = [];
    for (let i = 0; i < savedData.length; i++) {
      arr.push(savedData[i].symbol);
    }
    setSavedDataSymbol(arr);
  }, [savedData]);

  // console.log(savedDataSymbol);

  return (
    <div className="homeBigContainer">
      <div className="homeContainer">
        <div className="homeTableContainer">
          <div className="homeAllContainer">
            <div className="homeFirstTableHeading">
              <div className="firstHeadingHome">
                <h2 className="text-xl font-semibold">Stock Details Table</h2>
                <div className="homeSearchContainer">
                  <div className="homeSearchIcon">
                    <BiSearchAlt2 style={{ color: "#8B83BA" }} size={26} />
                  </div>
                  <div className="homeSearchInput">
                    <input
                      placeholder="Search by Company Name"
                      className="searchHomeInput font-semibold text-[#8B83BA]"
                      type="text"
                      name="searchInput"
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <table className="homeTable table-fixed border">
              <thead className="homeSecondTableHead">
                <tr className="homeTabCont">
                  <th className="homeTabHead">COMPANY NAME</th>
                  <th className="homeTabHead">SYMBOL</th>
                  <th className="homeTabHead">MARKET CAP</th>
                  <th></th>
                  <th className="homeTabHead">CURRENT PRICE</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((val, i) => {
                  return (
                    <>
                      {val.name
                        .toUpperCase()
                        .includes(searchInput.toUpperCase()) && (
                        <tr
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid #d9d5ec",
                          }}
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
                              className="homeSymbol flex items-center w-20 text-center justify-center"
                            >
                              <div>
                                <BsDot size={26} />
                              </div>
                              <p>{val.symbol}</p>
                            </div>
                          </td>
                          <td style={{ color: "#6E6893" }}>
                            ${numeral(val.max_supply).format("0a")}
                          </td>
                          <td>
                            {savedDataSymbol.includes(val.symbol) ? (
                              <Link
                                style={{ textDecoration: "none" }}
                                to="/savedData"
                              >
                                <button className="homeViewDataButton text-white">
                                  View
                                </button>
                              </Link>
                            ) : (
                              <button
                                onClick={() => {
                                  saveData(val, getSavedData);
                                  setButtonHandler({
                                    state: true,
                                    name: val.name,
                                  });
                                }}
                                className="homeSaveDataButton text-white"
                              >
                                Save Data
                              </button>
                            )}
                          </td>
                          <td>
                            <p className="font-semibold">${val.price}</p>
                            <p style={{ color: "#6E6893" }}>USD</p>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: "20px", backgroundColor: "#F4F2FF" }}>
              <div className="homeTableFooter flex items-center">
                <h6 style={{ color: "#6E6893" }} className="font-semibold">
                  {indexOfFirstPage + 1}-{indexOfLastPage} of {totalData.length}
                </h6>
                <div className="homeTableFootIcon flex">
                  {currentPage === 1 ? (
                    ""
                  ) : (
                    <div className="footHomeLeftIcon">
                      <MdOutlineKeyboardArrowLeft
                        style={{ color: "#6E6893", cursor: "pointer" }}
                        size={20}
                        onClick={prevPage}
                      />
                    </div>
                  )}
                  {indexOfLastPage >= totalData.length ? (
                    ""
                  ) : (
                    <div className="footHomeRightIcon">
                      <MdOutlineKeyboardArrowRight
                        style={{ color: "#6E6893", cursor: "pointer" }}
                        size={20}
                        onClick={nextPage}
                      />
                    </div>
                  )}
                  {/* <Pagination
                    dataPerPage={dataPerPage}
                    totalData={totalData.length}
                    paginate={paginate}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/savedData" style={{ textDecoration: "none" }}>
          <button className="homeviewSavedDataButtonDisplay">
            View Saved Data
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
