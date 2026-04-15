/**
 * SOHOZA SYSTEM - DEVELOPER EXPERTISE PLATFORM TEMPLATES
 * Targeted at: Developer Collectives, Expertise Showcasing, and Client Handoffs.
 */

export const baseLayout = (content: string, title: string = "Sohoza Developer Collective") => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { margin: 0; padding: 0; background-color: #0d1117; color: #c9d1d9; }
        .container { font-family: 'Fira Code', 'Courier New', monospace; max-width: 650px; margin: 30px auto; background: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
        .header { background: #010409; padding: 40px 20px; text-align: center; border-bottom: 1px solid #30363d; }
        .header h1 { margin: 0; font-size: 22px; color: #58a6ff; letter-spacing: -1px; }
        .header .subtitle { font-size: 12px; color: #8b949e; margin-top: 5px; }
        .content { padding: 45px; line-height: 1.6; color: #e6edf3; }
        .content h2 { color: #58a6ff; border-bottom: 1px solid #21262d; padding-bottom: 10px; margin-top: 0; }
        .footer { background-color: #010409; color: #8b949e; padding: 30px 20px; text-align: center; font-size: 11px; border-top: 1px solid #30363d; }
        .button { display: inline-block; padding: 12px 28px; background: #238636; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 25px 0; font-family: sans-serif; }
        .code-block { background: #0d1117; border: 1px solid #30363d; border-radius: 6px; padding: 15px; font-family: 'Fira Code', monospace; margin: 20px 0; color: #79c0ff; overflow-x: auto; }
        .badge { display: inline-block; font-size: 10px; padding: 2px 8px; border-radius: 20px; background: #388bfd26; color: #58a6ff; border: 1px solid #388bfd66; margin-right: 5px; }
        .info-card { border-left: 4px solid #58a6ff; background: #1f242c; padding: 15px; margin: 20px 0; border-radius: 0 6px 6px 0; }
        .social-link { color: #8b949e; margin: 0 10px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SOHOZA_DEVS_COLLECTIVE</h1>
            <div class="subtitle">Showcasing Elite Digital Expertise</div>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>&gt; System version: 1.2.0-stable</p>
            <p>&gt; IP Verified: Encrypted Path</p>
            <div style="margin-top: 20px;">
                <a href="#" class="social-link">Github</a>
                <a href="#" class="social-link">Discord</a>
                <a href="#" class="social-link">LinkedIn</a>
            </div>
            <p style="margin-top: 25px;">&copy; ${new Date().getFullYear()} Sohoza. All systems operational.</p>
        </div>
    </div>
</body>
</html>
`;

// ==========================================
// 1. EXPERTISE & PORTFOLIO
// ==========================================
export const expertiseTemplates = {
    skillVerified: (skill: string) => baseLayout(`
        <h2>Expertise Verified: ${skill}</h2>
        <p>Congratulations! Your proficiency in <strong>${skill}</strong> has been officially verified by our senior review board.</p>
        <div class="info-card">This skill is now highlighted on your public expert profile.</div>
        <a href="#" class="button">View My Profile</a>
    `),
    portfolioSpotlight: (projectName: string) => baseLayout(`
        <h2>Project in Spotlight! 🚀</h2>
        <p>Your work on <strong>${projectName}</strong> has been selected for our collective's homepage spotlight.</p>
        <p>This will significantly increase your visibility to potential high-ticket clients.</p>
    `),
    newEndorsement: (endorser: string, skill: string) => baseLayout(`
        <p><strong>${endorser}</strong> has endorsed your expertise in <span class="badge">${skill}</span>.</p>
        <p>"A top-tier developer with deep technical insights."</p>
    `),
    achievementUnlocked: (badge: string) => baseLayout(`
        <h2>Achievement Unlocked: ${badge}</h2>
        <div class="code-block">STATUS: [UNLOCKED] | LEVEL: ELITE</div>
        <p>Your contributions to the collective have earned you the <strong>${badge}</strong> badge.</p>
    `),
    profileViewsAlert: (count: number) => baseLayout(`
        <p>Your expert profile was viewed <strong>${count} times</strong> this week by potential partners.</p>
    `),
};

// ==========================================
// 2. CLIENT & INQUIRY
// ==========================================
export const clientTemplates = {
    newExpertInquiry: (clientName: string, service: string) => baseLayout(`
        <h2>New Client Lead: ${service}</h2>
        <p>A client named <strong>${clientName}</strong> is interested in your expertise for a specialized project.</p>
        <div class="item-card">
            <strong>Requirement:</strong> ${service}<br>
            <strong>Status:</strong> Awaiting Initial Response
        </div>
        <a href="#" class="button">Review Inquiry</a>
    `),
    quoteAccepted: (projectName: string) => baseLayout(`
        <div class="info-card" style="border-left-color: #238636;">
            <strong>Quote Approved!</strong>
        </div>
        <p>Your proposal for <strong>${projectName}</strong> has been accepted. The client has deposited the first milestone funds.</p>
        <a href="#" class="button">Start Project</a>
    `),
    meetingScheduled: (client: string, time: string) => baseLayout(`
        <h2>Introduction Scheduled</h2>
        <p>You have a technical discovery call with <strong>${client}</strong>.</p>
        <p>Time: <strong>${time}</strong></p>
        <div class="code-block">JOIN_COMMAND: /connect --secure</div>
    `),
    feedbackLeft: (clientName: string) => baseLayout(`
        <h2>Client Testimonial</h2>
        <p><strong>${clientName}</strong> left a review for your recent collaboration.</p>
        <div class="info-card">"Exceptional architectural decisions and clean execution."</div>
    `),
};

// ==========================================
// 3. PROJECT WORKFLOW & LIFECYCLE (Dev Actions)
// ==========================================
export const workflowTemplates = {
    discoveryCallBooked: (projectName: string, time: string) => baseLayout(`
        <h2>Discovery Session: ${projectName}</h2>
        <p>A technical discovery session has been locked into the calendar.</p>
        <div class="info-card">Time: ${time}</div>
        <p>Prepare your architectural questions and stack recommendations.</p>
    `),
    projectRoomCreated: (projectID: string) => baseLayout(`
        <h2>Project Workspace Online</h2>
        <div class="code-block">WORKSPACE_ID: ${projectID}</div>
        <p>Your secure collaboration environment is now ready for deployment.</p>
    `),
    qaPhaseStarted: (projectName: string) => baseLayout(`
        <h2>Entering QA/Test Phase</h2>
        <p>Development on <strong>${projectName}</strong> is complete. Moving to Quality Assurance.</p>
        <div class="badge">UAT_REQUIRED</div>
    `),
    clientFeedbackCycle: (version: string) => baseLayout(`
        <p>Client has provided feedback on <strong>Build v${version}</strong>.</p>
        <a href="#" class="button">Review Changes</a>
    `),
    handoffComplete: (projectName: string) => baseLayout(`
        <h2>Project Handoff Successful</h2>
        <p>Documentation and code for <strong>${projectName}</strong> have been formally delivered to the client.</p>
        <div class="info-card">REMAINING_FUNDS: RELEASED</div>
    `),
    serviceRetainerStarted: (projectName: string) => baseLayout(`
        <h2>Maintenance Active</h2>
        <p>The 24/7 technical support retainer for <strong>${projectName}</strong> is now live.</p>
    `),
    featureFlagToggled: (feature: string, state: string) => baseLayout(`
        <div class="code-block">CONFIG_UPDATE: ${feature} => ${state}</div>
    `),
};

// ==========================================
// 4. TECHNICAL HEALTH & DEVOPS
// ==========================================
export const technicalTemplates = {
    architectureReview: (module: string) => baseLayout(`
        <h2>Architectural Audit Required</h2>
        <p>The system has flagged the <strong>${module}</strong> module for a structural review.</p>
        <div class="code-block">ISSUE: Complexity threshold exceeded</div>
    `),
    databaseMigrationNotice: (env: string, version: string) => baseLayout(`
        <div class="info-card">Executing Schema Migration</div>
        <p>Environment: <strong>${env}</strong> | Version: <strong>${version}</strong></p>
        <p>Legacy access will be normalized during the maintenance window.</p>
    `),
    securityFindings: (severity: string) => baseLayout(`
        <div class="alert-box" style="background:#3e1c1c; border-color:#f85149; color:#f85149;">
            <strong>Critical Security Finding: ${severity}</strong>
        </div>
        <p>Our automated audit has detected a vulnerability in a core dependency.</p>
        <div class="code-block">CVE_ID: PR-00X-543</div>
        <a href="#" class="button" style="background:#cf222e;">Review Security Log</a>
    `),
    pipelineStatus: (status: string, buildID: string) => baseLayout(`
        <h2>Build Pipeline: ${status}</h2>
        <div class="code-block">BUILD_ID: ${buildID} | STATUS: ${status.toUpperCase()}</div>
        <p>The deployment cycle has been updated in the cloud environment.</p>
    `),
    apiDeprecation: (version: string, date: string) => baseLayout(`
        <h2>API v${version} Deprecation Notice</h2>
        <p>Access to Legacy API v${version} will be disabled on <strong>${date}</strong>.</p>
        <div class="badge">UPGRADE_REQUIRED</div>
    `),
};

// ==========================================
// 5. CORE SYSTEM TEMPLATES
// ==========================================
export const welcomeTemplate = (name: string) => baseLayout(`
    <h2>Initializing Account: ${name}</h2>
    <p>Welcome to the Sohoza Developer Collective. Your expert profile is now ready for population.</p>
    <p>Upload your portfolio, verify your tech stack, and start connecting with high-end clients.</p>
    <div class="code-block">git remote add sohoza https://system.sohoza.dev/me</div>
    <a href="${process.env.FRONTEND_URL || '#'}" class="button">Dashboard.init()</a>
`);

export const contactReceiptTemplate = (name: string, subject: string) => baseLayout(`
    <h2>Transmission Received</h2>
    <p>Hi ${name}, our technical team has received your inquiry: "<strong>${subject}</strong>".</p>
    <p>An expert in this field will review your requirements and respond shortly.</p>
    <div class="code-block">STATUS: UNDER_REVIEW</div>
`);

export const passwordChangedTemplate = () => baseLayout(`
    <h2>Security Sync Complete</h2>
    <p>The internal security credentials for your expert account have been updated successfully.</p>
    <div class="alert-box" style="background:#1f1b05; border-color:#d29922; color:#d29922;">
        If you didn't initiate this update, terminate your active sessions now.
    </div>
`);

export const newsletterSubscribedTemplate = (unsubscribeUrl: string) => baseLayout(`
    <h2>Subscribed to Dev Insights</h2>
    <p>You'll now receive our weekly technical digest, project opportunities, and stack updates.</p>
    <br>
    <p style="font-size: 11px; color: #8b949e;">// To stop transmission: <a href="${unsubscribeUrl}" style="color:#58a6ff;">unsubscribe.exec()</a></p>
`);
