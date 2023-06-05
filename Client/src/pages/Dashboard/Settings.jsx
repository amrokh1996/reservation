/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Settings() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [adminData, setadminData] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [password, setpassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, email, password, phone, address);
    axios
      .put(`http://localhost:5000/update_admin/${adminData.admin_id}`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
      })
      .then((response) => {
        fetchData();
        toast.success(`admin with id: ${id} is updated`);
        handleClose;
      });
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token") || "";

    try {
      const response = await axios.get(`http://localhost:5000/get_admin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = response.data[0];
      console.log(data);
      setadminData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        className="btn rounded-lg px-4 py-2 btn-success ms-3 "
        style={{ marginTop: "5rem" }}
        onClick={handleShow}
      >
        <i className="ri-add-line">Edite Information </i>
      </button>
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
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(event) => setname(event.target.value)}
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
                  value={email}
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(event) => setemail(event.target.value)}
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
                  onChange={(event) => setpassword(event.target.value)}
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
                  onChange={(event) => setphone(event.target.value)}
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
                  onChange={(event) => setaddress(event.target.value)}
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

        <section style={{ marginTop: "-5rem" }}>
          <MDBContainer>
            <MDBRow>
              <MDBCol lg="20">
                <MDBCard
                  className=""
                  style={{
                    color: "black",
                    fontFamily: "bold",
                    fontWeight: "bold",
                  }}
                >
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Name{}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-base">
                          {adminData?.username}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-base">
                          {adminData?.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-base">
                          {adminData?.password}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-base">
                          {adminData?.phone}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-base">
                          {adminData?.address}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </>
  );
}

export default Settings;
