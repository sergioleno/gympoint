import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        // init do Model
        // somente as colunas inseridas pelo usuário
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campode "cache"
        idade: Sequelize.INTEGER,
        peso: Sequelize.FLOAT,
        altura: Sequelize.INTEGER,
      },
      { sequelize } // pode ter um segundo parâmetro com outras opções...ctrl espaço para acessar
    );
    this.addHook('beforeSave', async student => {
      if (student.password) {
        student.password_hash = await bcrypt.hash(student.password, 8); // 8 niveis de criptografia
      }
    }); // execução automática baseada em ações do model
    return this; // retorna o model inicializado
  }
}

export default Student;
