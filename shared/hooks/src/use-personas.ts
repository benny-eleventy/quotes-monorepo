import { useQuery } from "@tanstack/react-query";

import { getPersonas } from "apis";

function usePersonas() {
	console.log("usePersonas");
	return useQuery({
		queryKey: ["personas"],
		queryFn: getPersonas,
	});
}

export { usePersonas };
