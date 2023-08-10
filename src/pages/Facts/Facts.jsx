import React from "react";

function Facts() {
  return (
    <div className="px-20 text-[#fff] pt-14">
      <h3 className="text-[#fff] text-5xl">Facts</h3>

      <div className="text-white flex flex-col w-3/4 mx-auto mb-40 mt-20 justify-center items-center">
        <div className="flex items-center flex-col justify-center text-center">
          <h5 className="text-xl"> SOURCES AND STATISTICS</h5>
          <p className="text-xl">(00:00:28)</p>
          <p className="text-xl">WORLDWIDE WE ARE LOOKING AT APPROXIMATELY</p>
          <p className="text-xl">350 MILLION PEOPLE WITH DIABETES</p>
          <a className="text-xl text-[#E93C24] w-[370px] pb-5">
            "Diabetes Atlas". International Diabetes Federation. World Health
            Organization. "GLOBAL REPORT ON DIABETES". 2016
          </a>
        </div>

        <div className="flex items-center flex-col justify-center text-center">
          <p className="text-xl">(00:39)</p>
          <p className="text-xl">
            1 OUT OF 3 MEDICARE DOLLARS IS SPENT ON PEOPLE WITH DIABETES.
          </p>
          <a className="text-xl w-[400px] text-[#E93C24] pb-5">
            {" "}
            The Diabetes Care Project. "Diabetes Fast Facts".
          </a>
        </div>

        <div className="flex items-center flex-col justify-center text-center">
          <p className="text-xl"> (00:44)</p>
          <h5 className="text-xl">
            {" "}
            1 IN 10 HEALTHCARE DOLLARS IS SPENT ON PEOPLE WITH DIABETES
          </h5>
          <p className="text-xl w-[500px] text-[#E93C24] pb-5">
            {" "}
            American Diabetes Association. "THE STAGGERING COSTS OF DIABETES IN
            AMERICA".{" "}
          </p>
        </div>

        <div className="flex items-center flex-col justify-center text-center">
          <p className="text-xl">(02:16 – 03:17)</p>
          <h5 className="text-xl">
            {" "}
            WORLD HEALTH ORGANIZATION REPORT HAS CLASSIFIED BACON & SAUSAGE AS
            CARCINOGENIC TO HUMANS
          </h5>
          <p className="text-xl w-[700px] text-[#E93C24] pb-5">
            {" "}
            Aubrey, Allison. "Bad day for bacon: Processed Meats Cause Cancer
            WHO Says". npr: the salt. Oct. 2015 "Carcinogenicity of consumption
            of red and processed meat". The Lancet Oncology. Vol. 16. 2015 "IARC
            Monographs evaluate consumption of red meat and processed meat".
            World Health Organization International Agency for Research on
            Cancer. PRESS RELEASE N.240. Oct. 2015
          </p>
        </div>

        <div className="flex items-center flex-col justify-center text-center">
          <p className="text-xl ">(03:56)</p>
          <h5 className="text-xl ">
            {" "}
            AMERICAN CANCER SOCIETY ENCOURAGES EATING PROCESSED TURKEY AND
            CANNED MEATS{" "}
          </h5>
          <p className="text-xl w-[600px] text-[#E93C24] pb-5">
            "Shopping List: Basic Ingredients for a Healthy Kitchen". American
            Cancer Society *Since the making of the film, The American Cancer
            Society has updated their guidelines to "use meat as a side dish or
            flavor enhancer rather than as the focus of the meal."
          </p>
        </div>

        <div className="flex items-center flex-col justify-center text-center">
          <p className="text-xl">(05:00)</p>
          <h5 className="text-xl">
            IN THE US 1 OUT OF EVERY 4 DEATHS IS FROM CANCER{" "}
          </h5>
          <p className="text-xl w-[600px] text-[#E93C24] pb-5">
            "Statistics for Different Kinds of Cancer". Center for Disease
            Control and Prevention
          </p>
        </div>
      </div>
    </div>
  );
}

export default Facts;
