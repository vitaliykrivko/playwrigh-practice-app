import { Locator, Page, expect } from "@playwright/test";

export class ProductPage{
    readonly page: Page
    
    constructor(page: Page){
        this.page = page
    }

    async adToCart(productName: string): Promise<string>{
        const block = this.page.locator('.inventory_item_description').filter({ hasText: productName })
        const button = block.getByRole('button');
        const label = await block.locator('.inventory_item_name').textContent();
        const price = await block.locator('.inventory_item_price').textContent();

        await button.click();
        await expect(button).toHaveText('Remove')
        console.log(await `${label} - ${price}`)
        return `${label} - ${price}`
    }

}