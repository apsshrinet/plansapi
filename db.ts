import {Client} from 'pg';
import * as dotenv from 'dotenv'

dotenv.config();

export const db = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(<string>process.env.PGPORT)
})
export async function database_intilization()
{
await db.connect();
const time =  await db.query('SELECT NOW()', (err, res) => {
    if(err)
    {
        console.log(err);
    }
    console.log("Successfully connected to database....");
});

let checkcratetable ="SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'plans');"
await db.query(checkcratetable,(err,result)=>{
    if(err){
        throw err;
    }
    else{
        if(result.rows[0]['exists']==true)
        {
            console.log("Table plans already exists in database");
        }
        else
        {
            let createtable = "CREATE TABLE plans (plan_names VARCHAR(255) PRIMARY KEY ,button_value VARCHAR(255) NOT NULL, order_limit INTEGER, created_on TIMESTAMPTZ NOT NULL DEFAULT NOW());"
            db.query(createtable,(err,result)=>{
                if(err){
                    throw err;
                }
                else{
                    console.log("Created table plans");
                }
            });
        }
    }
});
checkcratetable ="SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'features');"
await db.query(checkcratetable,(err,result)=>{
    if(err){
        throw err;
    }
    else{
        if(result.rows[0]['exists']==true)
        {
            console.log("Table features already exists in database");
        }
        else
        {
            let createtable = "CREATE TABLE features (plan_names VARCHAR(255) NOT NULL,features VARCHAR(255) NOT NULL,PRIMARY KEY(plan_names,features));"
            db.query(createtable,(err,result)=>{
                if(err){
                    throw err;
                }
                else{
                    console.log("Created table features");
                }
            });
        }
    }
});
checkcratetable ="SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pricing');"
await db.query(checkcratetable,(err,result)=>{
    if(err){
        throw err;
    }
    else{
        if(result.rows[0]['exists']==true)
        {
            console.log("Table pricing already exists in database");
        }
        else
        {
            let createtable = "CREATE TABLE pricing (plan_names VARCHAR(255) NOT NULL,original_pricing INT NOT NULL,reduced_pricing INT, billing VARCHAR(100) NOT NULL,PRIMARY KEY(plan_names,original_pricing,billing));"
            db.query(createtable,(err,result)=>{
                if(err){
                    throw err;
                }
                else{
                    console.log("Created table pricing");
                }
            });
        }
    }
});
}