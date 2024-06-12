import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayhoutsPage extends HelperBase {

    constructor(page: Page){
        super(page)
    }

    async submitUsingGridForm(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method will out the Inline form with user details
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be safed
     */
    async submitUsingInlineForm(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)        
        if(rememberMe)
            await inlineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true})
        else
            await inlineForm.getByRole('checkbox', {name: 'Remember me'}).uncheck({force: true})
        await inlineForm.getByRole('button').click()
    }
}