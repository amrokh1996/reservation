/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CarItemAdmin from "../../components/Dashboard/UI/CarItemAdmin";
import axios from "axios";

const RentedCars = () => {
  const [carData, setCarsData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/rentedCars",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setCarsData(data.filter((car) => car.available == false));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "1rem",
          columnGap: "2rem",
          rowGap: "2rem",
          paddingTop: "2rem",
          marginTop: "5rem",
        }}
      >
        {carData?.map((car) => (
          <div className="car__item">
            <div className="car__item-top">
              <div className="car__item-tile">
                <h3>{car.model}</h3>
                <h3>{car.username}</h3>
                <span>
                  <i className="ri-delete-bin-line"></i>
                </span>
              </div>
              <p>{car.type}</p>
            </div>

            <div className="car__img">
              <img src={car.images_data} alt="" />
            </div>

            <div className="car__item-bottom">
              <div className="car__bottom-left">
                <p>{car.available}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RentedCars;