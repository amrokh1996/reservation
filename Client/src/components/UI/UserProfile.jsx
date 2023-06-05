/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { MDBInput } from "mdb-react-ui-kit";
import { Button as BootstrapButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const cardData = [
  {
    cars_id: 6,
    rating: 4,
    description:
      "toyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyotatoyota",
    type: "toyota",
    energy_type: "electric",
    model: "T-120",
    year: 2020,
    rental_price: 100,
    available: true,
    start_date: null,
    end_date: null,
    is_delete: false,
    provider_id: 1,
    start_location: null,
    end_location: null,
    seats_number: 4,
    user_id: null,
    images_data:
      "https://www.vhv.rs/dpng/d/483-4831619_outlander-phev-mitsubishi-outlander-phev-2020-ruby-black.png",
  },
];

export default function ProfilePage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [provider, setProvider] = useState({});
  const [isCustomer, setIsCustomer] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [password, setpassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(name, email, password, phone, address);
    if (user[0]?.role == "user") {
      axios
        .put(`http://localhost:5000/update_user/${user[0]?.customers_id}`, {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
        })
        .then((response) => {
          setShow(false);
          fetchUser();
        });
    } else if (provider[0]?.role == "provider") {
      axios
        .put(`http://localhost:5000/update_provider/${provider[0]?.provider_id}`, {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
        })
        .then((response) => {
          setShow(false);
          fetchUser();
        });
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token") || '';

      
      console.log(token);

      const [providerResponse, userResponse] = await Promise.all([
        axios.get("http://localhost:5000/get_provider", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),

        axios.get("http://localhost:5000/get_user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const userData = userResponse.data;
      const providerData = providerResponse.data;
      console.log(userData);
      console.log(providerData);
      setUser(userData);
      setProvider(providerData);

      // Check if the user is a customer
      if (userData.role === "user") {
        setIsCustomer(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="text-center">
        <h1 className="fw-bold" style={{ color: "#000d6b" }}>
          Welcome to QuickRide
        </h1>
      </div>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <img
              style={{ height: "35rem" }}
              src="https://images.pexels.com/photos/1519192/pexels-photo-1519192.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </MDBCol>
          <MDBCol lg="8">
            {!isLoading && (
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody style={{ padding: "7rem" }}>
                    <form>
                      <MDBRow className="mb-4">
                        <MDBCol sm="3">
                          <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBInput
                            onChange={(event) => setname(event.target.value)}
                            type="text"
                            className="text"
                            value={
                              user[0] != null
                                ? user[0]?.username
                                : provider[0]?.username
                            }
                            readOnly
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow className="mb-4">
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBInput
                            onChange={(event) => setemail(event.target.value)}
                            type="email"
                            className="text"
                            value={
                              user[0] != null
                                ? user[0]?.email
                                : provider[0]?.email
                            }
                            readOnly
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow className="mb-4">
                        <MDBCol sm="3">
                          <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBInput
                            onChange={(event) => setphone(event.target.value)}
                            type="text"
                            className="text"
                            value={
                              user[0] != null
                                ? user[0]?.phone
                                : provider[0]?.phone
                            }
                            readOnly
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow className="mb-4">
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBInput
                            onChange={(event) => address(event.target.value)}
                            type="text"
                            className="text"
                            value={
                              user[0] != null
                                ? user[0]?.address
                                : provider[0]?.address
                            }
                            readOnly
                          />
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-end">
                        <BootstrapButton
                          variant="danger"
                          className="btn-floating"
                          onClick={handleShow}
                        >
                          <FontAwesomeIcon icon={faMagic} />
                        </BootstrapButton>
                      </div>
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
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                type="email"
                                onChange={(event) =>
                                  setname(event.target.value)
                                }
                                placeholder="Johnatan Smith"
                                autoFocus
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                onChange={(event) =>
                                  setemail(event.target.value)
                                }
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="Password"
                                placeholder="*********"
                                autoFocus
                                onChange={(event) =>
                                  setpassword(event.target.value)
                                }
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="tel"
                                placeholder="0799999999"
                                autoFocus
                                onChange={(event) =>
                                  setphone(event.target.value)
                                }
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Zarqa , Jordan"
                                autoFocus
                                onChange={(event) =>
                                  setaddress(event.target.value)
                                }
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="success" onClick={handleSubmit}>
                            Update
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            )}
          </MDBCol>
        </MDBRow>

        <div className="row d-flex justify-content-around">
          <h1
            className="row d-flex justify-content-center fw-bold mb-4"
            style={{ color: "#000d6b" }}
          >
            Last Preservations
          </h1>

          {!isLoading &&
            cardData.map((card, index) => (
              <div key={index} className="col-lg-4 col-md-4 col-sm-6 mb-5">
                <div className="car__item" style={{ backgroundColor: "white" }}>
                  <div className="car__img">
                    <img src={card.images_data} alt="" className="w-100" />
                  </div>

                  <div className="car__item-content mt-4">
                    <h4 className="section__title text-center">{card.model}</h4>
                    <h6 className="rent__price text-center mt-">
                      ${card.rental_price}.00 <span>/ Day</span>
                    </h6>

                    <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-car-line"></i> {card.type}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-settings-2-line"></i>{" "}
                        {card.energy_type}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="ri-calendar-line"
                          style={{ color: "#f9a826" }}
                        ></i>
                        {card.year}
                      </span>
                    </div>
                    <Link to="/Checkout">
                      <button className="w-50 car__item-btn car__btn-rent">
                        Rent it again
                      </button>
                    </Link>
                    <Link to={`/cars/${card.model}`}>
                      <button className="w-50 car__item-btn car__btn-details">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </MDBContainer>
    </section>
  );
}
