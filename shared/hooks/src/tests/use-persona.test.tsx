import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePersonas } from "../use-personas";
import React from "react";
import { Provider } from "react-redux";
import { store } from "state";
import { useGetAll } from "../use-get-all";

const server = setupServer(
	rest.post(
		"https://antilibrary-uat.deno.dev/get/personas",
		async (req, res, ctx) => {
			// Parse the request body as JSON

			return res(
				ctx.json({
					results: [
						{
							_id: "1",
							slug: "John Doe",
							name: "John Doe",
							imageUrls: ["image1", "image2"],
						},
					],
					status: "success",
					metaData: {
						database: "db",
						pagination: {
							from: 1,
							to: 1,
							totalPages: 1,
							totalCount: 1,
							currentPage: "1",
							currentCount: 1,
						},
					},
				})
			);
		}
	)
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("usePersonas performs the query and returns data", async () => {
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

	const { result } = renderHook(
		() =>
			useGetAll({
				entity: "personas",
			}),
		{ wrapper }
	);
	console.log(result.current);

	await waitFor(() => expect(result.current.isSuccess).toBe(true));

	expect(result.current.data).toEqual({
		metaData: {
			database: "db",
			pagination: {
				currentCount: 1,
				currentPage: "1",
				from: 1,
				to: 1,
				totalCount: 1,
				totalPages: 1,
			},
		},
		results: [
			{
				_id: "1",
				imageUrls: ["image1", "image2"],
				name: "John Doe",
				slug: "John Doe",
			},
		],
		status: "success",
	});
});
