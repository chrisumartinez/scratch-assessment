const states = require("../data/states.js");

const filterByName = (json, name) => {
	return json.filter((item) => {
		if (item.clinicName) {
			return item.clinicName.toUpperCase().includes(name.toUpperCase());
		} else {
			return item.name.toUpperCase().includes(name.toUpperCase());
		}
	});
};

const filterByState = (json, state) => {
	if (state.length === 2) {
		if (state in states.states) {
			strState = states.states[state];
			return json.filter((item) => {
				if (item.stateName === strState) {
					return true;
				}
			});
		}
	} else {
		return json.filter((item) => {
			if (item.stateName === state) {
				return true;
			}
		});
	}
};

const filterByTime = (json, time) => {
	const timeToDecimal = (time) => {
		let arr = time.split(":");
		let dec = parseInt((arr[1] / 6) * 10, 10);

		return parseFloat(
			parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec
		);
	};

	return json.filter((item) => {
		if (item.availability) {
			if (
				timeToDecimal(item.availability.from) <= timeToDecimal(time) &&
				timeToDecimal(time) <= timeToDecimal(item.availability.to)
			) {
				return true;
			}
		} else {
			if (
				timeToDecimal(item.opening.from) <= timeToDecimal(time) &&
				timeToDecimal(time) <= timeToDecimal(item.opening.to)
			) {
				return true;
			}
		}
	});
};

module.exports.filterByName = filterByName;
module.exports.filterByState = filterByState;
module.exports.filterByTime = filterByTime;
