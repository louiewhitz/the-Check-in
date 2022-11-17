set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"lastPost" timestamptz default null,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."events" (
	"eventId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"summary" TEXT NOT NULL,
	"description" TEXT,
	"photoUrl" TEXT,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	"updatedAt" TIMESTAMPTZ default null,
	"userId" integer NOT NULL,
	"eventTypeId" integer NOT NULL,
	"timelineId" integer NOT NULL,
	"scheduleId" integer,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."eventTypes" (
	"eventTypeId" serial NOT NULL,
	"eventName" TEXT NOT NULL,
	CONSTRAINT "eventTypes_pk" PRIMARY KEY ("eventTypeId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."schedules" (
	"scheduleId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"scheduleTime" TIMESTAMPTZ NOT NULL,
	"timelineId" integer NOT NULL,
	CONSTRAINT "schedules_pk" PRIMARY KEY ("scheduleId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."timelines" (
	"timelineId" serial NOT NULL,
	"timelineFor" TEXT NOT NULL,
	"lastPost" TIMESTAMPTZ default null,
	CONSTRAINT "timelines_pk" PRIMARY KEY ("timelineId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "events" ADD CONSTRAINT "events_fk1" FOREIGN KEY ("eventTypeId") REFERENCES "eventTypes"("eventTypeId");
ALTER TABLE "events" ADD CONSTRAINT "events_fk2" FOREIGN KEY ("timelineId") REFERENCES "timelines"("timelineId");
ALTER TABLE "events" ADD CONSTRAINT "events_fk3" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("scheduleId");
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_fk0" FOREIGN KEY ("timelineId") REFERENCES "timelines"("timelineId");
