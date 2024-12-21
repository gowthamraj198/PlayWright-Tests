import {config} from "../conf/config";
import {pet, pet1} from "../test-data/createData";
const { test, expect } = require('@playwright/test');

/*
    1. the api works without any api key
    2. the api works with all combinations of request. even creates a pet with empty data. cant test -ve scenarios.

 */

test.describe('Get pet API', () => {

    test.beforeEach(async ({ request }) => {
        await request.post(`${config.url}/pet`, {
            data: pet,
            headers: {
                'accept': 'application/json',
                'api_key': config.key
            }
        });
    });

    test('should get correct details for a valid id', async ({request}) => {
        const response = await request.get(`${config.url}/pet/${pet.id}`, {
            headers: {
                'accept': 'application/json',
                'api_key': config.key
            }
        });
        const responseBody = await response.json();

        expect(responseBody).toMatchObject({
            id: pet.id,
            category: pet.category,
            name: pet.name,
            photoUrls: pet.photoUrls,
            tags: pet.tags,
            status: pet.status
        });
    });

});

test.describe('Get pet API tests -ve cases', () => {
    test('should get 404 when not found', async ({request}) => {
        const response = await request.get(`${config.url}/pet/1`, {
            headers: {
                'accept': 'application/json',
                'api_key': config.key
            }
        });
        await expect(response.status()).toBe(404);
    });

});
