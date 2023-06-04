import { useGlobalState } from "state";

const Quotes = () => {
	const {
		appData: { quotes },
	} = useGlobalState();
	return (
		<div>
			{quotes.map((quote) => {
				return (
					<div key={quote.id}>
						<h3>{quote.quote}</h3>
						<p>{quote.author}</p>
					</div>
				);
			})}
			;
		</div>
	);
};

export default Quotes;
