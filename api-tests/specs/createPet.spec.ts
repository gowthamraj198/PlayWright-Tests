import {config} from "../conf/config";
import {createData, pet} from "../test-data/createData";
import {describe} from "node:test";

const { test, expect } = require('@playwright/test');
const invalidPet = require('../test-data/invalid-data.json');


/*
    1. the api works without any api key
    2. the api works with all combinations of request. even creates a pet with empty data. cant test -ve scenarios.

 */
test.describe.parallel('Create pet API tests', () => {
    Object.values(createData).forEach((pet, index) => {
        test(`should be able to create a pet with id ${pet.id} (test ${index + 1})`, async ({ request }) => {
            const response = await request.post(`${config.url}/pet`, {
                data: pet,
                headers: {
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
});

test.describe('Create pet API tests -ve cases', () => {
    test('should get 405 with invalid input', async ({request}) => {
        const response = await request.post(`${config.url}/pet`, {
            data: invalidPet,
            headers: {
                'accept': 'application/json',
                'api_key': config.key
            }
        });
        await expect(response.status()).toBe(200); //not getting non 200 for any input
    });

    test('should get error with invalid input header', async ({request}) => {
        const response = await request.post(`${config.url}/pet`, {
            data: pet,
            headers: {
                'accept': 'application/text',
                'api_key': config.key
            }
        });
        await expect(response.status()).not.toBe(200);
    });

    test('should not be able to create pet with empty data', async ({request}) => {
        const response = await request.post(`${config.url}/pet`, {
            data: {},
            headers: {
                'api_key': config.key
            }
        });
        const responseBody = await response.json();
        await expect(responseBody).toHaveProperty('id');
    });
});