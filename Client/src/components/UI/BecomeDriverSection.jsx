import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/BecomeDriverSection.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const sliderImageUrl = [
  //First image url
  {
    url: "https://www.carlogos.org/car-logos/bmw-logo.png",
  },
  {
    url: "https://www.carlogos.org/car-logos/toyota-logo.png",
  },
  //Second image url
  {
    url: "https://www.carlogos.org/car-logos/ford-logo.png",
  },
  //Third image url
  {
    url: "https://www.carlogos.org/car-logos/honda-logo.png",
  },
  {
    url: "https://www.carlogos.org/car-logos/nissan-logo.png",
  },
  {
    url: "https://www.carlogos.org/car-logos/kia-logo.png",
  },
  {
    url: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
  },

  //Fourth image url

  {
    url: "https://www.carlogos.org/car-logos/hyundai-logo.png",
  },
];
const Slider = () => {
  return (
    <>
      <div className="title text-center">
        <p className="fw-bold">OUR PARTNERS</p>
      </div>
      <div className="AA">
        <div className="parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          >
            {sliderImageUrl.map((imageUrl, index) => {
              return (
                <div className="slider" key={index}>
                  <img src={imageUrl.url} alt="movie" />
                </div>
              );
            })}
          </Carousel>
          <br />
        </div>
      </div>
    </>
  );
};
export default Slider;
