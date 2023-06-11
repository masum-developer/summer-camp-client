import { useQuery } from '@tanstack/react-query'
import SingleClassPage from './SingleClassPage';
const ClassesPage = () => {

    const {data:allClass=[]} =useQuery(['allClass'],async()=>{
        const res = await fetch('http://localhost:5000/allClass/approve')
        return res.json();
    })
    return (
        <div>
            <h2 className="text-3xl text-center">Admission Going On. Hurry Up..</h2>
            <div className='my-5'>
                {
                    allClass && allClass.map(singleClass=><SingleClassPage key={singleClass._id} singleClass={singleClass}></SingleClassPage>)
                }
            </div>
        </div>
    );
};

export default ClassesPage;