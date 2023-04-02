drop table if exists comments;
drop table if exists users;
drop table if exists art;

create table public.art
(
    id                   integer not null
        constraint art_pk
            primary key,
    accession_number     text,
    artist               text,
    "artistRole"         text,
    "artistId"           integer,
    title                text,
    "dateText"           text,
    medium               text,
    "creditLine"         text,
    year                 integer,
    "acquisitionYear"    integer,
    dimensions           text,
    width                integer,
    height               integer,
    depth                text,
    units                text,
    inscription          text,
    "thumbnailCopyright" text,
    "thumbnailUrl"       text,
    url                  text
);

alter table public.art
    owner to postgres;

create table public.users
(
    name     text    not null,
    age      integer not null,
    location text,
    id       integer generated always as identity
        constraint users_pk
            primary key
);

alter table public.users
    owner to postgres;

create table public.comments
(
    id       integer generated always as identity (minvalue 1000),
    content  text,
    "userId" integer
        constraint comments_users_id_fk
            references public.users,
    name     text,
    "artId"  integer not null
        constraint comments_art_id_fk
            references public.art
);

alter table public.comments
    owner to postgres;



COPY art
    FROM 'D:\dev\gantri-challenge\docs\the-tate-collection.csv'
    DELIMITER ';'
    CSV HEADER;

