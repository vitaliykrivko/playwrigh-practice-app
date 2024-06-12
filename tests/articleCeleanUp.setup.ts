import {test as setup, expect} from "@playwright/test";

setup('delete article', async({request}) => {
    const dleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`)
    expect(dleteArticleResponse .status()).toEqual(204)
})