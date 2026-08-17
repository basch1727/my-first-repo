import {test, expect} from '@playwright/test';

test.describe('API - tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    
    test ('Creating new booking' , async ({ request }) => {
        
        const bookingData = {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };
        const bookPost = await request.post(`${baseUrl}/booking` , {
            data:bookingData
        });

        console.log(`Статус-код: ${bookPost.status()}`);
        expect(bookPost.status()).toBe(200);

        const responseBody = await bookPost.json();
        console.log('Тело ответа:', responseBody);
        
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.booking).toMatchObject(bookingData)
    });

});

