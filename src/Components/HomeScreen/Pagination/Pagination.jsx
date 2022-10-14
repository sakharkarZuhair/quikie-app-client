import React from "react";
import "./styles.css";
const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination flex gap-3">
        {pageNumbers.map((number) => {
          return (
            <li className="paginationButton" key={number}>
              <h6 style={{ color: "#6E689" }} onClick={() => paginate(number)}>
                {number}
              </h6>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
