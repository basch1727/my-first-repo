import {test, expect} from '@playwright/test';
import { request } from 'node:http';

test.describe.serial('API - tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    const authUrl = 'https://restful-booker.herokuapp.com/auth';
    let bookingId;

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

        bookingId = responseBody.bookingid;
        console.log(`current id : ${bookingId}`)
    
    });
    
    test('Get usage', async ({ request }) => {
        console.log(`виден ли : ${bookingId}`);

        const response = await request.get(`${baseUrl}/booking/${bookingId}`);

        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Тело ответа:', responseBody);

        expect(responseBody).toHaveProperty('firstname');
        expect(responseBody).toHaveProperty('lastname');
        expect(responseBody).toHaveProperty('totalprice');

    });

    test ('put usage' , async ({ request }) => {
        const authData = {
            "username" : "admin",
            "password" : "password123"
        }
        const authPost = await request.post(`${authUrl}` , {
            data: authData
        });
        
        const authBody = await authPost.json();
        console.log('auth:', authBody);
        const token = authBody.token;
        console.log(`Token received: ${token}`);

        const updatedData = {
            firstname: "Vaan",
            lastname: "Brown", 
            totalprice: 999999,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };
        const putRequest = await request.put(`${baseUrl}/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: updatedData   
        });

        const putReqRes = await putRequest.json();
        console.log('Тело ответа:', putReqRes);
        console.log(`Статус-код PUT: ${putRequest.status()}`);
        expect(putRequest.status()).toBe(200);

        expect(putReqRes).toMatchObject(updatedData)
    
    })
    

});


