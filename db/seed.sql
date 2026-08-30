INSERT INTO users (full_name, nickname, email, contact, password, role, points) VALUES
('Michelle Hiu', 'Micel', 'micelasatu@gmail.com', '08119505559', 'micel123', 'admin', '0'),
('Mikhael Yordan Hiu', 'Mikel', 'mikhael@gmail.com', '0818308030', 'mikel123', 'user', '0');

INSERT INTO rooms VALUES
('PC-01', 'PC Regular', 'Monitor: 24inch 144Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 16GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1', '10000', 'https://i.imgur.com/qZJmXPw_d.jpeg?maxwidth=520&shape=thumb&fidelity=high', 'PC', '20'),
('PC-02','PC VIP Squad', 'Monitor: 24inch 144Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 16GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1','20000','https://i.imgur.com/3zfJups_d.png?maxwidth=520&shape=thumb&fidelity=high', 'PC', 5),
('PC-03','PC VIP Stream','Monitor: 24inch 256Hz; PC: CPU Intel Core i7-12400F, NVIDIA RTX 4060, RAM 32GB DDR5, Storage SSD 1TB; Keyboard: Mechanical hot swap; Mouse: Razer Cobra; Headset: Virtual 7.1; Webcam: Logitech','25000', 'https://i.imgur.com/fb7xCpN_d.png?maxwidth=520&shape=thumb&fidelity=high','PC','5'),
('PS-01','PS Regular','TV: 43inch 4K 120Hz; PlayStation 5 Slim (1 TB); 2 DualSense Controller; High-Speed Fiber Internet','20000','https://i.imgur.com/400BQ7V_d.png?maxwidth=520&shape=thumb&fidelity=high','PS', '10'),
('PS-02','PS VIP','TV: 43inch 4K 120Hz; PlayStation 5 Slim (1 TB); 4 DualSense Controller; High-Speed Fiber Internet','40000','https://i.imgur.com/Sjp8wji_d.png?maxwidth=520&shape=thumb&fidelity=high','PS','5');

INSERT INTO discounts (name, value, valid_from, valid_until, is_active) VALUES
('Night Owl', '5000','2026-09-01','2026-09-30','false');