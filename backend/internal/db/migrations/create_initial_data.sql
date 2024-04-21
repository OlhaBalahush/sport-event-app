INSERT INTO users (fullname, username, email, password, role, img, level)
VALUES 
    ('John Doe', 'john_doe', 'john@example.com', '12345678', 'admin', '', 'advanced'),
    ('Jane Smith', 'jane_smith', 'jane@example.com', '12345678', 'organizer', '', 'intermediate'),
    ('Alice Johnson', 'alice_johnson', 'alice@example.com', '12345678', 'user', '', 'beginner');

-- Insert initial data for events
INSERT INTO events (event_name, organizer_id, date_start, date_end, location, description, requirements, preparation, price)
VALUES
    ('Soccer Tournament', '7482b24c-30ff-4685-899b-d5dce722b982', '2024-05-01', '2024-05-10', 'City Stadium', 'Annual soccer tournament', 'Teams must register in advance', 'Practice regularly to prepare for the tournament', '20.00'),
    ('Marathon Race', '7482b24c-30ff-4685-899b-d5dce722b982', '2024-06-15', '2024-06-15', 'City Park', 'International marathon race', 'Participants must be at least 18 years old', 'Train consistently for endurance', '5.50'),
    ('Table tennis Championship', '7482b24c-30ff-4685-899b-d5dce722b982', '2024-07-20', '2024-07-25', 'Indoor Arena', 'National table tennis championship', 'Teams must qualify through regional tournaments', 'Focus on coordination and strategy');

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