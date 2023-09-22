import axios from 'axios';
import * as helpers from '../../helpers';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../../services/public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../../config';

jest.mock('../../config', () => ({ PUBLIC_HOLIDAYS_API_URL: "https://api.genderize.io" }));

const YEAR = 2023;
const COUNTRY = 'GB';

const MOCKED_HOLYDAY = {
	"date": "2023-09-21",
	"localName": "string",
	"name": "string",
	"countryCode": "string",
	"fixed": true,
	"global": true,
	"counties": [
		"GB"
	],
	"launchYear": 0,
	"types": [
		"Public"
	]
}

const SHORT_HOLIDAY = {
	"date": "2023-09-21",
	"localName": "string",
	"name": "string",
}


describe("Get list of public holidays", () => {
	it("Should return array of short holidays", async () => {
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [MOCKED_HOLYDAY] }));
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		const shortenSpy = jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);

		const holidaysResponse = await getListOfPublicHolidays(YEAR, COUNTRY);

		expect(shortenSpy).toHaveBeenCalledWith(MOCKED_HOLYDAY);
		expect(holidaysResponse).toHaveLength(1);
		expect(holidaysResponse[0]).toEqual(SHORT_HOLIDAY);
	});

	it("Should call API with proper args", async () => {
		const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve());
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);

		await getListOfPublicHolidays(YEAR, COUNTRY);

		expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${YEAR}/${COUNTRY}`,);
	});

	it("Should return empty array", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('api error')));

		const holidaysResponse = await getListOfPublicHolidays(YEAR, COUNTRY);

		expect(holidaysResponse).toHaveLength(0);
		expect(holidaysResponse).toEqual([]);
	});

	it("Should throw validation error", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => { throw new Error(`Validation error`) });
		jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('api error')));

		await expect(getListOfPublicHolidays(YEAR, COUNTRY)).rejects.toThrowError(`Validation error`);
	});

	afterEach(() => {
		jest.clearAllMocks();
	})
});

describe("Today is public holiday", () => {
	it("Should return true", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

		const todayResponce = await checkIfTodayIsPublicHoliday(COUNTRY);

		expect(todayResponce).toBeTruthy();
	});

	it("Should call API with proper args", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

		await checkIfTodayIsPublicHoliday(COUNTRY);

		expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${COUNTRY}`,);
	});

	it("Should return false from response", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 500 }));

		const todayResponce = await checkIfTodayIsPublicHoliday(COUNTRY);

		expect(todayResponce).toBeFalsy();
	});

	it("Should return false from error", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

		const todayResponce = await checkIfTodayIsPublicHoliday(COUNTRY);

		expect(todayResponce).toBeFalsy();
	});

	it("Should throw validation error", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => { throw new Error(`Validation error`) });
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

		await expect(checkIfTodayIsPublicHoliday(COUNTRY)).rejects.toThrowError(`Validation error`);
	});

	afterEach(() => {
		jest.clearAllMocks();
	})
});

describe("Get next public holidays", () => {
	it("Should return array of short holidays", async () => {
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [MOCKED_HOLYDAY] }));
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		const shortenSpy = jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);

		const holidaysResponse = await getNextPublicHolidays(COUNTRY);

		expect(shortenSpy).toHaveBeenCalledWith(MOCKED_HOLYDAY);
		expect(holidaysResponse).toHaveLength(1);
		expect(holidaysResponse[0]).toEqual(SHORT_HOLIDAY);
	});

	it("Should call API with proper args", async () => {
		const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve());
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);

		await getNextPublicHolidays(COUNTRY);

		expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${COUNTRY}`,);
	});

	it("Should return empty array", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => true);
		jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('api error')));

		const holidaysResponse = await getNextPublicHolidays(COUNTRY);

		expect(holidaysResponse).toHaveLength(0);
		expect(holidaysResponse).toEqual([]);
	});

	it("Should throw validation error", async () => {
		jest.spyOn(helpers, "validateInput").mockImplementation(() => { throw new Error(`Validation error`) });
		jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(() => SHORT_HOLIDAY);
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('api error')));

		await expect(getNextPublicHolidays(COUNTRY)).rejects.toThrowError(`Validation error`);
	});

	afterEach(() => {
		jest.clearAllMocks();
	})
})
