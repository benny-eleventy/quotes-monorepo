import { useQuery } from "@tanstack/react-query";

import { getPersonas } from "apis";

function usePersonas() {
	return useQuery({
		queryKey: ["personas"],
		queryFn: getPersonas,
	});
}

export { usePersonas };
