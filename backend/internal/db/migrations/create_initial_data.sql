INSERT INTO users (fullname, username, email, password, role, img, level)
VALUES 
    ('John Doe', 'john_doe', 'john@example.com', '12345678', 'admin', '', 'advanced'),
    ('Jane Smith', 'jane_smith', 'jane@example.com', '12345678', 'organizer', '', 'intermediate'),
    ('Alice Johnson', 'alice_johnson', 'alice@example.com', '12345678', 'user', '', 'beginner');

-- Insert initial data for events
INSERT INTO events (event_name, organizer_id, date_start, date_end, location, description, requirements, preparation, price, level)
VALUES
('Annual City Marathon', 'badfbf3a-bde8-48cb-9908-53afab1575e5', '2024-10-15 07:00:00+00', '2024-10-15 12:00:00+00', 'Downtown Metropolitan Area', 'The Annual City Marathon invites runners of all ages and abilities to participate in a challenging and rewarding 26.2-mile race through the heart of our bustling city. This event not only tests physical endurance and mental toughness but also offers a scenic tour of the city’s iconic landmarks, vibrant neighborhoods, and beautiful parks. Participants will experience a supportive atmosphere, with thousands of spectators cheering them on, making it a truly memorable event for both newcomers and seasoned marathoners. The marathon is also an excellent opportunity for athletes to set personal bests or to qualify for other major national and international marathons.', 'All participants must be 18 years or older and provide a medical certificate confirming their ability to participate in a long-distance running event. Registration must be completed by the deadline, and a waiver form acknowledging the risks associated with marathon running must be signed. It is essential for participants to have undergone at least several months of training specifically for a marathon to ensure safety and competitive performance.', 'Preparation for the Annual City Marathon should include a comprehensive training plan that starts at least 16 weeks before the event. Runners should gradually increase their mileage, incorporate speed and hill workouts, and practice long-distance runs that mimic the marathon’s terrain and conditions. Nutrition and hydration strategies should also be refined during training. Participants should arrive at the event well-rested, hydrated, and equipped with their running gear, personal hydration supplies, and any necessary personal medical items.', null, 'Begginer'),
('Citywide Youth Soccer Tournament', 'c85f0e1b-f78e-4521-bdbe-12737e751fde', '2024-06-20 08:00:00+00', '2024-06-22 17:00:00+00', 'Regional Sports Complex', 'The Citywide Youth Soccer Tournament aims to promote youth sportsmanship and athletic development through competitive soccer matches among local and visiting teams. This three-day event provides young athletes aged 6 to 18 with an opportunity to showcase their skills, engage in healthy competition, and learn valuable team-building and leadership skills. Teams are grouped by age and skill level to ensure fair play. In addition to the games, the event includes workshops on sports nutrition, injury prevention, and career opportunities in sports.', 'Participants must be registered through their respective school sports teams or local soccer clubs. All players are required to wear proper soccer attire, including jerseys, shorts, soccer socks, shin guards, and suitable cleats. A parental consent form must be completed for each player. Teams must ensure that all players are insured and adhere to the tournament rules and code of conduct.', 'Teams should engage in regular practice sessions leading up to the tournament, focusing on both individual skills and team tactics. Coaches should organize scrimmages to simulate tournament play and help players adjust to competitive settings. Additionally, attending pre-tournament tactical meetings and ensuring all equipment and uniforms are prepared and compliant with tournament standards are crucial.', 50.00, 'Intermediate'),
('Winter Sports Clinic', 'cf9e2a4b-86c1-4b83-9a58-0ebc64b3018b', '2024-01-05 09:00:00+00', '2024-01-07 16:00:00+00', 'Mountain Resort', 'Our Winter Sports Clinic offers a unique opportunity for enthusiasts to improve their skiing and snowboarding skills under the guidance of professional instructors. This three-day clinic caters to all skill levels, from beginners to advanced participants. The program includes personalized instruction on technique improvement, equipment handling, and safety measures. Additionally, participants will learn about avalanche safety and have the opportunity to engage in sessions about winter wilderness survival.', 'Participants must be at least 12 years of age and possess basic proficiency in skiing or snowboarding. A health and safety waiver must be signed, and participants under 18 must have parental consent. Personal or rented winter sports equipment must meet safety standards.', 'Participants should prepare for the clinic by conditioning their bodies to handle the physical demands of winter sports. This includes strength training, flexibility exercises, and cardio workouts. Familiarizing oneself with the equipment and ensuring it is properly fitted and in good condition is essential. Attendees should also study basic avalanche safety guidelines and be prepared for varying weather conditions at the mountain resort.', null, 'Begginer'),
('Beach Volleyball Open', '1ecd39d4-9037-4cd5-9c46-f63f93c978c6', '2024-08-15 10:00:00+00', '2024-08-17 18:00:00+00', 'City Beach', 'The Beach Volleyball Open is a dynamic event attracting both amateur and professional players to the sunny shores of our city beach. This tournament promotes physical fitness, teamwork, and the fun of beach sports. Competitors participate in teams of two, playing multiple rounds to claim the championship title. The event not only includes competitive matches but also offers clinics led by professional players, strategies for improving play, and social activities in the evening.', 'Participants must be over 16 years of age and capable of playing at a competitive level. Teams must register before the deadline, and each player is required to sign a liability waiver. Standard beach volleyball equipment, including weather-appropriate sportswear and sunglasses, must be used.', 'Preparation for the Beach Volleyball Open should involve regular practice in sand conditions, focusing on agility, speed, and power. Players should familiarize themselves with the rules of beach volleyball if not already known. It’s also beneficial to engage in exercises that enhance balance and flexibility. Players should ensure they are well-hydrated and protected against the sun for the duration of the event.', 75.00, 'Advanced'),
('Masters Swimming Championships', 'ec701b3d-22ca-4911-937c-4f306afceaae', '2024-11-25 06:00:00+00', '2024-11-27 20:00:00+00', 'Olympic Pool Complex', 'The Masters Swimming Championships is a prestigious event that welcomes swimmers aged 25 and older from various skill levels to compete in a professionally timed and adjudicated environment. The championships are held over three days and include a wide range of swimming styles and distances, catering to both competitive swimmers and those looking to set personal bests in a supportive community. In addition to the races, the event features workshops on advanced swimming techniques, injury prevention, and the importance of mental preparation for competitive swimming.', 'All participants must register prior to the event and provide proof of age and membership in a recognized swimming association. Competitors are required to wear proper swimwear that complies with international swimming federation regulations. A medical certificate confirming fitness for competitive swimming is necessary.', 'Swimmers should engage in a disciplined training regimen in the months leading up to the championships, focusing on improving technique, endurance, and speed. It is crucial to simulate race conditions during practice to adapt to the competitive environment. Mental preparation techniques such as visualization and relaxation exercises can also be beneficial. Participants should arrive at the event well-rested and ready to compete at their highest level.', 120.00, 'Begginer');

