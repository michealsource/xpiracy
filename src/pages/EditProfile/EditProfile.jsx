import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useFormik } from "formik";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaQuestionCircle } from "react-icons/fa";
import ProfileInput from "../../components/ProfileInput/ProfileInput";
import CustomDropDown from "../../components/CustomDropDown/CustomDropDown";
import AppBtn from "../../components/AppBtn/AppBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/actions/genericAction";
import { APP_CONFIG } from "../../config/settings";
import Swal from "sweetalert2";
import axiosClient from "../../api/axios";
import Loader from "../../components/Loader/Loader";

function EditProfile() {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passport, setPassport] = useState(null);
  const [realImageFile, setRealImageFile] = useState("");
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((_) => _.authenticationSlice);
  const { profileData } = useSelector((_) => _.genericSlice);

  const countries = Country.getAllCountries();
  const states = State.getAllStates();
  const city = City.getAllCities();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.name,
    ...country,
  }));

  const initialValues = {
    country: "",
    state: "",
    city: "",
  };

  const handleChangePassport = (event) => {
    const fileList = event.target.files;
    setPassport(event.target.files[0]);
    const imageURL = URL.createObjectURL(fileList[0]);
    setRealImageFile(imageURL);

    updateImage(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (profileData != null) {
      if (profileData?.picture != null) {
        let pic = `${APP_CONFIG.BASE_URL}${profileData?.picture}`;
        console.log("profileData", pic);
        setRealImageFile(pic);
      }

      // set default
      setInput({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
      });

      if (profileData.country != null) {
        formik.setFieldValue("country", {
          label: profileData.country,
          value: profileData.country,
        });
        formik.setFieldValue("state", {
          label: profileData.state,
          value: profileData.state,
        });
        formik.setFieldValue("city", {
          label: profileData.city,
          value: profileData.city,
        });
      }
    }
  }, [profileData]);

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  const updateImage = async (image) => {
    const fd = new FormData();
    fd.append("picture", image);
    await axiosClient().put("profile/update", fd);
  };

  const submitData = async () => {
    if (input.first_name.length < 3 || input.last_name.length < 3) {
      new Swal("Oops...", "Name is required", "error");
      return;
    }

    setLoading(true);
    try {
      axiosClient().patch("/profile", {
        ...input,
        country: formik.values.country.value,
        state: formik.values.state.value,
        city: formik.values.city.value,
      });

      new Swal("Success", "information updated successfully", "success");
      dispatch(getProfileAction());
      navigate("/profile");
    } catch (e) {
      new Swal("Oops...", "An error occurred", "error");
    }
    setLoading(false);
  };

  return (
    <div className="px-20  pt-14">
      {loading && <Loader />}
      <div className="flex flex-col  justify-center w-1/3 mb-40 mx-auto mt-10">
        <h3 className="text-[#fff] text-5xl ">Edit Profile</h3>

        <div className="flex items-center gap-10 mt-10">
          <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full border-[5px] mb-8 border-[#E93C24]">
            {realImageFile != "" ? (
              <img
                src={realImageFile}
                alt=""
                className="w-[100%] rounded-full "
                style={{ borderRadius: 100, height: "100%" }}
              />
            ) : (
              <span className="cursor-pointer text-center text-[#fff] font-bold text-5xl">
                {profileData?.email[0] || "M"}
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              id="other-btn"
              hidden
              onChange={handleChangePassport}
            />

            <label
              for="other-btn"
              onClick={() => {
                // if(!passport){
                //   // alert()
                //   new Swal("Oops...", "No image selected", "error");
                //   return ;
                // }
                // updateImage(password);
              }}
              className=" text-[#E93C24] text-2xl cursor-pointer"
            >
              Upload New Photo
            </label>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-14">
            <div className="w-full">
              <ProfileInput
                value={input.first_name}
                onChange={(e) =>
                  setInput({ ...input, first_name: e.target.value })
                }
                target="firtsName"
                labelText={`${input?.first_name || "First Name"} `}
              />
            </div>

            <div className="w-full">
              <ProfileInput
                value={input.last_name}
                onChange={(e) =>
                  setInput({ ...input, last_name: e.target.value })
                }
                target="lastsName"
                labelText={`${input?.last_name || "Last Name"} `}
              />
            </div>
          </div>
          <div className="mt-10 relative">
            <div>
              <CustomDropDown
                id="country"
                name="country"
                title="Select Your Country"
                required
                options={updatedCountries}
                value={formik.values.country}
                onChange={(selectedOption) => {
                  console.log(selectedOption);
                  formik.setFieldValue("country", selectedOption);
                }}
              />
            </div>
          </div>

          <div className="mt-10">
            <div>
              <CustomDropDown
                id="state"
                name="state"
                title="Select State/Region/Territory"
                required
                options={states
                  .filter((s) => {
                    return s.countryCode === formik.values?.country?.isoCode;
                  })
                  .map((v) => {
                    return { label: v.name, value: v.name, ...v };
                  })}
                value={formik.values.state}
                onChange={(selectedOption) =>
                  formik.setFieldValue("state", selectedOption)
                }
              />
            </div>
          </div>

          <div className="mt-10">
            <div>
              <CustomDropDown
                required
                title="Select  City"
                id="city"
                name="city"
                options={city
                  .filter((s) => {
                    return (
                      s.countryCode === formik.values?.country?.isoCode &&
                      s.stateCode === formik.values?.state?.isoCode
                    );
                  })
                  .map((v) => {
                    return { label: v.name, value: v.name, ...v };
                  })}
                value={formik.values.city}
                onChange={(selectedOption) => {
                  formik.setFieldValue("city", selectedOption);

                  // setInput({
                  //   ...input,
                  //   country:
                  // })
                }}
              />
            </div>
          </div>

          <div className="mt-10 flex gap-5">
            <AppBtn
              title="Cancel"
              className=" bordder-[2px] text-center justify-center items-center w-[80px] font-bold border-[#fff] p-5 rounded-s-2xl text-[#fff] "
              onClick={() => navigate("/profile")}
            />
            <AppBtn
              title="Save"
              onClick={() => {
                submitData();
              }}
              className=" bordder-[2px] text-center justify-center items-center w-[80px] font-bold border-[#E93C24]  p-5 rounded-s-2xl text-[#fff] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
