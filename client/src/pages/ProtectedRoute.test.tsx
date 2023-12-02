import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import {ProtectedRoute} from "./ProtectedRoute"
import { ProvideAuth } from '../context/ProvideAuth'
import { BrowserRouter } from 'react-router-dom'

test("Renders the ProtectedRoute page", () => {
    render(<BrowserRouter><ProvideAuth><ProtectedRoute /></ProvideAuth></BrowserRouter>)
    expect(true).toBeTruthy()
})