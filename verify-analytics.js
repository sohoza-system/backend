const API_URL = 'http://localhost:5000/api';

async function request(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(JSON.stringify(json));
    }
    return json;
}

async function seedData() {
    console.log('\n--- Seeding Test Data ---');

    // 1. Create a Post
    try {
        const post = await request(`${API_URL}/analytics/test-seed-post`, 'POST', {
            title: 'Welcome to our new platform!',
            content: 'We are excited to share our latest updates with you.'
        });
        console.log('✅ Seed Post: Success');
    } catch (error) {
        // If route doesn't exist yet, we'll ignore or handle
        console.log('ℹ️ Seed Post: skipping or failed (expected if helper not implemented)');
    }

    // Since I don't have a direct "create visit" or "create activity" public endpoint for security,
    // I will mock some entries if possible or just rely on empty data verification.
}

async function verifyAnalytics() {
    console.log('\n--- Verifying Analytics ---');

    // 1. Dashboard Analytics
    try {
        const res = await request(`${API_URL}/analytics/dashboard`, 'GET');
        console.log('✅ Dashboard Analytics: Success', {
            weeklyVisitors: res.analytics.weeklyVisitors,
            trafficSourcesCount: res.analytics.trafficSources.length,
            recentActivityCount: res.analytics.recentActivity.length,
            notificationsCount: res.analytics.notifications.count
        });
    } catch (error) {
        console.error('❌ Dashboard Analytics: Failed', error.message);
    }

    // 2. General Analytics
    try {
        const res = await request(`${API_URL}/analytics/general`, 'GET');
        console.log('✅ General Analytics: Success', {
            pageViewsCount: res.analytics.pageViews.length,
            topPagesCount: res.analytics.topPages.length,
            userFriendsCount: res.analytics.userFriends.length,
            deviceBreakdownCount: res.analytics.deviceBreakdown.length
        });
    } catch (error) {
        console.error('❌ General Analytics: Failed', error.message);
    }
}

async function run() {
    await verifyAnalytics();
}

run();
