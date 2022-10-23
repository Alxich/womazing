import validator from "validator";

class ValidateFields {
  runValidate = (name, value) => {
    switch (name) {
      case "Name":
        if (validator.isEmpty(value)) {
          return "Name is required";
        } else if (!validator.isLength(value, { min: 3 })) {
          return "Name should be minimum 3 characters";
        }
        return false;

      case "Email":
        if (validator.isEmpty(value)) {
          return "Email is required";
        } else if (!validator.isEmail(value)) {
          return "Invalid Email";
        }
        return false;

      case "Phone":
        if (validator.isEmpty(value)) {
          return "Email is required";
        } else if (!validator.isMobilePhone(value, "uk-UA")) {
          return "Invalid Email";
        }
        return false;

      case "Message":
        if (validator.isEmpty(value)) {
          return "Message is required";
        } else if (!validator.isLength(value, { min: 6 })) {
          return "Message should be minimum 6 characters";
        }
        return false;

      case "Country":
        if (validator.isEmpty(value)) {
          return "Country is required";
        } else if (!validator.isLength(value, { min: 4 })) {
          return "Country should be minimum 4 characters (ex: Cuba)";
        }
        return false;

      case "City":
        if (validator.isEmpty(value)) {
          return "City is required";
        } else if (!validator.isLength(value, { min: 1 })) {
          return "City should be minimum 1 characters (ex: Å Denmark)";
        }
        return false;

      case "Street":
        if (validator.isEmpty(value)) {
          return "Street is required";
        } else if (!validator.isLength(value, { min: 1 })) {
          return "Street should be minimum 1 characters";
        }
        return false;

      case "HouseFlat":
        if (validator.isEmpty(value)) {
          return "House/Flat is required";
        } else if (!validator.isLength(value, { min: 1 })) {
          return "House/Flat should be minimum 1 characters";
        }
        return false;

      case "FlatHouseNum":
        if (validator.isEmpty(value)) {
          return "Flat/House number is required";
        } else if (!validator.isLength(value, { min: 1 })) {
          return "Flat/House number should be minimum 1 characters";
        }
        return false;

      default: {
        return "";
      }
    }
  };

  runValidationMethod = (fields) => {
    let validationErrors = {};

    Object.keys(fields).forEach((name) => {
      const error = this.runValidate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      return validationErrors;
    } else {
      return false;
    }
  };
}

const validateFields = new ValidateFields();

export { validateFields };
