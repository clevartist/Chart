import React, { useState } from "react";

const CustomChart = () => {
  const [data, setData] = useState([]);

  const [newLabel, setNewLabel] = useState("");
  const labelColors = [
    "tomato",
    "royalblue",
    "gold",
    "forestgreen",
    "purple",
    "darkorange"
  ];
  const [colorIndex, setColorIndex] = useState(0);

  const handleIncrement = (index) => {
    const updatedData = [...data];
    updatedData[index].value += 1;
    setData(updatedData);
  };

  const handleNewLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleAddNewLabel = () => {
    if (newLabel.trim() !== "") {
      const color = labelColors[colorIndex % labelColors.length];
      const newItem = { label: newLabel, value: 0, color };
      setData([...data, newItem]);
      setNewLabel("");
      setColorIndex(colorIndex + 1);
    }
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const totalValues = data.reduce((sum, item) => sum + item.value, 0);
  const arithmeticMean = totalValues / data.length;

  return (
    <div>
      <div className="chart-container">
        {data.map((item, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: item.value * 10 + "px",
              backgroundColor: item.color
            }}
          >
            <span className="label">{item.label}</span>
          </div>
        ))}
        <div
          className="bar"
          style={{
            height: arithmeticMean * 10 + "px",
            backgroundColor: "gray"
          }}
        >
          <span className="label">Arithmetic Mean</span>
        </div>
      </div>
      <div className="label-list">
        <h2>Labels</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <span
                className="label-color"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.label}{" "}
              <button onClick={() => handleIncrement(index)}>Increase</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="new-label-input">
          <input
            type="text"
            placeholder="Enter a new label"
            value={newLabel}
            onChange={handleNewLabelChange}
          />
          <button onClick={handleAddNewLabel}>Add Label</button>
        </div>
      </div>
    </div>
  );
};

export default CustomChart;
