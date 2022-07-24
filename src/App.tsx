import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";
import { v4 as uuid } from "uuid";
import axios from "axios";
import {FinancialData} from "../@types"
import "./App.css";

const url = "http://localhost:4040"

function App() {
  const [dataArray, setDataArray] = useState<FinancialData[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/api/v1/data`);
      
      setDataArray(response.data)
    };
    fetchData();
  }, []);
  
  const data = React.useMemo(
    () =>
      dataArray.map((el) => {
        return {
          label: el.name,
          data: el.values.map((it, index) => {
            return { x: index, y: it };
          }),
        };
      }),
    []
  );
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
                key={uuid()}
                style={{
                  width: "50px",
                  height: "5px",
                  background: index === 0 ? "#0099CC" : "#FF4433",
                  margin: "5px",
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
                dataArray?.map((el) => (
                  <tr>
                    <td key={uuid()} className="array-section-td">
                      {el.name}
                    </td>
                    {el?.values &&
                      el?.values?.map((item) => (
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
