import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './CustomCarousel.scss';

import CarouselImage from './carousel-image/CarouselImage';

const CustomCarousel = ({ episodes }) => {


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <div className="carousel-root">
      <Slider {...settings}>
        {episodes.map((item, index) => <CarouselImage item={item} key={index} />)}
      </Slider>
    </div>
  );
};

export default CustomCarousel;
