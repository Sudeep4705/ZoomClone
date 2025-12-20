import Carousel from "./Carousel";
import Companion from "./Companion";
import Hero from "./Hero";
import Partners from "./Partners";
import Segment1 from "./Segment1";


export default function HomePage(){
    return(
        <>
        <Hero/>
        <Carousel/>
        <Segment1/>
        <Companion/>
        <Partners/>
        </>
    )
}