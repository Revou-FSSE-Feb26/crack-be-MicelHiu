import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAllRooms() {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  getRoomById(@Param('id') id: string) {
    return this.roomsService.getRoomById(id);
  }
}
