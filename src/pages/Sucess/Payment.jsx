import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getIdCollection, getIdPTF } from '../../redux/storage';

export default function SuccessfulPayment() {
    const navigate = useNavigate();

    useEffect(()=>{
        (new Swal("We Appreciate You", "we've grateful as we've recieved your payment", "success"));

        setTimeout(()=>{
            const collectionId = getIdCollection();
            if(collectionId != null){
                // navigate('/watch/'+btoa(collectionId));
                window.location.replace('/watch/'+btoa(collectionId));
                return ;
            }
            // check if user was watching any movie
            // navigate('/');
            window.location.replace('/');
        }, 2000);
    }, [])
    return (
        <div>SuccessfulPayment</div>
    )
}
