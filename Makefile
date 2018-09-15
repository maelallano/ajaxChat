start:
	php -S localhost:8000

migrate:
	mysql -u root -p < sql/init.sql
	mysql -u root -p chat < sql/dumpDB.sql