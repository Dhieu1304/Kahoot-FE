import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import Header from "../components/Header";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
   const isMobile = useMediaQuery({ maxWidth: 767 });
   return (
      <div
         className={cx("wrapper", {
            isMobile
         })}
      >
         <Header />
         <div className={cx("container")}>{children}</div>
      </div>
   );
}

DefaultLayout.propTypes = {
   children: PropTypes.node.isRequired
};

export default DefaultLayout;
