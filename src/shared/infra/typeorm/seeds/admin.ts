import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const email = process.env.ADMIN_EMAIL;
  const password = await hash(process.env.ADMIN_PASSWORD, 8);

  await connection.query(
    `INSERT INTO USERS(email, name, password, role)
    values('${email}', 'admin', '${password}','admin')`
  );

  await connection.close();
}

create().then(() => console.log("Admin has been created"));
