import React from "react";
import { Chart } from "react-charts";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  const dataArray = [
    {
      name: "CAC40",
      values: [10, 15, 47, 15, 89, 5],
    },
    { name: "NASDAQ", values: [14, 89, 20, 78, 8, 32] },
    { name: "KOLLJ22", values: [] },
  ];
  const data = React.useMemo(
    () =>
      dataArray.map((el) => {
        return {
          label: el.name,
          data: el.values.map((it, index) => {
            console.log("index", index);
            return { x: index, y: it };
          }),
        };
      }),
    []
  );
  console.log("data", data);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div>
      <div className="chart-section">
        <Chart
          style={{
            width: "400px",
            height: "300px",
          }}
          data={data}
          axes={axes}
        />
      </div>
      <div className="chart-label">
        {dataArray?.length &&
          dataArray.map((el, index) => (
            <>
              <div
                style={{
                  width: "50px",
                  height: "5px",
                  background: index === 0 ? "#0099CC" : "#FF4433",
                  margin: "5px"
                }}
              ></div>
              <p>{el.name}</p>
            </>
          ))}
      </div>
      <div className="array-section">
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <>
              {dataArray?.length &&
                dataArray.map((el) => (
                  <tr>
                    <td key={uuid()} className="array-section-td">
                      {el.name}
                    </td>
                    {el.values &&
                      el.values.map((item) => (
                        <td key={uuid()} className="array-section-td">
                          {item}
                        </td>
                      ))}
                  </tr>
                ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
