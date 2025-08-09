import { prisma } from '@/lib/prisma'

// Certifications Data - Aligned with Wade's Resume
export const certifications = [
  {
    name: 'AWS Certified',
    issuer: 'Amazon Web Services',
    issueDate: new Date('2023-03-15'),
    expiryDate: new Date('2026-03-15'),
    credentialId: 'AWS-CERT-WADE-2023',
    credentialUrl: 'https://aws.amazon.com/verification',
    description: 'AWS certification validating expertise in cloud architecture, services, and best practices for building scalable applications.',
    featured: true,
    order: 1
  }
]

export async function seedCertifications() {
  console.log("Seeding certifications...")
  
  for (const cert of certifications) {
    await prisma.certification.upsert({
      where: { 
        name_issuer: {
          name: cert.name,
          issuer: cert.issuer
        }
      },
      update: cert,
      create: cert
    })
  }

  console.log("Certifications seeded successfully")
}