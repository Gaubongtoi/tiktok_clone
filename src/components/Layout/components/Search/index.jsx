import HeadlessTippy from '@tippyjs/react/headless';
import * as searchService from '~/apiServices/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '~/components/hooks';
const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(searchValue, 500);
    const inputRef = useRef();
    // Call API get data
    // Sau khi Web duoc mounted (lan dau tien) => thuc hien call API get data bang useEffect
    //
    useEffect(() => {
        // fetch : Lay duong link API
        // Cấu trúc URL:
        // + https:// -> là giao thức http
        // + //tiktok (subdomain): Tên miền con của tên miền chính
        // .fullstack (second-level domain): tên của website mà người dùng đặt cho nó
        // .edu()
        // .api/users/search: đường dẫn (path)
        // ? : ngăn cách giữa path và Query parameter
        // q=hoaa : Query parameter
        // & Kết hợp nhiều query
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounce);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
        // searchValue constraints: Bởi vì sau mỗi lần nhập (thay đổi state), nó sẽ cho ra những kết quả tìm kiếm khác nhau
        // => render ra được kqtk
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);

        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResults(false);
    };
    return (
        <HeadlessTippy
            // Cho phep duoc active thanh phan trong Tippy
            interactive={true}
            //
            appendTo={() => document.body}
            // Xuất hiện (visible) với 1 điều kiện nào đó
            visible={showResults && searchResult.length > 0}
            // attr render
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            {/* + Search */}
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search account and videos"
                    spellCheck={false}
                    onChange={(e) => {
                        e.target.value = e.target.value.trimStart();
                        setSearchValue(e.target.value);
                    }}
                    onFocus={() => setShowResults(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Cài đặt thư viện font awesome 
                            Với mỗi icon sẽ bao gồm chuẩn fa+tên icon
                        */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
