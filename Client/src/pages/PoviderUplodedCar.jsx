/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import { toast } from "react-toastify";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ProviderUploadedCar() {
  const [carsArray, setCarsArray] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedEnergyType, setSelectedEnergyType] = useState();
  //////
  // const [carById, setCarById] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [carName, setCarName] = useState();
  const [carType, setCarType] = useState();
  const [energyType, setEnergyType] = useState();
  const [renalPrice, setRenalPrice] = useState();
  const [seatsNum, setSeatsNum] = useState();
  const [yearOfMade, setYearOfMade] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [carDesciption, setCarDesciption] = useState();

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleEnergyTypeChange = (event) => {
    setSelectedEnergyType(event.target.value);
  };

  const filteredCars = carsArray.filter((car) => {
    if (
      selectedBrand &&
      car.model.toUpperCase() !== selectedBrand.toUpperCase()
    ) {
      return false;
    }
    if (selectedType && car.type.toUpperCase() !== selectedType.toUpperCase()) {
      return false;
    }
    if (
      selectedEnergyType &&
      car.energy_type.toUpperCase() !== selectedEnergyType.toUpperCase()
    ) {
      return false;
    }
    if (selectedPrice === "low" && car.rental_price >= 50) {
      return false;
    }
    if (selectedPrice === "high" && car.rental_price < 50) {
      return false;
    }
    return true;
  });

  const getCars = async () => {
    const token = localStorage.getItem("token") || "";
    let id;

    try {
      const resToken = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      id = resToken.data.provider_id;
      console.log(resToken.data.provider_id);
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await axios.get(`http://localhost:5000/carsProvider/${id}`);
      setCarsArray(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCars();
  }, []);

  const handleDelete = async (id) => {
    // const token = localStorage.getItem("token") || "";

    try {
      const deleteCars = await axios.put(
        `http://localhost:5000/delete_car/${id}`
      );
      getCars();
      console.log(deleteCars);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleUpate = (id) => {
    axios
      .put(`http://localhost:5000/update_car/${id}`, {
        discrabtion: carDesciption,
        type: carType,
        energy_type: energyType,
        model: carName,
        year: yearOfMade,
        rental_price: renalPrice,
        images_data: imageUrl,
        seats_number: seatsNum,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Car deleted successfully.");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete car.");
      });
    console.log(id);
  };

  return (
    <>
      <Helmet title="Cars" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-5">
            <div className="d-flex align-items-center gap-3 mb-5">
              <span className="d-flex align-items-center gap-2">
                <i className="ri-sort-asc"></i> Sort By
              </span>
              <select
                onChange={handleBrandChange}
                value={selectedBrand}
                className="select__group"
              >
                <option value="">Select Brand</option>
                <option value="BMW">BMW</option>
                <option value="TOYOTA">TOYOTA</option>
                <option value="FERRARI">FERRARI</option>
              </select>
              <select
                onChange={handleTypeChange}
                value={selectedType}
                className="select__group"
              >
                <option value="">Select Type</option>
                <option value="Luxury Car">Luxury Car</option>
                <option value="Vintage Car">Vintage Car</option>
                <option value="Family Car">Family Car</option>
                <option value="Off Road">Off Road</option>
                <option value="Van">Van</option>
                <option value="4*4">4*4</option>
                <option value="Classic">Classic</option>
              </select>
              <select
                onChange={handleEnergyTypeChange}
                value={selectedEnergyType}
                className="select__group"
              >
                <option value="">Energy Type...</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
              <select
                onChange={handlePriceChange}
                value={selectedPrice}
                className="select__group"
              >
                <option value="">Select Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </div>

          {filteredCars.map((item) => (
            <div className="col-lg-4 col-md-4 col-sm-6 mb-5" key={item.cars_id}>
              <div className="car__item" style={{ backgroundColor: "white" }}>
                <div className="car__img w-100">
                  <img src={item.images_data} alt="" className="w-100" />
                </div>
                <div className="car__item-content mt-4">
                  <h4 className="section__title text-center">{item.model}</h4>
                  <h6 className="rent__price text-center mt-">
                    ${item.rental_price}.00 <span>/ Day</span>
                  </h6>

                  <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-car-line"></i> {item.type}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-settings-2-line"></i> {item.energy_type}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-timer-flash-line"></i> {item.year}
                    </span>
                  </div>

                  <button
                    className="w-50 car__item-btn car__btn-rent"
                    onClick={() => handleShow(item.cars_id)}
                  >
                    Edit
                  </button>

                  <button
                    className="w-50 car__item-btn car__btn-details"
                    onClick={() => handleDelete(item.cars_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ////// */}
      <div className="py-5">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A New Inormation </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  placeholder="Car Name"
                  type="text"
                  id="form8Example1"
                  className="form-control"
                  required
                  onChange={(e) => setCarName(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  type="text"
                  required
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option selected>Car Type...</option>
                  <option value="Luxury Car">Luxury Car</option>
                  <option value="Vintage Car">Vintage Car</option>
                  <option value="Family Car">Family Car</option>
                  <option value="Off-Road Car">Off-Road Car</option>
                  <option value="Van">Van</option>
                  <option value="4*4">4*4</option>
                  <option value="Classic">Classic</option>
                </select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  type="text"
                  required
                  onChange={(e) => setEnergyType(e.target.value)}
                >
                  <option selected>Energy Type...</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  placeholder=" Rental Price per Day"
                  type="number"
                  id="form8Example3"
                  className="form-control"
                  required
                  onChange={(e) => setRenalPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  placeholder=" Seat's Number"
                  type="number"
                  id="form8Example4"
                  className="form-control"
                  min="1"
                  max="10"
                  step="1"
                  required
                  onChange={(e) => setSeatsNum(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  placeholder=" Year of made"
                  type="number"
                  id="form8Example5"
                  className="form-control"
                  min="1900"
                  max="2099"
                  step="1"
                  required
                  onChange={(e) => setYearOfMade(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  placeholder="Image Url"
                  type="text"
                  id="form8Example3"
                  className="form-control"
                  required
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  placeholder="Car description"
                  type="text"
                  id="form8Example3"
                  className="form-control"
                  required
                  onChange={(e) => setCarDesciption(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ProviderUploadedCar;
