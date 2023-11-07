import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});
// async: khai báo 1 hàm (function arrow/declare) bất đồng bộ
// - Tự động biến đổi 1 hàm thông thường thành 1 Promise
// - Khi gọi tới hàm async nó sẽ xử lý mọi thứ và được trả kết quar trong hàm của nó
// Nó sẽ khởi tạo 1 Promise
// Sau đó trong hàm sẽ gọi đến await để chờ phải hồi từ API. trong này nó chính là GET
// Sau khi nó đã thực hiện xong việc lấy dữ liệu JSON, thì nó sẽ gán vào trong biến response
//
export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
