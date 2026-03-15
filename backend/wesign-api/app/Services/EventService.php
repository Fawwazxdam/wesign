<?php

namespace App\Services;

use App\Models\Event;

class EventService extends Service
{
    public function getEvents($params = [])
    {
        $query = Event::query();

        if (!empty($params['name'])) {
            $query->where('name', 'like', '%' . $params['name'] . '%');
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function getEvent($eventId)
    {
        return Event::findOrFail($eventId);
    }

    public function createEvent($data)
    {
        return Event::create($data);
    }

    public function updateEvent($eventId, $data)
    {
        return Event::where('id', $eventId)->update($data);
    }

    public function deleteEvent($eventId)
    {
        return Event::where('id', $eventId)->delete();
    }
}
