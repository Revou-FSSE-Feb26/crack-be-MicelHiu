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
                image: true,
                stock: true
            }
        });
    }

    createCart(dto: CreateCartDto & {user_id: string}) {
        return this.prisma.carts.create({
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
        });
    }

    updateCart(dto: UpdateCartDto, id: string) {
        return this.prisma.carts.update({
            where: { id },
            data: dto,
            include: {
                rooms: { select: {name: true, stock: true} }
            }
        });
    }

    async deleteCart(id: string, userId: string) {
        return this.prisma.carts.delete({
            where: {id, user_id: userId}
        })
    }
}
