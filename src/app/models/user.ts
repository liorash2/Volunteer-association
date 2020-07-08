export class User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  organizationID: string;

  constructor(first_name: string, last_name: string, email: string, password: string, role: string, organizationID: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.organizationID = organizationID;
  }

}
