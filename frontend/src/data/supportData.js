// src/data/supportData.js
import { Smartphone, Download, BadgeCheck, Receipt, Map, CreditCard, XCircle, Wrench } from 'lucide-react';

export const categories = {
  "device-compatibility": {
    title: "Device Compatibility",
    icon: <Smartphone size={32} />,
    description: "Check if your smartphone, tablet, or wearable supports eSIM technology.",
    faqs: [
      {
        question: "Is my device eSIM compatible?",
        answer: "Most flagship phones from Apple (iPhone XR and later), Samsung (S20 and later), and Google (Pixel 3 and later) are eSIM compatible. To check, dial *#06# and look for an EID number."
      },
      {
        question: "Can I use SiMClaire on a carrier-locked phone?",
        answer: "No, your device must be carrier-unlocked to use third-party eSIMs like SiMClaire. Contact your carrier to unlock your device."
      },
      {
        question: "Does the Apple Watch support SiMClaire?",
        answer: "Currently, our eSIMs are optimized for smartphones and tablets. Wearable support is coming soon."
      }
    ]
  },
  "installation-activation": {
    title: "Installation & Activation",
    icon: <Download size={32} />,
    description: "Step-by-step guides for QR code and manual installations.",
    faqs: [
      {
        question: "How do I install my eSIM using a QR code?",
        answer: "Go to Settings > Cellular > Add eSIM > Use QR Code. Scan the code sent to your email and follow the on-screen prompts."
      },
      {
        question: "My QR code isn't scanning. What do I do?",
        answer: "You can enter the details manually. In the eSIM setup screen, tap 'Enter Details Manually' and input the SM-DP+ Address and Activation Code provided in your email."
      },
      {
        question: "When should I activate my eSIM?",
        answer: "You can install it before you travel, but we recommend turning on the line only when you arrive at your destination to avoid accidental usage."
      }
    ]
  },
  "kyc-process": {
    title: "KYC Process",
    icon: <BadgeCheck size={32} />,
    description: "Identity verification requirements for specific countries.",
    faqs: [
      {
        question: "Why do I need to submit ID?",
        answer: "Some countries (like Singapore, Germany, and India) legally require identity verification for all telecommunication services."
      },
      {
        question: "Is my personal data safe?",
        answer: "Yes, we use bank-grade encryption to transmit your documents directly to the local telecom regulator. We do not store your ID permanently."
      },
      {
        question: "How long does verification take?",
        answer: "It is usually instant, but can take up to 10 minutes depending on the country's system."
      }
    ]
  },
  "post-purchase": {
    title: "Post Purchase",
    icon: <Receipt size={32} />,
    description: "Manage your active plans, top-ups, and data usage.",
    faqs: [
      {
        question: "How do I check my remaining data?",
        answer: "You can check your balance in the 'My Plans' section of the SiMClaire app or website dashboard."
      },
      {
        question: "Can I top up my existing plan?",
        answer: "Yes, select your active eSIM in the dashboard and click 'Top Up' to add more data or extend the duration."
      },
      {
        question: "Will my number change?",
        answer: "Our plans are data-only, so you don't get a new phone number. You can keep using your primary number for WhatsApp and calls."
      }
    ]
  },
  "pre-purchase": {
    title: "Pre-Purchase",
    icon: <Map size={32} />,
    description: "Coverage maps, network speeds, and plan options.",
    faqs: [
      {
        question: "What network speed will I get?",
        answer: "We partner with top-tier local providers to offer 4G LTE and 5G speeds where available."
      },
      {
        question: "Do plans expire if I don't use them?",
        answer: "The validity period (e.g., 7 days) only starts when the eSIM connects to a supported network in the destination country."
      }
    ]
  },
  "purchase-journey": {
    title: "Purchase Journey",
    icon: <CreditCard size={32} />,
    description: "Payment methods, checkout issues, and promotions.",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay."
      },
      {
        question: "Did my payment go through?",
        answer: "You should receive a confirmation email immediately. If not, check your bank statement or contact support."
      }
    ]
  },
  "refunds-cancellations": {
    title: "Refunds & Cancellations",
    icon: <XCircle size={32} />,
    description: "Our policy on returns and how to request a refund.",
    faqs: [
      {
        question: "Can I get a refund if it doesn't work?",
        answer: "Yes, if technical issues prevent the eSIM from working and our support cannot fix it, we offer a full refund."
      },
      {
        question: "Can I cancel a plan I haven't used?",
        answer: "Uninstalled and unactivated eSIMs can be refunded within 30 days of purchase."
      }
    ]
  },
  "troubleshooting": {
    title: "Troubleshooting",
    icon: <Wrench size={32} />,
    description: "Common fixes for connection, data, and activation errors.",
    faqs: [
      {
        question: "I have no signal.",
        answer: "Ensure 'Data Roaming' is turned ON for your SiMClaire line in settings. Also, try toggling Airplane Mode on and off."
      },
      {
        question: "My internet is slow.",
        answer: "Check if you are in an area with good coverage. If the issue persists, try manually selecting a different network carrier in settings."
      }
    ]
  }
};