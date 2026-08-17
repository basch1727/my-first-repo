import {test, expect} from '@playwright/test';
// используем .serial чтобы тесты шли друг за другом, иначем будут проблемы с ID 
// так как по дефолту они выполняются паралельно и переменная не успевает переопределиться
test.describe.serial('API - tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    const authUrl = 'https://restful-booker.herokuapp.com/auth';
    let bookingId;
    //Создание бронирования
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
        //отправляем post запрос
        const bookPost = await request.post(`${baseUrl}/booking` , {
            data:bookingData
        });
        //проверка статуса запроса
        console.log(`status-code: ${bookPost.status()}`);
        expect(bookPost.status()).toBe(200);
        //конвертируем в обьект
        const responseBody = await bookPost.json();
        console.log('response body:', responseBody);
        //проверка есть ли ID и совпадение
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.booking).toMatchObject(bookingData)
        //сохраняем переменную с ID
        bookingId = responseBody.bookingid;
        console.log(`current id : ${bookingId}`)
    
    });
    //Получение информации о бронировании
    test('Get usage', async ({ request }) => {
        console.log(`виден ли : ${bookingId}`);
        //отправляем get запрос
        const response = await request.get(`${baseUrl}/booking/${bookingId}`);
        //проверка статуса запроса
        console.log(`status-code: ${response.status()}`);
        expect(response.status()).toBe(200);
        //придаём пасте смерти - человеческий вид
        const responseBody = await response.json();
        console.log('response body:', responseBody);
        //проверяем на соответсвие
        expect(responseBody).toHaveProperty('firstname');
        expect(responseBody).toHaveProperty('lastname');
        expect(responseBody).toHaveProperty('totalprice');

    });

    // Обновление бронирования
    test ('put usage' , async ({ request }) => {
        const authData = {
            "username" : "admin",
            "password" : "password123"
        }
        // создаем post запрос
        const authPost = await request.post(`${authUrl}` , {
            data: authData
        });
        // приобразовываем
        const authBody = await authPost.json();
        console.log('auth:', authBody);
        //сохраняем токен в переменную
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
        //создаем put запрос
        const putRequest = await request.put(`${baseUrl}/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: updatedData   
        });
        //преобразовываем
        const putReqRes = await putRequest.json();
        console.log('response body:', putReqRes);
        // проверяем статус и успех
        console.log(`put status-code: ${putRequest.status()}`);
        expect(putRequest.status()).toBe(200);
        // проверяем соответствие 
        expect(putReqRes).toMatchObject(updatedData)
    
    });
    // Удаление бронирования
    test('delete usage', async ({ request }) => {
        const authData = {
            "username" : "admin",
            "password" : "password123"
        }
        // нам опять нужен токен
        const authPost = await request.post(`${authUrl}` , {
            data: authData
        });
        const authBody = await authPost.json();
        const token = authBody.token;
        console.log(`deletion token: ${token}`);
        // создаем delete запрос
        const deleteResponse = await request.delete(`${baseUrl}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });
        // проверяем статус и код (по документации 201)
        console.log (`deletion status: ${deleteResponse.status()}`);
        expect(deleteResponse.status()).toBe(201);

    }); 
});


