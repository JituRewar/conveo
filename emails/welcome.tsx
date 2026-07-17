import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  userName?: string
}

export const WelcomeEmail = ({
  userName = 'Valued User',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Conveo - Your Event Management Platform</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {userName},</Text>
        <Text style={paragraph}>
          Welcome to Conveo, the production-grade platform designed to manage
          and optimize your events.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://conveo.app">
            Get Started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Conveo Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#171717',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}
