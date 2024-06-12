import { Page } from "@playwright/test";
import { FormLayhoutsPage } from '../page-object/formLayoutsPage'
import { NavigationPage } from '../page-object/navigationPage'
import { DatepickerPage } from '../page-object/datepickerPage'

export class PageManager{
    private readonly page: Page
    private navigationPage: NavigationPage
    private formLayhoutsPage: FormLayhoutsPage
    private datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayhoutsPage = new FormLayhoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayhoutsPage(){
        return this.formLayhoutsPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}
