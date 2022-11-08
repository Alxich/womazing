import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { validateFields } from "../../Validations/Validations";
import Button from "../Button";

import logo from "../../assets/img/logo-white.svg";
import formImage from "../../assets/img/product-photo.png";
import {
  fetchLogin,
  getLoginStatus,
  checkLogin,
} from "../../redux/actions/admin";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        Email: "",
        Password: "",
      },
      errors: {
        Email: "",
        Password: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitCalled = false;
  }

  componentWillUnmount() {
    this.props.setIsAdmin(this.props.getLoginStatus());
  }

  handleChange = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { fields } = this.state;
    const errorsForm = validateFields.runValidationMethod(fields);

    this.submitCalled = true;

    if (errorsForm) {
      this.setState({ errors: errorsForm });
      this.isAllValid = false;
      return;
    }

    if (fields.Email && fields.Password) {
      const data = {
        Email: fields.Email,
        Password: fields.Password,
      };

      dispatch(fetchLogin(data));
      this.props.setIsAdmin(dispatch(getLoginStatus()) && false);
    }
  };

  render() {
    const { fields, errors } = this.state;

    return (
      <div className="container full-width column centered">
        <header className="masthead admin">
          <div className="container centered spaced full-height">
            <Link to="/" className="logo">
              <img src={logo} alt="womazing-logo" />
            </Link>
          </div>
        </header>
        <main className="wrapper login">
          <div id="login">
            <div className="container centered spaced stretch">
              <div className="image">
                <img src={formImage} alt="login-form-image" />
              </div>
              <div className="form">
                <div className="title">
                  <h2>Login</h2>
                </div>
                <form>
                  <input
                    type="email"
                    name="Email"
                    placeholder={
                      errors.name ? errors.name : "Please write your email"
                    }
                    value={fields.Name}
                    onChange={(e) => this.handleChange(e)}
                    className={classNames({ invalid: errors.Email })}
                  />
                  <input
                    type="password"
                    name="Password"
                    placeholder={
                      errors.Password
                        ? errors.Password
                        : "Please write your password"
                    }
                    value={fields.Password}
                    onChange={(e) => this.handleChange(e)}
                    className={classNames({ invalid: errors.Email })}
                  />
                  <Button usual send onClick={(e) => this.handleSubmit(e)}>
                    Log in
                  </Button>
                </form>
                <ul className="privacy">
                  <li>© All rights reserved</li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/offer">Public offer</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <footer className="colophon"></footer>
      </div>
    );
  }
}

export default connect(null)(LoginPage);
