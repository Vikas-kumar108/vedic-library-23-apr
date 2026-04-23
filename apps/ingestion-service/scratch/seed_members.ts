import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const sampleData = [
  { "firstName": "Radha", "lastName": "Das", "gender": "female", "dateOfBirth": "2008-05-12", "phone": "9000000001", "village": "Mayapur", "district": "Nadia", "state": "West Bengal", "roleHint": "participant" },
  { "firstName": "Ramesh", "lastName": "Das", "gender": "male", "dateOfBirth": "1975-03-20", "phone": "9000000002", "village": "Mayapur", "district": "Nadia", "state": "West Bengal", "roleHint": "father" },
  { "firstName": "Sita", "lastName": "Das", "gender": "female", "dateOfBirth": "1980-07-10", "phone": "9000000003", "village": "Mayapur", "district": "Nadia", "state": "West Bengal", "roleHint": "mother" },
  { "firstName": "Mohan", "lastName": "Sharma", "gender": "male", "dateOfBirth": "1995-01-15", "phone": "9000000004", "email": "mohan@gmail.com", "village": "Krishnanagar", "district": "Nadia", "state": "West Bengal", "roleHint": "mentor" },
  { "firstName": "Anjali", "lastName": "Sharma", "gender": "female", "dateOfBirth": "1998-09-22", "phone": "9000000005", "email": "anjali@gmail.com", "village": "Krishnanagar", "district": "Nadia", "state": "West Bengal", "roleHint": "participant" },
  { "firstName": "Vikram", "lastName": "Gupta", "gender": "male", "dateOfBirth": "1988-11-05", "phone": "9000000006", "email": "vikram@gmail.com", "village": "Kolkata", "district": "Kolkata", "state": "West Bengal", "roleHint": "donor" },
  { "firstName": "Priya", "lastName": "Gupta", "gender": "female", "dateOfBirth": "1990-04-18", "phone": "9000000007", "email": "priya@gmail.com", "village": "Kolkata", "district": "Kolkata", "state": "West Bengal", "roleHint": "donor" },
  { "firstName": "Amit", "lastName": "Das", "gender": "male", "dateOfBirth": "2003-08-30", "phone": "9000000008", "village": "Mayapur", "district": "Nadia", "state": "West Bengal", "roleHint": "student" },
  { "firstName": "Sunita", "lastName": "Pal", "gender": "female", "dateOfBirth": "1985-02-11", "phone": "9000000009", "village": "Ranaghat", "district": "Nadia", "state": "West Bengal", "roleHint": "participant" },
  { "firstName": "Gopal", "lastName": "Pal", "gender": "male", "dateOfBirth": "1982-06-25", "phone": "9000000010", "village": "Ranaghat", "district": "Nadia", "state": "West Bengal", "roleHint": "farmer" },
  { "firstName": "Rahul", "lastName": "Verma", "gender": "male", "dateOfBirth": "1992-12-12", "phone": "9000000011", "email": "rahul@ngo.org", "village": "Delhi", "district": "Delhi", "state": "Delhi", "roleHint": "admin" },
  { "firstName": "Kavita", "lastName": "Verma", "gender": "female", "dateOfBirth": "1994-03-03", "phone": "9000000012", "email": "kavita@ngo.org", "village": "Delhi", "district": "Delhi", "state": "Delhi", "roleHint": "mentor" },
  { "firstName": "Arjun", "lastName": "Singh", "gender": "male", "dateOfBirth": "2000-07-07", "phone": "9000000013", "email": "arjun@gmail.com", "village": "Varanasi", "district": "Varanasi", "state": "UP", "roleHint": "participant" },
  { "firstName": "Meera", "lastName": "Singh", "gender": "female", "dateOfBirth": "2005-10-01", "phone": null, "village": "Varanasi", "district": "Varanasi", "state": "UP", "roleHint": "student" },
  { "firstName": "Harish", "lastName": "Yadav", "gender": "male", "dateOfBirth": "1965-01-01", "phone": "9000000015", "village": "Patna", "district": "Patna", "state": "Bihar", "roleHint": "senior mentor" },
  { "firstName": "Lakshmi", "lastName": "Yadav", "gender": "female", "dateOfBirth": "1970-02-14", "phone": "9000000016", "village": "Patna", "district": "Patna", "state": "Bihar", "roleHint": "householder" },
  { "firstName": "Deepak", "lastName": "Jain", "gender": "male", "dateOfBirth": "1983-09-09", "phone": "9000000017", "email": "deepak@donor.com", "village": "Mumbai", "district": "Mumbai", "state": "Maharashtra", "roleHint": "donor" },
  { "firstName": "Neha", "lastName": "Jain", "gender": "female", "dateOfBirth": "1987-11-19", "phone": "9000000018", "email": "neha@donor.com", "village": "Mumbai", "district": "Mumbai", "state": "Maharashtra", "roleHint": "donor" },
  { "firstName": "Suresh", "lastName": "Patel", "gender": "male", "dateOfBirth": "1978-05-05", "phone": "9000000019", "village": "Ahmedabad", "district": "Ahmedabad", "state": "Gujarat", "roleHint": "organizer" },
  { "firstName": "Pooja", "lastName": "Patel", "gender": "female", "dateOfBirth": "2002-06-16", "phone": "9000000020", "village": "Ahmedabad", "district": "Ahmedabad", "state": "Gujarat", "roleHint": "participant" }
]

async function main() {
  console.log('🌱 SEEDING SAMPLE COMMUNITY MEMBERS...')
  
  for (const person of sampleData) {
    const role: any = person.roleHint.includes('donor') ? 'donor' : 
                   (person.roleHint.includes('mentor') ? 'mentor' : 
                   (person.roleHint.includes('admin') ? 'admin' : 'village_member'))

    await prisma.user.upsert({
      where: { email: person.email || `${person.firstName.toLowerCase()}.${Date.now()}@internal.vedic` },
      update: {},
      create: {
        full_name: `${person.firstName} ${person.lastName}`,
        email: person.email || `${person.firstName.toLowerCase()}.${Math.random().toString(36).substring(7)}@internal.vedic`,
        phoneNumber: person.phone,
        gender: person.gender === 'female' ? 'female' : 'male',
        dateOfBirth: new Date(person.dateOfBirth),
        village: person.village,
        city: person.district,
        state: person.state,
        roles: [role],
        isOnline: false,
        notes: `Auto-seeded: ${person.roleHint}`
      }
    })
  }
  
  console.log('✅ SEEDING COMPLETE. 20 Members added.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
