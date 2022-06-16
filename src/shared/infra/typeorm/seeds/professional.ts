import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const email = process.env.PROFESSIONAL_EMAIL;
  const password = await hash(process.env.PROFESSIONAL_PASSWORD, 8);

  await connection.query(
    `INSERT INTO USERS(email, name, password, role)
    values('${email}', 'professional', '${password}','professional')`
  );

  await connection.close();
}

create().then(() => console.log("Prefessional has been created"));
