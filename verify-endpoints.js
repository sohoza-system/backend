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
        const msg = json.message || JSON.stringify(json);
        throw new Error(msg.replace(/\\n/g, '\n'));
    }
    return json;
}

async function verifyTeamMembers() {
    console.log('\n--- Verifying Team Members ---');
    let memberId;

    // 1. Create
    try {
        const res = await request(`${API_URL}/team-members`, 'POST', {
            name: 'John Doe',
            role: 'Developer',
            email: `john.doe.${Date.now()}@example.com`,
            bio: 'Full Stack Developer',
            status: 'active',
            image: 'https://via.placeholder.com/150',
        });
        console.log('✅ Create Member: Success', res);
        memberId = res.member.id;
    } catch (error) {
        console.error('❌ Create Member: Failed', error.message);
    }

    if (memberId) {
        // 2. Get All
        try {
            const res = await request(`${API_URL}/team-members`, 'GET');
            console.log('✅ Get All Members: Success', res.members.length > 0);
        } catch (error) {
            console.error('❌ Get All Members: Failed', error.message);
        }

        // 3. Get One
        try {
            const res = await request(`${API_URL}/team-members/${memberId}`, 'GET');
            console.log('✅ Get Member by ID: Success', res.member.id === memberId);
        } catch (error) {
            console.error('❌ Get Member by ID: Failed', error.message);
        }

        // 4. Update
        try {
            const res = await request(`${API_URL}/team-members/${memberId}`, 'PUT', {
                role: 'Senior Developer'
            });
            console.log('✅ Update Member: Success', res.member.role === 'Senior Developer');
        } catch (error) {
            console.error('❌ Update Member: Failed', error.message);
        }

        // 5. Delete
        try {
            const res = await request(`${API_URL}/team-members/${memberId}`, 'DELETE');
            console.log('✅ Delete Member: Success', res.message);
        } catch (error) {
            console.error('❌ Delete Member: Failed', error.message);
        }
    }
}

async function verifyServices() {
    console.log('\n--- Verifying Services ---');
    let serviceId;

    // 1. Create
    try {
        const res = await request(`${API_URL}/services`, 'POST', {
            name: 'Web Development',
            description: 'Building modern web applications',
            status: 'active',
            icon: 'code',
        });
        console.log('✅ Create Service: Success', res);
        serviceId = res.service.id;
    } catch (error) {
        console.error('❌ Create Service: Failed', error.message);
    }

    if (serviceId) {
        // 2. Get All
        try {
            const res = await request(`${API_URL}/services`, 'GET');
            console.log('✅ Get All Services: Success', res.services.length > 0);
        } catch (error) {
            console.error('❌ Get All Services: Failed', error.message);
        }

        // 3. Get One
        try {
            const res = await request(`${API_URL}/services/${serviceId}`, 'GET');
            console.log('✅ Get Service by ID: Success', res.service.id === serviceId);
        } catch (error) {
            console.error('❌ Get Service by ID: Failed', error.message);
        }

        // 4. Update
        try {
            const res = await request(`${API_URL}/services/${serviceId}`, 'PUT', {
                description: 'Full stack web development'
            });
            console.log('✅ Update Service: Success', res.service.description === 'Full stack web development');
        } catch (error) {
            console.error('❌ Update Service: Failed', error.message);
        }

        // 5. Delete
        try {
            const res = await request(`${API_URL}/services/${serviceId}`, 'DELETE');
            console.log('✅ Delete Service: Success', res.message);
        } catch (error) {
            console.error('❌ Delete Service: Failed', error.message);
        }
    }
}

async function run() {
    await verifyTeamMembers();
    await verifyServices();
}

run();
