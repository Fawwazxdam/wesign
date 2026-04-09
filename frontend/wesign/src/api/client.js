// Fetch-based API client with interceptor support

const baseURL = import.meta.env.VITE_API_BASE_URL + '/api'
const timeout = 10000

// Interceptor storage
let requestInterceptors = []
let responseInterceptors = []

// Request interceptor functions
export function addRequestInterceptor(onFulfilled, onRejected) {
    requestInterceptors.push({ onFulfilled, onRejected })
}

// Response interceptor functions  
export function addResponseInterceptor(onFulfilled, onRejected) {
    responseInterceptors.push({ onFulfilled, onRejected })
}

// Execute request interceptors
async function executeRequestInterceptors(config) {
    let modifiedConfig = { ...config }
    
    for (const interceptor of requestInterceptors) {
        try {
            const result = await interceptor.onFulfilled(modifiedConfig)
            modifiedConfig = result || modifiedConfig
        } catch (error) {
            if (interceptor.onRejected) {
                return await interceptor.onRejected(error)
            }
            throw error
        }
    }
    
    return modifiedConfig
}

// Execute response interceptors
async function executeResponseInterceptors(response) {
    let modifiedResponse = response
    
    for (const interceptor of responseInterceptors) {
        try {
            const result = await interceptor.onFulfilled(modifiedResponse)
            modifiedResponse = result || modifiedResponse
        } catch (error) {
            if (interceptor.onRejected) {
                return await interceptor.onRejected(error)
            }
            throw error
        }
    }
    
    return modifiedResponse
}

// Main fetch function
async function fetchWithInterceptors(url, options = {}) {
    // Build config from options
    const config = {
        url,
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body,
        params: options.params,
    }
    
    // Apply request interceptors
    const modifiedConfig = await executeRequestInterceptors(config)
    
    // Build fetch URL with params
    let fetchUrl = baseURL + modifiedConfig.url
    
    // Add query params for GET requests (cache busting)
    if (modifiedConfig.method === 'GET') {
        const params = { 
            ...modifiedConfig.params, 
            _t: Date.now() 
        }
        const searchParams = new URLSearchParams(params)
        fetchUrl += '?' + searchParams.toString()
    }
    
    // Build fetch options
    const fetchOptions = {
        method: modifiedConfig.method,
        headers: { ...modifiedConfig.headers },
    }
    
    // Add body for non-GET requests
    if (modifiedConfig.body && modifiedConfig.method !== 'GET') {
        if (modifiedConfig.body instanceof FormData) {
            fetchOptions.body = modifiedConfig.body
        } else {
            fetchOptions.body = JSON.stringify(modifiedConfig.body)
            fetchOptions.headers['Content-Type'] = 'application/json'
        }
    }
    
    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    fetchOptions.signal = controller.signal
    
    try {
        const response = await fetch(fetchUrl, fetchOptions)
        clearTimeout(timeoutId)
        
        // Parse response
        let responseData
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json()
        } else {
            responseData = await response.text()
        }
        
        // Build response object similar to axios
        const responseObj = {
            data: responseData,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: modifiedConfig,
        }
        
        // Handle error responses
        if (!response.ok) {
            const error = new Error('Request failed')
            error.response = responseObj
            error.config = modifiedConfig
            error.request = { response: null }
            
            // Execute response interceptors for error
            try {
                return await executeResponseInterceptors(error)
            } catch (interceptedError) {
                throw interceptedError
            }
        }
        
        // Execute response interceptors for success
        return await executeResponseInterceptors(responseObj)
        
    } catch (error) {
        clearTimeout(timeoutId)
        
        if (error.name === 'AbortError') {
            const timeoutError = new Error('Request timeout')
            timeoutError.code = 'ECONNABORTED'
            throw timeoutError
        }
        
        // Network errors
        const networkError = new Error(error.message || 'Network error')
        networkError.request = { response: null }
        throw networkError
    }
}

// API client methods
const apiClient = {
    get(url, config = {}) {
        return fetchWithInterceptors(url, { 
            method: 'GET', 
            ...config 
        })
    },
    
    post(url, data, config = {}) {
        return fetchWithInterceptors(url, { 
            method: 'POST', 
            body: data,
            ...config 
        })
    },
    
    put(url, data, config = {}) {
        return fetchWithInterceptors(url, { 
            method: 'PUT', 
            body: data,
            ...config 
        })
    },
    
    patch(url, data, config = {}) {
        return fetchWithInterceptors(url, { 
            method: 'PATCH', 
            body: data,
            ...config 
        })
    },
    
    delete(url, config = {}) {
        return fetchWithInterceptors(url, { 
            method: 'DELETE', 
            ...config 
        })
    }
}

export default apiClient