-- Insert initial data for challenges
INSERT INTO challenges (challenge_name, organization_name, organization_link, deadline, aim, award, overview, details_rules)
VALUES
    ('Fitness Challenge', 'Sport Fitness Club', 'https://www.nike.com/', '2024-05-31', 'Improve overall fitness level', 'Gift vouchers and trophies', 'Join our fitness challenge to improve your health and fitness!', 'Complete a series of workouts and challenges over the course of a month'),
    ('Swimming Competition', 'City Swimming Association', 'https://www.nike.com/', '2024-06-30', 'Compete in various swimming events', 'Medals and certificates', 'Get ready to dive into the pool and showcase your swimming skills!', 'Participate in different swimming events such as freestyle, backstroke, and butterfly strokes'),
    ('Cycling Tour', 'Local Cycling Club', 'https://www.nike.com/', '2024-07-31', 'Explore scenic routes on a bike', 'T-shirts and refreshments', 'Join our cycling tour and discover beautiful landscapes on two wheels!', 'Ride through designated routes and checkpoints to complete the tour');

-- Insert initial data for categories
INSERT INTO categories (name)
VALUES
    ('Team Sports'),
    ('Athletics Sports'),
    ('Individual Sports'),
    ('Fitness'),
    ('Water Sports'),
    ('Cycling');

-- Insert initial data for category relations for users
INSERT INTO category_relation (category_id, user_id, flag)
VALUES
    (1, '3428a92e-aac0-4f3f-a55f-9eb5265e0cd7', 'user'),
    (2, '3428a92e-aac0-4f3f-a55f-9eb5265e0cd7', 'user'),
    (3, '7482b24c-30ff-4685-899b-d5dce722b982', 'user'),
    (4, '7482b24c-30ff-4685-899b-d5dce722b982', 'user'),
    (5, 'badfbf3a-bde8-48cb-9908-53afab1575e5', 'user'),
    (6, 'badfbf3a-bde8-48cb-9908-53afab1575e5', 'user');

-- Insert initial data for category relations for events
INSERT INTO category_relation (category_id, event_id, flag)
VALUES
    (1, 'b923b3a0-57db-4dd6-848d-2dfbf70133ec', 'event'), -- Soccer Tournament
    (2, '004af7c0-57cc-4844-b9fb-40aee1961d46', 'event'), -- Marathon Race
    (3, 'f80f0028-ecb7-4f88-ae30-e64e56af14db', 'event'); -- Basketball Championship

