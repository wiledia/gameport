<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperListingImage
 */
class ListingImage extends Model
{
    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'listing_images';

    protected $primaryKey = 'id';

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'default'    => 'boolean',
        'listing_id' => 'integer',
        'order'      => 'integer',
        'user_id'    => 'integer',
    ];

    protected $appends = ['thumbnail'];
    // public $timestamps = false;
    // protected $guarded = ['id'];
    // protected $fillable = ['name'];
    // protected $hidden = [];
    // protected $dates = [];

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function listing()
    {
        return $this->belongsTo('App\Models\Listing');
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS
    |--------------------------------------------------------------------------
    */

    /*
    |
    | Get Thumbnail
    |
    */
    public function getThumbnailAttribute()
    {
        return url('images/avatar_square/'.$this->filename);
    }

    /*
    |
    | Get URL
    |
    */
    public function getUrlAttribute()
    {
        return url('images/picture/'.$this->filename);
    }

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */
}
