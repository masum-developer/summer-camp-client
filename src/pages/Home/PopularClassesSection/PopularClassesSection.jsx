import { useQuery } from "@tanstack/react-query";
import PopularClass from "./PopularClass";

const PopularClassesSection = () => {

    const {data:popularClasses=[]} =useQuery(['popularClasses'],async()=>{
        const res = await fetch('https://martialart-academy-server.vercel.app/bestClass')
        return res.json();
    })
    
    return (
        <div>
            <h2 className="text-4xl text-center my-10">Top Rated Class</h2>
            <div className='my-5 grid md:grid-cols-2 gap-6'>
                {
                    popularClasses && popularClasses.map(popularClass=><PopularClass key={popularClass._id} popularClass={popularClass}></PopularClass>)
                }
            </div>

        </div>
    );
};

export default PopularClassesSection;