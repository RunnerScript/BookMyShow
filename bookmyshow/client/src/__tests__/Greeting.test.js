import { render, screen } from "@testing-library/react";
import Greeting from "../components/Greetings";
// render takes the React component as an argument and render it in to a vertual dom. 

//when a name prop is not provided 
test('test when name prop is not provided', () => {
    //render a greeting component without name prop
    render(<Greeting />)
    const greetingElement = screen.getByText((content) =>
        content.includes("Hello,") && content.includes("How are you doing.")
    );
    console.log(greetingElement);
    expect(greetingElement).toBeInTheDocument();
});


//when a name "Sai" provided
test("test when name is provided", () => {
    render(<Greeting name='sai' />);
    const greetingElement = screen.getByText((content) => {
        return content.includes('sai') && content.includes("How are you doing.");
    })
});
// test("test when name prop is provided", () => {
//     render(<Greeting name='Sai' />);
//     const greetingElement = screen.findByText("Hello Sai, How are you doing.");
//     expect(greetingElement).toBeInTheDocument();
// });