import { fireEvent, render, waitFor } from "../../../tests/test-utils";
import { PersonaForm } from "./persona-form";
import { setupServer } from "msw/node";
import { rest } from "msw";
import App from "../../App";

const server = setupServer(
	rest.post(
		"https://antilibrary-uat.deno.dev/create/persona",
		async (req, res, ctx) => {
			// Check the request body to determine which response to return
			const requestBody = await req.json();
			if (requestBody.name === "error") {
				// Return an error response
				return res(ctx.status(500), ctx.json({ error: "An error occurred" }));
			} else {
				// Return a success response
				return res(
					ctx.json({
						results: {
							created: {
								result: "6481d0eedaa9db2226aacd58",
								displayOnFrontEnd: false,
								slug: "tags",
								createdAt: "2023-06-08T13:00:30.017Z",
								updatedAt: "2023-06-08T13:00:30.017Z",
								role: "Persona",
								name: "Tags",
								imageUrls: [],
								_id: "6481d0eedaa9db2226aacd58",
							},
						},
						status: "success",
					})
				);
			}
		}
	)
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PersonaForm", () => {
	it("renders without crashing", () => {
		const { container } = render(<PersonaForm />);
		expect(container).toBeInTheDocument();
	});

	it("renders input fields - Displays validation error message", async () => {
		const { getByPlaceholderText, getByText } = render(<PersonaForm />);

		fireEvent.change(getByPlaceholderText("Name"), {
			target: { value: "" },
		});

		fireEvent.change(getByPlaceholderText("Role"), {
			target: { value: "" },
		});

		const submitButton = getByText("Submit");
		submitButton.click();

		await waitFor(() => {
			expect(getByText("Name must be at least 3 characters long")).toBeTruthy();
		});
	});

	it("renders input fields - Displays Success tooltip", async () => {
		const { getByPlaceholderText, getByText } = render(<App />);

		fireEvent.change(getByPlaceholderText("Name"), {
			target: { value: "Testing Name" },
		});

		fireEvent.change(getByPlaceholderText("Role"), {
			target: { value: "Persona" },
		});

		const submitButton = getByText("Submit");
		submitButton.click();

		await waitFor(() => {
			expect(getByText("Persona created successfully")).toBeTruthy();
		});
	});
});
