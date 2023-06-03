import { useQuery } from "@tanstack/react-query";

import { useGetPersonas } from "apis";
import { useGlobalState } from "state";

function usePersonas() {
	const { apiDetails } = useGlobalState();
	const getPersonas = useGetPersonas();
	return useQuery({
		queryKey: ["personas"],
		queryFn: () => getPersonas(),
		enabled: !!apiDetails,
	});
}

export { usePersonas };
