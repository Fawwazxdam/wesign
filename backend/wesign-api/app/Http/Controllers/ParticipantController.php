<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ParticipantController extends Controller
{
    public function register(Request $request, Event $event): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'institution' => 'nullable|string|max:255',
            ]);

            $participant = DB::transaction(function () use ($event, $validated) {
                return $event->participants()->create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'] ?? null,
                    'institution' => $validated['institution'] ?? null,
                    'qr_code' => 'WS-' . $event->id . '-' . strtoupper(Str::random(10)),
                    'status' => 'registered',
                ]);
            });

            return response()->json([
                'message' => 'Pendaftaran berhasil',
                'data' => $participant,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Pendaftaran gagal',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function showByQrCode(string $qr_code): JsonResponse
    {
        $participant = Participant::with('event')->where('qr_code', $qr_code)->first();

        if (!$participant) {
            return response()->json([
                'message' => 'Tiket tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'data' => $participant,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Participant $participant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        //
    }
}
