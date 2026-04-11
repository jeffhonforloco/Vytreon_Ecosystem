import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Vytreon"

interface ContactConfirmationProps {
  name?: string
}

const ContactConfirmationEmail = ({ name }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
    </Head>
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={logoText}>{SITE_NAME}</Text>
        </Section>
        <Hr style={divider} />
        <Section style={contentSection}>
          <Heading style={h1}>
            {name ? `Thank you, ${name}!` : 'Thank you for reaching out!'}
          </Heading>
          <Text style={text}>
            We've received your message and our team will get back to you as soon as possible. We typically respond within 24-48 hours.
          </Text>
          <Text style={text}>
            If your inquiry is urgent, please don't hesitate to follow up.
          </Text>
        </Section>
        <Hr style={divider} />
        <Text style={footer}>
          Best regards,<br />The {SITE_NAME} Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Thanks for contacting us',
  displayName: 'Contact confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 20px',
}

const headerSection = {
  padding: '0 0 20px',
}

const logoText = {
  fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  fontSize: '24px',
  fontWeight: '700' as const,
  color: '#b8952a',
  margin: '0',
  letterSpacing: '-0.5px',
}

const divider = {
  borderColor: '#e8e0d0',
  margin: '0 0 30px',
}

const contentSection = {
  padding: '0 0 10px',
}

const h1 = {
  fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  fontSize: '22px',
  fontWeight: '700' as const,
  color: '#1a1a1a',
  margin: '0 0 20px',
  lineHeight: '1.3',
}

const text = {
  fontSize: '15px',
  color: '#4a4a4a',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const footer = {
  fontSize: '13px',
  color: '#999999',
  margin: '20px 0 0',
  lineHeight: '1.5',
}
