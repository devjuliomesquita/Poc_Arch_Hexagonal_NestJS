create table card_transactions(
    ct_id varchar,
    ct_card_number text,
    ct_description text,
    ct_currency text,
    ct_amount numeric(38,2),
    ct_date timestamp
);

insert into card_transactions(ct_id, ct_card_number, ct_description, ct_currency, ct_amount, ct_date)
values ('c4eb989a-54c0-40a2-b206-6622683c096e', '1234', 'Google', 'USD', 20, '2024-07-13T10:00:00');
insert into card_transactions(ct_id, ct_card_number, ct_description, ct_currency, ct_amount, ct_date)
values ('77dd3d28-95f5-4e19-9750-333fccaecb1c', '1234', 'Amazon', 'BLR', 290, '2024-07-13T10:01:00');
insert into card_transactions(ct_id, ct_card_number, ct_description, ct_currency, ct_amount, ct_date)
values ('7712a6bc-f2ee-42af-8791-e15d0fc28d6c', '1234', 'Shoppe', 'BLR', 467.50, '2024-07-13T10:20:00');
insert into card_transactions(ct_id, ct_card_number, ct_description, ct_currency, ct_amount, ct_date)
values ('588bd1b3-5113-4ab0-ad92-83e494001e11', '1234', 'Aliexpress', 'BLR', 250, '2024-08-13T10:00:00');
insert into card_transactions(ct_id, ct_card_number, ct_description, ct_currency, ct_amount, ct_date)
values ('84ff55f2-0283-4dd9-b55e-62596b593e07', '1234', 'Mercado Livre', 'BLR', 1000, '2024-08-13T08:00:00');
insert into card_transactions(card_transaction_id, card_transaction_card_number, card_transaction_description, card_transaction_currency, card_transaction_amount, card_transaction_date)
values ('5459ff55-f7a3-4f34-bd95-e7b578cec2bc', '1234', 'Ebay', 'USD', 600, '2024-08-13T09:00:00');