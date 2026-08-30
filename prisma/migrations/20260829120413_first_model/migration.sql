-- CreateEnum
CREATE TYPE "users_role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "rooms_type" AS ENUM ('PC', 'PS');

-- CreateEnum
CREATE TYPE "booking_status" AS ENUM ('confirmed', 'ongoing', 'canceled', 'completed');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "users_role" NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "image" TEXT NOT NULL,
    "type" "rooms_type" NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "value" DECIMAL(12,2) NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "room_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount_id" UUID,
    "discount_value" DECIMAL(12,2),
    "date_play" DATE NOT NULL,
    "time_start" TIME NOT NULL,
    "time_end" TIME NOT NULL,
    "total_price" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "code" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "room_id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "guest_contact" TEXT NOT NULL,
    "time_start" TIME NOT NULL,
    "time_end" TIME NOT NULL,
    "date_play" DATE NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "discount_id" UUID,
    "discount_value" DECIMAL(12,2),
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(12,2) NOT NULL,
    "status" "booking_status" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_code" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "guest_name" TEXT NOT NULL,
    "checked_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_booking_code_fkey" FOREIGN KEY ("booking_code") REFERENCES "bookings"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
