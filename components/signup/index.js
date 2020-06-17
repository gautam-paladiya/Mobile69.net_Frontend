import { useRouter } from 'next/router'
import { useState } from 'react'
import Message from '../message'
import {
  setToken,
  setProfile,
  setIsAuthenticated
} from '../../utils/AuthService '
import catchError from '../../utils/catchError'
import { AxiosInstance } from '../../utils/Helper'

export default function SignupComponent (props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log(name)
    const data = { name, email, password }

    setLoading(true)
    setError('')

    AxiosInstance.post('/auth/register', data)
      .then(res => {
        console.log(res)

        if (res.status == 200 && res.data.user) {
          setProfile(res.data.user)
          setToken(res.data.user.password)
          setIsAuthenticated(true)
          router.replace('/')
        } else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.dir(err)
        setError(catchError(err))
        console.dir(error)

      })
      .then(() => {
        setLoading(false)
      })
  }

  return (
    <div className='d-flex align-items-center min-vh-100 py-3 py-md-0 login'>
      <div className='container'>
        <div className='card login-card'>
          <div className='row no-gutters'>
            <div className='col-md-5'>
              <img
                src='/img/signup.webp'
                alt='Signup image'
                className='login-card-img'
              />
            </div>
            <div className='close'>
              <img
              alt='close'
                src='/svg/close.svg'
                width={25}
                height={25}
                onClick={() => router.replace('/')}
              />
            </div>
            <div className='col-md-7'>
              <div className='card-body'>
                <div className='brand-wrapper'>
                  <img
                    src='/img/logo.png'
                    alt={process.env.NAME_SPACE}
                    className='logo'
                    onClick={() => router.replace('/')}
                  />
                </div>
                <div className='login-wrapper my-auto'>
                  <h1 className='login-title'>Sign up</h1>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        className='form-control'
                        placeholder='Enter your name'
                        value={name}
                        onChange={event => setName(event.target.value)}
                        required
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        className='form-control'
                        placeholder='email@example.com'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                      />
                    </div>
                    <div className='form-group mb-4'>
                      <label htmlFor='password'>Password</label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        className='form-control'
                        placeholder='enter your passsword'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                      />
                    </div>
                    <button
                      name='login'
                      id='login'
                      className='btn btn-block login-btn'
                      type='submit'
                      value='Sign up'
                    >
                      {!loading ? (
                        'Signup'
                      ) : (
                        <div>
                          <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                          ></span>{' '}
                          Loading...
                        </div>
                      )}
                    </button>
                  </form>
                  {error && <Message success={false} message={error} />}
                  <p className='login-wrapper-footer-text'>
                    Have an account?{' '}
                    <button
                      onClick={() => router.replace('/login')}
                      className='btn btn-link'
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
