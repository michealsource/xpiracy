import moment from "moment";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const SingleThankYou = ({ className, data = {} }) => {
  return (
    <div className={`my-5 p-5 w-[60%] rounded-[20px] ` + className}>
      <div className="flex items-center">
        <div className="no-img">
          <FaUserAlt size={20} />
        </div>

        <div className="ml-5">
          <h4 className=" text-lg text-[#fff]">{`${data?.user?.first_name} ${data?.user?.last_name}`}</h4>
          <span className=" text-[10px] text-[#fff]">
            {moment(data?.createdAt || data?.dateCommented).calendar()}
          </span>
        </div>
      </div>
      <p className=" text-[10px] text-[#fff] ml-5 mt-4">
        {data?.note || data?.comment}
      </p>
    </div>
  );
};

export default SingleThankYou;
