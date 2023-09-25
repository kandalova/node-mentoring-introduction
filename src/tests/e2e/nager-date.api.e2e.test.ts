import request from 'supertest';
import 'expect-more-jest';

const PUBLIC_HOLIDAYS_API_URL = 'https://date.nager.at/api/v3';

describe("Date Nager API", ()=>{
	describe("/PublicHolidays", ()=>{
		test("Should return 200 and array of holidays", async ()=>{
			const url = `/PublicHolidays/${2023}/${"GB"}`;
			const {status, body} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect(status).toEqual(200);
			body.forEach((holiday:any)=>{
				expect(holiday).toEqual({
					date: expect.any(String),
					localName: expect.toBeNullableOf(expect.any(String)),
					name: expect.toBeNullableOf(expect.any(String)),
					countryCode: expect.toBeNullableOf(expect.any(String)),
					fixed: expect.any(Boolean),
					global: expect.any(Boolean),
					counties: expect.toBeNullableOf(expect.toBeArrayOfStrings()),
					launchYear: expect.toBeNullableOf(expect.any(Number)),
					types: expect.toBeNullableOf(expect.toBeArrayOfStrings()),
				})
			});
		});
		test("Should return 404 code",async () => {
			const url = `/PublicHolidays/${2023}/${"wrong"}`;
			const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect(status).toEqual(404);
		});
		test("Should return 400 code",async () => {
			const url = `/PublicHolidays/${202}/${"GB"}`;
			const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect(status).toEqual(400);
		})
	});

	describe("/IsTodayPublicHoliday", ()=>{
		test("Should return 200 or 204", async ()=>{
			const url = `/IsTodayPublicHoliday/GB`;
			const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect([200, 204]).toContain(status);
		});
		test("Should return 200 or 204 with offset query", async ()=>{
			const url = `/IsTodayPublicHoliday/GB/?offset=4`;
			const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect([200, 204]).toContain(status);
		});
		test("Should return 404 code",async () => {
			const url = `/PublicHolidays/wrong`;
			const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect(status).toEqual(404);
		});
		test("Should return 400 code",async () => {
			const url = `/PublicHolidays/202/GB`;
			const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(url);
			expect(status).toEqual(400);
		})
	})
})
