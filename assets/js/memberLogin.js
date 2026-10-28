import {auth} from './firebase-config.js'
import {findMember} from './memberRoster.js'
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const MEMBERS_PAGE = 'members.html'
const STORAGE_KEY = 'emailForSignIn'

function showMessage(el, text, isError) {
  el.textContent = text
  el.classList.toggle('is-error', Boolean(isError))
  el.hidden = false
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('member-login-form')
  const emailInput = document.getElementById('member-login-email')
  const submitButton = document.getElementById('member-login-submit')
  const messageEl = document.getElementById('member-login-message')

  async function completeSignIn(email) {
    try {
      await signInWithEmailLink(auth, email, window.location.href)
      window.localStorage.removeItem(STORAGE_KEY)
      window.location.href = MEMBERS_PAGE
    } catch (error) {
      console.error('Member sign-in link error:', error)
      showMessage(
        messageEl,
        'That link is invalid or has expired. Please request a new one below.',
        true,
      )
    }
  }

  // Returning from the emailed link: complete sign-in instead of showing the
  // normal "send me a link" form.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const storedEmail = window.localStorage.getItem(STORAGE_KEY)
    if (storedEmail) {
      completeSignIn(storedEmail)
    } else {
      // Link was opened on a different device/browser than it was requested
      // from — ask the member to confirm their email before finishing sign-in.
      form.dataset.mode = 'confirm'
      showMessage(messageEl, 'Confirm your email to finish signing in.', false)
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = emailInput.value.trim()
    if (!email) return

    submitButton.disabled = true

    if (form.dataset.mode === 'confirm') {
      await completeSignIn(email)
      submitButton.disabled = false
      return
    }

    try {
      const member = await findMember(email)
      if (!member || member.status !== 'active') {
        showMessage(
          messageEl,
          "We couldn't find an active membership for that email.",
          true,
        )
        return
      }

      window.localStorage.setItem(STORAGE_KEY, email)
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      })
      showMessage(messageEl, 'Check your email for a sign-in link.', false)
    } catch (error) {
      console.error('Member login error:', error)
      showMessage(messageEl, 'Something went wrong. Please try again.', true)
    } finally {
      submitButton.disabled = false
    }
  })
})
