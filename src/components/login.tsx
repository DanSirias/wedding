import type { FormEvent } from "react"
import { Amplify } from "aws-amplify"
import { signIn } from "aws-amplify/auth"
import outputs from "../../src/amplifyconfiguration.json"

Amplify.configure(outputs)

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements
}

export const Login = () => {
  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault()
    const form = event.currentTarget
    // ... validate inputs
    await signIn({
      username: form.elements.email.value,
      password: form.elements.password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <input type="submit" />
    </form>
  )
};
