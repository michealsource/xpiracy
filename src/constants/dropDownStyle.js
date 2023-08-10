export const customStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#A5A5A5",
      fontSize: "14px",
      fontWeight: 400,
    };
  },

  control: (base, state) => ({
    ...base,
    background: "#000",
    // match with the menu
    borderRadius: "15px",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#EEEBEC" : "#EEEBEC",
    height: "40px",
    // marginTop: "15px",

    backgroundColor: state.isFocused ? "red" : "white",

    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#EEEBEC" : "#EEEBEC",
    },
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: "25px",

    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    fontSize: "12px",
  }),

  singleValue: (provided) => ({
    ...provided,
    fontSize: "10px",
    fontWeight: "bold",
    color: "#fff",
  }),
};
