import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items = [], onchange = defaultFn }) {
    // Ý tưởng: tạo ra 1 useState chứa Menu cấp 1
    // cố tình đặt tên attr là data để lúc khi nhận onClick
    // thì nó sẽ ghi đè lại attrs data này và load lại data mới của cấp 2
    const [history, setHistory] = useState([{ data: items }]);
    // Lấy ra phần tử chứa object {data: items}
    const current = history[history.length - 1];

    const renderItems = () => {
        // Lọc qua từng item bằng map
        return current.data.map((item, index) => {
            // Kiểm tra item nào chứa children => có tồn tại Menu cấp 2
            // !! : chuyển sang kiểu Boolean
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        // Nếu tồn tài menu cấp 2
                        if (isParent) {
                            // setHistory: lấy prevStatem sau đó dùng spread để giải thêm vào mảng mới item.children
                            // bởi vì item.children giải ở đằng sau prev, mà bên trong item.children chứa 1 attrs data (trùng tên với attrs) mặc định
                            // của state => nó sẽ ghi đè lại attrs data chứa nội dung mới của children
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onchange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            // Cho phep duoc active thanh phan trong Tippy
            interactive={true}
            //
            appendTo={() => document.body}
            // Xuất hiện (visible) với 1 điều kiện nào đó
            // visible={searchResult.length > 0}
            // visible
            // placement
            placement="bottom-end"
            delay={[0, 700]}
            // attr render
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* Nếu như history.length > 1 => có nhiều hơn 1 cấp (setHistory đã giải thêm vào ...prev thành 1 mảng lớn hơn 1) */}
                        {history.length > 1 && (
                            // thì sẽ thực thi logic JSX này
                            <Header
                                title="Language"
                                // onBack: Lùi lại 1 cấp: splice mảng mới nhất
                                // -1 có nghĩa là trừ 1 cấp
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
