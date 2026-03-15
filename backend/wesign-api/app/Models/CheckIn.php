<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CheckIn extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'check_ins';
    protected $fillable = [
        'participant_id',
        'checked_in_at',
        'scanner_ip',
    ];

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
