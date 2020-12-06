create if not exists table product_category (
    product_category_id int generated always as identity,
    parent_product_category_id int,
    product_category_name name not null,
    primary key (product_category_id),
    constraint fk_parent_product_category
        foreign key(parent_product_category_id)
            references product_category(product_category_id),
)

create if not exists table products (
    product_id int generated always as identity,
    product_category_id int,
    product_name name not null,
    product_number varchar(25) not null,
    color varchar(15) not null,
    standard_cost money not null,
    size nvarchar(5),
    primary key(product_id),
    constraint fk_product_category
        foreign key(product_category_id)
            references product_category(product_category_id),
)

create table if not exists users ( 
    user_id int generated always as identity,
    email varchar(30) not null,
    password varchar(20)
);

insert into users (email, password) values ('jerwier420@gmail.com', 'jeremi');