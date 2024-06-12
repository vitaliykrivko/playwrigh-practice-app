import {test as setup} from "@playwright/test";
import userFile from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication', async({request})=>{
    // await page.goto('https://conduit.bondaracademy.com')
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox', {name: "Email"}).fill('autotest@test.com')
    // await page.getByRole('textbox', {name: "Password"}).fill('autotest')
    // await page.getByRole('button').click()
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // await page.context().storageState({path: authFile})

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": "autotest@test.com", "password": "autotest"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    userFile.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(userFile))
    process.env['ACCESS_TOKEN'] = accessToken
})