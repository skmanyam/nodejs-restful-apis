const { query }  = require('./query');

const createOperators = async () => {
    await query( 
        `
            CREATE TABLE IF NOT EXISTS operators (
                id INTEGER PRIMARY KEY NOT NULL
                , "firstName" TEXT
                , "lastName" TEXT NOT NULL
                , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
            );
        `
    );
}

const createBusinesses = async () => {
    await query(
        `
            CREATE TABLE IF NOT EXISTS businesses (
                id INTEGER PRIMARY KEY NOT NULL
                , "name" TEXT NOT NULL
                , "addressLine1" TEXT
                , "addressLine2" TEXT
                , "city" TEXT
                , "state" TEXT
                , "zip" TEXT
                , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
            );
        `
    );
}

const createOps = async () => {
    await query(
        `
            CREATE TABLE IF NOT EXISTS ops (
                id INTEGER PRIMARY KEY NOT NULL
                , "operatorId" INTEGER NOT NULL
                , "businessId" INTEGER NOT NULL
                , "title" TEXT
                , "pay" DECIMAL(10,2)
                , "startTime" DATE
                , "endTime" DATE
                , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
                , FOREIGN KEY ( "operatorId" ) REFERENCES operators ( id )
                , FOREIGN KEY ( "businessId" ) REFERENCES businesses ( id )
            );
        `
    );
}

const seed = async () => {
    console.log( 'Seeding...' );

    await createOperators();
    await createBusinesses();
    await createOps();

    console.log( 'Seeding Completed.' );
}

module.exports = {
    seed
}
