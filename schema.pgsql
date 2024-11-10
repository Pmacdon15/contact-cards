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
        name VARCHAR(255) NOT NULL,
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
    ('Web Site');

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
        'Home',
        '403-975-5053'
    ),
    (
        'pmacdonald15@gmail.com',
        2,
        'Home',
        'pmacdonald15@gmail.com'
    ),
    (
        'pmacdonald15@gmail.com',
        4,
        'Personal',
        'https://www.patmac.org'
    );

-- ('pmacdonald15@gmail.com', 5, 'Personal', 'This will Be a url');