import { PrismaClient } from '../../generated/client'

const prisma = new PrismaClient()

// LinkedIn Recommendations
export const testimonials = [
  {
    name: 'Jason Child',
    title: 'Strategy & Execution Leader',
    company: 'Resource Data',
    email: 'jason.child@resourcedata.com',
    content: 'Wade is a machine. His ability to jump in and make an impact is undeniable. This is something I\'ve witnessed firsthand. Adept at working with older tech when needed Wade still takes on the challenge of emerging technologies with gusto. Whether it\'s shifting a Node based polyrepo into a smoothly running monorepo or going from 0 to productive in Flutter within days he can drive faster than a lot of devs I\'ve worked with over my 20+ year career. On top of his technical skill, he is also a great person who truly cares about the success of the projects he works on.',
    rating: 5,
    featured: true,
    approved: true,
    source: 'LinkedIn'
  },
  {
    name: 'Isaac Finken',
    title: 'Software Engineer',
    company: 'In Time Tec',
    email: 'isaac.finken@intimetek.com',
    content: 'I highly recommend Wade as an awesome fullstack software engineer. Wade is an incredibly hard worker who always goes the extra mile to get things done. Wade consistently delivers top-notch results and meets deadlines with precision. When faced with tough problems, Wade tackles them head-on and comes up with innovative solutions that make our projects even better. But it\'s not just about technical skills - Wade is an amazing team player. They listen actively, provide valuable insights, and create a supportive work environment. Plus, Wade is always up-to-date with the latest trends and loves sharing knowledge with the team.',
    rating: 5,
    featured: true,
    approved: true,
    source: 'LinkedIn'
  }
]

export async function seedTestimonials() {
  console.log("Seeding testimonials...")
  
  for (const testimonial of testimonials) {
    // Check if testimonial already exists
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { email: testimonial.email }
    })
    
    if (!existingTestimonial) {
      await prisma.testimonial.create({
        data: testimonial
      })
    }
  }

  console.log("Testimonials seeded successfully")
}