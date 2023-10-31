import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from './Sidebar';
function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);
    return (
        // 1 Defaultlayout sẽ có đầy đủ 1 Header, Header sẽ nằm ở trên cùng
        // ở dưới là là 1 phần 1 SideBar ở bên trái, Content chiếm ở phần bên phải
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
