import { validateInput, shortenPublicHoliday } from "../../helpers";
import { SUPPORTED_COUNTRIES } from '../../config';

const HOLIDAY = {
	date: "123",
	localName: "loclanme",
	name: "name",
	countryCode: "code",
	fixed: true,
	global: true,
	counties: null,
	launchYear: null,
	types: ["1", "3"],
}

const SHORT_HOLIDAY = {
	date: "123",
	localName: "loclanme",
	name: "name",
}

const YEAR = 2023;
const COUNTRY = "GB";

describe("Validate input", ()=>{
	jest.mock('../../config', () => ({ SUPPORTED_COUNTRIES: ['GB']}));

	test("should return true", ()=>{
		const validateInputResponse = validateInput({year: YEAR, country: COUNTRY});
		expect(validateInputResponse).toBeTruthy();
	});

	test("should return true without country", ()=>{
		const validateInputResponse = validateInput({year: YEAR});
		expect(validateInputResponse).toBeTruthy();
	});

	test("should return true without year", ()=>{
		const validateInputResponse = validateInput({country: COUNTRY});
		expect(validateInputResponse).toBeTruthy();
	});

	test("should throw country error", ()=>{
		const country = 'wrong';
		expect(() => validateInput({year: YEAR, country})).toThrow(`Country provided is not supported, received: ${country}`);
	});

	test("should throw year error", ()=>{
		const year = 2022;
		expect(()=>validateInput({year, country: COUNTRY})).toThrow(`Year provided not the current, received: ${year}`);
	});

	afterEach(()=>{
		jest.clearAllMocks();
	})
});

describe("Get shorten Public Holiday", ()=>{
	test("should return short object", ()=>{
		
		const shortHoliday = shortenPublicHoliday(HOLIDAY);
		expect(shortHoliday).toEqual(SHORT_HOLIDAY);
	})
	afterEach(()=>{
		jest.clearAllMocks();
	})
})
