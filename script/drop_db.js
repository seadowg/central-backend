const knex = require('knex');

(async () => {
  const dbmain = knex({ client: 'pg', connection: { host: 'localhost', user: 'postgres', database: 'postgres' } });
  await dbmain.raw('drop database jubilant;');
  await dbmain.raw('drop database jubilant_test;');
  await dbmain.raw("drop user jubilant;");
  dbmain.destroy();
})();
