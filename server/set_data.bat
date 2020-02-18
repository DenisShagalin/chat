sequelize db:migrate && sequelize-auto -o "./db/models/baseModels" -d akvp -h localhost -u root -p 3306 -x 123 -e mysql && sequelize db:seed:all
