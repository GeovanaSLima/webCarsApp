import { render } from '@testing-library/react-native';
import App from "../../../App";

describe("App Component Tests", () => {
  
  it("should test render App Component", () => {
    const { getByText } = render(<App/>);

    getByText("Home");
  });

});