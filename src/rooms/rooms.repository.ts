import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomsRepository {
    private rooms: CreateRoomDto[] = [
        {
            "name": "PC REGULAR",
            "description": "Monitor: 24inch 144Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 16GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1",
            "price": 10000,
            "image": "https://i.imgur.com/qZJmXPw_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
            "category": "PC",
            "quantity": 20,
            "id": "PC-01"
        },
        {
            "name": "PC VIP SQUAD",
            "description": "Monitor: 24inch 144Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 16GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1",
            "price": 20000,
            "image": "https://i.imgur.com/3zfJups_d.png?maxwidth=520&shape=thumb&fidelity=high",
            "category": "PC",
            "quantity": 5,
            "id": "PC-02"
        },
        {
            "name": "PC VIP STREAM",
            "description": "Monitor: 24inch 256Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 32GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1; Webcam: Logitech",
            "price": 25000,
            "image": "https://i.imgur.com/fb7xCpN_d.png?maxwidth=520&shape=thumb&fidelity=high",
            "category": "PC",
            "quantity": 5,
            "id": "PC-03"
        },
        {
            "name": "PS REGULAR",
            "description": "TV: 43inch 4K 120Hz; PlayStation 5 Slim (1 TB); 2 DualSense Controller; High-Speed Fiber Internet",
            "price": 20000,
            "image": "https://i.imgur.com/400BQ7V_d.png?maxwidth=520&shape=thumb&fidelity=high",
            "category": "PS",
            "quantity": 10,
            "id": "PS-01"
        },
        {
            "name": "PS VIP",
            "description": "TV: 43inch 4K 120Hz; PlayStation 5 Slim (1 TB); 4 DualSense Controller; High-Speed Fiber Internet",
            "price": 40000,
            "image": "https://i.imgur.com/Sjp8wji_d.png?maxwidth=520&shape=thumb&fidelity=high",
            "category": "PS",
            "quantity": 5,
            "id": "PS-02"
        }
    ]

    getAllRooms() {
        return this.rooms;
    }

    getRoomById(id: string) {
        return this.rooms.find((room) => room.id === id);
    }

    patchRoom(id: string, dto: UpdateRoomDto) {
        const currentData = this.getRoomById(id);
        if(!currentData) return undefined;
        Object.assign(currentData, dto);
        return currentData;
    }
}