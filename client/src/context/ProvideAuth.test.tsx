import '@testing-library/jest-dom'
import { useContext, useEffect } from 'react';
import { render } from "@testing-library/react"
import {ProvideAuth, AuthContext} from "./ProvideAuth"

test("Renders the ProvideAuth", () => {
    function TestComponent() {
        const { setAuth } = useContext(AuthContext) as any;

        useEffect(( ) => {
            setAuth('testing');
        }, []);

        return (
            <div>Testing</div>
        ) 
    }

    render(
        <ProvideAuth>
            <TestComponent />
        </ProvideAuth>
    )
    expect(true).toBeTruthy()
})