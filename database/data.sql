
insert into "users" ("firstName", "lastName", "hashedPassword", "username")
  values ('Sally', 'May', 'dummy', 'marigold');

insert into "timelines" ("timelineFor")
  values ('James');

insert into "eventTypes" ("eventTypeId", "eventName")
  values(1,'walk'), (2, 'movie'), (3, 'phone'), (4, 'meal'), (5,'doctor'), (6, 'other');
