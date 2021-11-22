const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const axios = require("axios");
const res = require("express/lib/response");
const filters = require("./utils/filter.js");
const { all } = require("express/lib/application");

const medical_url =
	"https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
const vet_url =
	"https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";

const getMedicalClinic = () => {
	return axios.get(medical_url);
};

const getVetClinic = () => {
	return axios.get(vet_url);
};

const returnFilteredClinics = (json, args) => {
	if (args[0] === "filterByName") {
		return filters.filterByName(json, args[1]);
	}
	if (args[0] === "filterByState") {
		return filters.filterByState(json, args[1]);
	}
	if (args[0] === "filterByTime") {
		return filters.filterByTime(json, args[1]);
	}
};

app.get("/", (req, res) => {
	const getAllClinics = async () => {
		return await axios.all([getMedicalClinic(), getVetClinic()]).then(
			axios.spread((...responses) => {
				const medResponse = responses[0].data;
				const vetResponse = responses[1].data;
				const clinics = medResponse.concat(vetResponse);
				const args = process.argv.slice(2);
				const filteredClinics = returnFilteredClinics(clinics, args);
				res.send(JSON.stringify(filteredClinics, null, 4));
			})
		);
	};
	getAllClinics();
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
