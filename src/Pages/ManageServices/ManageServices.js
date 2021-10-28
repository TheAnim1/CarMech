import React, { useEffect, useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('https://shielded-lake-84025.herokuapp.com/services')
        .then(response => response.json())
        .then(data => setServices(data))
    },[]);
    const handleDelete = id => {
        const url = `https://shielded-lake-84025.herokuapp.com/services/${id}`
        fetch(url, { 
            method: 'DELETE', 
        })
        .then(response => response.json())
        .then(data => {

            console.log(data)
            if(data.deletedCount){
                alert('Deleted')
                const remaining = services.filter(service => service._id !== id)
                setServices(remaining)
            }
            
        })
    }
    return (
        <div>
            <h1>Manage Services</h1>
            {
                services.map(service => <div key={service._id}>
                    <h3>{service.name}</h3>
                    <button onClick={()=> handleDelete(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageServices;