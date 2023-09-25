import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../../services/public-holidays.service";


const YEAR = 2023;
const COUNTRY = 'GB';
const SHORT_HOLIDAY = {
	"date": "2023-09-21",
	"localName": "string",
	"name": "string",
}

describe("Public holidays service", () => {

	it("should get all holidays", async () => {
		const holidaysResponseBefore = await getListOfPublicHolidays(YEAR, COUNTRY);

		expect(holidaysResponseBefore).toBeInstanceOf(Array);

		const holidaysResponseAfter = await getListOfPublicHolidays(YEAR, COUNTRY);
		const responseKeys = Object.keys(holidaysResponseAfter[0]); 
		const expectedKeysKeys = Object.keys(SHORT_HOLIDAY); 

		expect(holidaysResponseAfter.length).toBe(holidaysResponseBefore.length);
		
		expect(responseKeys).toEqual(expect.arrayContaining(expectedKeysKeys));
		expect(holidaysResponseAfter[0]).toEqual(expect.objectContaining({
			date: expect.any(String),
			localName: expect.any(String),
			name: expect.any(String)
		}));
	});


	it('all holidays should throw error for wrong county', async () => {
		await expect(getListOfPublicHolidays(YEAR, "wrong")).rejects.toThrow(`Country provided is not supported, received: wrong`);
	});

	it('all holidays should throw error for wrong year', async () => {
		await expect(getListOfPublicHolidays(1000, COUNTRY)).rejects.toThrow(`Year provided not the current, received: 1000`);
	});

	it('check today should throw error for wrong county', async () => {
		await expect(checkIfTodayIsPublicHoliday("wrong")).rejects.toThrow(`Country provided is not supported, received: wrong`);
	});

	it("check today should return boolean", async () => {
		const todayResponce = await checkIfTodayIsPublicHoliday(COUNTRY);
		expect(typeof todayResponce === 'boolean').toBeTruthy();
	});

	it('next holidays should throw error for wrong county', async () => {
		await expect(getNextPublicHolidays("wrong")).rejects.toThrow(`Country provided is not supported, received: wrong`);
	});

	it("should get next holidays", async () => {
		const holidaysResponseBefore = await getNextPublicHolidays(COUNTRY);

		expect(holidaysResponseBefore).toBeInstanceOf(Array);

		const holidaysResponseAfter = await getNextPublicHolidays(COUNTRY);
		const responseKeys = Object.keys(holidaysResponseAfter[0]); 
		const expectedKeysKeys = Object.keys(SHORT_HOLIDAY); 

		expect(holidaysResponseAfter.length).toBe(holidaysResponseBefore.length);
		
		expect(responseKeys).toEqual(expect.arrayContaining(expectedKeysKeys));
		expect(holidaysResponseAfter[0]).toEqual(expect.objectContaining({
			date: expect.any(String),
			localName: expect.any(String),
			name: expect.any(String)
		}));
	});
});
