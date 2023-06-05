/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import emailjs from "@emailjs/browser";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "https://github.com/OmarHassouna-PS",
    icon: "ri-github-line",
  },
  {
    url: "https://www.linkedin.com/in/omar-hassouna-97b76b1aa/",
    icon: "ri-linkedin-line",
  },
];

const Contact = () => {
  const form = useRef(null);
  const [message, setMessage] = useState({
    msg: "",
    theme: "",
  });

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_kf36l0v",
        "template_hsgme34",
        event.target, // Pass the HTML form element
        "gYrOQgVA7PuiLFEAU"
      )
      .then(
        (result) => {
          setMessage({
            msg: "Your message has been sent successfully, our team will contact you as soon as possible.",
            theme: "success",
          });
        },
        (error) => {
          setMassage({
            msg: "Something went wrong, please try again later!",
            theme: "danger",
          });
          console.log("massage error: " + error);
        }
      );
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>
              <Form onSubmit={sendEmail} ref={form}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" name="from_name" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="email_" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea w-100"
                    name="message"
                  ></textarea>
                </FormGroup>
                <button className="contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
              <p className={`font-bold mt-3 text-${message.theme}`}>
                {message.msg}
              </p>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  123 New Zarqa, Zarqa, Jordan
                </p>
                <div className="d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+962-78-2111991</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">
                    QuickRide@gmail.com
                  </p>
                </div>
                <h6 className="fw-bold mt-4">Follow Us</h6>
                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
