import { renderHook, act } from "@testing-library/react-hooks";
import {
	QueryClient,
	QueryClientProvider,
	useMutation,
} from "@tanstack/react-query";
import { useCreateOne } from "hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { Provider } from "react-redux";
import { store } from "state";
import { waitFor } from "@testing-library/react";

const server = setupServer(
	rest.post(
		"https://antilibrary-uat.deno.dev/create/persona", // assuming this is the correct endpoint for creating a persona
		async (req, res, ctx) => {
			return res(
				ctx.json({
					_id: "1",
					slug: "John Doe",
					name: "John Doe",
					imageUrls: ["image1", "image2"],
				})
			);
		}
	)
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("useCreateOne performs the mutation and returns data", async () => {
	const wrapper = ({ children }) => (
		<Provider store={store}>
			<QueryClientProvider
				client={
					new QueryClient({
						defaultOptions: {
							queries: {
								retry: false,
							},
						},
					})
				}
			>
				{children}
			</QueryClientProvider>
		</Provider>
	);
	const onCreateSuccess = jest.fn();
	const { result } = renderHook(() => useCreateOne({ onCreateSuccess }), {
		wrapper,
	});

	const entity = "persona"; // Replace this with a valid entity
	const body = { name: "John Doe", role: "Persona" }; // Replace this with valid data

	act(() => result.current.createOne({ entity, body }));

	await waitFor(() => {
		return result.current.isSuccess;
	});

	// Make sure the request status resolved to true
	expect(result.current.isSuccess).toBe(true);

	// Make sure the onCreateSuccess callback was called
	expect(onCreateSuccess).toHaveBeenCalledTimes(1);
	expect(onCreateSuccess).toHaveBeenCalledWith({
		_id: "1",
		slug: "John Doe",
		name: "John Doe",
		imageUrls: ["image1", "image2"],
	});
});
