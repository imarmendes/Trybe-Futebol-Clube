import * as bcryptjs from 'bcryptjs';

const passwordService = {
  encryptPassword: (password: string) => {
    const salt = bcryptjs.genSaltSync(5);
    const encryptedPassword = bcryptjs.hashSync(password, salt);
    return encryptedPassword;
  },
};

export default passwordService;
