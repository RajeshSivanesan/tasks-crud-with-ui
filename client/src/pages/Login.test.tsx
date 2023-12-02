import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Login from "./Login"
import { BrowserRouter } from 'react-router-dom'

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the Login page", () => {
    render(<BrowserRouter><Login /></BrowserRouter>)
    expect(true).toBeTruthy()
})