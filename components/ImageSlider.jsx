import { View, Text } from "react-native";
import React from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { sliderImage } from "../constants/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ImageSlider = () => {
  return (
    <Carousel
      data={sliderImage}
      loop={true}
      autoplay={true}
      renderItem={ItemCard}
      hasParallaxImages={true}
      sliderWidth={wp(100)} // Set an appropriate width in pixels
      itemWidth={wp(100)-70} // Set an appropriate width in pixels
      firstItem={1}
      autoplayInterval={4000}
      slideStyle={{ display: "flex", alignItems: "center" }}
    />
  );
};
const ItemCard = ({ item, index }, props) => {
  return (
    <View style={{ width: wp(100)-70, height:hp(25)}}>
      <ParallaxImage
        source={item}
        containerStyle={{ borderRadius: 10, flex: 1 }}
        style={{ resizeMode: "contain" }}
        parallaxFactor={1}
        {...props}
      ></ParallaxImage>
    </View>
  );
};

export default ImageSlider;
