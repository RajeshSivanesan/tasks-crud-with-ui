import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import AlertDialog from "./AlertDialog"
import { BrowserRouter } from 'react-router-dom'

test("Renders the AlertDialog page", () => {
    render(
        <BrowserRouter>
            <AlertDialog 
                alertBody='testing'
                alertTitle='testing'
                alertYesAction={jest.fn()}
                closeAlert={jest.fn()}
                openAlert={true}
            />
        </BrowserRouter>
    )
    expect(true).toBeTruthy()
})