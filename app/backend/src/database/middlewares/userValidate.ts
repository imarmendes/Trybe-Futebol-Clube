export default class UserValidate {
  static validate(email: string, password: string) {
    if (!email || !password) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      const e = new Error('Incorrect email or password');
      e.name = 'Inválid';
      throw e;
    }
  }
}
