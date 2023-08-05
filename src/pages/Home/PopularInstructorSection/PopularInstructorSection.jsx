import { useQuery } from "@tanstack/react-query";
import Instructor from "./Instructor";

const PopularInstructorSection = () => {

    const {data:instructors=[]} =useQuery(['instructors'],async()=>{
        const res = await fetch('http://localhost:5000/bestInstructors')
        return res.json();
    })
    
    return (
        <div>
            <h2>Top Instructor mnm</h2>
            <div className="grid md:grid-cols-2 mb-10 gap-6">
            {instructors && instructors.map(instructor=><Instructor instructor={instructor} key={instructor._id}></Instructor>)}
        </div>
        </div>
    );
};

export default PopularInstructorSection;