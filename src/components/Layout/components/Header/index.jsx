import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faPlus,
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
// Để có thể đặt tên từ name-name, thay vì nameName
const cx = classNames.bind(styles);
// const cx = styles.className
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard Shortcuts',
    },
];
function Header() {
    const [searchResult, setSearchResult] = useState([]);
    // Call API get data
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);
    // Trả về 1 JSX
    return (
        // 1 thẻ chứa toàn bộ components
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Có 3 phần */}
                {/* + Logo */}
                <div className={cx('logo')}>
                    <img src={images.logo} alt="tiktok" />
                </div>
                {/* Tool tip */}
                {/* Tippy được xây dựng dựa trên React
                    và cung cấp các thành phần ReactJS để sử dụng
                    và tương tác với tooltips 1 cách dễ dàng
                    => dễ dàng tùy chỉnh với các attribute trong thẻ
                    Tippy
                */}
                <Tippy
                    // Cho phep duoc active thanh phan trong Tippy
                    interactive={true}
                    //
                    appendTo={() => document.body}
                    // Xuất hiện (visible) với 1 điều kiện nào đó
                    visible={searchResult.length > 0}
                    // attr render
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    {/* + Search */}
                    <div className={cx('search')}>
                        <input placeholder="Search account and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            {/* Cài đặt thư viện font awesome 
                            Với mỗi icon sẽ bao gồm chuẩn fa+tên icon
                        */}
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>

                {/* + Action */}
                <div className={cx('action')}>
                    <Button text>Upload</Button>
                    <Button primary>Login</Button>
                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
