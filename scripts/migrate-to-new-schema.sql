-- Migration Script: Add New Portfolio Data Tables
-- This script safely adds the new tables to your existing database
-- Run this after updating your schema.prisma file

-- Create Skills table
CREATE TABLE IF NOT EXISTS "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'INTERMEDIATE',
    "years" INTEGER,
    "description" TEXT,
    "icon" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- Create unique index on skills name
CREATE UNIQUE INDEX IF NOT EXISTS "skills_name_key" ON "skills"("name");

-- Create Experiences table
CREATE TABLE IF NOT EXISTS "experiences" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "companyUrl" TEXT,
    "companyLogo" TEXT,
    "achievements" TEXT,
    "technologies" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- Create unique index on experiences company+position
CREATE UNIQUE INDEX IF NOT EXISTS "experiences_company_position_key" ON "experiences"("company", "position");

-- Create Projects table
CREATE TABLE IF NOT EXISTS "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "demoUrl" TEXT,
    "githubUrl" TEXT,
    "images" TEXT,
    "thumbnail" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "client" TEXT,
    "teamSize" INTEGER,
    "role" TEXT,
    "challenges" TEXT,
    "solutions" TEXT,
    "metrics" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- Create unique index on projects slug
CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_key" ON "projects"("slug");

-- Create Project Skills junction table
CREATE TABLE IF NOT EXISTS "project_skills" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "importance" TEXT NOT NULL DEFAULT 'SECONDARY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_skills_pkey" PRIMARY KEY ("id")
);

-- Create unique index on project_skills projectId+skillId
CREATE UNIQUE INDEX IF NOT EXISTS "project_skills_projectId_skillId_key" ON "project_skills"("projectId", "skillId");

-- Create Education table
CREATE TABLE IF NOT EXISTS "education" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "field" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,
    "gpa" DOUBLE PRECISION,
    "description" TEXT,
    "achievements" TEXT,
    "logo" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- Create unique index on education institution+degree+field
CREATE UNIQUE INDEX IF NOT EXISTS "education_institution_degree_field_key" ON "education"("institution", "degree", "field");

-- Create Certifications table
CREATE TABLE IF NOT EXISTS "certifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "credentialUrl" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- Create unique index on certifications name+issuer
CREATE UNIQUE INDEX IF NOT EXISTS "certifications_name_issuer_key" ON "certifications"("name", "issuer");

-- Create Services table
CREATE TABLE IF NOT EXISTS "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT,
    "pricing" TEXT,
    "duration" TEXT,
    "category" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- Create unique index on services slug
CREATE UNIQUE INDEX IF NOT EXISTS "services_slug_key" ON "services"("slug");

-- Create FAQs table
CREATE TABLE IF NOT EXISTS "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- Create unique index on faqs question
CREATE UNIQUE INDEX IF NOT EXISTS "faqs_question_key" ON "faqs"("question");

-- Add foreign key constraints for project_skills
DO $$
BEGIN
    -- Add foreign key for project_skills -> projects
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'project_skills_projectId_fkey'
    ) THEN
        ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_projectId_fkey" 
        FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    -- Add foreign key for project_skills -> skills
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'project_skills_skillId_fkey'
    ) THEN
        ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skillId_fkey" 
        FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    -- Update project_views to reference projects table if it exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'project_views') THEN
        -- Check if foreign key doesn't already exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'project_views_projectId_fkey'
        ) THEN
            -- Note: This will only work if existing project_views.projectId values 
            -- match projects.id values. You may need to clean up data first.
            -- ALTER TABLE "project_views" ADD CONSTRAINT "project_views_projectId_fkey" 
            -- FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
    END IF;
END $$;