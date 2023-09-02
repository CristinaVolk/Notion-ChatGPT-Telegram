import { Client } from '@notionhq/client';
import config from 'config';

const notion = new Client({
    auth: config.get('NOTION_KEY'),
})

export async function create(keywords, text) {
    const response = await notion.pages.create({
        parent: {
            database_id: config.get('NOTION_PAGE_ID')
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: keywords
                        }
                    }
                ]
            },
            Date: {
                date: {
                  start: new Date().toISOString(),
                }
            }
        }
    })

    await notion.blocks.children.append({
        block_id: response.id,
        children: [
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: text
                            }
                        }
                    ]
                }
            }
        ]
    })

    return response;
}
