// composables/useVCard.ts
import VCard from 'vcard-creator'
import { useRuntimeConfig } from '#app'

export function useVCard() {
  const config = useRuntimeConfig().public

  function generateVCard() {
    const card = new VCard()

    const nameParts = config.profileName.trim().split(/\s+/)
    const firstName = nameParts.shift() || ''
    const lastName = nameParts.join(' ') || ''

    if (firstName || lastName) card.addName(lastName, firstName)
    if (config.companyName) card.addCompany(String(config.companyName))
    if (config.emailAddress) card.addEmail(String(config.emailAddress))
    if (config.phoneNumber) card.addPhoneNumber(String(config.phoneNumber))
    if (config.websiteUrl) card.addURL(String(config.websiteUrl))
    if (config.address) card.addAddress(String(config.address))
    if (config.jobTitle) card.addJobtitle(String(config.jobTitle))
    if (config.profileImage) card.addPhotoURL(String(config.profileImage))
    if (config.profileDescription) card.addNote(String(config.profileDescription))

    // if (config.socialMedia) {
    //   const socialMedia = JSON.parse(String(config.links)).reduce(
    //     (acc: Record<string, string>, link: any) => {
    //       if (link.socialMedia) {
    //         acc[link.socialMedia] = link.url
    //       }
    //       return acc
    //     },
    //     {}
    //   )
    //   for (const [key, value] of Object.entries(socialMedia)) {
    //     if (value) card.addSocial(key, String(value))
    //   }
    // }

    const blob = new Blob([card.toString()], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${String(config.profileName).replace(/\s+/g, '_').replace(/[^\w-]/g, '')}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return {
    generateVCard,
  }
}
