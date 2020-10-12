import React from "react";

const Filter = ({ filter, filterData }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filter} onChange={filterData} />
      </div>
    </form>
  );
};

export default Filter;
