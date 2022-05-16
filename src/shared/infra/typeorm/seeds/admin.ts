import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = await hash(process.env.ADMIN_PASSWORD, 8);

  await connection.query(
    `INSERT INTO USERS(username, email, name, password, birthday, genre, points, role)
    values('${username}', '${email}', 'admin', '${password}', '2001-08-07T19:38:47.013Z', 'other','0','admin')`
  );

  await connection.close();
}

create().then(() => console.log("Admin has been created"));
