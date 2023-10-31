import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Button({
    className,
    to,
    href,
    onClick,
    children,
    primary = false,
    outline = false,
    disabled = false,
    rounded = false,
    text = false,
    small = false,
    large = false,
    rightIcon,
    leftIcon,
    ...passProps
}) {
    let Comp = 'button';
    // Mac dinh nhung button trong DOM nay deu se co
    // event onClick => Mac dinh trong props se co thuoc tinh onClick = onClick
    const props = {
        onClick,
        ...passProps,
    };
    // Remove event listensers from DOM buttons
    // => nhắm xóa bỏ những sự kiện trên nút đó
    // Neu disabled ton tai
    if (disabled) {
        // Su dung Object.keys để lấy ra những key
        // ex : onClick: function
        //      key : value
        // và lọc qua những key
        Object.keys(props).forEach((key) => {
            // Nếu key bắt đầu bằng chữ 'on' và nó là 1 hàm
            if (key.startsWith('on') && typeof props[key] === 'function') {
                // Xóa
                delete props[key];
            }
        });
    }
    // Kiem tra component
    // Neu ton tai prop 'to' => Bien doi the Comp tu button
    // (mac dinh) thanh the Link (Local Link) va them thuoc tinh
    // vao trong the Object props
    if (to) {
        props.to = to;
        Comp = Link;
    }
    // Neu  khong ton tai prop 'to': Kiem tra co ton tai prop 'href'
    // => them thuoc tinh href vao Object props, dong thoi
    // bien doi the Comp thanh the 'a'
    else if (href) {
        props.href = href;
        Comp = 'a';
    }
    // Ham nay co the tuy chinh gia tri nhan vao cua class
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        disabled,
        rounded,
        text,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {/* Tuy chinh icon, customize */}
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}

            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
