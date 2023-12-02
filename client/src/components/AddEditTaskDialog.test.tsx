import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import {AddEditTaskDialog} from "./AddEditTaskDialog"
import { BrowserRouter } from 'react-router-dom'

test("Renders the AddEditTaskDialog page", () => {
    render(
        <BrowserRouter>
            <AddEditTaskDialog 
                onSubmit={jest.fn()}
                open={true}
                setOpen={jest.fn()}
                task={{}}
            />
        </BrowserRouter>
    )
    expect(true).toBeTruthy()
})