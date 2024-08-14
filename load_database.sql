
create table tb_products (
    product_id uuid not null primary key,
    product_description varchar(255),
    product_price numeric(38,2)
);

insert into tb_products(product_id, product_description, product_price)
values ('c4eb989a-54c0-40a2-b206-6622683c096e', 'Produto do tipo 1', 200);
insert into tb_products(product_id, product_description, product_price)
values ('61a77341-f6c4-46a4-8802-40c59e793f0b', 'Produto do tipo 2', 100);
insert into tb_products(product_id, product_description, product_price)
values ('5f5160c9-2e16-42fb-a376-c545000a0603', 'Produto do tipo 3', 300);
insert into tb_products(product_id, product_description, product_price)
values ('dfa5b540-a8e0-41c9-89a4-3fc934766df2', 'Produto do tipo 4', 400);

create table tb_coupons (
    coupon_id uuid not null primary key,
    coupon_code varchar(255),
    coupon_percentage numeric(38,2),
    coupon_expire_date timestamp
);

insert into tb_coupons(coupon_id, coupon_code, coupon_percentage, coupon_expire_date)
values ('d74fa016-8bed-4f32-a4f1-b41ec3d0a95d', '1234', 0.1, '2024-08-01T10:00:00');
insert into tb_coupons(coupon_id, coupon_code, coupon_percentage, coupon_expire_date)
values ('dfc1e4a5-22df-4894-9a23-6d4bcabe1e10', '4321', 0.05, '2024-08-10T10:00:00');

create table tb_orders(
    order_id uuid not null primary key,
    order_coupon_code varchar(255),
    order_email varchar(255),
    order_total numeric(38,2)
);

create table tb_itens(
    item_id uuid not null primary key,
    item_product_id uuid,
    item_order_id uuid,
    item_price numeric(38,2),
    item_quantity integer
);