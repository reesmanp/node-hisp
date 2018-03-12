# node-hisp
A HISP implementation written in Node.JS.

**Note:** This project is still under development.

**TODO:**
- Email Client
- Management Portal
- DKIM email signing

## Requirements
- Node >= 8.x
- One of:
  - NPM >= 5.x
  - Yarn >= 0.27.5

## Installation
- `git clone https://github.com/reesmanp/node-hisp.git`
- `cd node-hisp`
- `./bin/install.sh`
  - If you prefer using yarn, then use `./bin/install.sh yarn`

## How to run?
One of these options:
- `./bin/start.sh`
  - `./bin/stop.sh` to stop
- `npm run start`
- `yarn start`

## What is a HISP?
HISP stands for Health Information Service Provider. Basically what a HISP is is a secure email server for medical professionals to use in order to send PHI without violating HIPAA.

A HISP signs emails and sends them to other servers which they trust (through their trust store). If an email is being sent to a server that the HISP does not trust, the HISP will fail to send the mail. Keep in mind that all interactions are done through TLS.

On the flip side, if the HISP receives an email from a server that it doesn't trust, then the HISP will drop the email and it will not end up in any inbox.

## Why node-hisp?
There are many implementations for HISPs throughout the internet but the majority of them cost a lot of money to use their service. The only open source HISP implementation I have come across is the [Direct Project](http://wiki.directproject.org) which comes in three flavors: C#, Java, and PHP.

The problem with the Direct Project is that the documentation doesn't get you very far in setting it up properly and leaves you hanging around wondering what's next. Thus I decided to make my own.

Node-hisp is my solution for an open source, easy to install and setup, easy to use system which incorporates it's own email client and server along with administrative tools to help manage the HISP itself.
