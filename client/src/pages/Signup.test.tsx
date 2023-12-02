import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Signup from "./Signup"
import { BrowserRouter } from 'react-router-dom'

test("Renders the Signup page", () => {
    render(<BrowserRouter><Signup /></BrowserRouter>)
    expect(true).toBeTruthy()
})