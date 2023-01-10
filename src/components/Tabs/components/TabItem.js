import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "../Tabs.module.scss";
const cx = classNames.bind(styles);

function TabItem({ label, to }) {
   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   return (
      <Link to={to} className={cx("tab-item", { active })}>
         <span className={cx("tab-item-label")}>{label}</span>
      </Link>
   );
}

export default TabItem;
