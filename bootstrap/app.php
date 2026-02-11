<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Global middleware
        $middleware->use([
            \App\Http\Middleware\MinifyHtml::class,
            \Spatie\CookieConsent\CookieConsentMiddleware::class,
        ]);
        
        // Web middleware group additions
        $middleware->web(append: [
            \App\Http\Middleware\LogLastUserActivity::class,
            \App\Http\Middleware\LocaleMiddleware::class,
            \App\Http\Middleware\ThemeMiddleware::class,
            \App\Http\Middleware\SettingsMiddleware::class,
        ]);
        
        // API middleware
        $middleware->api(prepend: [
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
        
        // Route middleware aliases
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'permission' => \App\Http\Middleware\PermissionMiddleware::class,
            'MinifyHtml' => \App\Http\Middleware\MinifyHtml::class,
            'contentlength' => \App\Http\Middleware\AddContentLength::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
