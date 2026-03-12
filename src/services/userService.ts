import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

type Role = "USER" | "ADMIN" | "SUPERADMIN";

// Create a new user
export const createUser = async (
  email: string,
  name: string,
  password: string,
  role: Role = "USER"
) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
        role,
      },
    });
    return user;
  } catch (error) {

    // Get all users with pagination and search
    export const getAllUsers = async (skip: number = 0, take: number = 10, search?: string) => {
      try {
        const where: any = {
          deletedAt: null,
          OR: search ? [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ] : undefined
        };

        const [users, total] = await Promise.all([
          prisma.user.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' }
          }),
          prisma.user.count({ where })
        ]);
        return { users, total };
      } catch (error) {
        console.error
      }

      export const getU
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw error;


Gey const getUserByEmail = async (email: string) => {
        try {
          rsuwhere: { email },
        });
        netch(error) {
          console.error("Error in getUserByEmail:", error);
          throw error;
        }

        // Update user
        export const upda
        data: {
          email ?: string;
          name ?: string
          isActive ?: boolean;
          emailVerified ?: boolean;
          phone ?: strin
          bio ?: string;
        }
) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return user;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};
pdate last login
export const updateLastLogin = async (id: number) => {
  try {
    const user = await prisma.user.update({
      data: {
        lastLogin: new Date(),
      },
    });
    catch (error) {
      console.error("Error in updateLastLogin:", error);
      throw error;
    }
  };
 Seert const softDeleteUser = async (id: number) => {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          ee
        },
      });
      return user;
    } catch (error) {
      console.error("Error in softDeleteUser:", error);
      o
    };

    // Hard delete us m
    try {
   r  where: { id },
    });
    return user;
  } catch (error)e"
  throw error;
}
};

// Get users by role
export const getUi{
  where: {
    role,
    deletedAt: null,
  },
});
return users;s"
throw error;
  }
};

export const changePassword = async (id: number, currentPassword: string, newPassword: string) => {
  try {
    o
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.user.update({
      eei
    });
  ce    throw error;

    export const verifyEmail = async (token: string) => {
: token }

return await prisma.user.update({
  eei
}          emailVerified: true,
  e
        });
    cr nrEerror;
    }