import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";

import { useGetAllAPI } from "apis";
import { Entities, setAppData, useGlobalState } from "state";

function useGetAll({ entity }: { entity: Entities }) {
	const { apiDetails, appData } = useGlobalState();

	const dispatch = useDispatch();

	const getAll = useGetAllAPI();

	const page = appData[entity].pagination.currentPage;

	const { data, status, error, isLoading, isError, isSuccess } = useQuery({
		queryKey: [entity, page],
		queryFn: () => getAll({ entity, page }),
		enabled: !!apiDetails,
	});

	React.useEffect(() => {
		if (data) {
			dispatch(setAppData({ entity, data }));
			//TODO: Error handling to be performed here - Global Error Handling
		}
	}, [data, entity]);

	return { data, status, error, isLoading, isError, isSuccess };
}

export { useGetAll };
