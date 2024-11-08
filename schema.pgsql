
DROP TABLE IF EXISTS CCContactInfo;
DROP TABLE IF EXISTS CCContactTypes;

CREATE TABLE CCContactTypes
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE CCContactInfo
(
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    type INTEGER REFERENCES CCContactTypes(id),
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL
);

INSERT INTO CCContactTypes
    (name)
VALUES
    ('Phone Number'),
    ('Email'),
    ('Address'),
    ('Web Site'),
    ('ProfileImageUrl');

    INSERT INTO CCContactInfo
        (user_email, type, name, value)
    VALUES
        ('pmacdonald15@gmail.com', 1, 'Home', '403-975-5053'),
        ('pmacdonald15@gmail.com', 2, 'Home', 'pmacdonald15@gmail.com'),
        ('pmacdonald15@gmail.com', 4, 'Personal', 'https://www.patmac.org');
        -- ('pmacdonald15@gmail.com', 5, 'Personal', 'This will Be a url');