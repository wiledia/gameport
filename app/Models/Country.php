<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperCountry
 */
class Country extends Model
{
    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'countries';

    protected $primaryKey = 'id';

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'depth'     => 'integer',
        'lft'       => 'integer',
        'parent_id' => 'integer',
        'rgt'       => 'integer',
    ];

    // public $timestamps = false;
    // protected $guarded = ['id'];
    protected $fillable = ['name', 'code', 'native'];
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
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */

    /*
    |
    | Get Name with cover and release year for backend
    |
    */
    public function getNameAdmin()
    {
        return '<div class="user-block">
					<img class="img-circle" src="'.asset('img/flags/'.$this->code.'.svg').'" alt="User Image">
					<span class="username">'.$this->name.'</span>
				</div>';
    }
}
