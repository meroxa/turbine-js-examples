-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "plaftormId" TEXT,
    "surveyType" TEXT,
    "score" INTEGER,
    "comment" TEXT,
    "source" TEXT,
    "device" TEXT,
    "os" TEXT,
    "browser" TEXT,

    PRIMARY KEY ("id")
);
