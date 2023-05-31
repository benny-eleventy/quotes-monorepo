import axios from "axios";

const instance = axios.create({
	baseURL: "https://antilibrary-uat.deno.dev", // replace with your actual base URL
	// any other settings
});

export default instance;
