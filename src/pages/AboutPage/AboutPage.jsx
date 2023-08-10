import React, { useEffect, useState } from "react";
import GeneralCarousel from "../../components/GeneralCarousel/GeneralCarousel";
import send from "../../assets/images/send.png";
import { useSelector } from "react-redux";

function AboutPage() {
  const [data, setData] = useState(null)
  const [trailer, setTrailer] = useState([])
  const {allCollectionData, hasPaidBefore} = useSelector(state => state.genericSlice)

  useEffect(()=>{
    if(allCollectionData.allCollections == undefined){
        return ;
    }

    // _data
    let tmp = [];
    for (let j  = 0; j < (allCollectionData.allCollections).length; j++) {
      const _data = (allCollectionData.allCollections)[j];
     
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
    }

    setTrailer(tmp)
  }, [allCollectionData])

  return (
    <div className=" container px-40  pt-[40px]">
      <h2 className="text-[#fff] text-[30px] mb-5">SEND A THANK YOU NOTE!</h2>
      <p className=" text-[#fff] text-[16px] max-w-7xl leading-10">
        Just as a compass, the stars and magnetic North guided sailors through
        dark waters centuries ago, our North Star for filmmaking helps us
        navigate dark times and focus on light in our day. Darkness can seem
        pervasive. Last year introduced fires all over Australia, pandemic,
        economic turmoil, locusts infestations, rising food prices, protests and
        riots, earthquakes, and financial warfare (look up Hedge Funds and
        GameStop). Sometimes it feels as if the tumultuous events are becoming
        more frequent. There’s a reason the film business was one of the few
        industries that grew during the Great Depression. Hope is a fundamental
        human need and in yesteryear, the filmmakers mastered storytelling to
        meet that need. Unfortunately, most shows offered these days add to the
        cynicism, division, and darkness so pervasive in society. Fortunately,
        darkness and light, hope and despair, cannot exist in the same place at
        the same time. And we believe if we build a home for creators and
        communities to connect, specifically those who align with our North
        Star, Angel Studios will become known for fulfilling our universal human
        need for hope and light. Our time feels short. Choosing, funding,
        creating, and spreading stories that matter has never felt more urgent.
        Whether as a customer, investor or team member thank you for joining us.
      </p>
      <GeneralCarousel data={trailer} title="WATCH TRAILER" />
      <div>
        <h5 className="text-[#fff] mt-5 mb-5 text-[20px]">FAQs</h5>
        <p className="text-[#fff]">
          Q: What are Christian movies? A: Christian movies are films that
          explore themes of faith, spirituality, and Christian values. They
          often revolve around biblical stories, religious figures, or
          contemporary stories with a strong Christian message. These movies aim
          to entertain and inspire audiences while promoting Christian beliefs
          and values.
        </p>

        <p className="text-[#fff] mt-10">
          Q: Are Christian movies only for Christian audiences? A: While
          Christian movies are primarily targeted at Christian audiences, they
          can be enjoyed by people of various faith backgrounds or even those
          with no specific religious affiliation. Some films have achieved
          mainstream success due to their universal themes, emotional
          storytelling, and strong performances. However, it's important to note
          that Christian movies often contain overt Christian messaging, so
          viewers should be aware of this aspect.
        </p>
      </div>
      <h5 className="text-[#fff] text-[16px] mt-10 mb-5">Send a message</h5>
      <div className="w-[100%] max-w-3xl items-center border-[#fff] border-[1px] rounded-[15px] h-[40px] bg-[#000] relative flex">
        <input
          type="text"
          placeholder="search"
          className="w-[100%] h-[100%] bg-transparent text-[14px] text-[#fff] px-10 focus:outline-none"
        />
        <img
          src={send}
          alt=""
          className="w-[30px] h-[30px] mr-5 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default AboutPage;
