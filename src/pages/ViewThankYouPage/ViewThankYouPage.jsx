import React, { useEffect, useRef, useState } from "react";
import question from "../../assets/images/question.png";
import SingleThankYou from "../../components/SingleThankYou/SingleThankYou";
import { getCommunityAction } from "../../redux/actions/genericAction";
import { useDispatch, useSelector } from "react-redux";
import AppBtn from "../../components/AppBtn/AppBtn";

const ViewThankYouPage = () => {
  const dispatch = useDispatch();
  const { community } = useSelector((state) => state.genericSlice);
  const step = 3;

  const [data, setData] = useState([]);
  const [lastIndex, setlastIndex] = useState(0);
  const firstCall = useRef(0);

  useEffect(() => {
    dispatch(getCommunityAction());
  }, []);

  useEffect(()=>{
    if(firstCall.current == 0){
      autoFillWithStep()
    }

    firstCall.current = 1;
  }, [community])

  const autoFillWithStep = ()=>{
    if(data.length == community.length){
      return ;
    }

    const tmp = [];
    let stopIndex = lastIndex + step;
    for (let i = lastIndex; i < stopIndex; i++) {
      const element = community.thanksNote[i];

      console.log(i);
      
      if(element == undefined){
        continue;
      }

      tmp.push(element);
    }
    setlastIndex(stopIndex);
    setData([
      ...data,
      ...tmp
    ])
  }

  return (
    <div className="px-56 w-full pt-[40px]">
      <div className="flex items-center">
        <h3 className="text-[#ffff] text-[30px] mr-5">JOIN US</h3>
        <img src={question} alt="" className="w-[30px] h-[30px]" />
      </div>
      <p className="text-[#ffff] text-[14px]">
        View thank yous from over {community.thanksNote.length + 3} people
      </p>

      {/* <div style={{ maxHeight: 400, overflow: 'auto', marginBottom: 30 }}> */}
      <div style={{ overflow: 'auto', marginBottom: 30 }}>
        {(data).map((item, i) => (
          <SingleThankYou data={item} key={i} />
        ))}
      </div>

      {
        (
          data.length != community.thanksNote.length
        ) && (
          <AppBtn
            title="See More"
            onClick={()=> autoFillWithStep()}
            className="bg-[#EB440F] mx-4 text-[16px] text-[#fff] font-medium py-5 p-3 px-5 rounded-[20px] "
          />
        )
      }

      <br />
      &nbsp;

      {/* <SingleThankYou />
      <SingleThankYou />
      <SingleThankYou />
      <SingleThankYou /> */}
    </div>
  );
};

export default ViewThankYouPage;
