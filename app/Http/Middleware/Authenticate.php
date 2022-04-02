<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as BaseAuthenticate;

class Authenticate extends BaseAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$guards
     * @return mixed
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function handle($request, Closure $next, ...$guards): mixed
    {
        parent::handle($request, $next, ...$guards);

        // check if user account is active
        if (! auth()->user()->isActive()) {
            auth()->logout();

            return redirect('login')->with('error', trans('auth.deactivated'));
        }

        return $next($request);
    }
}
