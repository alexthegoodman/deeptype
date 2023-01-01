import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function clean() {
  // await prisma
  //   .raw(
  //     `
  //   SELECT
  //     *
  //   FROM
  //     pg_catalog.pg_tables
  //   WHERE
  //     schemaname != 'pg_catalog'
  //   AND schemaname != 'information_schema';
  // `
  //   )
  //   .then((data) => {
  //     console.info("data", data);
  //   });

  // await prisma.raw("TRUNCATE AnnotationMeta;");

  await prisma.document.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.user.deleteMany({
    where: { id: { not: "" } },
  });
}

clean()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.info("cleaned only");
  });
