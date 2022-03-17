CREATE TABLE IF NOT EXISTS df.users
(
    id_user varchar(50) NOT NULL,
    username varchar(500) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(90) NOT NULL,
    url varchar(500) NULL DEFAULT '',
    PRIMARY KEY (id_user)
);

CREATE TABLE IF NOT EXISTS df.task
(
    id_task varchar(50) NOT NULL,
    title varchar(50) NOT NULL,
    descriptio varchar(500) NOT NULL,
    url varchar(500) NULL DEFAULT '',
    done boolean NULL DEFAULT false,
    id_user varchar(50),
    PRIMARY KEY (id_task),
    FOREIGN KEY (id_user)
        REFERENCES df.users(id_user)
);