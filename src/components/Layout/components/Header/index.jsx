import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

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
    faUpload,
    faMessage,
    faCloudUpload,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import 'tippy.js/dist/tippy.css';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
// Để có thể đặt tên từ name-name, thay vì nameName
const cx = classNames.bind(styles);
const currentUser = true;
// const cx = styles.className
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
        // Menu Cap 2: children
        children: {
            // title
            title: 'Language',
            // data trong Menu cap 2
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
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
const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        title: 'View Profile',
        to: '/@ann',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
        title: 'Get coins',
        to: '/coins',
    },
    {
        icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
        title: 'Log out',
        separate: true,
        action: () => {
            currentUser = false;
        },
    },
];
function Header() {
    const [searchResult, setSearchResult] = useState([]);
    // Call API get data
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);
    // Trả về 1 JSX
    const handleMenuChange = (item) => {
        return console.log(item);
    };
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
                <HeadlessTippy
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
                </HeadlessTippy>
                {/* Action */}
                <div className={cx('action')}>
                    {/* Neu nguoi dung dang nhap thanh cong */}
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload Video!" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon className={cx('upload-icon')} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon className={cx('message-icon')} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon className={cx('inbox-icon')} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        // Neu nguoi dung chua dang nhap
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onchange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-1/138932460_2872423433077418_1712841380973472480_n.jpg?stp=dst-jpg_s160x160&_nc_cat=106&ccb=1-7&_nc_sid=db1b99&_nc_ohc=BLvo1zK4i5IAX_XM857&_nc_ht=scontent.fhan2-3.fna&_nc_e2o=s&oh=00_AfAazaPdRRwVlTnHTtgSjQmngUT6CyoVMw5zC3ZnV0iHkg&oe=655623EB"
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                fallback="https://avatars.githubusercontent.com/u/106148218?v=4"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
