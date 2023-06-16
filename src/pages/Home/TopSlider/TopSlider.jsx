import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slider1 from '../../../assets/images/slider/slider1.jpg';
import slider2 from '../../../assets/images/slider/slider2.jpg';
import slider3 from '../../../assets/images/slider/slider3.jpg';
const TopSlider = () => {
    return (
        <Carousel>
        <div>
            <img src={slider3} />
            <p className="legend">In general, kung fu/kungfu refers to the Chinese martial arts also called wushu and quanfa. In China, it refers to any study, learning, or practice that requires patience, energy, and time to complete</p>
        </div>
        <div>
            <img src={slider2} />
            <p className="legend">Japan officially recognized karate as a martial art only 86 years ago. And its origins are not in mainland Japan at all: It was born in the archipelago of Okinawa, a long-independent kingdom whose culture was heavily influenced by China and which maintains its own identity today.</p>
        </div>
        <div>
            <img src={slider1} />
            <p className="legend">There are about 180 different types of martial arts globally, comprising thousands of fighting styles, techniques, and forms. Most of the renowned martial arts styles originated from Asia, but we also have some from other parts of the world.</p>
        </div>
    </Carousel>
    );
};

export default TopSlider;