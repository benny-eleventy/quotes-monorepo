import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "apis";

function useQuotes() {
	return useQuery({
		queryKey: ["quotes"],
		queryFn: getQuotes,
	});
}

export { useQuotes };
