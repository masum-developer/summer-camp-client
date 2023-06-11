import { useState } from "react";

const SingleClassPage = ({singleClass}) => {
    const {image,name,instructorName,availableSeat,price} = singleClass;
    const [disabled,setDisabled] = useState(false)
    let color="base"
    if(availableSeat===10){
        color='red';
        setDisabled(true);
    }
    return (
        <div style={{'backgroundColor':color}} className="first-letter:card card-compact w-96 shadow-xl">
            <figure><img src={image} className="w-full" alt="Class" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Instructor: {instructorName}</p>
                <p>Available Seat: {availableSeat}</p>
                <p>Price: {price}</p>
                <div className="card-actions justify-end">
                    <button disabled={disabled} className="btn btn-primary">Select</button>
                </div>
            </div>
        </div>
    );
};

export default SingleClassPage;