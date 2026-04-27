# Prisma Architecture Rules (MANDATORY)

## Source of Truth

* ALL schema definitions live in: prisma/modules/*
* identity.prisma and identity.enums.prisma are the CORE domain

## Generated File

* prisma/schema.prisma is AUTO-GENERATED
* DO NOT EDIT schema.prisma manually

## Workflow

1. Edit modules/*
2. Run: npx tsx prisma/build-schema.ts
3. Run: npx prisma generate

## Forbidden

* Editing schema.prisma directly
* Reintroducing legacy_* models
* Creating duplicate enums
* Using identity_* prefixed enums

## Principle

Identity schema is the foundation of the system.
All other modules depend on it.
