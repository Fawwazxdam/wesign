<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'user_id' => 1,
                'title' => 'Tech Conference 2026',
                'date' => '2026-04-15 09:00:00',
                'location' => 'Jakarta Convention Center',
                'status' => 'active',
                'description' => 'Annual technology conference featuring the latest innovations in software development.',
            ],
            [
                'user_id' => 1,
                'title' => 'Workshop PHP Laravel',
                'date' => '2026-05-20 13:00:00',
                'location' => 'Bandung Digital Hub',
                'status' => 'active',
                'description' => 'Hands-on workshop learning Laravel framework from basics to advanced.',
            ],
            [
                'user_id' => 1,
                'title' => 'Meetup Developer Community',
                'date' => '2026-06-10 18:00:00',
                'location' => 'Coworking Space Surabaya',
                'status' => 'active',
                'description' => 'Monthly meetup for developers to share knowledge and network.',
            ],
            [
                'user_id' => 1,
                'title' => 'Hackathon Weekend',
                'date' => '2026-07-25 08:00:00',
                'location' => 'Tech Park Yogyakarta',
                'status' => 'upcoming',
                'description' => '48-hour hackathon competition with exciting prizes for innovative solutions.',
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
