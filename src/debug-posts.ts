import prisma from './src/lib/prisma';

async function test() {
    try {
        console.log('Fetching posts...');
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                comments: true
            }
        });
        console.log('Success! Posts found:', posts.length);
    } catch (err) {
        console.error('FAIL (FULL ERROR):', err);
    }
}

test();
