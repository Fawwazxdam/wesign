<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Participant extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'participants';
    protected $fillable = [
        'event_id',
        'name',
        'email',
        'phone',
        'institution',
        'qr_code',
        'status',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function checkIns()
    {
        return $this->hasMany(CheckIn::class);
    }
}
