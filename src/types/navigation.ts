import { NavigatorScreenParams } from '@react-navigation/core'

import { DeclineType } from './decline'

export enum Screens {
  AddHouseholdMember = 'AddHouseholdMember',
  Create = 'Create',
  CreateProgram = 'CreateProgram',
  CreateSurvey = 'CreateSurvey',
  Home = 'Home',
  HouseholdRequest = 'HouseholdRequest',
  Login = 'Login',
  MyCreation = 'MyCreation',
  MyData = 'MyData',
  Poll = 'Poll',
  Polls = 'Polls',
  Profile = 'Profile',
  Program = 'Program',
  ProgramData = 'ProgramData',
  Programs = 'Programs',
  SignUp = 'SignUp',
  Survey = 'Survey',
  SurveyData = 'SurveyData',
  Surveys = 'Surveys',
  Upload = 'Upload',
}
//Will need to modify from this point onwards
export enum Stacks {
  TabStack = 'Tab Stack',
  HomeStack = 'Home Stack',
  ConnectStack = 'Connect Stack',
  CredentialStack = 'Credentials Stack',
  SettingStack = 'Settings Stack',
  ContactStack = 'Contacts Stack',
  NotificationStack = 'Notifications Stack',
  ConnectionStack = 'Connection Stack',
}

export enum TabStacks {
  HomeStack = 'Tab Home Stack',
  ConnectStack = 'Tab Connect Stack',
  CredentialStack = 'Tab Credential Stack',
}

export type RootStackParams = {
  [Screens.Splash]: undefined
  [Stacks.TabStack]: NavigatorScreenParams<TabStackParams>
  [Stacks.ConnectStack]: NavigatorScreenParams<ConnectStackParams>
  [Stacks.SettingStack]: NavigatorScreenParams<SettingStackParams>
  [Stacks.ContactStack]: NavigatorScreenParams<ContactStackParams>
  [Stacks.NotificationStack]: NavigatorScreenParams<NotificationStackParams>
}

export type TabStackParams = {
  [TabStacks.HomeStack]: NavigatorScreenParams<HomeStackParams>
  [TabStacks.ConnectStack]: NavigatorScreenParams<ConnectStackParams>
  [TabStacks.CredentialStack]: NavigatorScreenParams<CredentialStackParams>
}

export type AuthenticateStackParams = {
  [Screens.Onboarding]: undefined
  [Screens.Terms]: undefined
  [Screens.CreatePin]: { setAuthenticated: () => void } | undefined
  [Screens.EnterPin]: { setAuthenticated: () => void } | undefined
  [Screens.UseBiometry]: undefined
}

export type ContactStackParams = {
  [Screens.Contacts]: undefined
  [Screens.Chat]: { connectionId: string }
  [Screens.ContactDetails]: { connectionId: string }
}

export type CredentialStackParams = {
  [Screens.Credentials]: undefined
  [Screens.CredentialDetails]: { credentialId: string }
}

export type HomeStackParams = {
  [Screens.Home]: undefined
  [Screens.Notifications]: undefined
  [Screens.WebDisplay]: { destUrl: string; exitUrl?: string }
}

export type ConnectStackParams = {
  [Screens.Scan]: undefined
}

export type SettingStackParams = {
  [Screens.Settings]: undefined
  [Screens.Language]: undefined
}

export type NotificationStackParams = {
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.ProofRequestAttributeDetails]: {
    proofId: string
    attributeName: string | null
  }
  [Screens.CommonDecline]: {
    declineType: DeclineType
    itemId: string
  }
}

export type DeliveryStackParams = {
  [Screens.Connection]: { connectionId?: string; threadId?: string }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.ProofRequestAttributeDetails]: {
    proofId: string
    attributeName: string | null
  }
  [Screens.CommonDecline]: {
    declineType: DeclineType
    itemId: string
  }
  [Screens.OnTheWay]: { credentialId: string }
  [Screens.Declined]: { credentialId: string }
}
