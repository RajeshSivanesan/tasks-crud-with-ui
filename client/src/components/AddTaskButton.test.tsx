import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import {AddTaskButton} from "./AddTaskButton"
import { BrowserRouter } from 'react-router-dom'

test("Renders the AddTaskButton page", () => {
    render(
        <BrowserRouter>
            <AddTaskButton 
                onAdd={jest.fn()}
            />
        </BrowserRouter>
    )
    expect(true).toBeTruthy()
})