
insert into "users" ("firstName", "lastName", "hashedPassword", "username")
  values ('Sample', 'User', '$argon2id$v=19$m=4096,t=3,p=1$G9NpC4BNpEs2tAlfjuVLaQ$vtmg8ueVwJGQrNnlCX4q8kYB6cQq/kfk+BaL4SBsRtg', 'Enjoy');

insert into "timelines" ("timelineFor")
  values ('James');

insert into "eventTypes" ("eventTypeId", "eventName")
  values(1,'walk'), (2, 'movie'), (3, 'phone'), (4, 'meal'), (5,'doctor'), (6, 'other');

insert into "schedules" ("scheduleId", "title", "startDate", "startTime", "endTime", "timelineId")
values(1, 'Meeting with family, everyone get ready!', '11-11-2022',
  '9:30AM',
  '10:30PM',
  1)
