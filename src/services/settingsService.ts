import prisma from "../lib/prisma";

export const getSettings = async () => {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
        // Create default settings if none exist
        settings = await prisma.settings.create({
            data: {
                siteName: "Sohoza System"
            }
        });
    }
    return settings;
};

export const updateSettings = async (data: any) => {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
        return await prisma.settings.create({ data });
    }
    return await prisma.settings.update({
        where: { id: settings.id },
        data
    });
};
