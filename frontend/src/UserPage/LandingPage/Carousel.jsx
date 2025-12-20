import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"
const images = [
  "Images/img1.jpg",
  "Images/img2.jpg",
  "Images/img3.jpg",
  "Images/img4.jpg",
  "Images/img5.jpg",
  "Images/img6.jpg",
  "Images/img7.jpg",
  "Images/img8.jpg",
  "Images/img9.jpg",
];
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
export default function Carousel(){
    return(
        <> 
        <div className="carousel w-full h-[500px] bg-[linear-gradient(to_bottom,#06134b 0px,#153d8a 30px,#7f78d2 80px,#ffffff 80px)]">
             <Slider {...settings}>
                 {images.map((img,i)=>(
                <div className="card rounded-2xl h-80 mt-10 hover:scale-110 transition-all duration-500" key={i}>
                    <img src={img} alt="img" className="h-full rounded-2xl" />
                </div>  
            ))}
             </Slider>
        </div>

        </>
    )
}