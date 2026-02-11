# Laravel 9 to Laravel 12 Upgrade Guide

This document outlines the upgrade from Laravel 9 to Laravel 12 for the GamePort application.

## Overview

This upgrade includes:
- Laravel Framework: 9.x → 12.x
- PHP: 8.0 → 8.2+ (PHP 8.3 tested)
- PHPUnit: 9.x → 11.x
- Frontend Build: Laravel Elixir/Gulp → Vite
- Carbon: 2.x → 3.x
- Many package updates for Laravel 12 compatibility

## Major Changes

### 1. Bootstrap Architecture

Laravel 12 introduces a completely new bootstrap architecture:

**Before (Laravel 9):**
- `bootstrap/app.php` - Created application instance and bound Kernel classes
- `bootstrap/autoload.php` - Handled Composer autoloading
- `app/Http/Kernel.php` - Defined middleware
- `app/Console/Kernel.php` - Defined console commands
- `app/Exceptions/Handler.php` - Exception handling
- `app/Providers/RouteServiceProvider.php` - Route configuration

**After (Laravel 12):**
- `bootstrap/app.php` - Uses fluent builder pattern for all configuration
- `bootstrap/autoload.php` - **REMOVED**
- `app/Http/Kernel.php` - **REMOVED** (middleware now in bootstrap/app.php)
- `app/Console/Kernel.php` - **REMOVED**
- `app/Exceptions/Handler.php` - **REMOVED** (uses framework default)
- `app/Providers/RouteServiceProvider.php` - **REMOVED** (routing in bootstrap/app.php)

### 2. Route Syntax

**Before:**
```php
Route::get('/', 'PageController@startpage');
Route::group(['namespace' => 'Frontend\Auth'], function() {
    Route::get('login', 'LoginController@showLoginForm');
});
```

**After:**
```php
use App\Http\Controllers\PageController;
use App\Http\Controllers\Frontend\Auth\LoginController;

Route::get('/', [PageController::class, 'startpage']);
Route::group([], function() {  // no namespace key
    Route::get('login', [LoginController::class, 'showLoginForm']);
});
```

### 3. Service Providers

The `config/app.php` providers array no longer needs Laravel framework providers:

**Before:**
```php
'providers' => [
    Illuminate\Auth\AuthServiceProvider::class,
    Illuminate\Broadcasting\BroadcastServiceProvider::class,
    // ... 15+ more framework providers
    App\Providers\AppServiceProvider::class,
    // ...
]
```

**After:**
```php
'providers' => [
    // Only application providers needed
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    // ...
]
```

### 4. Frontend Build System

**Before:** Laravel Elixir with Gulp
```json
{
  "scripts": {
    "prod": "gulp --production",
    "dev": "gulp watch"
  }
}
```

**After:** Vite
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

### 5. Testing Structure

**Before:**
```php
// tests/TestCase.php
abstract class TestCase extends Illuminate\Foundation\Testing\TestCase {
    public function createApplication() { /* ... */ }
}

// tests/ExampleTest.php
class ExampleTest extends TestCase {
    public function testBasicExample() {
        $this->visit('/')->see('Laravel');
    }
}
```

**After:**
```php
// tests/TestCase.php
namespace Tests;
abstract class TestCase extends BaseTestCase {
    use CreatesApplication;
}

// tests/Feature/ExampleTest.php
namespace Tests\Feature;
class ExampleTest extends TestCase {
    public function test_the_application_returns_a_successful_response(): void {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
```

## Package Updates

### Core Packages
- `laravel/framework`: ^9.0 → ^12.0
- `laravel/socialite`: v5.5.2 → ^5.16
- `laravel/ui`: ^3.0 → ^4.5

### Testing
- `phpunit/phpunit`: ^9.0 → ^11.0
- `mockery/mockery`: 1.5.* → ^1.6

### Utilities
- `guzzlehttp/guzzle`: ^7.4.2 → ^7.9
- `nesbot/carbon`: ^2.37.0 → ^3.0
- `sentry/sentry-laravel`: ^2.12 → ^4.0

### Laravel Ecosystem
- `cviebrock/eloquent-sluggable`: ^9.0 → ^11.0
- `diglactic/laravel-breadcrumbs`: ^7.1 → ^9.0
- `laravelcollective/html`: ^6.0 → ^6.4
- `barryvdh/laravel-ide-helper`: ^2.12 → ^3.1

### Other Packages
- `artesaos/seotools`: ^0.22.0 → ^1.3
- `consoletvs/charts`: 6.* → ^6.8
- `socialiteproviders/*`: Updated to latest versions
- `intervention/imagecache`: Replaced with `intervention/image` ^3.0

## Breaking Changes

### Carbon 3.0
- Carbon is now version 3.x which has some breaking changes
- Most common date operations remain the same
- Check custom date handling code for compatibility

### PHPUnit 11
- New XML schema for `phpunit.xml`
- Removed deprecated assertions
- Test method names use snake_case convention

### Intervention Image 3.0
- Complete rewrite from version 2.x
- Different API and usage patterns
- Review all image manipulation code

## Installation Steps

1. **Update Dependencies:**
   ```bash
   composer update
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Update Environment File:**
   - Copy new variables from `.env.example` to `.env`
   - Add new Laravel 12 variables (APP_TIMEZONE, APP_MAINTENANCE_DRIVER, etc.)

4. **Clear All Caches:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   php artisan view:clear
   ```

5. **Run Migrations (if any):**
   ```bash
   php artisan migrate
   ```

6. **Build Assets:**
   ```bash
   npm run build
   ```

7. **Run Tests:**
   ```bash
   php artisan test
   ```

## Private Package Repositories

This application uses several private/custom package repositories:
- `n1c/phpquery`
- `wiledia/laravel-money`
- `wiledia/laravel-messenger`
- `wiledia/laravel-themes`
- `wiledia/laravel-searchy`
- `wiledia/backport`
- `laravel-shift/onesignal`

**Note:** You may need to authenticate with GitHub to access these repositories during `composer install/update`.

## Known Issues

1. **Intervention ImageCache:** Removed in favor of `intervention/image` v3. Custom image caching logic may need to be reimplemented.

2. **Spatie Cookie Consent:** Package may need updating or replacement as it's been archived by Spatie.

3. **Custom Packages:** Private packages (`wiledia/*`) need to be tested for Laravel 12 compatibility.

## Testing Checklist

After upgrade, test the following:

- [ ] Application boots without errors
- [ ] Authentication (login, register, password reset)
- [ ] Game listings and search
- [ ] User profiles
- [ ] Messaging system
- [ ] Image uploads and processing
- [ ] Payment processing
- [ ] Admin panel (Backport)
- [ ] API endpoints
- [ ] Socialite providers (Steam, Twitch, Battle.net)

## Rollback Plan

If issues occur:
1. Checkout the previous commit: `git checkout <previous-commit>`
2. Run `composer install` to restore old dependencies
3. Clear caches
4. Restore `.env` file from backup

## Resources

- [Laravel 12.x Official Upgrade Guide](https://laravel.com/docs/12.x/upgrade)
- [Laravel 11.x Upgrade Guide](https://laravel.com/docs/11.x/upgrade)
- [Laravel 10.x Upgrade Guide](https://laravel.com/docs/10.x/upgrade)
- [PHPUnit 11 Documentation](https://docs.phpunit.de/en/11.0/)
- [Vite Documentation](https://vitejs.dev/)

## Support

For issues specific to this upgrade, consult:
- Laravel official documentation
- Package-specific documentation
- GitHub issues for custom packages
