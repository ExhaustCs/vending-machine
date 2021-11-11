-- CREATE DATABASE vending_machine;

CREATE TABLE items (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    description VARCHAR(50) NOT NULL UNIQUE,
    cost NUMERIC NOT NULL,
    quantity INT NOT NULL CONSTRAINT quantity_nonnegative CHECK (quantity >= 0)
);


CREATE TABLE purchases (
    money_given NUMERIC,
    money_needed NUMERIC,
    total_money NUMERIC
);

CREATE TABLE purchase_history (
    description VARCHAR(50),
    posting_date TIMESTAMP NOT NULL DEFAULT current_timestamp
    
);

-- Add items into the vending machine
INSERT INTO items (description, cost, quantity) VALUES ('Snickers Bar', 0.88, 50);
INSERT INTO items (description, cost, quantity) VALUES ('Clif Bars', 0.65, 50);
INSERT INTO items (description, cost, quantity) VALUES ('Pop-Tarts', 1.28, 50);
INSERT INTO items (description, cost, quantity) VALUES ('Sun Chips', 0.50, 50);

-- Add money to total_money
INSERT INTO purchases(total_money) VALUES (200);

-- Update data entries
-- UPDATE items SET quantity = (quantity - 1) WHERE id = itemId RETURNING * ;
-- UPDATE purchases SET money_given = '', money_required = "" RETURNING *;
-- INSERT INTO purchase_history (description) VALUES ('')



-- Modify column to have the unique constraint 
-- ALTER TABLE items ADD UNIQUE (description);

-- -- Modify column to have the unique constraint 
-- -- alter table stock_availability
-- --    add constraint stock_nonnegative check (stock_quantity >= 0);

-- ALTER TABLE items ADD CONSTRAINT quantity_nonnegative CHECK (quantity >= 0);


-- -- INSERT ... ON CONFLICT DO NOTHING/UPDATE
-- INSERT INTO items (description, cost, quantity) VALUES ('Snickers Bar', 0.88, 50); 


-- -- Delete Entires(rows)
-- DELETE FROM items WHERE description = '';
