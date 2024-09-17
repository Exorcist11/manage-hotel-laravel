<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thông tin đặt phòng của bạn đã được ghi lại</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .header {
            background-color: #f8f8f8;
            padding: 10px;
            text-align: center;
        }
        .content {
            margin: 20px;
        }
        .footer {
            background-color: #f1f1f1;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Cảm ơn bạn đã đặt phòng!</h1>
    </div>
    <p>Kính gửi {{ $order->fullname }},</p>

    <div class="content">
        <p>Đơn đặt phòng của bạn đã được tạo với thông tin như sau:</p>

        <ul>
            <li><strong>Họ và tên:</strong> {{ $order->fullname }}</li>
            <li><strong>Số điện thoại:</strong> {{ $order->phone }}</li>
            <li><strong>Số căn cước công dân:</strong> {{ $order->citizen_number }}</li>
            <li><strong>Email:</strong> {{ $order->email }}</li>
            <li><strong>Loại phòng:</strong> {{ $category }}</li>
            <li><strong>Số phòng:</strong> {{ $order->number_of_rooms }}</li>
            <li><strong>Ngày bắt đầu:</strong> {{ $order->start_date->format('Y-m-d') }}</li>
            <li><strong>Ngày kết thúc:</strong> {{ $order->end_date->format('Y-m-d') }}</li>
        </ul>

        <p>Vui lòng để ý số điện thoại và email, Nhân viên sẽ liên hệ với bạn để xác nhận thông tin đặt phòng</p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </div>
</body>
</html>
