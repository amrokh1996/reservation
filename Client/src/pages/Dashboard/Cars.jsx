
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../../styles/Cars.css";
import axios from "axios";

const Cars = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [carData, setCarsData] = useState();

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cars", {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      console.log(data);
      setCarsData(data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">All Cars</h2>

        <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            <select onChange={handleStatusChange} value={selectedStatus}>
              <option value="New">Status</option>
              <option value="Rented">Rented</option>
              <option value="Not Rented">Not Rented</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select onChange={handleBrandChange} value={selectedBrand}>
              <option value="">Select Brand</option>
              <option value="Audi">Audi</option>
              <option value="Toyota">Toyota</option>
              <option value="Bmw">Bmw</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "3rem",
            justifyContent: "center",
          }}
        >

          {carData?.map((car) => (
            <div className="car__item">
              <div className="car__item-top">
                <div className="car__item-tile">
                  <h3>{car.model}</h3>
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

                  <p>
                    {car.available}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Cars;
