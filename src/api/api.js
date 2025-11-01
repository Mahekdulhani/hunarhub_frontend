import axios from 'axios'

// Single API module for all HTTP communication
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

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
  const { data } = await client.post(`/admin/trainers/${trainerId}/approve`)
  return data
}

export async function rejectTrainer(trainerId) {
  const { data } = await client.post(`/admin/trainers/${trainerId}/reject`)
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

export default { login, register, verifyOtp, getCurrentUser, getDashboard, setAuthToken, bootstrapAuth, getPendingTrainers, approveTrainer, rejectTrainer, getStudents, getTrainers }


