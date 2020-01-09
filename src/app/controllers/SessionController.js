import jwt from 'jsonwebtoken';

import Student from '../models/Student';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ error: 'user not found' });
    }
    if (!(await student.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' });
    }
    const { id, name } = student;
    return res.json({
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    }); // sign gera o token
  }
}

export default new SessionController();
