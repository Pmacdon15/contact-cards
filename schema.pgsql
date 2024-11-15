-- Active: 1731700684828@@ep-square-snowflake-a41l6rrd-pooler.us-east-1.aws.neon.tech@5432@verceldb
DROP TABLE IF EXISTS CCContactInfo;

DROP TABLE IF EXISTS CCContactTypes;

DROP TABLE IF EXISTS CCUsers;

CREATE TABLE
    CCContactTypes (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);

CREATE TABLE
    CCContactInfo (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        type INTEGER REFERENCES CCContactTypes (id),
        name VARCHAR(255) NOT NULL DEFAULT 'Work',
        value VARCHAR(255) NOT NULL
    );

CREATE TABLE
    CCUsers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        profile_image_url VARCHAR(255)
    );

INSERT INTO
    CCContactTypes (name)
VALUES
    ('Phone Number'),
    ('Email'),
    ('Address'),
    ('Web Site'),
    ('Note'),
    ('Linked In'),
    ('Git Hub');

INSERT INTO
    CCContactInfo (
        user_email,
        type,
        name,
        value
    )
VALUES
    (
        'pmacdonald15@gmail.com',
        1,
        'Work',
        '403-975-5053'
    ),
    (
        'pmacdonald15@gmail.com',
        2,
        'Work',
        'pmacdonald15@gmail.com'
    ),
    (
        'pmacdonald15@gmail.com',
        4,
        'Work',
        'https://www.patmac.org'
    ),
    (
        'pmacdonald15@gmail.com' ,
        6,
        'Work',
        'patrick-macdonald-231640285'
    ),
    (
        'pmacdonald15@gmail.com',
        7,
        'Work',
        'Pmacdon15'
    );

    select * from  CCContactInfo;