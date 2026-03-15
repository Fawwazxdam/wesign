import apiClient from '../client'

export const eventsApi = {
  // Get all events (index)
  getAll(params = {}) {
    return apiClient.get('/events', { params })
  },

  // Create new event
  create(data) {
    return apiClient.post('/events', data)
  },

  // Get single event by ID
  getById(id) {
    return apiClient.get(`/events/${id}`)
  },

  // Update event
  update(id, data) {
    return apiClient.put(`/events/${id}`, data)
  },

  // Delete event
  delete(id) {
    return apiClient.delete(`/events/${id}`)
  },

  // PUBLIC: Get event by slug (untuk tamu)
  getBySlug(slug) {
    return apiClient.get(`/events/${slug}`)
  },
  
  // PUBLIC: Register participant
  registerParticipant(eventId, data) {
    return apiClient.post(`/events/${eventId}/register`, data)
  },

  // Duplicate event
  duplicate(id) {
    return apiClient.post(`/events/${id}/duplicate`)
  },

  // Toggle event status (publish/draft)
  toggleStatus(id) {
    return apiClient.patch(`/events/${id}/toggle`)
  }
}