import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Index from "./"

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<Index />)
    expect(true).toBeTruthy()
})