<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            if (Auth::user()->is_admin) {
                return $next($request);
            } else {
                return redirect('/')->with('error', 'You do not have admin access');
            }
        } else {
            return redirect('login');
        }
    }
}
