-- Table: public.reviews

DROP TABLE public.reviews;

CREATE TABLE public.reviews
(
    review_id integer NOT NULL,
    restaurant_id integer,
    first_name character varying COLLATE pg_catalog."default",
    last_name character varying COLLATE pg_catalog."default",
    city character varying COLLATE pg_catalog."default",
    num_reviews integer,
    overall integer,
    food integer,
    service integer,
    ambience integer,
    dine_date character varying COLLATE pg_catalog."default",
    noise integer,
    recommend boolean,
    comments character varying COLLATE pg_catalog."default",
    filter_tag character varying COLLATE pg_catalog."default",
    vip boolean,
    color character varying COLLATE pg_catalog."default",
    CONSTRAINT reviews_pkey PRIMARY KEY (review_id)
);

CREATE UNIQUE INDEX pki_review_id
    ON reviews USING btree
    (review_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX i_restaurant_id
    ON reviews USING btree
    (restaurant_id ASC NULLS LAST)
    TABLESPACE pg_default;


ALTER TABLE public.reviews
    OWNER to postgres;