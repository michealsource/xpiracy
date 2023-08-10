import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import ExtraCard from "../../components/ExtraCard/ExtraCard";
import "./extras.css";
import { useSelector } from "react-redux";
import GeneralCarousel from "../../components/GeneralCarousel/GeneralCarousel";

function Extras() {
  const { allCollectionData, hasPaidBefore } = useSelector((state) => state.genericSlice);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log(allCollectionData)
    if (allCollectionData?.randomExtra != undefined) {
      setData(allCollectionData?.randomExtra);
    }
  }, [allCollectionData]);

  useEffect(() => {
    if (search.length == 0) {
      setData(allCollectionData?.randomExtra);
    } else {
      setData(
        (allCollectionData?.randomExtra || []).filter(
          (v) =>
            v.video_name.toLowerCase().includes(search.toLowerCase()) ||
            v.keyword.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  console.log(data);

  return (
    <div className=" container px-20  pt-[70px]">
      <div className="w-full flex justify-between">
        <h2 className="text-[#fff] text-5xl">EXTRAS</h2>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* <div className="grid-container mt-[60px] grid-cols-4">
        {data.map((item, i) => (
          <ExtraCard data={item} key={i} />
        ))}
      </div> */}
      
      <p id="behind-the-scene"></p>
      <GeneralCarousel data={allCollectionData?.randomBehindTheScene} title="BEHIND-THE-SCENES" />
      <div className="mb-4">
        <GeneralCarousel isLocked={!hasPaidBefore} data={allCollectionData?.randomExtendedInterview} title="EXTENDED INTERVIEW" />
      </div>
    </div>
  );
}

export default Extras;
