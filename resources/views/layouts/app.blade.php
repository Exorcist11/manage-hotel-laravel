<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class='bg-[#4070f4]'>
    <div class='flex justify-center items-center h-screen'>
      @yield('content')
    </div>
    
</body>
</html>
