db.createUser({
    user: 'DB_USER',
    pwd: 'DB_PASSWORD',
    roles: [
        {
            role: 'dbOwner',
            db: 'DATABASE_NAME',
        },
    ],
})