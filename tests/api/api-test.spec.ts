import {test, expect, request} from '@playwright/test'
import tags from '../../test-data/tags.json'
import { HelperBase } from '../../page-object/helperBase'

test.describe('test api', () => {
    test.beforeEach(async({page}) => {
        await page.route('*/**/api/tags', async route => {
            await route.fulfill({
                body: JSON.stringify(tags)
            })
        })
        //new HelperBase(page).waitForNumberOfSeconds(2)
        await page.goto('https://conduit.bondaracademy.com')
        //await page.goto(process.env.URL)
        //process.env.USERNAME
    })

    test('has title', async({page}) => {
        await page.route('*/**/api/articles*', async route => {
            const response = await route.fetch()
            const responseBody = await response.json()
            responseBody.articles[0].title = "This is a MOCK title"
            responseBody.articles[0].description = "This is a MOCK description"
    
            await route.fulfill({
                body: JSON.stringify(responseBody)
            })
        })

        await page.getByText('This is a MOCK title').click()
        await expect(page.locator('.navbar-brand')).toHaveText('conduit');
        await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK title');
        await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK description');
    })

    test('delete article', async({page, request})=> {
        // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        //     data: {
        //         "user": {"email": "autotest@test.com", "password": "autotest"}
        //     }
        // })
        // const responseBody = await response.json()
        // const accessToken = responseBody.user.token

        const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: {
                "article": {"title": "Title test", "description": "About test", "body": "Write test", "tagList": ["Tag test"]}
            },
            // headers: {
            //     Authorization: `Token ${accessToken}`
            // }
        })
        expect(articleResponse.status()).toEqual(201)

        await page.getByText('Global Feed').click()
        await page.getByText('Title test').click()
        await page.getByRole('button', {name: 'Delete Article'}).first().click()
        await page.getByText('Global Feed').click()

        await expect(page.locator('app-article-list h1').first()).not.toContainText('Title test')
    })

    test('create article', async({page, request})=> {
        await page.getByText('New Article').click()
        await page.getByRole('textbox', {name: 'Article Title'}).fill('Playwright is awesome')
        await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('About the Playwright')
        await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('We like to use playwright for automation')
        await page.getByRole('button', {name: 'Publish Article'}).click()
        const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
        const articleResponseBody = await articleResponse.json()
        const slugId = articleResponseBody.article.slug

        await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
        await page.getByText('Home').click()
        await page.getByText('Global Feed').click()

        await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')

        // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        //     data: {
        //         "user": {"email": "autotest@test.com", "password": "autotest"}
        //     }
        // })
        // const responseBody = await response.json()
        // const accessToken = responseBody.user.token        

        const dleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`)//, {
        //     headers: {
        //         Authorization: `Token ${accessToken}`
        //     }
        // })
        expect(dleteArticleResponse .status()).toEqual(204)
    })
})