import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultFilter,
};

const loggedInUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    let { txt, isRead, status } = filterBy;
    emails = emails.filter((email) => {
      let txtMatches =
        email.subject.toLowerCase().includes(txt.toLowerCase()) ||
        email.body.toLowerCase().includes(txt.toLowerCase());
      let isReadMatches = isRead === null || email.isRead === isRead;
      let statusMatches = false;
      switch (status) {
        case "inbox":
          statusMatches = email.to === loggedInUser.email;
          break;
        case "star":
          statusMatches = email.isStarred;
          break;
        case "sent":
          statusMatches = email.sentAt ? true : false;
          break;
        case "trash":
          statusMatches = email.removedAt ? true : false;
          break;
      }

      return txtMatches && isReadMatches && statusMatches;
    });
  }
  return emails;
}

async function getById(id) {
  return await storageService.get(STORAGE_KEY, id);
}

async function remove(id) {
  return await storageService.remove(STORAGE_KEY, id);
}

async function save(emailToSave) {
  if (emailToSave.id) {
    return await storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return await storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(
  subject,
  body,
  isRead = false,
  isStarred = false,
  sentAt = null,
  removedAt = null,
  from,
  to
) {
  return {
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function getDefaultFilter() {
  return {
    status: "inbox",
    txt: "",
    isRead: null,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e102",
        subject: "Meeting Reminder",
        body: "Just a friendly reminder about our meeting tomorrow.",
        isRead: false,
        isStarred: true,
        sentAt: 1620955430594,
        removedAt: 1624955120594,
        from: "manager@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "Important Announcement",
        body: "Please be informed that our office will be closed on Monday due to a public holiday.",
        isRead: true,
        isStarred: false,
        sentAt: 1632834230594,
        removedAt: null,
        from: "hr@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e104",
        subject: "New Product Launch",
        body: "We are excited to announce the launch of our new product line!",
        isRead: true,
        isStarred: true,
        sentAt: 1645723830594,
        removedAt: null,
        from: "marketing@companyxyz.com",
        to: "user@appsus.com",
      },
      {
        id: "e105",
        subject: "Exciting Opportunity!",
        body: "Join our revolutionary program and become financially independent in no time! Our pyramid scheme is guaranteed to make you rich.",
        isRead: false,
        isStarred: false,
        sentAt: 1647507830594,
        removedAt: null,
        from: "opportunity@pyramidscam.com",
        to: "user@appsus.com",
      },
      {
        id: "e107",
        subject: "Urgent Assistance Needed",
        body: "Dear Sir/Madam, I am Prince Ahmad Abu Ali, the heir to the throne of Nigeria. I am seeking your urgent assistance to transfer a large sum of money out of the country. Please provide your bank account details so that I can deposit the funds, and in return, you will be generously rewarded. Your cooperation is greatly appreciated. Regards, Prince Ahmad Abu Ali",
        isRead: false,
        isStarred: true,
        sentAt: 1657267830594,
        removedAt: null,
        from: "prince@nigerianroyalty.com",
        to: "user@appsus.com",
      },
      {
        id: "e108",
        subject: "Exciting Investment Opportunity",
        body: "Dear Recipient, I am writing to inform you about an exciting investment opportunity that has recently come to my attention. It involves a revolutionary new technology that is poised to disrupt the market. If you are interested in learning more, please reply to this email at your earliest convenience. Regards, User",
        isRead: true,
        isStarred: false,
        sentAt: 1658378430594,
        removedAt: null,
        from: "user@appsus.com",
        to: "interestedparty@example.com",
      },
      {
        id: "e109",
        subject: "Important Project Update",
        body: "Dear Team, I wanted to provide you with an important update regarding our ongoing project. We have made significant progress and are on track to meet our deadlines. However, there have been some unexpected challenges that we need to address promptly. Let's schedule a meeting to discuss the next steps. Best regards, User",
        isRead: true,
        isStarred: true,
        sentAt: 1660153430594,
        removedAt: null,
        from: "user@appsus.com",
        to: "projectteam@example.com",
      },
      {
        id: "e110",
        subject: "Reminder: Team Meeting Tomorrow",
        body: "Hi Team, Just a friendly reminder that we have a team meeting scheduled for tomorrow at 10:00 AM. Please make sure to attend, as we will be discussing important updates and next steps for our project. Looking forward to seeing you all there! Best regards, User",
        isRead: true,
        isStarred: false,
        sentAt: 1661353430594,
        removedAt: null,
        from: "user@appsus.com",
        to: "team@example.com",
      },
      {
        id: "e111",
        subject: "URGENT: Coffee Supply Depletion Alert ☕️",
        body: "Dear User, We regret to inform you that our coffee supply is dangerously low! ☕️ Without our daily caffeine fix, productivity levels are plummeting, and chaos is ensuing in the office! Please take immediate action to rectify this dire situation. Suggestions for emergency coffee delivery services, hilarious memes, or caffeine-related jokes are welcome. Your prompt attention to this matter is greatly appreciated. Sincerely, Your Overcaffeinated Comedian",
        isRead: false,
        isStarred: true,
        sentAt: 1662472430594,
        removedAt: null,
        from: "comedian@appsus.com",
        to: "user@appsus.com",
      },
      {
        id: "e112",
        subject: "Emergency: Office Mascot Escaped 🐱",
        body: "Attention All Employees, We regret to inform you that our beloved office mascot, Sir Whiskers the Cat, has escaped! 🐱 He was last seen chasing a laser pointer into the break room and hasn't been seen since. Please be on the lookout for a mischievous orange tabby cat roaming the hallways. If found, please return him to the HR department for a reward of unlimited catnip and belly rubs. Thank you for your cooperation. Sincerely, The Office Jester",
        isRead: true,
        isStarred: true,
        sentAt: 1663625430594,
        removedAt: 1664616440594,
        from: "jester@appsus.com",
        to: "user@appsus.com",
      },
      {
        id: "e113",
        subject: "Urgent Request: Flying Toasters",
        body: "Hi Customer Service Team, I hope this message finds you well. We've received multiple reports from customers claiming that our latest app update has turned their devices into flying toasters! 🍞🚀 While we appreciate the unintended innovation, we believe this may be a bug. Please investigate the issue urgently and provide guidance on how to handle flying toasters. Sincerely, User",
        isRead: false,
        isStarred: true,
        sentAt: 1664853430594,
        removedAt: null,
        from: "user@appsus.com",
        to: "customerservice@example.com",
      },
      {
        id: "e114",
        subject: "Unicorn Sighting in the Office 🦄",
        body: "Dear Customer Service Team, Exciting news! We wanted to inform you that there has been a unicorn sighting in the office! 🦄 It seems to have wandered in through the front door and is currently grazing peacefully in the break room. Please advise on the appropriate protocol for handling mythical creatures in the workplace. Should we offer it coffee or tea? Looking forward to your guidance. Best regards, User",
        isRead: false,
        isStarred: false,
        sentAt: 1665921430594,
        removedAt: null,
        from: "user@appsus.com",
        to: "customerservice@example.com",
      },
      {
        id: "e115",
        subject: "Important Security Notice: Account Verification Required",
        body: "Dear Valued Customer, We hope this message finds you well. As part of our ongoing efforts to maintain the security of your account, we require all customers to undergo a mandatory account verification process. Please click on the following link to verify your account information: [Link to Verification Page] Failure to complete the verification process within 48 hours may result in temporary suspension of your account. Thank you for your cooperation in ensuring the safety of your account. Sincerely, Your Bank",
        isRead: false,
        isStarred: false,
        sentAt: 1667049430594,
        removedAt: null,
        from: "bank@securebank.com",
        to: "user@appsus.com",
      },
      {
        id: "e116",
        subject: "Congratulations! You are a Lottery Winner!",
        body: "Dear Lucky Winner, We are pleased to inform you that your email address has been selected as a winner in our international lottery draw! You have won a whopping prize of $1,000,000 USD! To claim your prize, please provide us with your full name, address, phone number, and a copy of your identification. Additionally, a small processing fee of $500 USD is required to release your winnings. Once we receive your information and payment, your prize will be transferred to your bank account immediately. Congratulations again on your big win! Sincerely, Lottery Headquarters",
        isRead: false,
        isStarred: false,
        sentAt: 1668107430594,
        removedAt: 1668118130594,
        from: "lottery@winningprizes.com",
        to: "user@appsus.com",
      },
      {
        id: "e117",
        subject: "New Match Notification: Your Perfect Match Found!",
        body: "Dear User, Great news! We have found your perfect match on our dating app! 💑 Their profile matches your interests and preferences perfectly. Take the first step towards love and happiness by sending them a message today. Don't miss out on this exciting opportunity to connect with someone special. Log in to your account now to view your match profile and start chatting! Happy matching! Best regards, Cupid's Arrow Dating App",
        isRead: true,
        isStarred: true,
        sentAt: 1669175430594,
        removedAt: null,
        from: "notifications@cupidarrow.com",
        to: "user@appsus.com",
      },
      {
        id: "e118",
        subject: "Sad News: Loss of a Beloved Team Member",
        body: "Dear User, It is with heavy hearts that we share the sad news of the passing of our beloved team member, [Name]. [Name] was a valued member of our team and made significant contributions to our company. Their presence will be deeply missed, and their memory will always be cherished. We extend our heartfelt condolences to [Name]'s family and loved ones during this difficult time. Please join us in keeping them in your thoughts and prayers. Sincerely, The Management Team",
        isRead: false,
        isStarred: false,
        sentAt: 1670153430594,
        removedAt: 1670252470594,
        from: "notifications@companyxyz.com",
        to: "user@appsus.com",
      },
      {
        id: "e119",
        subject: "Software Update Notification",
        body: "Dear User, We are excited to announce the release of a new software update! 🎉 This update includes several new features, improvements, and bug fixes to enhance your user experience. To install the update, simply click on the provided link and follow the on-screen instructions. If you have any questions or encounter any issues, please don't hesitate to contact our support team for assistance. Thank you for choosing our software! Best regards, The Software Development Team",
        isRead: true,
        isStarred: false,
        sentAt: 1671153430594,
        removedAt: null,
        from: "notifications@softwarecompany.com",
        to: "user@appsus.com",
      },
      {
        id: "e120",
        subject: "Save the Date: Company Picnic!",
        body: "Dear Team, We're excited to announce our annual company picnic, scheduled for Saturday, August 20th! 🎉 Join us for a day of fun, food, and team-building activities at Central Park. Bring your family and friends along for a memorable day outdoors. More details and RSVP instructions will be provided soon. We look forward to seeing you there! Best regards, The Organizing Committee",
        isRead: false,
        isStarred: true,
        sentAt: 1672153430594,
        removedAt: null,
        from: "events@companyxyz.com",
        to: "user@appsus.com",
      },
      {
        id: "e122",
        subject: "Urgent: Kittens Take Over Office!",
        body: "Dear Animal Lover, We have an adorable emergency on our hands: a litter of kittens has taken over our office! 🐱😍 They're currently wreaking havoc in the break room, batting around pens and napping on keyboards. While we attempt to regain control of the situation, we're also accepting applications for cuddle volunteers. If you're in need of a furry pick-me-up, swing by our office for some purr therapy. Office attire: casual. Allergic to cats? No problem, we've got puppies on standby! Best regards, The Feline Fiasco Response Team",
        isRead: false,
        isStarred: true,
        sentAt: 1674153430594,
        removedAt: null,
        from: "kittens@petadoptionagency.com",
        to: "user@appsus.com",
      },
      {
        id: "e123",
        subject: "Welcome to the World: Arrival of Baby [Last Name]!",
        body: "Dear Friends and Family, We are overjoyed to announce the arrival of our precious bundle of joy, [Baby's Name]! 👶🎉 [Baby's Name] was born on [Date of Birth] at [Time of Birth], weighing [Weight] pounds and [Ounces] ounces. Both baby and mom are doing well and resting comfortably. We are grateful for your love and support during this special time in our lives. Please join us in welcoming [Baby's Name] to the world! With love, [Parents' Names]",
        isRead: true,
        isStarred: false,
        sentAt: 1675153430594,
        removedAt: null,
        from: "announcement@family.com",
        to: "user@appsus.com",
      },
      {
        id: "e124",
        subject: "In Loving Memory: Tribute to [Name]",
        body: "Dear [Recipient's Name], It is with heavy hearts that we share the news of the passing of our beloved [Name]. [Name] was a cherished member of our family and touched the lives of all who knew them. Their kindness, laughter, and wisdom will be deeply missed. We take comfort in knowing that [Name]'s spirit will live on in our hearts forever. Please join us in celebrating [Name]'s life and honoring their memory. With deepest sympathy, The [Family Name] Family",
        isRead: false,
        isStarred: false,
        sentAt: 1676153430594,
        removedAt: null,
        from: "support@family.com",
        to: "user@appsus.com",
      },
      {
        id: "e125",
        subject: "Congratulations on Your Promotion!",
        body: "Dear [Recipient's Name], We are thrilled to announce that you have been promoted to [New Position]! 🎉 Your hard work, dedication, and exceptional performance have not gone unnoticed, and we are confident that you will excel in your new role. Your promotion is well-deserved, and we look forward to seeing the positive impact you will continue to make within our organization. Congratulations on this significant achievement! Best regards, The Management Team",
        isRead: false,
        isStarred: false,
        sentAt: 1677153430594,
        removedAt: null,
        from: "hr@company.com",
        to: "user@appsus.com",
      },
      {
        id: "e126",
        subject: "Important Update: Company Restructuring",
        body: "Dear Team, It is with a heavy heart that we must announce some difficult news. Due to [Reason for Downsizing], we are forced to implement a company restructuring plan that includes downsizing our workforce. This decision was not made lightly, and we understand the impact it will have on our employees and their families. We are committed to supporting those affected during this challenging time and will provide resources and assistance to help with the transition. We are grateful for the contributions of each and every one of you and deeply saddened by the circumstances that have led to this decision. Thank you for your understanding and cooperation. Sincerely, The Executive Team",
        isRead: false,
        isStarred: false,
        sentAt: 1678153430594,
        removedAt: null,
        from: "ceo@company.com",
        to: "user@appsus.com",
      },
      {
        id: "e127",
        subject: "Congratulations Graduate!",
        body: "Dear [Recipient's Name], Congratulations on your graduation! 🎓🎉 We are incredibly proud of your hard work, dedication, and achievements. Your graduation marks the beginning of an exciting new chapter in your life, and we have no doubt that you will continue to accomplish great things. As you embark on this next journey, remember to cherish the memories you've made and embrace the opportunities that lie ahead. We look forward to celebrating your success and cheering you on every step of the way. Congratulations again, and best wishes for a bright future! With love and pride, [Sender's Name]",
        isRead: false,
        isStarred: true,
        sentAt: 1679153430594,
        removedAt: null,
        from: "congrats@family.com",
        to: "user@appsus.com",
      },
      {
        id: "e128",
        subject: "In Loving Memory of [Pet's Name]",
        body: "Dear [Recipient's Name], It is with heavy hearts that we share the news of the passing of our beloved [Pet's Name]. [Pet's Name] brought joy, love, and companionship into our lives, and their presence will be deeply missed. We are grateful for the memories we shared and the unconditional love [Pet's Name] gave us. While [Pet's Name] may no longer be with us physically, their spirit will forever live on in our hearts. Please know that we are here for you during this difficult time and share in your grief. With deepest sympathy and love, [Sender's Name]",
        isRead: false,
        isStarred: false,
        sentAt: 1680153430594,
        removedAt: null,
        from: "support@petloss.com",
        to: "user@appsus.com",
      },
      {
        id: 'e129',
        subject: 'Account Ban Notification',
        body: 'Dear User, We regret to inform you that your account has been banned due to violation of our community guidelines. After careful review of your account activity, it has been determined that your behavior has repeatedly violated our terms of service. As a result, your account has been suspended indefinitely. Please note that this decision is final, and further attempts to access our platform may result in permanent termination of your account. If you believe this ban was made in error or would like to appeal the decision, please contact our support team within the next 7 days. Thank you for your understanding. Sincerely, The Moderation Team',
        isRead: false,
        isStarred: false,
        sentAt: 1681153430594,
        removedAt: null,
        from: 'support@platform.com',
        to: 'user@appsus.com'
      },
      {
        id: 'e130',
        subject: 'Notice: Excessive Funds in Your Account',
        body: 'Dear Valued Customer, We hope this email finds you well. We would like to bring to your attention that there appears to be an unusually high amount of funds in your bank account. While having a healthy balance is certainly a positive indicator of financial stability, we recommend reviewing your account to ensure that the balance reflects your financial goals and needs. If you have any questions or would like assistance in managing your funds, please don\'t hesitate to contact our customer support team. As always, we are here to help you make the most of your banking experience. Best regards, The Banking Team',
        isRead: true,
        isStarred: false,
        sentAt: 1682153430594,
        removedAt: null,
        from: 'bank@worldbank.com',
        to: 'user@appsus.com'
      },
      {
        id: 'e131',
        subject: 'Important: Order Status Update',
        body: 'Dear Customer, We regret to inform you that there has been an issue with your recent order (#123456). It appears that the package containing your order has been lost in transit. We sincerely apologize for any inconvenience this may cause. Rest assured, we are actively working with our shipping partners to locate your package and resolve the issue as quickly as possible. In the meantime, we would like to offer you a full refund or the option to reship your order at no additional cost. Please contact our customer support team to confirm your preferred course of action. We appreciate your understanding and patience in this matter. Best regards, The Customer Service Team',
        isRead: false,
        isStarred: false,
        sentAt: 1683153430594,
        removedAt: null,
        from: 'support@store.com',
        to: 'user@appsus.com'
      }
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
