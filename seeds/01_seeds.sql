-- Insert users
INSERT INTO users (name, email, password) 
     VALUES ('Chandler', 'chanchanman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' )
          , ('Stevie', 'stevie@rosebudmotel.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' )
          , ('Dwight', 'dwightkshrute@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' )
          , ('Anne', 'annegg@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' )
          , ('Carl', 'oldmancarl@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' )
          ;

-- Insert properties
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
     VALUES (2, 'Rustic Country Vibe', 'description', 'https://pbs.twimg.com/media/ETk26D9WsAE4kAL?format=jpg&name=small', 'https://twitter.com/SchittsCreek/status/1241085142539657220/photo/1', 130, 6, 1, 1, 'Canada', '308399 Hockley Rd', 'Orangeville', 'ON', 'L9W2Z2')
          , (2, 'Fun and Friendly Neighbourhood', 'description', 'https://images.pexels.com/photos/5887699/pexels-photo-5887699.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'https://images.unsplash.com/46/sh3y2u5PSaKq8c4LxB3B_submission-photo-4.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80', 88, 10, 1, 1, 'Canada', '332s Shepherds Rd', 'Nanaimo', 'BC', 'V2S3K1')
          , (3, 'Bed & Breakfast With Goats', 'description', 'https://i.redd.it/1z3atrfp76d01.jpg', 'https://cdn.vox-cdn.com/thumbor/FjJB_QACP6-WAqzLNp4RdQhv7R0=/27x0:472x334/1520x1013/filters:focal(27x0:472x334)/cdn.vox-cdn.com/uploads/chorus_image/image/39136386/schrute-farms.0.jpg', 250, 10, 10, 10, 'United States', 'Rural Rt. 6', 'Honesadale', 'PA', '18431')
          , (4, 'Beautiful Green Gables', 'description', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Green_Gables_02.jpg/440px-Green_Gables_02.jpg', 'https://media.gettyimages.com/photos/anne-of-green-gables-museum-picture-id697416230?s=2048x2048', 480, 2, 5, 3, 'Canada', '8619 Cavendish Rd', 'Cavendish', 'PEI', 'C0A0B9')
          , (5, 'An Adventure House', 'description', 'https://media-cdn.tripadvisor.com/media/photo-s/18/06/27/98/the-up-house.jpg', 'https://media-cdn.tripadvisor.com/media/photo-s/0f/ed/14/2f/the-real-up-house.jpg', 180, 1, 2, 4, 'United States', '1438 NW 46th St', 'Seattle', 'WA', '98107')
          ;
-- Insert reservations
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
      VALUES ('2020-12-21', '2020-12-28', 1, 1 )
           , ('2020-12-26', '2021-01-03', 4, 2 )
           , ('2021-01-16', '2021-01-20', 3, 5 )
           , ('2021-02-13', '2021-02-15', 5, 1 )
           , ('2021-02-24', '2021-02-28', 2, 3 )
           ;

-- Insert property_reviews
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
      VALUES (2, 4, 2, 5, 'messages')
           , (5, 3, 3, 4, 'messages')
           , (1, 5, 4, 5, 'messages')
           , (3, 2, 5, 3, 'messages')
           ;