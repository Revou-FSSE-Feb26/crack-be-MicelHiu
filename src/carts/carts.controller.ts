import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}
  @Get()
  getAllCarts(@CurrentUser() user: {id: string}) {
    return this.cartsService.getAllCarts(user.id);
  }

  @Get(':id')
  getCartById(@CurrentUser() user: {id: string}, @Param('id') id: string) {
    return this.cartsService.getCartById(id, user.id);
  }

  @Post()
  createCart(@CurrentUser() user: {id: string}, @Body() dto: CreateCartDto) {
    return this.cartsService.createCart(dto, user.id);
  }

  @Patch(':id')
  updateCarts(@Param('id') id: string, @CurrentUser() user: {id: string}, @Body() dto: UpdateCartDto) {
    return this.cartsService.updateCart(dto, id, user.id);
  }

  @Delete(':id')
  deleteCart(@Param('id') id: string, @CurrentUser() user: {id: string}) {
    return this.cartsService.deleteCart(id, user.id);
  }
}
