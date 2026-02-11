<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\Frontend\Auth\ConfirmAccountController;
use App\Http\Controllers\Frontend\Auth\ForgotPasswordController;
use App\Http\Controllers\Frontend\Auth\LoginController;
use App\Http\Controllers\Frontend\Auth\RegisterController;
use App\Http\Controllers\Frontend\Auth\ResetPasswordController;
use App\Http\Controllers\Frontend\Auth\SocialLoginController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\API\MetacriticController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// Startpage
Route::get('/', [PageController::class, 'startpage'])->name('index');

/*
 * These routes require no user to be logged in
 */
Route::group(['middleware' => 'guest', 'as' => 'frontend.auth.'], function () {
    // Authentication Routes
    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginController::class, 'login'])->name('login.post');

    // Socialite Routes
    Route::get('login/{provider}', [SocialLoginController::class, 'login'])->name('social.login');

    // Confirm Account Routes
    Route::get('account/confirm/{token}', [ConfirmAccountController::class, 'confirm'])->name('account.confirm');
    Route::get('account/confirm/resend/{user}', [ConfirmAccountController::class, 'sendConfirmationEmail'])->name('account.confirm.resend');

    // Password Reset Routes
    Route::get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.forget.reset');
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');

    Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset.form');
    Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.reset');
});

/*
 * These routes require the user to be logged in
 */

// Game Routes
Route::group(['prefix' => 'games'], function () {
    Route::get('/', [GameController::class, 'index'])->middleware('contentlength')->name('games');
    Route::get('add', [GameController::class, 'add'])->middleware('auth');
    Route::post('add/{json?}', [GameController::class, 'addgame']);
    Route::get('search', function () {
        return view('frontend.game.search');
    });
    Route::get('{slug}', [GameController::class, 'show'])->name('game');
    Route::get('{id}/media', [GameController::class, 'showMedia']);
    Route::get('{id}/trade', [GameController::class, 'showTrade']);
    Route::get('search/json/{value}', [GameController::class, 'searchJson']);
    Route::post('api/search', [GameController::class, 'searchApi']);
    Route::get('order/{sort}/{desc?}', [GameController::class, 'order'])->middleware('contentlength');

    // Wishlist
    Route::post('{slug}/wishlist/add', [WishlistController::class, 'add']);
    Route::post('{slug}/wishlist/update', [WishlistController::class, 'update']);
    Route::get('{slug}/wishlist/delete', [WishlistController::class, 'delete']);

    // Admin quick actions
    Route::get('{game_id}/refresh/metacritic', [GameController::class, 'refresh_metacritic'])->middleware('permission:edit_games');
    Route::post('change/giantbomb', [GameController::class, 'change_giantbomb'])->middleware('permission:edit_games');
});
Route::get('search/{value}', [GameController::class, 'search'])->name('search');

// Listing Routes
Route::group(['prefix' => 'listings'], function () {
    Route::get('', [ListingController::class, 'index'])->middleware('contentlength')->name('listings');
    Route::get('add', [ListingController::class, 'add'])->middleware('auth');
    Route::post('add', [ListingController::class, 'store'])->middleware('auth');
    Route::post('edit', [ListingController::class, 'edit'])->middleware('auth');
    Route::post('delete', [ListingController::class, 'delete'])->middleware('auth');
    Route::get('{slug}/edit', [ListingController::class, 'editForm'])->middleware('auth');
    Route::get('{slug}/add', [ListingController::class, 'gameForm'])->middleware('auth');
    Route::get('{slug}', [ListingController::class, 'selectIndex'])->middleware('contentlength')->name('listing');
    Route::get('{id}/images', [ListingController::class, 'images'])->name('listing.images');
    Route::post('{id}/images/sort', [ListingController::class, 'imagesSort'])->name('listing.images.sort');
    Route::post('{id}/images/upload', [ListingController::class, 'imagesUpload'])->name('listing.images.upload');
    Route::post('images/upload', [ListingController::class, 'imagesUpload']);
    Route::post('{id}/images/remove', [ListingController::class, 'imagesRemove'])->name('listing.images.remove');
    Route::get('order/{sort}/{desc?}', [ListingController::class, 'order']);
    Route::post('filter', [ListingController::class, 'filter'])->middleware('contentlength');
    Route::get('filter/remove', [ListingController::class, 'filterRemove'])->middleware('contentlength');
});

