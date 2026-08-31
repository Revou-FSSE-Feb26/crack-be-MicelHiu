import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ 
    adapter,
});

async function main() {
    const saltRounds = 10;

    const usersData = [
        {
            full_name: 'Michelle Hiu',
            nickname: 'Micel',
            email: 'micelasatu@gmail.com',
            contact: '08119505559',
            password: 'micel123',
            role: 'admin' as const,
            points: 0,
        },
        {
            full_name: 'Mikhael Yordan Hiu',
            nickname: 'Mikel',
            email: 'mikhael@gmail.com',
            contact: '0818308030',
            password: 'mikel123',
            role: 'user' as const,
            points: 0,
        },
    ];

    for(const user of usersData) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        await prisma.users.upsert({
            where: { email: user.email },
            update: {},
            create: {
                full_name: user.full_name,
                nickname: user.nickname,
                email: user.email,
                contact: user.contact,
                password: hashedPassword,
                role: user.role,
                points: user.points,
            },
        });
    }
    console.log('✅ Users seeded');

    const roomsData = [
    {
        id: 'PC-01',
        name: 'PC Regular',
        description:
            'Monitor: 24inch 144Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 16GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1',
        price: 10000,
        image: 'https://i.imgur.com/qZJmXPw_d.jpeg?maxwidth=520&shape=thumb&fidelity=high',
        type: 'PC' as const,
        stock: 20,
    },
    {
        id: 'PC-02',
        name: 'PC VIP Squad',
        description:
            'Monitor: 24inch 144Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 16GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1',
        price: 20000,
        image: 'https://i.imgur.com/3zfJups_d.png?maxwidth=520&shape=thumb&fidelity=high',
        type: 'PC' as const,
        stock: 5,
    },
    {
        id: 'PC-03',
        name: 'PC VIP Stream',
        description:
            'Monitor: 24inch 256Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 32GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1; Webcam: Logitech',
        price: 25000,
        image: 'https://i.imgur.com/fb7xCpN_d.png?maxwidth=520&shape=thumb&fidelity=high',
        type: 'PC' as const,
        stock: 5,
    },
    {
        id: 'PS-01',
        name: 'PS Regular',
        description:
            'TV: 43inch 4K 120Hz; PlayStation 5 Slim (1 TB); 2 DualSense Controller; High-Speed Fiber Internet',
        price: 20000,
        image: 'https://i.imgur.com/400BQ7V_d.png?maxwidth=520&shape=thumb&fidelity=high',
        type: 'PS' as const,
        stock: 10,
    },
    {
        id: 'PS-02',
        name: 'PS VIP',
        description:
            'TV: 43inch 4K 120Hz; PlayStation 5 Slim (1 TB); 4 DualSense Controller; High-Speed Fiber Internet',
        price: 40000,
        image: 'https://i.imgur.com/Sjp8wji_d.png?maxwidth=520&shape=thumb&fidelity=high',
        type: 'PS' as const,
        stock: 5,
    },
    ];

    for (const room of roomsData) {
        await prisma.rooms.upsert({
        where: {id: room.id},
        update: {},
        create: room,
        });
    }
    console.log('✅ Rooms seeded');

    const existingDiscount = await prisma.discounts.findFirst({
        where: {name: 'discount.name'},
    });

    if(!existingDiscount) {
        await prisma.discounts.create({
            data: {
                name: 'Night Owl',
                value: 5000,
                valid_from: new Date('2026-09-01'),
                valid_until: new Date('2026-09-30'),
                is_active: false,
            },
        });
    }
    console.log('✅ Discounts seeded');
    console.log('🎉 Seeding selesai');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    })