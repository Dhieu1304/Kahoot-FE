import classNames from "classnames/bind";
import TabItem from "./components/TabItem";
import styles from "./Tabs.module.scss";
const cx = classNames.bind(styles);

function Tab({ tabItems, preLink }) {
   return (
      <div className={cx("tabs")}>
         {tabItems?.map((item, index) => (
            <TabItem key={index} to={`${preLink}/${item?.to}`} label={item.label} />
         ))}
      </div>
   );
}

export default Tab;