-- Insert initial data for category relations for challenges
INSERT INTO category_relation (category_id, challenge_id, flag)
VALUES
    (4, '0ff0654e-f6a7-40f3-9a7f-97e74d77b91e', 'challenge'), -- Fitness Challenge
    (5, 'ddd04098-0d21-4c0f-9b13-ef5a0f14c62c', 'challenge'), -- Swimming Competition
    (6, 'c8237aec-f471-47ba-8289-f7d96d83cbf4', 'challenge'); -- Cycling Tour

INSERT INTO event_participant (user_id, event_id)
VALUES
    ('3428a92e-aac0-4f3f-a55f-9eb5265e0cd7', 'b923b3a0-57db-4dd6-848d-2dfbf70133ec'),
    ('7482b24c-30ff-4685-899b-d5dce722b982', 'b923b3a0-57db-4dd6-848d-2dfbf70133ec'),
    ('badfbf3a-bde8-48cb-9908-53afab1575e5', 'b923b3a0-57db-4dd6-848d-2dfbf70133ec'),
    ('c85f0e1b-f78e-4521-bdbe-12737e751fde', '004af7c0-57cc-4844-b9fb-40aee1961d46'),
    ('cf9e2a4b-86c1-4b83-9a58-0ebc64b3018b', 'f80f0028-ecb7-4f88-ae30-e64e56af14db'),
    ('ec701b3d-22ca-4911-937c-4f306afceaae', 'f80f0028-ecb7-4f88-ae30-e64e56af14db');

INSERT INTO event_feedback (user_id, event_id, comment, img, rate)
VALUES
    ('3428a92e-aac0-4f3f-a55f-9eb5265e0cd7', 'b923b3a0-57db-4dd6-848d-2dfbf70133ec', 'Wow, what a nail-biter! That last-minute goal had me on the edge of my seat the entire match. Talk about sports drama at its finest!', null, 4),
    ('7482b24c-30ff-4685-899b-d5dce722b982', 'b923b3a0-57db-4dd6-848d-2dfbf70133ec', 'Incredible athleticism on display today! These athletes are pushing the boundaries of what we thought was possible. Hats off to them for their dedication and hard work.', null, 4),
    ('badfbf3a-bde8-48cb-9908-53afab1575e5', 'b923b3a0-57db-4dd6-848d-2dfbf70133ec', 'I can not believe the underdog pulled off such an upset victory! Sports never fail to surprise and inspire. Anything can happen on game day!', null, 3),
    ('c85f0e1b-f78e-4521-bdbe-12737e751fde', '004af7c0-57cc-4844-b9fb-40aee1961d46', 'The energy in the stadium was electric! The crowd is enthusiasm was contagious, fueling the players to give it their all. That is the magic of sports bringing people together.', null, 5),
    ('cf9e2a4b-86c1-4b83-9a58-0ebc64b3018b', 'f80f0028-ecb7-4f88-ae30-e64e56af14db', 'Heartbreak for one team, jubilation for the other. That is the emotional rollercoaster of sports. But win or lose, the camaraderie and sportsmanship shown by both sides is what truly shines through.', null, 2),
    ('ec701b3d-22ca-4911-937c-4f306afceaae', 'f80f0028-ecb7-4f88-ae30-e64e56af14db', 'An absolute masterclass performance from friend of mine. They made it look effortless out there, but we all know the years of dedication and sacrifice behind every moment of glory. Truly awe-inspiring!', null, 0);

INSERT INTO challenge_participant (user_id, challenge_id, points)
VALUES
    ('3428a92e-aac0-4f3f-a55f-9eb5265e0cd7', '0ff0654e-f6a7-40f3-9a7f-97e74d77b91e', 0),
    ('7482b24c-30ff-4685-899b-d5dce722b982', '0ff0654e-f6a7-40f3-9a7f-97e74d77b91e', 10),
    ('badfbf3a-bde8-48cb-9908-53afab1575e5', 'ddd04098-0d21-4c0f-9b13-ef5a0f14c62c', 51),
    ('c85f0e1b-f78e-4521-bdbe-12737e751fde', 'ddd04098-0d21-4c0f-9b13-ef5a0f14c62c', 5),
    ('cf9e2a4b-86c1-4b83-9a58-0ebc64b3018b', 'ddd04098-0d21-4c0f-9b13-ef5a0f14c62c', 3),
    ('ec701b3d-22ca-4911-937c-4f306afceaae', 'c8237aec-f471-47ba-8289-f7d96d83cbf4', 20);