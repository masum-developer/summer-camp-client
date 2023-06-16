import InstructorDetails from "./InstructorDetails";
import { useQuery } from '@tanstack/react-query'
const InstructorsPage = () => {
    const {data:instructors=[]} =useQuery(['instructors'],async()=>{
        const res = await fetch('https://martialart-academy-server.vercel.app/instructors')
        return res.json();
    })
   
    return (
        <div>
            <h2 className="text-center text-2xl my-10">Total No of Instructor: {instructors.length}</h2>
        <div className="grid md:grid-cols-2 mb-10 gap-6">
            {instructors && instructors.map(instructor=><InstructorDetails instructor={instructor} key={instructor._id}></InstructorDetails>)}
        </div>
        </div>
    );
};

export default InstructorsPage;