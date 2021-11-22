//import states JSON Object:
const states = require("../data/states.js");

/* filters clinics given from paramters by name, given
by paramters.
@return => returns filtered items,
with both vet and dental clinic
json objects differing key names.
@params =>
json the json given to filter out the clinics.
name: the name used to filter.
*/

const filterByName = (json, name) => {
	return json.filter((item) => {
		//for each item, check the name of the clinic. vet => clinicName, dental => name.
		if (item.clinicName) {
			//ignore Capitalization when we match by using toUpperCase();
			return item.clinicName.toUpperCase().includes(name.toUpperCase());
		} else {
			return item.name.toUpperCase().includes(name.toUpperCase());
		}
	});
};

/* filters clinics given from paramters by State, given
by paramters.
@return => 
returns filtered items,
with both vet and dental clinic
json objects differing key names.
(vets => stateCode, dental => stateName)
@params =>
json: the json given to filter out the clinics.
state: the state  used to filter.
*/
const filterByState = (json, state) => {
	//Check if the state is abbreviated:
	if (state.length === 2) {
		//check if the abbreviation is within our states:
		if (state in states.states) {
			//convert the abbreviation to the fullName, then filter:
			strState = states.states[state];
			return json.filter((item) => {
				if (item.stateName === strState) {
					return true;
				}
			});
		}
	} else {
		//filter with the fullName:
		return json.filter((item) => {
			if (item.stateName === state) {
				return true;
			}
		});
	}
};

/* filters clinics given from paramters by Availability, given
by paramters.
@return => 
returns filtered items,
with both vet and dental clinic
json objects differing key names.
(vets => opening, dental => availability)
@params =>
json: the json given to filter out the clinics.
time: the time used to filter.
*/
const filterByTime = (json, time) => {
	//conver the string time to a float to compare:
	const timeToDecimal = (time) => {
		let arr = time.split(":");
		let dec = parseInt((arr[1] / 6) * 10, 10);

		return parseFloat(
			parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec
		);
	};

	return json.filter((item) => {
		//Check if the item has availability or not:

		if (item.availability) {
			if (
				timeToDecimal(item.availability.from) <= timeToDecimal(time) &&
				timeToDecimal(time) <= timeToDecimal(item.availability.to)
			) {
				return true;
			}
		} else {
			//We are assuming that the we will always have correctly entered JSON.
			if (
				timeToDecimal(item.opening.from) <= timeToDecimal(time) &&
				timeToDecimal(time) <= timeToDecimal(item.opening.to)
			) {
				return true;
			}
		}
	});
};

/*
Export functions over to use in index.js
*/
module.exports.filterByName = filterByName;
module.exports.filterByState = filterByState;
module.exports.filterByTime = filterByTime;
