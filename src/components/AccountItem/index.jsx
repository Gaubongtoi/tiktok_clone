import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-1/138932460_2872423433077418_1712841380973472480_n.jpg?stp=dst-jpg_s160x160&_nc_cat=106&ccb=1-7&_nc_sid=db1b99&_nc_ohc=BLvo1zK4i5IAX_XM857&_nc_ht=scontent.fhan2-3.fna&_nc_e2o=s&oh=00_AfAazaPdRRwVlTnHTtgSjQmngUT6CyoVMw5zC3ZnV0iHkg&oe=655623EB"
                alt="Hoaa"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
