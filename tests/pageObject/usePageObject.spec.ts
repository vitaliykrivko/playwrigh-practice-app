import {test} from '../../test-options'
import { PageManager } from '../../page-object/pageManager'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to Form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()

})

test('parametrized method', async({pageManager}) => {
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayhoutsPage().submitUsingGridForm('test@test.com', 'Welcome1', 'Option 1');
    await pageManager.onFormLayhoutsPage().submitUsingInlineForm('Test Best' ,'test@test.com',  true);

    await pageManager.navigateTo().datepickerPage()
    //await pageManager.onDatepickerPage().selectCommonDateFromToday(5)
    await pageManager.onDatepickerPage().selectDatepickerWithRangeFromToday(10, 19)
})