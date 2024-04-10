INSERT INTO users (fullname, username, email, password, role, img, level)
VALUES 
    ('John Doe', 'john_doe', 'john@example.com', '12345678', 'admin', '', 'advanced'),
    ('Jane Smith', 'jane_smith', 'jane@example.com', '12345678', 'organizer', '', 'intermediate'),
    ('Alice Johnson', 'alice_johnson', 'alice@example.com', '12345678', 'user', '', 'beginner');

-- Insert initial data for events
INSERT INTO events (event_name, organizer_id, date_start, date_end, location, description, requirements, preparation)
VALUES
    ('Soccer Tournament', '7482b24c-30ff-4685-899b-d5dce722b982', '2024-05-01', '2024-05-10', 'City Stadium', 'Annual soccer tournament', 'Teams must register in advance', 'Practice regularly to prepare for the tournament'),
    ('Marathon Race', '7482b24c-30ff-4685-899b-d5dce722b982', '2024-06-15', '2024-06-15', 'City Park', 'International marathon race', 'Participants must be at least 18 years old', 'Train consistently for endurance'),
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
    (1, 'd3aa91ca-6136-4597-bb0e-466980e3f6af', 'event'), -- Soccer Tournament
    (2, '46c8f64f-663a-4956-894b-ae369085ac05', 'event'), -- Marathon Race
    (3, 'c5e776a2-6258-4dcc-b35a-e42926cb4e5d', 'event'); -- Basketball Championship

-- Insert initial data for category relations for challenges
INSERT INTO category_relation (category_id, challenge_id, flag)
VALUES
    (4, '0ff0654e-f6a7-40f3-9a7f-97e74d77b91e', 'challenge'), -- Fitness Challenge
    (5, 'ddd04098-0d21-4c0f-9b13-ef5a0f14c62c', 'challenge'), -- Swimming Competition
    (6, 'c8237aec-f471-47ba-8289-f7d96d83cbf4', 'challenge'); -- Cycling Tour