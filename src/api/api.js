import axios from 'axios'

// Single API module for all HTTP communication
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
// 'https://dextrosinistral-hector-secondly.ngrok-free.dev'
// const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dextrosinistral-hector-secondly.ngrok-free.dev/api'

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

client.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Request failed'
    return Promise.reject(new Error(message))
  },
)

export async function login(payload) {
  // payload: { email, password }
  const { data } = await client.post('/login/admin', payload)
  if (data?.token) setAuthToken(data.token)
  return data
}

export async function register(payload) {
  // payload should already be transformed to API contract
  const { data } = await client.post('/register/admin', payload)
  return data
}

export async function verifyOtp(payload) {
  // payload: { email, otp }
  const { data } = await client.post('/verify-otp', payload)
  return data
}
// export async function fetchPendingCourses() {
// const { data } = await client.get("/admin/pending-courses");
// return data;
// }


export async function fetchPendingCourses() {
  try {
    const response = await fetch(`${baseURL}/admin/pending-courses`, {
      method: 'GET',
      headers: {\
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}
export async function approveCourses(courseId) {
const { data } = await client.post(`/admin/approve/${courseId}`);
return data;
}


// 🔹 Reject course
export async function rejectCourses(courseId) {
const { data } = await client.post(`/admin/reject/${courseId}`);
return data;
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('hh_token', token)
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('hh_token')
    delete client.defaults.headers.common['Authorization']
  }
}

export function bootstrapAuth() {
  const token = localStorage.getItem('hh_token')
  if (token) setAuthToken(token)
}

export async function getCurrentUser() {
  const { data } = await client.get('/user/profile')
  return data
}

export async function getDashboard() {
  const { data } = await client.get('/admin/dashboard')
  return data
}

export async function getPendingTrainers() {
  const { data } = await client.get('/admin/pending-trainer-profiles')
  return data
}

export async function approveTrainer(trainerId) {
  const { data } = await client.post(`/admin/approve-trainer-profile/${trainerId}`)
  return data
}

export async function rejectTrainer(trainerId) {
  const payload = { "reason" : "not real"}
  const { data } = await client.post(`admin/reject-trainer-profile/${trainerId}`,payload)
  return data
}

export async function getStudents() {
  const { data } = await client.get('/admin/students')
  return data
}

export async function getTrainers() {
  const { data } = await client.get('/admin/trainers')
  return data
}
/**
 * Fetch all courses with optional status filter
 * @param {string} [status] - Filter courses by status (pending, approved, rejected)
 * @returns {Promise<Array>} Promise with array of courses
 */
export async function fetchCourses(status) {
  try {
    const queryParams = status ? `?status=${status}` : '';
    const response = await fetch(`${baseURL}/courses${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

/**
 * Fetch detailed information for a specific course
 * @param {string} courseId - The ID of the course to fetch
 * @returns {Promise<Object>} Promise with course detail data
 */
export async function fetchCourseDetail(courseId) {
  try {
    const response = await fetch(`${baseURL}/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch course details');
    }
  } catch (error) {
    console.error('Error fetching course detail:', error);
    throw error;
  }
}

/**
 * Approve a course
 * @param {string} courseId - The ID of the course to approve
 * @returns {Promise<Object>} Promise with updated course data
 */
export async function approveCourse(courseId) {
  try {
    const response = await fetch(`${baseURL}/courses/${courseId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        status: 'approved',
        approvedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to approve course');
    }
  } catch (error) {
    console.error('Error approving course:', error);
    throw error;
  }
}

/**
 * Reject/Decline a course
 * @param {string} courseId - The ID of the course to reject
 * @param {string} [reason] - Optional reason for rejection
 * @returns {Promise<Object>} Promise with updated course data
 */
export async function rejectCourse(courseId, reason) {
  try {
    const response = await fetch(`${baseURL}/courses/${courseId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        rejectionReason: reason || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to reject course');
    }
  } catch (error) {
    console.error('Error rejecting course:', error);
    throw error;
  }
}

/**
 * Fetch pending courses only (helper function)
 * @returns {Promise<Array>} Promise with array of pending courses
 */
// export async function fetchPendingCourses() {
//   return fetchCourses('pending');
// }

/**
 * Fetch approved courses only (helper function)
 * @returns {Promise<Array>} Promise with array of approved courses
 */
export async function fetchApprovedCourses() {
  return fetchCourses('approved');
}

/**
 * Fetch rejected courses only (helper function)
 * @returns {Promise<Array>} Promise with array of rejected courses
 */
export async function fetchRejectedCourses() {
  return fetchCourses('rejected');
}

/**
 * Get auth token from localStorage
 * @returns {string} Auth token string or empty string
 */
function getAuthToken() {
  // Replace this with your actual auth token retrieval logic
  return localStorage.getItem('authToken') || '';
}

// ============================================
// EXAMPLE USAGE IN COMPONENTS:
// ============================================

/*
import { fetchCourses, fetchCourseDetail, approveCourse, rejectCourse } from '../services/courseApi';

// In your component:

// Fetch all courses
const courses = await fetchCourses();

// Fetch pending courses only
const pendingCourses = await fetchPendingCourses();

// Fetch course details
const courseDetail = await fetchCourseDetail('course-id-123');

// Approve a course
const approvedCourse = await approveCourse('course-id-123');

// Reject a course with reason
const rejectedCourse = await rejectCourse('course-id-123', 'Does not meet quality standards');
*/

export default { login, register, verifyOtp, getCurrentUser, getDashboard, setAuthToken, bootstrapAuth, getPendingTrainers, approveTrainer, rejectTrainer, getStudents, getTrainers }


