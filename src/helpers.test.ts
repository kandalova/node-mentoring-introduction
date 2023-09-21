import { validateInput, shortenPublicHoliday } from "./helpers";
import { SUPPORTED_COUNTRIES } from './config';


describe("Validate input", ()=>{
	jest.mock('./config', () => ({ SUPPORTED_COUNTRIES: ['GB']}));

	test("should return true", ()=>{
		const input = {
			year: 2023,
			country: 'GB'
		}
		const validateInputResponse = validateInput(input);
		expect(validateInputResponse).toBeTruthy();
	});

	test("should return true without country", ()=>{
		const input = {
			year: 2023,
		}
		const validateInputResponse = validateInput(input);
		expect(validateInputResponse).toBeTruthy();
	});

	test("should return true without year", ()=>{
		const input = {
			country: 'GB'
		}
		const validateInputResponse = validateInput(input);
		expect(validateInputResponse).toBeTruthy();
	});

	test("should throw country error", ()=>{
		const input = {
			year: 2023,
			country: 'wrong'
		}
		expect(() => validateInput(input)).toThrow(`Country provided is not supported, received: ${input.country}`);
	});

	test("should throw year error", ()=>{
		const input = {
			year: 2022,
			country: 'GB'
		}
		expect(()=>validateInput(input)).toThrow(`Year provided not the current, received: ${input.year}`);
	});

	afterAll(()=>{
		jest.clearAllMocks();
	})
});

describe("Get shorten Public Holiday", ()=>{
	test("should return short object", ()=>{
		const holiday = {
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
		const shortHoliday = shortenPublicHoliday(holiday);
		expect(shortHoliday).toEqual({
			date: "123",
			localName: "loclanme",
			name: "name",
		});
	})
	afterAll(()=>{
		jest.clearAllMocks();
	})
})