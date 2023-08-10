import React, { useEffect, useState } from 'react'
import ModeSelector from '../../components/ModeSelector/ModeSelector'
// import SheepBG from '../../assets/images/sheep1.png'
import "./Preview.css"
import { FaPlayCircle } from 'react-icons/fa'
import GeneralCarousel from '../../components/GeneralCarousel/GeneralCarousel'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {encode, decode} from 'string-encode-decode'

export default function Preview() {

    const navigate = useNavigate();
    let {id} = useParams()
    // id = decode(id);
    id = atob(id);
    const [data, setData] = useState(null)
    const [trailer, setTrailer] = useState([])
    const {allCollectionData, hasPaidBefore} = useSelector(state => state.genericSlice)

    useEffect(()=>{
        if(allCollectionData.allCollections == undefined){
            return ;
        }

        let _data = (allCollectionData?.allCollections).find(v => v.id == id);
        setData(_data);

        // _data
        let tmp = [];
        for (let i = 0; i < (_data.contents).length; i++) {
            const content = (_data.contents)[i];
            if((content.trailers).length == 0){
                continue;
            }
            tmp = [
                ...tmp,
                ...content.trailers
            ];
        }

        setTrailer(tmp)
    }, [allCollectionData])

    if(data == null || data == undefined){
        return ;
    }

    console.log(trailer)
    return (
        <>
            <div className='custom-focus-cover'  style={{ background: `url("${data?.coverImage}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className='custom-focus'>
                    <ModeSelector theme='dark' />
                    <div className='custom-content-container'>
                        <div>
                            <h3>CHRISTSPIRACY</h3>
                            <br />
                            <div style={{ fontWeight: '500' }}>{data?.name}</div>
                            <br />
                            <div className='flex justify-evenly'>
                                <div className='badge'>
                                    <div>{data?.rating}</div>
                                </div>
                                <div>{data?.genre?.genre}</div>
                                <div> {(new Date(data?.createdAt)).getFullYear()} </div>
                            </div>
                            <br />

                            <div style={{ cursor: 'pointer' }} onClick={()=> {
                                    // console.log(encode(`${data?.id}`));
                                    navigate('/watch/'+btoa(`${data?.id}`))
                                }} className="custom-text  items-center justify-center flex flex-col bg-[#EB440F] p-5 rounded-[20px]">
                                <div className="flex flex-row items-center">
                                <FaPlayCircle size={25} />
                                <span className="ml-3 text-[15px] font-bold">Watch</span>
                                </div>
                                <span className="mt-3">
                                {data?.description}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <GeneralCarousel data={trailer} title="WATCH TRAILER" />
            <GeneralCarousel data={data?.behind_the_scenes} title="BEHIND-THE-SCENES" />
            <GeneralCarousel isLocked={!hasPaidBefore} data={data?.extended_interviews} title="EXTENDED INTERVIEW" />
            <GeneralCarousel isLocked={!hasPaidBefore} data={data?.extras} title="EXTRAS" />

            <div style={{ marginBottom: 90 }} />
        </>
    )
}
