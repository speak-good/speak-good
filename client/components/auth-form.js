import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div id="auth-form">
        <form id="small-auth-form" onSubmit={handleSubmit} name={name}>
          <div>
            {displayName === 'Sign Up' ? (
              <div id="signup-no-margin">
                <div>
                  <label htmlFor="firstName">
                    <h5 className="auth-form-text">First Name</h5>
                  </label>
                  <input
                    className="input-stretch"
                    name="firstName"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="lastName">
                    <h5 className="auth-form-text">Last Name</h5>
                  </label>
                  <input
                    className="input-stretch"
                    name="lastName"
                    type="text"
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            <div id="email-flex">
              <div>
                <label htmlFor="email">
                  <h5 className="auth-form-text">Email</h5>
                </label>
                <input className="input-stretch" name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <h5 className="auth-form-text">Password</h5>
                </label>
                <input
                  className="input-stretch"
                  name="password"
                  type="password"
                />
              </div>

              <div id="auth-button-center">
                <button id="auth-button" type="submit">
                  {displayName}
                </button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </div>
            <form method="get" action="/auth/google">
              <div className="google-oauth">
                <button type="submit" id="google-oauth-button">
                  {displayName} with Google
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      console.log(formName)
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
