# Scratch Software Engineer Challenge

## Table of Contents

-   [Challenge](#Challenge)
-   [Conditions](#Conditions)
-   [Assumptions](#Assumptions)
-   [Future Features](#Future)

## Challenge

The objective of this challenge is to call some endpoints containing a list of clinics and perform some actions on the result.

Create one RESTful API endpoint to allow search in multiple clinic providers and display results from all the available clinics by any of the following:

Clinic Name
State [ex: "CA" or "California"]
Availability [ex: from:09:00, to:20:00]

This is including search by multiple criteria in the same time like search by state and availability together.
Note: We need only one endpoint to search for all clinics.

## Conditions

-   The challenge must be solved in NodeJS.
-   Do not use any database or any full text search engines.
-   Write full test using any test suite.
-   If you make any assumptions, mention them clearly in the readme file.

## Assumptions

-   When we fetch the data from the API, we are assuming that the data is correctly organized.
-   If we want data filtered, we must pass in arguments to filter the clinics. For Example, to pull the clinics in California, our command will be this:

```javascript
node index.js filterByState CA
// or by full name:
node index.js filterByState California
```

-   For the above command, we must also assume that the user spelled his parameters correctly. Future implmentations would sanitize the input given by the user.
-   Assuming that the user would want to include multiple filters, the command will be so:

```javascript
node index.js filterByState CA filterByName Medical
//or by time:
node index.js filterByTime 09:00 filterByState Kansas
```

-   Unfortunately, I was not able to implement multiple filters. A future implementation would be seen below.

## Future Features

A couple of implementations were not added to this code.

• Multiple Filters:

I was not able to finish implementing multiple filters. To check for multiple filters, we would first sanitize the input to make sure we have valid arguments. I would then pull the arguments from `process.argv.slice[2]` (I don't need node index.js). I would check the arguments what filters are called, and and perform if-then logic to filter out objects by both filters.

• Testing:

I was not able to test the code to an extent. To debug, i would run `console.log()` to check for output, use `typeof` to see the types of my variables.

In the future, I would use Jest to monitor the behavior of my code. Something for unit testing would be:

```javascript
describe("something truthy and falsy", () => {
	test("true to be true", () => {
		expect(true).toBeTruthy();
	});
	test("false to be false", () => {
		expect(false).toBeFalsy();
	});
});
```

Or for more integrated testing, something like:

```javascript
jest.mock(axios);

test("Pull Data using filters filterByState"),
	async () => {
		const promise = Promise.resolve({
			data: {
				hits: clinics,
			},
		});

		axios.get.mockImplementationOnce(() => promise);
		await act(() => promise);
	};

// Where Clinics would be an object already declared in the test page with test data
```

And expecting if the data would succeed.
