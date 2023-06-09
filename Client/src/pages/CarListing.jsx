import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import "../styles/CarLLII.css";
import axios from "axios";

const CarListing = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedEnergyType, setSelectedEnergyType] = useState("");
  const [search, setSearch] = useState("");
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars`)
      .then((response) => {
        setCarData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const filteredCars = carData.filter((car) => {
    if (selectedBrand && car.model !== selectedBrand) {
      return false;
    }
    if (selectedType && car.type !== selectedType) {
      return false;
    }
    if (selectedEnergyType && car.energy_type !== selectedEnergyType) {
      return false;
    }
    if (search && !car.model.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedPrice === "low" && car.rental_price > 50) {
      return false;
    }
    if (selectedPrice === "high" && car.rental_price <= 50) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const brand = queryParams.get("brand");
    const type = queryParams.get("type");
    const energyType = queryParams.get("energyType");
    const price = queryParams.get("price");

    setSelectedBrand(brand || "");
    setSelectedType(type || "");
    setSelectedEnergyType(energyType || "");
    setSelectedPrice(price || "");
  }, []);

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col>
              <div className="d-flex justify-content-center mb-5">
                <div
                  style={{
                    position: "relative",
                    width: "50%",
                  }}
                >
                  <input
                    style={{
                      borderRadius: "5px",
                      borderStyle: "hidden",
                      boxShadow: "-1px 1px 4px 1px lightgrey",
                      width: "100%",
                      padding: "0.5rem 2rem 0.5rem 1rem",
                      backgroundColor: "#f2f2f2",
                    }}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0.5rem",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </Col>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="row d-flex align-items-center gap-2 mb-1">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select
                  onChange={handleBrandChange}
                  value={selectedBrand}
                  className="select__group"
                >
                  <option value="">Select Brand</option>
                  {[...new Set(carData.map((item) => item.model))].map(
                    (model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    )
                  )}
                </select>
                <select
                  onChange={handleTypeChange}
                  value={selectedType}
                  className="select__group"
                >
                  <option value="">Select Type</option>
                  {[...new Set(carData.map((item) => item.type))].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>
                <select
                  onChange={handleEnergyTypeChange}
                  value={selectedEnergyType}
                  className="select__group"
                >
                  <option value="">Select Energy Type</option>
                  {[...new Set(carData.map((item) => item.energy_type))].map(
                    (energyType) => (
                      <option key={energyType} value={energyType}>
                        {energyType}
                      </option>
                    )
                  )}
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
            </Col>
            {filteredCars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
