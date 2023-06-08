import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slider1 from '../../../assets/images/slider/slider1.jpg';
import slider2 from '../../../assets/images/slider/slider2.jpg';
const TopSlider = () => {
    return (
        <Carousel>
        <div>
            <img src={slider1} />
            <p className="legend">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, laboriosam!</p>
        </div>
        <div>
            <img src={slider2} />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src={slider1} />
            <p className="legend">Legend 3</p>
        </div>
    </Carousel>
    );
};

export default TopSlider;