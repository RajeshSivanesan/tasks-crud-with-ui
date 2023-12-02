import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Home from "./Home"
import { BrowserRouter } from 'react-router-dom'

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the Home page", () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(true).toBeTruthy()
})