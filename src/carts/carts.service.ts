import { Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
    constructor(
        private readonly cartsRepository: CartsRepository
    ) {}
    async getAllCarts(userId: string) {
        return this.cartsRepository.getAllCarts(userId);
    }

    async getCartById(id: string, userId: string) {
        const data = await this.cartsRepository.getCartById(id, userId);
        if(!data) throw new NotFoundException('Cart not found');
        return data;
    }

    async createCart(dto: CreateCartDto, userId: string) {
        const room = await this.cartsRepository.getRoomById(dto.room_id);
        if(!room) throw new NotFoundException('Room not found');

        if(room.stock < 1) throw new NotFoundException('Room is out of stock');

        return this.cartsRepository.createCart({...dto, user_id: userId});
    }

    async updateCart(dto: CreateCartDto, id: string, userId: string) {
        const oldCart = await this.cartsRepository.getCartById(id, userId);
        if(!oldCart) throw new NotFoundException('Cart not found');

        const room = await this.cartsRepository.getRoomById(dto.room_id);
        if(!room) throw new NotFoundException('Room not found');

        if(room.stock < 1) throw new NotFoundException('Room is out of stock');

        return this.cartsRepository.updateCart(dto, id);
    }

    async deleteCart(id: string, userId: string) {
        const cart = await this.cartsRepository.getCartById(id, userId);
        if(!cart) throw new NotFoundException('Cart not found');

        return this.cartsRepository.deleteCart(id, userId);
    }
}
