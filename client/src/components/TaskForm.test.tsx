import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import TaskForm from "./TaskForm"
import { BrowserRouter } from 'react-router-dom'

test("Renders the TaskForm page", () => {
    render(
        <BrowserRouter>
            <TaskForm 
                onSubmit={jest.fn()}
                task={{ title: '', description: '', completed: false, priority: 'HIGH', id: '' }}
            />
        </BrowserRouter>
    )
    expect(true).toBeTruthy()
})