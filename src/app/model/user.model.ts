export class User {
  constructor(
    username:    string,
    displayname: string,
    admin:       boolean,
    active:      boolean,
    identities: [
      {
        id:       number,
        name:     string,
        phoneid:  string,
        interval: number
      }
    ]
  ) {}
}

module.exports = User;
