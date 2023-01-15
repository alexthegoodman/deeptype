import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default async function seedUsers() {
  const getDefaultUser = async () => {
    // const { nanoid } = await import("nanoid");
    const email = "alexthegoodman+" + faker.random.word() + "@gmail.com";

    return {
      email,
      role: "USER",
      password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.", // testing
      subscriptionToken: uuidv4(),
      subscription: "NONE",
      frequency: "",
    };
  };

  await prisma.user.createMany({
    data: [
      {
        ...(await getDefaultUser()),
        email: "alexthegoodman@gmail.com",
        role: "ADMIN",
      },
      { ...(await getDefaultUser()) },
      { ...(await getDefaultUser()) },
      { ...(await getDefaultUser()) },
      { ...(await getDefaultUser()) },
    ],
  });

  const users = await prisma.user.findMany();

  // console.info("users", users);

  return {
    users,
  };
}
