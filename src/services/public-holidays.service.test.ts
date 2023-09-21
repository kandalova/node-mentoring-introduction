import axios from 'axios';
import * as helpers from '../helpers';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';



const INPUT = {
	year: 2023,
	country: 'GB'
}

const MOCKED_HOLYDAYS = [
  {
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
]

const SHORT_HOLIDAYS = [
  {
    "date": "2023-09-21",
    "localName": "string",
    "name": "string",
  }
]

describe("Get list of public holidays", ()=>{
	it("Should return array of short holidays", async ()=>{
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCKED_HOLYDAYS }));
		
		//this imported method is used inside getListOfPublicHolidays 
		//Should I spy, mock it or not?
		// jest.spyOn(helpers, "validateInput").mockImplementation(()=>true);
		// jest.spyOn(helpers, "shortenPublicHoliday").withImplementation;

		const holidaysResponse = await getListOfPublicHolidays(INPUT.year, INPUT.country);
		expect(holidaysResponse).toEqual(SHORT_HOLIDAYS);
	});

	it("Should call API with proper args", async ()=>{
		jest.mock('../config', () => ({ PUBLIC_HOLIDAYS_API_URL: "https://api.genderize.io"}));
		const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCKED_HOLYDAYS }));
		await getListOfPublicHolidays(INPUT.year, INPUT.country);
		expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${INPUT.year}/${INPUT.country}`,);
	});

	it("Should return empty error",async () => {
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('api error')));
		const holidaysResponse = await getListOfPublicHolidays(INPUT.year, INPUT.country);
		expect(holidaysResponse).toEqual([]);
	});

	//I checked these throws for validation function
	// Should I also check it here?
	it("Should throw year error",async () => {
		await expect(getListOfPublicHolidays(2022, INPUT.country)).rejects.toThrowError(`Year provided not the current, received: ${2022}`)
	});

	it("Should throw country  error",async () => {
		await expect(getListOfPublicHolidays(2022, INPUT.country)).rejects.toThrowError(`Year provided not the current, received: ${2022}`)
	});

	afterEach(()=>{
		jest.clearAllMocks();
	})
});

describe("Today is public holiday", ()=>{
	it("Should return true", async()=>{
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status:200 }));
		const todayResponce = await checkIfTodayIsPublicHoliday(INPUT.country);
		expect(todayResponce).toBeTruthy();
	});

	it("Should call API with proper args", async ()=>{
		jest.mock('../config', () => ({ PUBLIC_HOLIDAYS_API_URL: "https://api.genderize.io"}));
		const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status:200 }));
		await checkIfTodayIsPublicHoliday(INPUT.country);
		expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${INPUT.country}`,);
	});

	it("Should return false from response", async()=>{
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status:500 }));
		const todayResponce = await checkIfTodayIsPublicHoliday(INPUT.country);
		expect(todayResponce).toBeFalsy();
	});

	it("Should return false from error", async()=>{
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
		const todayResponce = await checkIfTodayIsPublicHoliday(INPUT.country);
		expect(todayResponce).toBeFalsy();
	});
	
	afterEach(()=>{
		jest.clearAllMocks();
	})
});

describe("Get next public holidays", ()=>{
	it("Should return array of short holidays",async () => {
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCKED_HOLYDAYS }));
		const holidaysResponse = await getNextPublicHolidays(INPUT.country);
		expect(holidaysResponse).toEqual(SHORT_HOLIDAYS);		
	});

	it("Should call API with proper args", async ()=>{
		jest.mock('../config', () => ({ PUBLIC_HOLIDAYS_API_URL: "https://api.genderize.io"}));
		const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: MOCKED_HOLYDAYS}));
		await getNextPublicHolidays(INPUT.country);
		expect(axiosSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${INPUT.country}`,);
	});

	it("Should return empty error",async () => {
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('api error')));
		const holidaysResponse = await getNextPublicHolidays(INPUT.country);
		expect(holidaysResponse).toEqual([]);
	});
})