# Giao diện mỹ phẩm — ReactJS + Node.js

Giao diện theo mẫu: danh mục bên trái, 6 sản phẩm ở giữa, banner bên phải
và 6 logo thương hiệu phía dưới. Có bố cục mobile, lọc danh mục, trạng thái
đang tải, lỗi và danh mục chưa có sản phẩm.

## Chạy ứng dụng

- Yêu cầu Node.js 22.12+ hoặc Node.js 24+ và npm.
- Cài thư viện: `npm install`.
- Phát triển: `npm run dev`, mở http://localhost:5173.
- Production: `npm run build`, sau đó `npm start`, mở http://localhost:3000.
- Kiểm thử backend: `npm test`.
- Biến môi trường `PORT` đổi cổng production (mặc định 3000).

## Ảnh được trả bởi server

Ảnh đã được giải nén từ `Images.rar` vào `Images/`, không đặt trong thư mục
`public` và không import vào bundle React. Express đọc và trả file ảnh qua
`GET /api/images/:id`. Route chỉ chấp nhận ID có trong danh sách cho phép,
không cho client đọc đường dẫn tùy ý.

`GET /api/catalog?category=all` trả dữ liệu sản phẩm, danh mục, URL ảnh,
banner và logo. React gọi API này bằng `fetch`. Danh mục `lipstick`, `makeup`,
`moisturizer`, `nails`, `hair` lọc tại server. Dữ liệu hiện nằm trong
`server/catalog.js`, chưa dùng cơ sở dữ liệu.

Ở chế độ phát triển, Vite proxy `/api` đến Express cổng 3000.
Ở production, Express phục vụ cả React đã build và API. Không thể chỉ mở
`index.html` trực tiếp: ứng dụng cần Node.js đang chạy để lấy dữ liệu và ảnh.

## Nguồn tài nguyên

- Ảnh sản phẩm, banner và thương hiệu: bộ `Images.rar` người dùng cung cấp.
- Đã tìm icon trái tim trên Iconfinder:
	https://www.iconfinder.com/icons/211755/heart_icon.
	Tại thời điểm thực hiện, trang chuyển hướng sang Freepik, không tải được
	icon trực tiếp. Bản thay thế cùng bộ Ionicons được lấy từ package `ionicons`
	(MIT), trả bởi server qua `/api/images/heart`.
- Giấy phép icon: `node_modules/ionicons/LICENSE`;
	nguồn https://github.com/ionic-team/ionicons.

Tên sản phẩm và giá giữ theo mẫu, kể cả khi ảnh minh họa không trùng loại sản phẩm.
