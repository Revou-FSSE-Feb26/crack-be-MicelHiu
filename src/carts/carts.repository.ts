import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";

@Injectable()
export class CartsRepository {
    constructor(private readonly prisma: PrismaService) {}
    getAllCarts(userId: string) {
        return this.prisma.carts.findMany({
            where: { user_id: userId }
        });
    }

    getCartById(id: string, userId: string) {
        return this.prisma.carts.findUnique({
            where: {id, user_id: userId}
        });
    }

    getRoomById(room_id: string) {
        return this.prisma.rooms.findUnique({
            where: {id: room_id},
            select: {
                name: true, 
                price: true, 
                type: true, 
                image: true
            }
        });
    }

    createCart(dto: CreateCartDto, newStock: number) {
        this.prisma.carts.create({
            data: dto,
            include: {
                rooms: {
                    select: {
                        name: true,
                        price: true,
                        type: true,
                        image: true,
                        stock: true,
                    }
                }
            }
        }),
        this.prisma.rooms.update({
            where: {
                id: dto.room_id,
            },
            data: {
                stock: newStock,
            }
        });
    }

    updateCart(dto: UpdateCartDto, id: string, newStock: number, room_id: string) {
        this.prisma.carts.update({
            where: { id },
            data: dto,
            include: {
                rooms: { select: {name: true, stock: true} }
            }
        }),
        this.prisma.rooms.update({
            where: {
                id: room_id,
            },
            data: {
                stock: newStock,
            }
        });
    }
}
