import React from "react";
import "../css/filter.css";

const FilterBar = ({ onSelectOne, onSelectTwo }) => {
  return (
    <div class="container">
      <div class="custom-select-wrapper">
        <div class="input-wrapper">
          <select
            type="text"
            placeholder="Select Type"
            class="custom-select"
            onChange={onSelectOne}
          >
            <option value="">Select Sex</option>

            <option value="female">Female</option>

            <option value="male">Male</option>
          </select>
        </div>
      </div>

      <div class="custom-select-wrapper">
        <div class="input-wrapper">
          <select
            type="text"
            placeholder="Select Type"
            class="custom-select"
            onChange={onSelectTwo}
          >
            <option value="">Select Status</option>

            <option value="offline">Offline</option>

            <option value="online">Online</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default FilterBar;