// Offer Routes
Route::middleware('auth')->prefix('offer')->as('frontend.offer.')->group(function () {
    Route::post('add', [OfferController::class, 'add']);
    Route::post('accept', [OfferController::class, 'accept']);
    Route::post('decline', [OfferController::class, 'decline']);
    Route::post('rating', [OfferController::class, 'rate']);
    Route::post('delete', [OfferController::class, 'delete']);
    Route::get('{offer}', [OfferController::class, 'show'])
         ->withTrashed()
         ->name('show');
    Route::post('message', [OfferController::class, 'newMessage']);
    Route::post('report', [OfferController::class, 'report']);

    // Payment routes
    Route::get('{offer}/pay', [OfferController::class, 'pay'])
         ->withTrashed()
         ->name('pay');
    Route::post('pay/balance', [OfferController::class, 'payBalance'])
         ->name('pay.balance');
    Route::get('{offer}/pay/cancel', [OfferController::class, 'payCancel'])
         ->withTrashed()
         ->name('pay.cancel');
    Route::get('{offer}/pay/success', [OfferController::class, 'paySuccess'])
         ->withTrashed()
         ->name('pay.success');
    Route::get('{offer}/pay/refund', [OfferController::class, 'payRefund'])
         ->middleware('can:edit_payments')
         ->withTrashed()
         ->name('pay.refund');
    Route::get('{offer}/pay/release', [OfferController::class, 'payRelease'])
         ->middleware('can:edit_payments')
         ->withTrashed()
         ->name('pay.release');
    Route::get('{id}/transaction', [OfferController::class, 'transaction'])
         ->name('transaction');

    // Stripe routes
    Route::get('{offer}/pay/stripe/success/{token?}', [OfferController::class, 'payStripe'])
         ->withTrashed()
         ->name('pay.stripe.success');

    // Offer Admin Report Routes
    Route::group(['prefix' => 'admin', 'as' => 'frontend.offer.admin.', 'middleware' => ['permission:edit_offers']], function () {
        Route::get('report/{report}', [OfferController::class, 'reportShow'])->name('report.show');
        Route::get('report/close/{offer}', [OfferController::class, 'reportClose'])->name('report.close');
        Route::get('{offer}/ban/{user}', [OfferController::class, 'reportBan'])->name('ban');
        Route::get('{offer}/close/{reopen?}', [OfferController::class, 'reportOfferClose'])->name('close');
        Route::get('{offer}/revoke/{rating}', [OfferController::class, 'reportRevoke'])->name('rating.revoke');

        // Rating Admin Route
        Route::get('rating/{id}', [OfferController::class, 'ratingShow'])->name('rating.show');
    });
});
Route::get('/ajaxchat/{demand_id}', [OfferController::class, 'chatOverview']);

// User Routes
Route::get('/user/{slug}', [UserController::class, 'show'])->name('profile');
Route::post('/user/push/{func}', [UserController::class, 'push']);
Route::get('/user/search/json/{value}', [UserController::class, 'searchJson']);

// Logout Route
Route::get('logout', [LoginController::class, 'logout'])->middleware('auth')->name('logout');
// Registration Route
Route::post('register', [RegisterController::class, 'register'])->name('register');

