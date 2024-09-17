<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Đặt phòng Thành công</title>
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
        <h1>Thông tin đặt phòng</h1>
    </div>
    <p>Kính gửi {{ $booking->order->fullname }},</p>

    <div class="content">
        <p>Nhân viên {{ $booking->user->profile->fullname }} đã đặt phòng cho bạn với với thông tin như sau:</p>

        <ul>
            <li><strong>Check In:</strong> {{ $booking->order->start_date->format('Y-m-d') }} 15:00</li>
            <li><strong>Check Out:</strong> {{ $booking->order->end_date->format('Y-m-d') }} 12:00</li>
            <li><strong>Số Phòng:</strong>
                <ul> 
                    @foreach($booking->booking_details as $bd)
                        <li>{{ $bd->room->room_no }}</li>
                    @endforeach
                </ul>
            </li>
        </ul>


        <p>Chúng tôi rất mong được chào đón bạn tại khách sạn. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc email.</p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </div>
</body>
</html>
