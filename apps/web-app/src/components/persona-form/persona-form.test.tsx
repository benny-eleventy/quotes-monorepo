import { fireEvent, render } from "../../../tests/test-utils";
import { PersonaForm } from "./persona-form";

describe("PersonaForm", () => {
	it("renders without crashing", () => {
		const { container } = render(<PersonaForm />);
		expect(container).toBeInTheDocument();
	});

	it("renders input fields", async () => {
		const { getByPlaceholderText, getByText } = render(<PersonaForm />);
		expect(getByPlaceholderText("Name")).toBeInTheDocument();
		expect(getByPlaceholderText("imageUrl")).toBeInTheDocument();
		expect(getByPlaceholderText("Role")).toBeInTheDocument();

		fireEvent.change(getByPlaceholderText("Name"), {
			target: { value: "Test Name" },
		});

		fireEvent.change(getByPlaceholderText("Role"), {
			target: { value: "Test Role" },
		});

		expect(getByPlaceholderText("Name")).toHaveValue("Test Name");
		expect(getByPlaceholderText("Role")).toHaveValue("Test Role");

		const submitButton = getByText("Submit");
		expect(submitButton).toBeInTheDocument();
	});
});
