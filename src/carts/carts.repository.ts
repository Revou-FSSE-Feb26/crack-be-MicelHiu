import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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

    
}
