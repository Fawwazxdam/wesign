export class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export function handleApiError(error) {
  if (error.response) {
    // Server merespon dengan error
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        return new ApiError(data.message || 'Bad Request', status, data.errors)
      case 401:
        return new ApiError('Unauthorized', status)
      case 403:
        return new ApiError('Forbidden', status)
      case 404:
        return new ApiError('Not Found', status)
      case 422:
        return new ApiError('Validation Error', status, data.errors)
      default:
        return new ApiError(data.message || 'Server Error', status)
    }
  } else if (error.request) {
    // Request dikirim tapi no response
    return new ApiError('Network Error', 0)
  } else {
    // Something else
    return new ApiError(error.message, -1)
  }
}