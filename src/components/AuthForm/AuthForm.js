import { Link } from "react-router-dom";
import "./AuthForm.css";

function AuthForm({
  title,
  btnTitle,
  redirectMessage,
  redirectTitle,
  redirectLink,
  onAuthSubmit,
  children
}) {
  return (
    <div className="auth-form-wrapper">
      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{title}</p>

      <form className="mx-1 mx-md-4" onSubmit={onAuthSubmit}>
        {children}

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <input
            type="submit"
            className="btn btn-primary btn-lg"
            value={btnTitle}
          />
        </div>

        <p style={{ fontStyle: "italic" }}>
          {redirectMessage}
          <Link to={redirectLink} style={{ textDecoration: "none" }}>
            {redirectTitle}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
