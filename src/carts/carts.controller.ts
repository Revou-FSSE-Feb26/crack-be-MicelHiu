import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
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
  getAllCarts(@CurrentUser() user: {sub: string}) {
    return this.cartsService.getAllCarts(user.sub);
  }

  @Get(':id')
  getCartById(@CurrentUser() user: {sub: string}, id: string) {
    return this.cartsService.getCartById(id, user.sub);
  }

  @Post()
  createCart(@CurrentUser() user: {sub: string}, @Body() dto: CreateCartDto) {
    return this.cartsService.createCart(dto, user.sub);
  }

  @Patch(':id')
  updateCarts(@Param('id') id: string, @CurrentUser() user: {sub: string}, @Body() dto: UpdateCartDto) {
    return this.cartsService.updateCart(dto, user.sub, id);
  }

  @Delete(':id')
  deleteCart(@Param('id') id: string, @CurrentUser() user: {sub: string}) {
    return this.cartsService.deleteCart(id, user.sub);
  }
}
