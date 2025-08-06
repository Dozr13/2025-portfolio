import { ContactStatus, Priority, PrismaClient } from '../../generated/client'

const prisma = new PrismaClient()

// Sample contacts (for demo purposes)
export const contacts = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Website Development Inquiry',
    message: 'Hi, I\'m interested in developing a new website for my consulting business. Can we schedule a call to discuss the requirements?',
    phone: '+1-555-0123',
    company: 'Smith Consulting',
    website: 'https://smithconsulting.com',
    budget: '$5,000 - $10,000',
    timeline: '2-3 months',
    source: 'Google Search',
    status: ContactStatus.NEW,
    priority: Priority.MEDIUM
  },
  {
    name: 'Lisa Park',
    email: 'lisa@ecommercestore.com',
    subject: 'E-commerce Platform Development',
    message: 'We need to build a custom e-commerce platform for our growing business. Looking for someone with experience in payment processing and inventory management.',
    phone: '+1-555-0456',
    company: 'Park\'s Online Store',
    budget: '$15,000 - $25,000',
    timeline: '3-4 months',
    source: 'Referral',
    status: ContactStatus.IN_PROGRESS,
    priority: Priority.HIGH
  }
]

export async function seedContacts() {
  console.log("Seeding contacts...")
  
  for (const contact of contacts) {
    // Check if contact already exists
    const existingContact = await prisma.contact.findFirst({
      where: { email: contact.email }
    })
    
    if (!existingContact) {
      await prisma.contact.create({
        data: contact
      })
    }
  }

  console.log("Contacts seeded successfully")
}