CREATE TYPE users_role as ENUM (
    'admin',
    'user'
);

CREATE TYPE rooms_type as ENUM (
    'PC',
    'PS'
);

CREATE TYPE booking_status as ENUM (
    'confirmed',
    'ongoing',
    'canceled',
    'completed'
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    full_name varchar NOT NULL,
    nickname varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    contact varchar NOT NULL,
    password varchar NOT NULL,
	role users_role NOT NULL,
    points integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
	id varchar PRIMARY KEY UNIQUE,
	name varchar NOT NULL,
	description varchar NOT NULL,
	price numeric(12,2) NOT NULL,
	image varchar NOT NULL,
	type rooms_type NOT NULL,
	stock integer NOT NULL
);

CREATE TABLE discounts (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	name varchar NOT NULL,
	value numeric(12,2) NOT NULL,
	valid_from timestamp NOT NULL,
	valid_until timestamp NOT NULL,
	created_at timestamp NOT NULL DEFAULT current_timestamp,
	is_active boolean NOT NULL
);

CREATE TABLE carts (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	room_id varchar NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
	quantity integer NOT NULL,
	discount_id UUID REFERENCES discounts(id) ON DELETE RESTRICT,
	discount_value numeric(12,2),
	date_play date NOT NULL,
	time_start time NOT NULL,
	time_end time NOT NULL,
	total_price numeric(12,2) NOT NULL,
	created_at timestamp NOT NULL
);

CREATE TABLE bookings (
	code varchar PRIMARY KEY,
	user_id UUID NOT NULL REFERENCES users(id),
	room_id varchar NOT NULL REFERENCES rooms(id),
	guest_name varchar NOT NULL,
	guest_contact VARCHAR NOT NULL,
	time_start time NOT NULL,
	time_end time NOT NULL,
	date_play date NOT NULL,
	unit_price numeric(12,2) NOT NULL,
	discount_id uuid REFERENCES discounts(id),
	discount_value numeric(12,2),
	quantity integer NOT NULL,
	total_price numeric(12,2) NOT NULL,
	status booking_status NOT NULL,
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE visitors (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	booking_code varchar NOT NULL REFERENCES bookings(code),
	user_id uuid,
	guest_name varchar NOT NULL,
	checked_in timestamp NOT NULL,
	created_at timestamp NOT NULL DEFAULT current_timestamp
);