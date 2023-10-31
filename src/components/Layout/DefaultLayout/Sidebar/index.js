import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

function Sidebar() {
    const cx = classNames.bind(styles);
    return <h2 className={cx('wrapper')}> Sidebar </h2>;
}

export default Sidebar;
