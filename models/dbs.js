// CREATE TABLE master_table_3 AS SELECT distinct course, branch, sem from master_table_2;
// ALTER TABLE master_table_3 ADD id MEDIUMINT NOT NULL AUTO_INCREMENT KEY;


module.exports = {
    queries: async (sql_query) => {
        let return_data = []

        for (let i = 0; i < sql_query.length; i++) {
            const element = sql_query[i];

            const mysql = require('mysql2/promise');
            const pool = mysql.createPool(
                {
                    host: "127.0.0.1",
                    user: "root",
                    password: "codeM_0007",
                    database: "student"
                }
            );
            let data = await Promise.all([
                pool.query(element),
            ]);
            return_data.push(data[0][0])
            await pool.end();
        }
        return return_data
    },

    dummy: async (sql_query_success, sql_query_fail, table_name) => {
        let return_data = []

        const mysql = require('mysql2/promise');
        const pool = mysql.createPool(
            {
                host: "127.0.0.1",
                user: "root",
                password: "codeM_0007",
                database: "student"
            }
        );
        let data = await Promise.all([
            pool.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES where TABLE_NAME = '${table_name}';`),
            // pool.query(element),
        ]);
        await pool.end();
        let table_exists = data[0][0].length
        console.log(table_exists, "dbs.js")

        if (table_exists > 0) {
            for (let i = 0; i < sql_query_success.length; i++) {
                const element = sql_query_success[i];

                const mysql = require('mysql2/promise');
                const pool = mysql.createPool(
                    {
                        host: "127.0.0.1",
                        user: "root",
                        password: "codeM_0007",
                        database: "student"
                    }
                );
                let data = await Promise.all([
                    pool.query(element),
                ]);
                return_data.push(data[0][0])
                await pool.end();
            }
        }

        else {
            for (let i = 0; i < sql_query_fail.length; i++) {
                const element = sql_query_fail[i];

                const mysql = require('mysql2/promise');
                const pool = mysql.createPool(
                    {
                        host: "127.0.0.1",
                        user: "root",
                        password: "codeM_0007",
                        database: "student"
                    }
                );
                let data = await Promise.all([
                    pool.query(element),
                ]);
                return_data.push(data[0][0])
                await pool.end();
            }
            for (let i = 0; i < sql_query_success.length; i++) {
                const element = sql_query_success[i];

                const mysql = require('mysql2/promise');
                const pool = mysql.createPool(
                    {
                        host: "127.0.0.1",
                        user: "root",
                        password: "codeM_0007",
                        database: "student"
                    }
                );
                let data = await Promise.all([
                    pool.query(element),
                ]);
                return_data.push(data[0][0][0])
                await pool.end();
            }
        }
        return return_data
    },
}
