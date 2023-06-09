import { s, Text } from "@bennyui/core";
import React from "react";

interface InputBoxProps {
	value: string | number | undefined;
	name: string;
	onChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder: string;
	isError: boolean;
	errorMessage?: string;
}

const InputBox = ({
	value,
	name,
	onChange,
	placeholder,
	isError,
	errorMessage,
}: InputBoxProps) => {
	return (
		<>
			<s.InputText
				type="text"
				name={name}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				style={{
					width: "100%",
					border: "1px solid rgba(255,255,255,0.4)",
					color: "lightblue",
					padding: "1rem",
				}}
			/>
			{isError && (
				<Text alignSelf="start" color="#FAA0A0" fontSize="1rem">
					{errorMessage}
				</Text>
			)}
		</>
	);
};

export default InputBox;
