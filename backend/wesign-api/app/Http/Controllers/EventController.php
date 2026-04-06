<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\Request;

class EventController extends Controller
{
    protected EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $params = $request->only(['name']);
            $events = $this->eventService->getEvents($params);

            return response()->json([
                'message' => 'success',
                'data' => EventResource::collection($events),
                'status' => 200,
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => 'Failed to retrieve events',
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'location' => 'required|string|max:255',
                'status' => 'nullable|string|max:50',
                'description' => 'nullable|string',
            ]);
            $data['user_id'] = auth()->id() ?? '1';

            $event = $this->eventService->createEvent($data);

            return response()->json([
                'message' => 'Event created successfully',
                'data' => new EventResource($event),
                'status' => 201,
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => 'Failed to create event',
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        try {
            // Eager load participants for detail view
            $event->load('participants');
            
            return response()->json([
                'message' => 'Event retrieved successfully',
                'data' => new EventResource($event),
                'status' => 200,
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => 'Failed to retrieve event',
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        try {
            $data = $request->validate([
                'title' => 'sometimes|string|max:255',
                'date' => 'sometimes|date',
                'location' => 'sometimes|string|max:255',
                'status' => 'sometimes|string|max:50',
                'description' => 'nullable|string',
            ]);

            $this->eventService->updateEvent($event->id, $data);

            return response()->json([
                'message' => 'Event updated successfully',
                'data' => new EventResource($event->fresh()),
                'status' => 200,
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => 'Failed to update event',
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        try {
            $this->eventService->deleteEvent($event->id);

            return response()->json([
                'message' => 'Event deleted successfully',
                'status' => 200,
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => 'Failed to delete event',
                'error' => $err->getMessage(),
            ], 500);
        }
    }
}
