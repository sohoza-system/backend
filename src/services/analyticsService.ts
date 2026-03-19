import prisma from "../lib/prisma";

export const getDashboardAnalytics = async () => {
    const now = new Date();
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prev7DaysStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    try {
        // Weekly visitors (Current 7 days)
        const currentWeeklyVisitors = await prisma.visit.count({
            where: {
                createdAt: { gte: last7Days },
            },
        });

        // Previous Weekly visitors (7-14 days ago)
        const previousWeeklyVisitors = await prisma.visit.count({
            where: {
                createdAt: {
                    gte: prev7DaysStart,
                    lt: last7Days
                },
            },
        });

        // Calculate Trend Percentage
        let visitorTrend = 0;
        if (previousWeeklyVisitors > 0) {
            visitorTrend = ((currentWeeklyVisitors - previousWeeklyVisitors) / previousWeeklyVisitors) * 100;
        } else if (currentWeeklyVisitors > 0) {
            visitorTrend = 100;
        }

        // Traffic sources breakdown
        const trafficSources = await prisma.visit.groupBy({
            by: ['source'],
            _count: { id: true },
        });

        // Recent activity
        const recentActivity = await prisma.activity.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
        });

        // New post notifications (posts in last 24h)
        const newPosts = await prisma.post.findMany({
            where: {
                status: "published",
                createdAt: { gte: last24Hours },
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
        });

        return {
            visitors: {
                current: currentWeeklyVisitors,
                previous: previousWeeklyVisitors,
                trend: Number(visitorTrend.toFixed(2)), // e.g. 15.45 for 15.45% growth
            },
            trafficSources,
            recentActivity,
            notifications: {
                newPosts,
                count: newPosts.length,
            },
        };
    } catch (error) {
        throw new Error(`Error fetching dashboard analytics: ${error}`);
    }
};

export const getGeneralAnalytics = async () => {
    try {
        // Page views breakdown
        const pageViews = await prisma.visit.groupBy({
            by: ['pagePath'],
            _count: {
                id: true,
            },
            orderBy: {
                _count: {
                    id: 'desc',
                },
            },
        });

        // Top pages (top 5)
        const topPages = pageViews.slice(0, 5);

        // User friends mapping (summary of users)
        const userFriends = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: { friends: true }
                }
            },
            take: 20
        });

        // Device breakdown (Desktop, Tablet, Mobile)
        const deviceBreakdown = await prisma.visit.groupBy({
            by: ['deviceType'],
            _count: {
                id: true,
            },
        });

        return {
            pageViews,
            topPages,
            userFriends,
            deviceBreakdown,
        };
    } catch (error) {
        throw new Error(`Error fetching general analytics: ${error}`);
    }
};

export const trackVisit = async (data: { pagePath: string; deviceType?: string; source?: string; ipAddress?: string; visitorId?: string }) => {
    try {
        return await prisma.visit.create({
            data: {
                pagePath: data.pagePath,
                deviceType: data.deviceType || 'unknown',
                source: data.source || 'direct',
                ipAddress: data.ipAddress || '0.0.0.0',
                visitorId: data.visitorId
            }
        });
    } catch (error) {
        console.error("Error tracking visit:", error);
        // We don't throw here to avoid crashing the frontend if tracking fails
        return null;
    }
};
