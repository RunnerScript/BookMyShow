import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter";
describe("Counter Component", () => {
    //When first page render, count should be 0
    test("renders intial count of 0", () => {
        render(<Counter />);
        const counterElement = screen.getByText('Counter:0');
        expect(counterElement).toBeInTheDocument();
    });

    //when counter is incremented by 1
    test("increment test: counter value should be change to 1", () => {
        render(<Counter />);
        const counterElement = screen.getByText('Counter:0');
        expect(counterElement).toBeInTheDocument();

        //getting a button from screen
        const incButton = screen.getByText('Increment');
        fireEvent.click(incButton);
        fireEvent.click(incButton);

        //check the state of counter should be 1 or not
        const updatedCounterText = screen.getByText('Counter:2');
        expect(updatedCounterText).toBeInTheDocument();

    });

    test("decrement test:counter value should change to -1", () => {
        render(<Counter />);
        const counterText = screen.getByText("Counter:0");
        expect(counterText).toBeInTheDocument();

        //get the decrement button from screen
        const decButton = screen.getByText('Decrement');
        fireEvent.click(decButton);

        //check for the updated counter value should be -1 after decrement button click
        const updatedCounterText = screen.getByText('Counter:-1');
        expect(updatedCounterText).toBeInTheDocument();

    });

    test('reset test: after reset click counter should be 0', () => {
        render(<Counter />);
        const incButton = screen.getByText('Increment');
        fireEvent.click(incButton);
        fireEvent.click(incButton);
        fireEvent.click(incButton);
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        const updatedCounterText = screen.getByText('Counter:0');
        expect(updatedCounterText).toBeInTheDocument();
    });

});