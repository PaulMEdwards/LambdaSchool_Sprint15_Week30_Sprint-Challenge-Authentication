const bcrypt = require('bcryptjs');
const passwordStrength = 8;

exports.seed = function(knex) {
  return knex('users').insert([
    {
      //id: 1,
      username: 'RogerRabbit',
      password: bcrypt.hashSync('I<3J3ss!c4', passwordStrength),
    },
    {
      //id: 2,
      username: 'BabyHerman',
      password: bcrypt.hashSync('I<3c!g4rs', passwordStrength),
    },
    {
      //id: 3,
      username: 'JessicaRabbit',
      password: bcrypt.hashSync('I<3R0g3r!', passwordStrength),
    },
    {
      //id: 4,
      username: 'EddieValiant',
      password: bcrypt.hashSync('D3t3ct1v3', passwordStrength),
    },
    {
      //id: 5,
      username: 'JudgeDoom',
      password: bcrypt.hashSync('Ruthl3ss1', passwordStrength),
    },
    {
      //id: 6,
      username: 'BennyTheCab',
      password: bcrypt.hashSync('Vr00m!', passwordStrength),
    },
    {
      //id: 7,
      username: 'Dolores',
      password: bcrypt.hashSync('0rd3rUp!', passwordStrength),
    },
    {
      //id: 8,
      username: 'LtSantino',
      password: bcrypt.hashSync('L13ut3n4nt', passwordStrength),
    },
    {
      //id: 9,
      username: 'TeddyValiant',
      password: bcrypt.hashSync('D34db33f', passwordStrength),
    },
    {
      //id: 10,
      username: 'RKMaroon',
      password: bcrypt.hashSync('C4rt00n$', passwordStrength),
    },
    {
      //id: 11,
      username: 'MarvinAcme',
      password: bcrypt.hashSync('G4gK1ng', passwordStrength),
    },
  ]);
};
