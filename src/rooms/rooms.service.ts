import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  getAllRooms() {
    return this.roomsRepository.getAllRooms();
  }

  getRoomById(id: string) {
    const room = this.roomsRepository.getRoomById(id);
    if(!room) throw new NotFoundException("Room Not Found");
    return room;
  }
} 