// Dashboard Routes
Route::group(['prefix' => 'dash', 'middleware' => 'auth'], function () {
    Route::get('', [UserController::class, 'dashboard'])->name('frontend.dash');
    Route::get('notifications', [UserController::class, 'notifications']);
    Route::post('notifications/read', [UserController::class, 'notificationsRead']);
    Route::get('notifications/read/all', [UserController::class, 'notificationsReadAll']);
    Route::get('listings', [UserController::class, 'listings']);
    Route::get('listings/{sort?}', [UserController::class, 'listings']);
    Route::get('offers', [UserController::class, 'offers']);
    Route::get('offers/{sort?}', [UserController::class, 'offers']);
    Route::get('wishlist', [WishlistController::class, 'index']);
    Route::get('settings', [UserController::class, 'settingsForm']);
    Route::post('settings', [UserController::class, 'settingsSave'])->name('dashboard.settings');
    Route::get('settings/password', [UserController::class, 'passwordForm']);
    Route::post('settings/password', [UserController::class, 'changePassword']);
    Route::post('settings/location', [UserController::class, 'locationSave']);
    Route::get('notifications/api', [UserController::class, 'notificationsApi']);

    // Dashboard payment
    Route::get('balance', [UserController::class, 'balance']);
    Route::get('balance/withdrawal', [UserController::class, 'withdrawal']);
    Route::post('balance/withdrawal/{method?}', [UserController::class, 'addWithdrawal']);
});

// Metacritic API Routes
Route::get('metacritic/search/{type}', [MetacriticController::class, 'search']);
Route::get('metacritic/find/{type}', [MetacriticController::class, 'find']);
Route::get('metacritic/details', [MetacriticController::class, 'details']);

// Switch between the included languages
Route::get('lang/{lang}', [LanguageController::class, 'swap']);

// Switch between themes
Route::get('theme/{lang}', [ThemeController::class, 'swap']);

// Contact form
Route::post('contact', [PageController::class, 'contact']);

// SEO Routes
Route::get('sitemap', [SeoController::class, 'sitemapIndex']);
Route::get('sitemap/listings', [SeoController::class, 'sitemapListings']);
Route::get('sitemap/games', [SeoController::class, 'sitemapGames']);
Route::get('opensearch.xml', [SeoController::class, 'openSearch'])->name('opensearch');
Route::get('robots.txt', [SeoController::class, 'robots'])->name('robots');

// Post route for guest geo location
Route::post('geolocation/save', [UserController::class, 'guestGeoLocation']);

// Comment Routes
Route::group(['prefix' => 'comments'], function () {
    Route::get('show/{type}/{type_id}', [CommentController::class, 'show']);
    Route::get('likes/{id}', [CommentController::class, 'likes']);
    Route::post('new', [CommentController::class, 'post'])->middleware('auth');
    Route::post('new/reply', [CommentController::class, 'postReply'])->middleware('auth');
    Route::post('like', [CommentController::class, 'like'])->middleware('auth');
    Route::get('delete/{id}/{page}', [CommentController::class, 'delete'])->middleware('auth');
});

Route::get('blog', [PageController::class, 'blog'])->name('blog');
Route::get('blog/{slug}', [PageController::class, 'article'])->name('article');

Route::middleware('auth')->prefix('messages')->group(function () {
    Route::get('/', ['as' => 'messages', 'uses' => [MessageController::class, 'index']]);
    Route::get('create', ['as' => 'messages.create', 'uses' => [MessageController::class, 'create']]);
    Route::post('/', ['as' => 'messages.store', 'uses' => [MessageController::class, 'store']]);
    Route::get('{id}', ['as' => 'messages.show', 'uses' => [MessageController::class, 'show']])->middleware('contentlength');
    Route::post('{id}', ['as' => 'messages.update', 'uses' => [MessageController::class, 'update']]);
    Route::get('{id}/check', ['as' => 'messages.check', 'uses' => [MessageController::class, 'check']]);
});

// CATCH-ALL ROUTE for PageManager
Route::get('page/{page}/{subs?}', ['uses' => [PageController::class, 'index']])
    ->where(['page' => '^((?!admin).)*$', 'subs' => '.*'])->name('page');
