import { IconName } from '../../components/ui/Icon'

// Rate limiting helper
export const RATE_LIMIT_KEY = 'contact_form_last_submission'
export const RATE_LIMIT_DURATION = 60000

export const CONTACT_INFO: {
  icon: IconName
  label: string
  value: string
  href?: string
}[] = [
  {
    icon: 'mail',
    label: 'Email',
    value: 'wadejp8@gmail.com',
    href: 'mailto:wadejp8@gmail.com'
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '(720) 641-7170',
    href: 'tel:+17206417170'
  },
  {
    icon: 'map-pin',
    label: 'Location',
    value: 'Meridian, Idaho'
  }
]
