import {request, expect} from "@playwright/test";
import userFile from './.auth/user.json'
import fs from 'fs'

async function globalSetup(){
    const authFile = '.auth/user.json' 
    const context = await request.newContext()

    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": "autotest@test.com", "password": "autotest"}
        }
    })
    const responseBody = await responseToken.json()
    const accessToken = responseBody.user.token
    userFile.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(userFile))
    process.env['ACCESS_TOKEN'] = accessToken

    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": {"title": "Title test", "description": "About test", "body": "Write test", "tagList": ["Tag test"]}
        },
        headers: {
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    })
    expect(articleResponse.status()).toEqual(201)
    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup;