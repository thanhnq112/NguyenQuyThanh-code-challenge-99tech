# Những vấn đề về hiệu quả tính toán và mẫu thiết kế không tốt

## 1. Lọc và sắp xếp không hiệu quả:

- Đoạn mã lọc và sắp xếp các số dư trong hook `useMemo`. Thao tác này có thể tốn kém, đặc biệt nếu mảng `balances` lớn.
- Logic lọc bên trong `useMemo` dường như không chính xác. Biến `balancePriority` không được định nghĩa, dẫn đến lỗi runtime.
- Điều kiện lọc không hợp lý. Nó chỉ bao gồm các số dư có giá trị nhỏ hơn hoặc bằng không, có thể không phải là logic mong muốn.

## 2. Lập bản đồ hai lần không cần thiết:

- Đoạn mã đầu tiên lặp map `sortedBalances` sang `formattedBalances`, sau đó lại lặp map `sortedBalances` lần nữa để tạo `rows`. Việc map hai lần này không hiệu quả.
- Thay vào đó, mã nên thực hiện định dạng và tạo hàng trong một lần duy nhất.

## 3. Phụ thuộc không cần thiết vào `prices`:

- Mảng phụ thuộc cho `useMemo` bao gồm `prices`, nhưng `prices` không được sử dụng trong hàm memoized. Điều này gây ra việc tính toán lại không cần thiết khi `prices` thay đổi.

## 4. Tính toán độ ưu tiên không hiệu quả:

- Hàm `getPriority` được gọi nhiều lần trong hàm `sort`, có thể được tối ưu hóa.

## 5. Sai kiểu cho `balance` trong lặp map `rows`:

- Kiểu của `balance` trong lặp map `rows` nên là `FormattedWalletBalance`, nhưng nó đang sử dụng `WalletBalance`.

## 6. Tính toán lại cùng một giá trị nhiều lần:

- `usdValue` được tính toán bên trong lặp map `rows`, nhưng có thể được tính trước nếu cần thiết.


# Cách cải tiến tối ưu hóa code

## 1. Kết hợp lọc, sắp xếp và lặp map:

- Kết hợp các thao tác lọc, sắp xếp và lặp map vào một `useMemo` để tránh lặp lại nhiều lần trên mảng `balances`.

## 2. Mảng phụ thuộc đúng:

- Loại bỏ `prices` khỏi mảng phụ thuộc trong `useMemo` nếu nó không được sử dụng trong hàm memoized.

## 3. Sửa logic sort:

- Sửa logic sort để chỉ bao gồm các số dư có giá trị dương và có độ ưu tiên hợp lệ.

## 4. Tối ưu hóa tính toán độ ưu tiên:

- Tối ưu hóa hàm sort để sử dụng ít lần gọi `getPriority` hơn bằng cách tính toán chênh lệch trực tiếp.

## 5. Đúng kiểu dữ liệu:

- Đảm bảo rằng kiểu `FormattedWalletBalance` được sử dụng đúng trong lặp map `rows`.

## 6. Tính toán giá trị USD hiệu quả:

- Tính toán `usdValue` trực tiếp trong lặp map `rows` mà không cần tính trước, điều này chấp nhận được khi số lượng số dư không quá lớn.