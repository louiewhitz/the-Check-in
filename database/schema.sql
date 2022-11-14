set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"lastPost" timestamptz default null,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."events" (
	"eventId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"summary" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	"updatedAt" TIMESTAMP,
	"userId" integer NOT NULL,
	"eventTypeId" integer NOT NULL,
	"timelineId" integer NOT NULL,
	"scheduleId" integer default null,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."eventTypes" (
	"eventTypeId" integer NOT NULL,
	"eventName" TEXT NOT NULL,
	CONSTRAINT "eventTypes_pk" PRIMARY KEY ("eventTypeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."schedules" (
	"scheduleId" integer NOT NULL,
	"title" TEXT NOT NULL,
	"scheduleTime" TIMESTAMP NOT NULL,
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
