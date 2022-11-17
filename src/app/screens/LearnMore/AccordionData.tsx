
// About the Platform and the Development of the App:

const accordionData1 = [
  {
    header: "What is a web 3.0 platform?",
    content:
      "Web 3.0 is the next generation of the web platform, in other words, it means that anyone on the internet can create anything (data) and be able to own that instead of letting big corporations own your data. This has been made possible due to the Blockchain technology which enables transfer of values between individuals without the need of an intermediary. ",
  },
  {
    header: "What is blockchain?",
    content:
      "Blockchain can be viewed as a ‘chain of blocks’.These blocks can contain any form of data depending on the use case. In other words, its a book-keeping system that storeslooks at all the transactions of data (information).",
  },
  {
    header: "What is Cryptography?",
    content:
      "Cryptography is often referred to the study of secure communications techniques which are derived from mathematical concepts.Cryptography helps in securing both your data and communications through our app.",
  },
  {
    header: "What is a Seed Phrase?",
    content:
      "Seed Phrase is a mnemonic code which consists of 12-24 words which is used to recover your wallet on this app. Seed Phrases should be kept as safe as possible in order to secure your account on this app.",
  },
  {
    header: "What is a decentralized network?",
    content:
      "As technical as it sounds, it is basically a group of individual computers that connect with each other to run a particular application. The purpose behind using a  decentralized network over a centralized network is to prevent system failures while providing indiscriminatory and equal access to computers that run necessary applications. ",
  },
  {
    header: "But there have been many reports of blockchain being hacked, so it is possible to hack the blockchain, right?",
    content:
      "Blockchains are structured in such a way that once data is accepted and stored on it, changing that information will become harder and harder with time. " +
      "While blockchains are inherently safe, there are various ways which allow bad actors to gain access to your account and upload transactions (transfer of data/information) on blockchain without your permission (i.e like giving your data access to them) " +
      "So by keeping your Password and Seed Phrase safe and secure, there will be no problems when you are using this platform.",
  },
  {
    header: "Is there any disadvantage to using a blockchain?",
    content:
      "When it comes to using any technology, there are advantages and disadvantages. However, currently, the advantages of Blockchain technology which include privacy, security and data ownership, outweighs any disadvantage it has.",
  },
  {
    header: "Is it like crypto? ",
    content:
      "No, Crypto is created by using the concept of blockchain which allows transfer of value/information between parties without a intermediary in an anonymous way.",
  },
];

// Safety of my Identity and my Data

const accordionData2 = [
  {
    header: "How is my identity kept safe? ",
    content:
      "Your identity is a list of data identifiers such as your name, age, gender or anything else that describe you. So no one can know who you are unless you provide consent for access of your data.  ",
  },
  {
    header: "How is my data protected? ",
    content:
      "Think about your data being cash that is kept safe in a bank vault, there are many safety measures our system provides to protect your data. These include encryption technologies with the help of cryptography. " +
      "The only way anyone can access any of your data is to provide the encryption key which is generated from the secret phrase that is provided to you in the initial phase of account setup. The encryption key allows you to encrypt your data so that nobody else can read or see your data. " +
      "In addition, a history of all the transactions (transfer of data or the cash) is recorded on a blockchain network, which acts as a ledger (list of records). This way you know to who and when you have given access  or revoked their access to your data ",
  },
  {
    header: "Why should I care about my data security?",
    content:
      "Corporations make a lot of money by selling data about users like you which not only invades your online privacy, but also exploits you as a user. By ensuring data security around your data, you have a say in the way your data should be used.",
  },
];


// Benefits of using this app


const accordionData3 = [
  {
    header: "What can I do with this app? ",
    content:
      "This app can be used to sign-up for programs happening in your local region, answer or create surveys and polls and store your data in a secure way.  ",
  },
  {
    header: "Why should I use this app? ",
    content:
      "This app aims to provide a one stop shop where you can store any data or information and interact with any individual or organization as you wish while keeping it as secure as possible. It gives data ownership back to you as an individual.",
  },
];


// Is this for real, can I trust this?

const accordionData4 = [
  {
    header: "Is blockchain a hoax? ",
    content: "Blockchain is not a hoax and very much real. Infact one of it’s applications-Cryptocurrencies allowed users all across the world store and exchange value worth 3 Trillion Dollars at it’s peak.",
  },
  {
    header: "Are you storing my data? ",
    content: "Absolutely not! The whole point of this platform is that you store your data/information in your digital wallet (refer to the Help section for definition) and you decide who you want to give consent/access to your data.",
  },
  {
    header: "What do we get out of it as the developers/creators? ",
    content: "Nothing! We are hoping to create a systemic change to current data ownership practices by giving ownership of data back to the users themselves. We want to make the storage and transfer of infomration a lot easier, securer and safer. Our goal is to become the first government to implement this system. ",
  },
  {
    header: "Is blockchain a credible technology to use for my data? ",
    content: "Blockchain as a technology has been explored through an academic’s lens since the 1990s. Apart from the academics working on such a technology,  there has been a lot of investments flowing in both from big private corporation like Meta as well as state and government sponsored pension funds for various applications of blockchains. The Banking industry were one of the first industries to have  used blockchains for interbank settlements and other key functions. ",
  },
];



// Who are the People behind this App?

const accordionData5 = [
  {
    header: "Who made this app? ",
    content: "This app is made by efforts of many individuals who all share the same goal which is creating user-centric platform for storage and transfer of data. These people include many Region of Waterloo employees, talented co-op students, experts in the field and many more! ",
  },
  {
    header: "Where can I find more information? ",
    content: "You can read more about this platform via our website at www.swirl.ca ",
  },
  {
    header: "How can I contact you? ",
    content: "soji@regionofwaterloo.ca",
  },
];


export const accordionData = [
  {
    title: "About the Platform and the Development of the App:",
    data: accordionData1
  },
  {
    title: "Safety of my Identity and my Data",
    data: accordionData2
  },
  {
    title: "Benefits of using this app",
    data: accordionData3
  },
  {
    title: "Is this for real, can I trust this?",
    data: accordionData4
  },
  {
    title: "Who are the People behind this App?",
    data: accordionData5
  },
]

export const accordionTitle = "The Dataplayground uses a lot of innovative technologies to keep your identity and data as secure as possible. It uses technologies such as Web 3.0, blockchain and cryptography. Let’s break down the meaning and purpose of these technologies in our solution."