import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import TitleBread from "../TitleBread";
import { postProduct, updateProduct } from "../../redux/actions/products";
import { validateFields } from "../../Validations/Validations";
import { Button } from "../index";

function AdminProduct({ currentProduct }) {
  const categories = ["Coat", "Sweatshirts", "Cardigans", "Hoodies"];

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    fields: {
      ImageUrl:
        currentProduct && currentProduct.imageUrl
          ? currentProduct.imageUrl
          : "",
      ImageGalery:
        currentProduct && currentProduct.imageGalery
          ? currentProduct.imageGalery
          : [],
      Name: currentProduct && currentProduct.name ? currentProduct.name : "",
      Category:
        currentProduct && currentProduct.category
          ? currentProduct.category
          : "",
      Price: currentProduct && currentProduct.price ? currentProduct.price : "",
      Text: currentProduct && currentProduct.text ? currentProduct.text : "",
      Sizes: currentProduct && currentProduct.sizes ? currentProduct.sizes : "",
      Colors:
        currentProduct && currentProduct.colors ? currentProduct.colors : "",
    },
    errors: {
      ImageUrl: "",
      ImageGalery: "",
      Name: "",
      Category: "",
      Price: "",
      Text: "",
      Sizes: "",
      Colors: "",
    },
  });

  const handleChange = (e) => {
    setState({
      fields: {
        ...state.fields,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
    });
  };

  const handleChangePrice = (e) => {
    e.target.name !== "new"
      ? setState({
          fields: {
            ...state.fields,
            Price: {
              old: e.target.value ? e.target.value : "",
              new: state.fields.Price.new
                ? Number(state.fields.Price.new) <=
                  Number(state.fields.Price.old)
                  ? state.fields.Price.new
                  : "Too much"
                : "",
            },
          },
          errors: {
            ...state.errors,
            [e.target.name]: validateFields.runValidate(
              e.target.name,
              e.target.value
            ),
          },
        })
      : setState({
          fields: {
            ...state.fields,
            Price: {
              old: state.fields.Price.old,
              new: e.target.value
                ? Number(e.target.value) <= Number(state.fields.Price.old)
                  ? e.target.value
                  : "Too much"
                : "",
            },
          },
          errors: {
            ...state.errors,
            [e.target.name]: validateFields.runValidate(
              e.target.name,
              e.target.value
            ),
          },
        });
  };

  const handleChangeSizes = (e, i) => {
    const array = [...state.fields.Sizes];
    array[i] = e.target.value;

    setState({
      fields: {
        ...state.fields,
        Sizes: [...array],
      },
      errors: {
        ...state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
    });
  };

  const handleChangeColors = (e, i) => {
    const array = [...state.fields.Colors];
    array[i] = {
      name:
        e.target.name === "name"
          ? e.target.value
          : array[i].name
          ? array[i].name
          : "",
      pallete:
        e.target.name === "pallete"
          ? e.target.value
          : array[i].pallete
          ? array[i].pallete
          : "",
    };

    setState({
      fields: {
        ...state.fields,
        Colors: [...array],
      },
      errors: {
        ...state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
    });
  };

  const handleChangeGallery = (e, i) => {
    const array = [...state.fields.ImageGalery];
    array[i] = {
      id: array[i].id,
      url: e.target.value,
    };

    setState({
      fields: {
        ...state.fields,
        ImageGalery: [...array],
      },
      errors: {
        ...state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fields } = state;
    const errorsForm = validateFields.runValidationMethod(fields);

    if (errorsForm) {
      setState({ fields: { ...fields }, errors: errorsForm });
      return;
    }

    if (fields.Name && fields.Email && fields.Message && fields.Phone) {
      const data = currentProduct
        ? {
            Id: currentProduct.id,
            Name: fields.Name,
            Email: fields.Email,
            Message: fields.Message,
            Phone: fields.Phone,
          }
        : {
            Name: fields.Name,
            Email: fields.Email,
            Message: fields.Message,
            Phone: fields.Phone,
          };

      currentProduct
        ? dispatch(updateProduct(data))
        : dispatch(postProduct(data));
    }
  };

  const { fields, errors } = state;

  const addFormFieldsSizes = (e) => {
    e.preventDefault();

    setState({
      fields: { ...fields, Sizes: [...fields.Sizes, ""] },
      errors: { ...state.errors },
    });
  };

  const removeFormFieldsSizes = (e, i) => {
    e.preventDefault();

    let newFormValues = { ...state };
    newFormValues.fields.Sizes.splice(i, 1);
    setState(newFormValues);
  };

  const addFormFieldsColors = (e) => {
    e.preventDefault();

    setState({
      fields: {
        ...fields,
        Colors: [...fields.Colors, { name: "", pallete: "" }],
      },
      errors: { ...state.errors },
    });
  };

  const removeFormFieldsColors = (e, i) => {
    e.preventDefault();

    let newFormValues = { ...state };
    newFormValues.fields.Colors.splice(i, 1);
    setState(newFormValues);
  };

  const addFormFieldsImages = (e, i) => {
    e.preventDefault();

    setState({
      fields: {
        ...fields,
        ImageGalery: [...fields.ImageGalery, { id: uuidv4(), url: "" }],
      },
      errors: { ...state.errors },
    });
  };

  const removeFormFieldsImages = (e, i) => {
    e.preventDefault();

    let newFormValues = { ...state };
    newFormValues.fields.ImageGalery.splice(i, 1);
    setState(newFormValues);
  };

  React.useEffect(() => {
    setState(state);
  }, [state]);

  console.log(state);

  return (
    <>
      <TitleBread
        title={currentProduct ? "Update product" : "New product"}
        className="container centered"
      />
      <form className="editor-admin">
        <div className="item container column to-left">
          <div className="title">
            <h5>Name</h5>
          </div>
          <div className="input">
            {currentProduct && state.fields.Name && (
              <p className="current">Current name : "{state.fields.Name}"</p>
            )}
            <input
              type="text"
              name="Name"
              value={fields.Name}
              className={classNames({ invalid: errors.Name })}
              onChange={(e) => handleChange(e)}
              placeholder="Please wire name of product"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Category</h5>
          </div>
          <div className="select">
            {currentProduct && state.fields.Category && (
              <p className="current">
                Current category : "{state.fields.Category}"
              </p>
            )}
            <select
              name="Category"
              className={classNames({ invalid: errors.Category })}
              onChange={(e) => handleChange(e)}
            >
              {categories &&
                categories.map((item, i) => {
                  return (
                    <option
                      value={item}
                      key={`${item}_${i}`}
                      selected={
                        currentProduct && state.fields.Category === item && true
                      }
                    >
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Price</h5>
          </div>
          <div className="price">
            {currentProduct && state.fields.Price && (
              <p className="current">
                `Current price : "
                {state.fields.Price && state.fields.Price.old
                  ? `old: $${
                      state.fields.Price.old > 0 ? state.fields.Price.old : ""
                    } new: $${
                      state.fields.Price.new > 0 ? state.fields.Price.new : ""
                    }`
                  : state.fields.Price > 0
                  ? `$${state.fields.Price}`
                  : ""}
                "
              </p>
            )}
            <input
              type="number"
              name="old"
              value={fields.Price.old}
              className={classNames({ invalid: errors.Price.old })}
              onChange={(e) => handleChangePrice(e)}
              placeholder="Write here the real price"
            />
            <input
              type="number"
              name="new"
              value={fields.Price.new}
              className={classNames({ invalid: errors.Price.new })}
              onChange={(e) => handleChangePrice(e)}
              placeholder="There can be your sale and previous field will be an old price"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Text about</h5>
          </div>
          <div className="textarea">
            {currentProduct && state.fields.Text && (
              <p className="current">
                The current text: <br />
                <br />
                {state.fields.Text}
              </p>
            )}
            <textarea
              type="textarea"
              name="Text"
              value={fields.Text}
              className={classNames({ invalid: errors.Text })}
              onChange={(e) => handleChange(e)}
              placeholder="Write something about your product"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Size</h5>
          </div>
          <div className="sizes">
            {currentProduct && state.fields.Sizes && (
              <p className="current">
                Sizes now : "
                {state.fields.Sizes.map((item, i) => {
                  return `${item}, `;
                })}
                "
              </p>
            )}
            {state.fields.Sizes.map((item, i) => {
              return (
                <div className="input-actions">
                  <input
                    type="text"
                    Name="Sizes"
                    className={classNames({ invalid: errors.Sizes[i] })}
                    onChange={(e) => handleChangeSizes(e, i)}
                    placeholder="Name size like X, XL, L, M, ..."
                    value={item}
                  />
                  <button
                    name="remove-more"
                    onClick={(e) => removeFormFieldsSizes(e, i)}
                  >
                    <FontAwesomeIcon icon={faRemove} />
                  </button>
                </div>
              );
            })}
            <div className="button-add-more">
              <div className="title">
                <h5>Add new size to your table of sizes: </h5>
              </div>
              <button
                type="button"
                name="add-more"
                onClick={(e) => addFormFieldsSizes(e)}
              >
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </div>
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Colors</h5>
          </div>
          <div className="colors">
            {currentProduct && state.fields.Colors && (
              <p className="current">
                Colors now : "
                {state.fields.Colors.map((item, i) => {
                  return `${item.name}, `;
                })}
                "
              </p>
            )}
            {state.fields.Colors.map((item, i) => {
              return (
                <>
                  <div className="input-actions">
                    <div>
                      <input
                        type="text"
                        Name="name"
                        className={classNames({ invalid: errors.Sizes[i] })}
                        onChange={(e) => handleChangeColors(e, i)}
                        placeholder="Name color like brown, yellow, etc"
                        value={item.name}
                      />
                      <input
                        type="text"
                        Name="pallete"
                        className={classNames({ invalid: errors.Sizes[i] })}
                        onChange={(e) => handleChangeColors(e, i)}
                        value={item.pallete}
                        placeholder="Color in hex format"
                      />
                    </div>
                    <button
                      name="remove-more"
                      onClick={(e) => removeFormFieldsColors(e, i)}
                    >
                      <FontAwesomeIcon icon={faRemove} />
                    </button>
                  </div>
                  <br />
                </>
              );
            })}
            <div className="button-add-more">
              <div className="title">
                <h5>Add new color to your palletes: </h5>
              </div>
              <button
                type="button"
                name="add-more"
                onClick={(e) => addFormFieldsColors(e)}
              >
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </div>
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Main image</h5>
          </div>
          <div className="image">
            {currentProduct && state.fields.ImageUrl && (
              <p className="current">Image now : "{state.fields.ImageUrl}"</p>
            )}

            <input
              type="text"
              name="ImageUrl"
              value={fields.ImageUrl}
              className={classNames({ invalid: errors.Image })}
              onChange={(e) => handleChange(e)}
              placeholder="Please use url for image"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Gallery image</h5>
          </div>
          <div className="image">
            {currentProduct && state.fields.ImageGalery && (
              <p className="current">
                Images now: <br />
                {`{`}
                <br />
                {state.fields.ImageGalery.map((item, i) => {
                  return (
                    <>
                      {`"${item.url}"`}
                      <br />
                    </>
                  );
                })}
                {`}`}
              </p>
            )}
            {currentProduct &&
              state.fields.ImageGalery &&
              state.fields.ImageGalery.map((item, i) => {
                return (
                  <div className="input-actions">
                    <input
                      type="text"
                      name="Name"
                      className={classNames({ invalid: errors.ImageGalery })}
                      onChange={(e) => handleChangeGallery(e, i)}
                      placeholder="Please use url for image"
                      value={item.url}
                    />
                    <button
                      name="remove-more"
                      onClick={(e) => removeFormFieldsImages(e, i)}
                    >
                      <FontAwesomeIcon icon={faRemove} />
                    </button>
                  </div>
                );
              })}
            <div className="button-add-more">
              <div className="title">
                <h5>Add new image to gallery: </h5>
              </div>
              <button
                type="button"
                name="add-more"
                onClick={(e) => addFormFieldsImages(e)}
              >
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </div>
          </div>
        </div>
        <Button usual onClick={(e) => handleSubmit(e)}>
          {currentProduct ? "Update product" : "Upload product"}
        </Button>
      </form>
    </>
  );
}

export default AdminProduct;
